import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PriceForm } from '../../forms/price.form';
import { MenuPricesManagementService } from '../../services/menu-prices-management.service';
import { MenuManagementStoreService } from '../../store/menu-management.store.service';

@Component({
  templateUrl: './create-edit-price.component.html',
})
export class CreateEditPriceComponent implements OnInit {
  isNew = true;
  priceForm: PriceForm = new PriceForm();

  private menuItemId: string;

  constructor(private menuPricesManagementService: MenuPricesManagementService,
              private menuManagementStoreService: MenuManagementStoreService,
              private activeModalService: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.menuManagementStoreService.getMenuItemId$.subscribe(
      menuItemId => this.menuItemId = menuItemId
    );

    this.menuManagementStoreService.getPriceId$.subscribe(
      priceId => {
        if ( priceId ) {
          this.isNew = false;
          this.menuPricesManagementService.getMenuItemPrice(priceId).subscribe( price => this.priceForm.setModel(price) );
        }
      }
    );
  }

  onSubmit(): void {
    if (this.priceForm.formGroup.valid) {
      this.priceForm.patchModel({ menuItemId: this.menuItemId });

      this.menuPricesManagementService.saveMenuItemPrice(this.priceForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');
          this.activeModalService.close();
        });
    }
  }
}
