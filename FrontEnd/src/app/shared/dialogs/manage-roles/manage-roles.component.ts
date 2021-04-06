import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AssignUserRoleForm } from '../../forms/assign-user-role.form';
import { ManageRolesStoreModel } from '../../storemodels/manage-roles.storemodel';
import { UnassignUserRoleModel } from '../../models/unassign-user-role.model';
import { SimpleTableColumn } from '../../models/simple-table.model';
import { UserRoleRequestModel } from '../../models/user-role-request.model';
import { SharedService } from '../../services/shared.service';
import { SharedStoreService } from '../../store/sharedStore.service';

@Component({
  templateUrl: './manage-roles.component.html',
})
export class ManageRolesComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;
  
  public assignUserRoleForm: AssignUserRoleForm = new AssignUserRoleForm();
  public users;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'fullname',
    },
    {
      header: 'Email',
      field: 'email',
    },
  ];

  manageRolesModel: ManageRolesStoreModel

  constructor(private sharedService: SharedService,
              private sharedStoreService: SharedStoreService,
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

    this.sharedStoreService.getManageRoles$.subscribe(
      manageRolesModel => {
        this.manageRolesModel = manageRolesModel;
        this.assignUserRoleForm.patchModel({ roleId: this.manageRolesModel.roleId });
        this.assignUserRoleForm.patchModel({ payload: this.manageRolesModel.payload });
        this.fillProfileForm();
      }
    )
  }

  close(): void {
    this.activeModalService.close();
  }

  onSubmit(): void {
    console.log(this.assignUserRoleForm.model);
    if (this.assignUserRoleForm.formGroup.valid) {
      this.sharedService.addUserRole(this.assignUserRoleForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');
          this.fillProfileForm()
        });
    }
  }

  delete(userId: string) {
    const model: UnassignUserRoleModel = {
      userId: userId,
      roleId: this.manageRolesModel.roleId,
      payload: this.manageRolesModel.payload,
    }

    this.sharedService.removeUserRole(model)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillProfileForm()
      });
  }

  private fillProfileForm(): void {
    var userRoleRequestModel: UserRoleRequestModel = {
      roleId: this.manageRolesModel.roleId,
      payload: this.manageRolesModel.payload
    }

    this.sharedService.getUsersOfRole(userRoleRequestModel)
      .subscribe(users => this.users = users);
  }
}
