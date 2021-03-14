import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core';
import { SimpleTableColumn } from '../../models/simple-table.model';
import { NOT_AVAILABLE } from './simple-table.constants';

@Component({
  selector: 'tmc-simple-table',
  templateUrl: './simple-table.component.html',
  styleUrls: ['./simple-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleTableComponent {
  /** Column configuration **/
  @Input() columns: SimpleTableColumn[];
  /**
   * Data items to display
   */
  @Input() data: any[];
  /**
   * A heading describing the information displayed in the table
   */
  @Input() title: string;

  constructor(private injector: Injector) {}

  /**
   * Format a data item value based on the column configuration.
   * By default, the value is formatted using the standard `toString` implementation.
   * If the column is configured with a pipe then we use it to get the formatted value.
   * When a value is missing we display N/A.
   *
   * @param dataItem Data item which contains the information to display.
   * @param column Configuration of the specific column to display.
   * @returns Formatted value.
   */
  public getFormattedValue(dataItem: any, column: SimpleTableColumn): string {
    const notAvailable = NOT_AVAILABLE;
    const value = dataItem[column.field];

    let formattedValue = value?.toString();

    if (column.pipe) {
      const pipe = this.injector.get(column.pipe);
      formattedValue = pipe.transform(value, ...(column.pipeArgs || []));
    }

    const isEmptyValue = formattedValue ?? formattedValue === '';

    formattedValue = !isEmptyValue ? notAvailable : formattedValue;

    return formattedValue;
  }
}
