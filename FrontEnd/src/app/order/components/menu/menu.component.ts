import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { BoardPricesComponent } from '../../dialogs/board-prices/board-prices.component';
import { OrderService } from '../../services/order.service';
import { OrderStoreService } from '../../store/order.store.service';
import { MenuItemOrderViewModel } from '../../viewmodels/menu-item-order.viewmodel';

@Component({
  selector: 'order-menu',
  templateUrl: './menu.component.html',
})
export class OrderMenuComponent implements OnInit  {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public menuItems: MenuItemOrderViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Start price',
      field: 'startPrice',
    },
  ];

  constructor(private orderService: OrderService,
              private orderStoreService: OrderStoreService,
              private modalService: NgbModal) { }

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

  openPrices(menuItemId: string): void {
    this.orderStoreService.setMenuItemId = menuItemId;
    this.modalService.open(BoardPricesComponent, {size: 'xl'});
  }

  private fillData(): void {
    this.orderService.getMenuBoard()
      .subscribe(menuItems => this.menuItems = menuItems);
  }
}
