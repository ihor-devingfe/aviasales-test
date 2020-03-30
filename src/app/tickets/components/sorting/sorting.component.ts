import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortingComponent {
  @Output() sorting: EventEmitter<string> = new EventEmitter<string>();

  sort(event) {
    this.sorting.emit(event.target.value);
  }
}
