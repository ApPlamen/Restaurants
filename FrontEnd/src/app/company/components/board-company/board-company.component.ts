import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleIdsEnum } from 'src/app/core/auth/enums/roles.enum';
import { ManageRolesComponent } from 'src/app/shared/dialogs/manage-roles/manage-roles.component';
import { ManageRolesStoreModel } from 'src/app/shared/storemodels/manage-roles.storemodel';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { SharedStoreService } from 'src/app/shared/store/sharedStore.service';
import { CreateEditCompanyComponent } from '../../dialogs/create-edit-company/create-edit-company.component';
import { CompanyService } from '../../services/company.service';
import { CompanyStoreService } from '../../store/companyStore.service';

@Component({
  templateUrl: './board-company.component.html',
})
export class BoardCompanyComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public companies;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Owners',
      field: 'owners',
    },
  ];

  constructor(private companyService: CompanyService,
              private companyStoreService: CompanyStoreService,
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
    this.companyStoreService.setCompanyId = null;
    this.openEditModal();
  }

  openEdit(companyId: string): void {
    this.companyStoreService.setCompanyId = companyId;
    this.openEditModal();
  }

  openManageOwners(companyId: string): void {
    const storeValue: ManageRolesStoreModel = {
      roleId: RoleIdsEnum.companyOwner,
      payload: companyId,
    };
    this.sharedStoreService.setManageRoles = storeValue;

    this.openManageOwnersModal();
  }

  private openEditModal() {
    this.modalService.open(CreateEditCompanyComponent)
      .closed
      .subscribe(_ => this.fillProfileForm());
  }

  private openManageOwnersModal() {
    this.modalService.open(ManageRolesComponent, {size: 'lg'})
      .closed
      .subscribe(_ => this.fillProfileForm());
  }

  private fillProfileForm(): void {
    this.companyService.getCompanyBoard()
      .subscribe(companies => this.companies = companies);
  }
}
