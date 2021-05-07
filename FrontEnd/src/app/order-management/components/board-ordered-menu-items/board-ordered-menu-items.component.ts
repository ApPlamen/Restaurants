import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../../services/order-management.service';
import { OrderedMenuItemManagementBoard } from '../../viewmodels/ordered-menu-items-board.viewmodel';

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
      header: 'Option',
      field: 'option',
    },
  ];

  private restaurantId: string;

  constructor(private orderManagementService: OrderManagementService,
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

    this.fillData();
  }

  private fillData(): void {
    this.orderManagementService.getOrderedMenuItems(this.restaurantId)
      .subscribe(orderedMenuItems => this.orderedMenuItems = orderedMenuItems);
  }
}
