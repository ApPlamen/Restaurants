import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
      header: 'User',
      field: 'userName',
    },
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    this.fillData();
  }

  private fillData(): void {
    this.orderService.getOrderedItemsBoard()
      .subscribe(orderedItems => this.orderedItems = orderedItems);
  }
}
