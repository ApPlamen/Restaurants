import { PipeTransform, TemplateRef, Type } from '@angular/core';

/**
 * Describes the configuration for a single column of the `SimpleTableComponent`.
 * Supports an `optional` type parameter for strong typing the `field` setting.
 */
export interface SimpleTableColumn<T = any> {
  /**
   * `optional` A label to display in the column header.
   */
  header?: string;
  /**
   * `optional` custom header cell template.
   */
  headerCellTemplate?: TemplateRef<any>;
  /**
   * The name of the property to display in this column.
   */
  field: keyof T;
  /**
   * An `optional` pipe to apply custom formatting.
   */
  pipe?: Type<PipeTransform>;
  /**
   * `optional` parameters to pass to the pipe when formatting the value.
   */
  pipeArgs?: any[];
  /**
   * Custom CSS class to apply on the header and cells of a column.
   */
  customStyle?: string;
  /**
   * `optional` custom cell template.
   */
  cellTemplate?: TemplateRef<any>;
  /**
   * `optional` Custom header tooltip.
   * **IMPORTANT**: requires header template with tooltip to display it.
   */
  headerTooltip?: string;
}
