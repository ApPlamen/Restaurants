import { LowerCasePipe } from '@angular/common';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SimpleTableColumn } from '../../models/simple-table.model';

import { SimpleTableComponent } from './simple-table.component';
import { NOT_AVAILABLE } from './simple-table.constants';

describe('SimpleTableComponent', () => {
  let spectator: Spectator<SimpleTableComponent>;
  const createComponent = createComponentFactory({
    component: SimpleTableComponent,
    providers: [LowerCasePipe]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should trigger getFormattedValue and return string', () => {
    let dataItem //= instrumentsMock[0].qcData[0];
    let column: SimpleTableColumn<{ [key: string]: string }> //= columnHeaders[0];
    const getFormattedValue = spectator.component.getFormattedValue(dataItem, column);
    const expected = 'Encoder Calibration';
    expect(getFormattedValue).toEqual(expected);
  });

  it('should trigger getFormattedValue and return not avaible when field do not exist in dataItem', () => {
    let dataItem //= instrumentsMock[0].qcData[0];
    const column: SimpleTableColumn<{ [key: string]: string }> = {
      header: 'Some title',
      field: 'someField'
    };
    const getFormattedValue = spectator.component.getFormattedValue(dataItem, column);
    const expected = NOT_AVAILABLE;
    expect(getFormattedValue).toEqual(expected);
  });

  it('should trigger getFormattedValue and return string created by column pipe', () => {
    let dataItem //= instrumentsMock[0].qcData[0];
    let column: SimpleTableColumn<{ [key: string]: string }> //= {
    //   ...columnHeaders[0],
    //   pipe: LowerCasePipe
    // };
    const getFormattedValue = spectator.component.getFormattedValue(dataItem, column);
    const expected = 'encoder calibration';
    expect(getFormattedValue).toEqual(expected);
  });
});
