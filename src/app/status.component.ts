import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export type Status = 'success' | 'fail';

@Component({
  selector: 'my-status-component',
  template: `
    <div style="display: block; width: 20px;" (click)="clicked.emit()">
      <clr-icon *ngIf="status === 'success'" shape="check"></clr-icon>
      <clr-icon *ngIf="status === 'fail'" shape="times"></clr-icon>
    </div>
  `
})
export class StatusComponent  {
  @Input() status: Status;
  @Output() clicked = new EventEmitter();
}
