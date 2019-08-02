
import { Table, TableDescription } from '@ng-holistic/clr-list';
import { Status } from './status.component';
import { Observable } from 'rxjs';

export namespace AppModels {

  export interface AppStatusColumnProps {
    status: Table.MapColumns.CellProp<Status>;
    clicked: Observable<any>
  }

  export interface AppStatusColumn extends Table.MapColumns.MapColumn<AppStatusColumnProps> {
    kind: 'AppStatusColumn';
  }

  // Strictly speaking you don't need to define new Application TableDefinition type
  // and application stil will work as far as you configure custom columns mapping in configuration
  // see app.module file.
  // But type script compiler will give errors if you will try to include this column in table definition,
  // since default TableDescription don't know anything about new custom map column types inside you 
  // application.
  export type TableDefinition = TableDescription<Table.MapColumns.Column | AppStatusColumn>;

}