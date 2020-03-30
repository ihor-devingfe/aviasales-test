import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

const DEFAULT_CONFIG = {
  any: true,
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

  transfers: FormGroup = this.fb.group(DEFAULT_CONFIG);

  constructor(private fb: FormBuilder) {
  }

  private updateCheckboxes({target}): void {
    const controlName = target.getAttribute('formControlName');

    if (controlName === 'any') {
      if (!this.transfers.get('any').value) {
        this.transfers.patchValue({
          any: false,
          0: false,
          1: false,
          2: false,
          3: false,
        });
      } else {
        this.transfers.patchValue(DEFAULT_CONFIG);
      }
    } else {
      if (Object.values(this.transfers.value).filter(value => !value).length === 1) {
        if (this.transfers.get('any').value) {
          this.transfers.patchValue({any: false});
        } else {
          this.transfers.patchValue({any: true});
        }
      }
    }
  }

  onChange(event): void {
    this.updateCheckboxes(event);

    const filters = Object.keys(this.transfers.value)
      .filter(key => this.transfers.value[key] && !isNaN(+key))
      .map(value => +value);

    this.filtering.emit(filters);
  }
}
