import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MenuItemForm } from '../../forms/menu-item.form';
import { MenuManagementService } from '../../services/menu-management.service';
import { MenuManagementStoreService } from '../../store/menuManagement.service';

@Component({
  templateUrl: './create-edit-menu-item.component.html',
})
export class CreateEditMenuItemComponent implements OnInit {
  isNew = true;
  menuItemForm: MenuItemForm = new MenuItemForm();

  constructor(private menuManagementService: MenuManagementService,
              private menuManagementStoreService: MenuManagementStoreService,
              private activeModalService: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.menuManagementStoreService.getMenuItemId$.subscribe(
      menuItemId => {
        if ( menuItemId ) {
          this.isNew = false;
          this.menuManagementService.getMenuItem(menuItemId).subscribe( menuItem => this.menuItemForm.setModel(menuItem) );
        }
      }
    );
  }

  onSubmit(): void {
    if (this.menuItemForm.formGroup.valid) {
      this.menuManagementService.saveMenuItem(this.menuItemForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');
          this.activeModalService.close();
        });
    }
  }
}
