import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

const DEFAULT_TRANSFERS = {
  all: true,
  0: true,
  1: true,
  2: true,
  3: true,
};

@Component({
  selector: 'app-transfer-filter',
  templateUrl: './transfer-filter.component.html',
  styleUrls: ['./transfer-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFilterComponent {
  @Output() filtering: EventEmitter<number[]> = new EventEmitter();

  transfers: FormGroup = this.fb.group(DEFAULT_TRANSFERS);

  constructor(private fb: FormBuilder) {
  }

  private get isZeroTransfersChecked(): boolean {
    return this.transfers.get('0').value;
  }

  private get isAllTransfersChecked(): boolean {
    return this.sumOfTransfers(this.transfers.value)
      === this.sumOfTransfers(DEFAULT_TRANSFERS)
      && this.isZeroTransfersChecked;
  }

  onChange(event): void {
    this.updateCheckboxes(event);

    const filters = Object.keys(this.transfers.value)
      .filter(key => this.transfers.value[key] && !isNaN(+key))
      .map(value => +value);

    this.filtering.emit(filters);
  }

  private checkAllTransfers(): void {
    this.transfers.patchValue(DEFAULT_TRANSFERS);
  }

  private uncheckAllTransfers(): void {
    this.transfers.patchValue({all: false, 0: false, 1: false, 2: false, 3: false});
  }

  private sumOfTransfers(transfersState): number {
    return Object.entries(transfersState)
      .map(control => {
        if (+control[0] > 0 && control[1]) {
          return +control[0];
        }
      })
      .filter(num => isFinite(num))
      .reduce((acc, curr) => acc + curr, 0);
  }

  private updateCheckboxes({target}): void {
    if (target.getAttribute('formControlName') === 'all') {
      if (this.transfers.get('all').value) {
        this.checkAllTransfers();
      } else {
        this.uncheckAllTransfers();
      }
    } else {
      if (this.isAllTransfersChecked) {
        this.checkAllTransfers();
      } else {
        this.transfers.patchValue({all: false});
      }
    }
  }
}
