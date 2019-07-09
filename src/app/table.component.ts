import { Component } from '@angular/core';
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { Subject, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { AppModels } from './app.models';

// Provide table UI definition in js object
// This type is extended from default TableDescription type
// Now we could use any configured custom column types (see app.module)
// in any table definition.
const table = (statusClick$: Subject<any>): AppModels.AppTableDescription => ({
    cols: [
        {
            id: 'title',            
            title: 'Title'
        },
        {
            id: 'status',
            title: 'Status',
            kind: 'AppStatusColumn',
            // Here we map component input properties from cell value 
            props: {
              // AppStatusColumn linked to StatusComponent (see app.module)
              // StatusComponent has `status` input property
              // here we bind this property to value from the cell
              // It is possible to use for binding row itself as optional second parameter
              // Any component input property mapped to custom cell could be bind to cell value the same way   
              status: (val, row) => {
                return val ? 'fail' : 'success';
              },
              // Any output event of the component could be bind to ths Subject object
              clicked: statusClick$
            }
        }
    ]
});

// Provide data for the table
const rows: Table.Row[] = [
    {
        id: '1',
        title: 'one',
        status: 0
    },
    {
        id: '2',
        title: 'two',
        status: 1
    },
    {
        id: '3',
        title: 'three',
        status: 0
    }
];

const dataProvider: Table.Data.DataProvider = {
    load(_) {
        return timer(0).pipe(mapTo({ rows }));
    }
};

@Component({
  selector: 'my-table',
  template: `<hlc-clr-table [table]="table" [dataProvider]="dataProvider"></hlc-clr-table>`
})
export class TableComponent  {
  readonly statusClick$ = new Subject<any>();
  readonly table = table(this.statusClick$);
  readonly dataProvider = dataProvider;

  constructor() {
      // This is example you must unsubscribe it
      this.statusClick$.subscribe(evt => console.log('Status clicked', evt));
  }
}
