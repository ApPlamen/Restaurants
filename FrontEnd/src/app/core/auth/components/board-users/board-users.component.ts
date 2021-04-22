import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ManageRolesComponent } from 'src/app/shared/dialogs/manage-roles/manage-roles.component';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { SharedStoreService } from 'src/app/shared/store/sharedStore.service';
import { ManageRolesStoreModel } from 'src/app/shared/storemodels/manage-roles.storemodel';
import { RoleIdsEnum } from '../../enums/roles.enum';
import { UserService } from '../../services/user.service';
import { UsersViewModel } from '../../viewmodels/user.viewmodel';

@Component({
  templateUrl: './board-users.component.html',
})
export class BoardUsersComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public users: UsersViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Email',
      field: 'email',
    },
    {
      header: 'User Name',
      field: 'userName',
    },
    {
      header: 'Fullname',
      field: 'fullname',
    }
  ];

  constructor(private userService: UserService,
              private sharedStoreService: SharedStoreService,
              private modalService: NgbModal,
              private toastr: ToastrService) { }

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

  openManageAdmins(): void {
    const storeValue: ManageRolesStoreModel = {
      roleId: RoleIdsEnum.admin,
    };
    this.sharedStoreService.setManageRoles = storeValue;

    this.openManageAdminsModal();
  }

  delete(userId: string): void {
    this.userService.deleteUser(userId)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillData();
      });
  }

  private openManageAdminsModal() {
    this.modalService.open(ManageRolesComponent, {size: 'lg'})
      .closed
      .subscribe(_ => this.fillData());
  }

  private fillData(): void {
    this.userService.getUserBoard()
      .subscribe(users => this.users = users);
  }
}
