import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { MenuPricesManagementService } from '../../services/menu-prices-management.service';
import { MenuManagementStoreService } from '../../store/menu-management.store.service';
import { PriceViewModel } from '../../viewmodels/price.viewmodel';
import { CreateEditPriceComponent } from '../create-edit-price/create-edit-price.component';

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

  constructor(private menuPricesManagementService: MenuPricesManagementService,
              private menuManagementStoreService: MenuManagementStoreService,
              private modalService: NgbModal,
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

    this.menuManagementStoreService.getMenuItemId$
      .subscribe(menuItemId => this.menuItemId = menuItemId);

    this.fillData();
  }

  close(): void {
    this.activeModalService.close();
  }

  delete(priceId: string) {
    this.menuPricesManagementService.deleteMenuItemPrice(priceId)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillData();
      });
  }

  openCreate(): void {
    this.menuManagementStoreService.setPriceId = null;
    this.openEditModal();
  }

  openEdit(priceId: string): void {
    this.menuManagementStoreService.setPriceId = priceId;
    this.openEditModal();
  }

  private fillData(): void {
    this.menuPricesManagementService.getMenuPricesBoard(this.menuItemId)
      .subscribe(prices => this.prices = prices);
  }

  private openEditModal() {
    this.modalService.open(CreateEditPriceComponent)
      .closed
      .subscribe(_ => this.fillData());
  }
}
