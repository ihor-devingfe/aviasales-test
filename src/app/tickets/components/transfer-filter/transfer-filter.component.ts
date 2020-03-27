import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-transfer-filter',
  templateUrl: './transfer-filter.component.html',
  styleUrls: ['./transfer-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransferFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
