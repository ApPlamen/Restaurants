import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { OrderService } from '../../services/order.service';
import { OrderedMenuItemViewModel } from '../../viewmodels/ordered-menu-item.viewmodel copy';

@Component({
  selector: 'ordered-items',
  templateUrl: './ordered-items.component.html',
})
export class OrderedItemsComponent implements OnInit  {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public orderedItems: OrderedMenuItemViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'itemName',
    },
    {
      header: 'Option',
      field: 'option',
    },
    {
      header: 'Price',
      field: 'price',
    },
    {
      header: 'Status',
      field: 'orderedItemStatus',
    },
    {
      header: 'User',
      field: 'userName',
    },
    {
      header: 'Time',
      field: 'dateTime',
      pipe: DatePipe,
      pipeArgs: [
        'medium'
      ]
    },
  ];

  private source = timer(0, 2000);

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    this.source.subscribe(_ => this.fillData());
  }

  get total(): string {
    if (!this.orderedItems) return "0.00";

    return this.orderedItems
      .filter(item => true)
      .reduce((sum: number, current) => sum + parseFloat(current.price), 0)
      .toFixed(2)
      .toString();
  }

  private fillData(): void {
    this.orderService.getOrderedItemsBoard()
      .subscribe(orderedItems => this.orderedItems = orderedItems);
  }
}
