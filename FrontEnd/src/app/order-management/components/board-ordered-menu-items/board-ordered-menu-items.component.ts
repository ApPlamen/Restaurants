import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../../services/order-management.service';
import { OrderedMenuItemManagementBoard } from '../../viewmodels/ordered-menu-items-board.viewmodel';
import { DatePipe } from '@angular/common';
import { timer } from 'rxjs';
import { OrderedItemStatusModel } from '../../models/ordered-item-status.model';
import { ItemOrderManagementService } from '../../services/item-order-management.service';

@Component({
  selector: 'board-ordered-menu-items',
  templateUrl: './board-ordered-menu-items.component.html',
})
export class BoardOrderedMenuItemsComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public orderedMenuItems: OrderedMenuItemManagementBoard[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Table Number',
      field: 'tableNumber',
    },
    {
      header: 'Menu Item',
      field: 'menuItem',
    },
    {
      header: 'Option',
      field: 'option',
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

  private restaurantId: string;
  private source = timer(0, 2000);

  constructor(private orderManagementService: OrderManagementService,
              private itemOrderManagementService: ItemOrderManagementService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');

    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    this.source.subscribe(_ => this.fillData());
  }

  setStatus(itemId: number, status?: string): void {
    const model: OrderedItemStatusModel = {
      itemId,
      status: parseInt(status, 10),
    };

    this.itemOrderManagementService.setOrderedItemStatus(model)
      .subscribe(_ => this.toastr.success('Success!'));
  }

  private fillData(): void {
    this.orderManagementService.getOrderedMenuItems(this.restaurantId)
      .subscribe(orderedMenuItems => this.orderedMenuItems = orderedMenuItems);
  }
}
