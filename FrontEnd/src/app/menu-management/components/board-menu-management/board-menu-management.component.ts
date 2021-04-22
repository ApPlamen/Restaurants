import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { ToastrService } from 'ngx-toastr';
import { MenuManagementService } from '../../services/menu-management.service';
import { ActivatedRoute } from '@angular/router';
import { CreateEditMenuItemComponent } from '../../dialogs/create-edit-menu-item/create-edit-menu-item.component';
import { MenuManagementStoreService } from '../../store/menu-management.store.service';
import { AvailableModel } from 'src/app/shared/models/available.model';

@Component({
  templateUrl: './board-menu-management.component.html',
})
export class BoardMenuManagementComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public menuItems;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
  ];

  private restaurantId: string;
  private userRoles: string[];

  constructor(private menuManagementService: MenuManagementService,
              private menuManagementStoreService: MenuManagementStoreService,
              private modalService: NgbModal,
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

    this.fillProfileForm();
  }

  openCreate(): void {
    this.menuManagementStoreService.setMenuItemId = null;
    this.openEditModal();
  }

  openEdit(menuItemId: string): void {
    this.menuManagementStoreService.setMenuItemId = menuItemId;
    this.openEditModal();
  }

  delete(menuItemId: string): void {
    this.menuManagementService.deleteMenuItem(menuItemId)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillProfileForm();
      });
  }

  toggleAvailable(menuItemId: string, available: boolean): void {
    const model: AvailableModel = {
      id: menuItemId,
      available: !available,
    };

    this.menuManagementService.toggleMenuItemAvailable(model)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillProfileForm();
      });
  }

  hasRole(roles: string[]) {
    return roles && roles.filter(value => this.userRoles.includes(value)).length > 0;
  }

  private openEditModal() {
    this.menuManagementStoreService.setRestaurantId = this.restaurantId;

    this.modalService.open(CreateEditMenuItemComponent, {size: 'lg'})
      .closed
      .subscribe(_ => this.fillProfileForm());
  }

  private fillProfileForm(): void {
    this.menuManagementService.getMenuBoard(this.restaurantId)
      .subscribe(menuItems => this.menuItems = menuItems);

    this.menuManagementService.getRestaurantUserRoles(this.restaurantId)
      .subscribe(userRoles => this.userRoles = userRoles);
  }
}
