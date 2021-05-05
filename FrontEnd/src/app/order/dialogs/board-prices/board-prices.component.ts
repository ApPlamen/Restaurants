import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { OrderService } from '../../services/order.service';
import { OrderStoreService } from '../../store/order.store.service';
import { PriceViewModel } from '../../viewmodels/price.viewmodel';

@Component({
  templateUrl: './board-prices.component.html',
})
export class BoardPricesComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public prices: PriceViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Option',
      field: 'type',
    },
    {
      header: 'Price',
      field: 'price',
    },
  ];

  private menuItemId: string;

  constructor(private orderService: OrderService,
              private orderStoreService: OrderStoreService,
              private activeModalService: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    this.orderStoreService.getMenuItemId$
      .subscribe(menuItemId => this.menuItemId = menuItemId);

    this.fillData();
  }

  close(): void {
    this.activeModalService.close();
  }

  private fillData(): void {
    this.orderService.getMenuPricesBoard(this.menuItemId)
      .subscribe(prices => this.prices = prices);
  }
}
