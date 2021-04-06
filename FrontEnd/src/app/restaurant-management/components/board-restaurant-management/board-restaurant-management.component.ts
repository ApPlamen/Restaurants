import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleIdsEnum } from 'src/app/core/auth/enums/roles.enum';
import { ManageRolesComponent } from 'src/app/shared/dialogs/manage-roles/manage-roles.component';
import { ManageRolesStoreModel } from 'src/app/shared/storemodels/manage-roles.storemodel';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { SharedStoreService } from 'src/app/shared/store/sharedStore.service';
import { CreateEditRestaurantComponent } from '../../dialogs/create-edit-restaurant/create-edit-restaurant.component';
import { RestaurantManagementService } from '../../services/restaurant-management.service';
import { RestaurantStoreService } from '../../store/restaurantStore.service';

@Component({
  templateUrl: './board-restaurant-management.component.html',
})
export class BoardRestaurantComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public restaurants;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Company',
      field: 'companyName',
    },
  ];

  constructor(private restaurantManagementService: RestaurantManagementService,
              private restaurantStoreService: RestaurantStoreService,
              private sharedStoreService: SharedStoreService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
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
    this.restaurantStoreService.setRestaurantId = null;
    this.openEditModal();
  }

  openEdit(restaurantId: string): void {
    this.restaurantStoreService.setRestaurantId = restaurantId;
    this.openEditModal();
  }

  openManageRestaurantAdmins(restaurantId: string): void {
    const storeValue: ManageRolesStoreModel = {
      roleId: RoleIdsEnum.restaurantAdmin,
      payload: restaurantId,
    }
    this.sharedStoreService.setManageRoles = storeValue;

    this.openManageOwnersModal();
  }

  openManageRestaurantWorkers(restaurantId: string): void {
    const storeValue: ManageRolesStoreModel = {
      roleId: RoleIdsEnum.restaurant,
      payload: restaurantId,
    }
    this.sharedStoreService.setManageRoles = storeValue;

    this.openManageOwnersModal();
  }

  private openEditModal() {
    this.modalService.open(CreateEditRestaurantComponent)
      .closed
      .subscribe(_ => this.fillProfileForm());
  }

  private openManageOwnersModal() {
    this.modalService.open(ManageRolesComponent, {size: 'lg'})
      .closed
      .subscribe(_ => this.fillProfileForm());
  }

  private fillProfileForm(): void {
    this.restaurantManagementService.getRestaurantBoard()
      .subscribe(restaurants => this.restaurants = restaurants);
  }
}
