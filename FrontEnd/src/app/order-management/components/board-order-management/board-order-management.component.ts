import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../../services/order-management.service';
import { OrderBoardViewModel } from '../../viewmodels/order-board.viewmodel';

@Component({
  selector: 'board-order-management',
  templateUrl: './board-order-management.component.html',
})
export class BoardOrderManagementComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public orders: OrderBoardViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Table Number',
      field: 'tableNumber',
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
    this.orderManagementService.getRestaurantOrders(this.restaurantId)
      .subscribe(orders => this.orders = orders);
  }
}
