import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { OrderManagementService } from '../../services/order-management.service';
import { OrderBoardViewModel } from '../../viewmodels/order-board.viewmodel';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'board-order-management',
  templateUrl: './board-order-management.component.html',
})
export class BoardOrderManagementComponent implements OnInit, OnDestroy {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public orders: OrderBoardViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Table Number',
      field: 'tableNumber',
    },
    {
      header: 'Bill',
      field: 'bill',
    },
  ];

  private restaurantId: string;
  private source = timer(0, 3000);
  private subscription: Subscription;

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

    this.subscription = this.source.subscribe(_ => this.fillData());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeOrder(itemId: string): void {
    this.orderManagementService.closeOrder(itemId)
      .subscribe(_ => this.toastr.success('Success!'));
  }

  private fillData(): void {
    this.orderManagementService.getRestaurantOrders(this.restaurantId)
      .subscribe(orders => this.orders = orders);
  }
}
