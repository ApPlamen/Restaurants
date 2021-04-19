import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { RoleIdsEnum } from 'src/app/core/auth/enums/roles.enum';
// import { ManageRolesComponent } from 'src/app/shared/dialogs/manage-roles/manage-roles.component';
// import { ManageRolesStoreModel } from 'src/app/shared/storemodels/manage-roles.storemodel';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { SharedStoreService } from 'src/app/shared/store/sharedStore.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { RolesFilteringBaseClass } from 'src/app/shared/base-classes/roles-filtering.class';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './board-menu-management.component.html',
})
export class BoardMenuManagementComponent extends RolesFilteringBaseClass implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public restaurants;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
  ];

  constructor(//private restaurantManagementService: RestaurantManagementService,
              //private restaurantStoreService: RestaurantStoreService,
              private sharedStoreService: SharedStoreService,
              private modalService: NgbModal,
              private toastr: ToastrService,
              protected tokenStorageService: TokenStorageService) {
    super(tokenStorageService);
  }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];

    //this.fillProfileForm();
  }

  // openCreate(): void {
  //   this.restaurantStoreService.setRestaurantId = null;
  //   this.openEditModal();
  // }

  // openEdit(restaurantId: string): void {
  //   this.restaurantStoreService.setRestaurantId = restaurantId;
  //   this.openEditModal();
  // }

  // delete(restaurantId: string): void {
  //   this.restaurantManagementService.deleteRestaurant(restaurantId)
  //     .subscribe(_ => {
  //       this.toastr.success('Success!');
  //       this.fillProfileForm();
  //     });
  // }

  // private openEditModal() {
  //   this.modalService.open(CreateEditRestaurantComponent)
  //     .closed
  //     .subscribe(_ => this.fillProfileForm());
  // }

  // private fillProfileForm(): void {
  //   this.restaurantManagementService.getRestaurantBoard()
  //     .subscribe(restaurants => this.restaurants = restaurants);
  // }
}
