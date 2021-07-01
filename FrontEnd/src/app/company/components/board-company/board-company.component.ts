import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleIdsEnum } from 'src/app/core/auth/enums/roles.enum';
import { ManageRolesComponent } from 'src/app/shared/dialogs/manage-roles/manage-roles.component';
import { ManageRolesStoreModel } from 'src/app/shared/storemodels/manage-roles.storemodel';
import { SimpleTableColumn } from 'src/app/shared/models/simple-table.model';
import { SharedStoreService } from 'src/app/shared/store/shared.store.service';
import { CreateEditCompanyComponent } from '../../dialogs/create-edit-company/create-edit-company.component';
import { CompanyService } from '../../services/company.service';
import { CompanyStoreService } from '../../store/company.store.service';
import { RolesFilteringBaseClass } from 'src/app/shared/base-classes/roles-filtering.class';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyViewModel } from '../../viewmodels/company.viewmodel';

@Component({
  templateUrl: './board-company.component.html',
})
export class BoardCompanyComponent extends RolesFilteringBaseClass implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;

  public companies: CompanyViewModel[];

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Owners',
      field: 'owners',
    },
    {
      header: 'Legal ID',
      field: 'legalId',
    },
  ];

  constructor(private companyService: CompanyService,
              private companyStoreService: CompanyStoreService,
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

    this.fillData();
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

  delete(companyId: string): void {
    this.companyService.deleteCompany(companyId)
      .subscribe(_ => {
        this.toastr.success('Success!');
        this.fillData();
      });
  }

  private openEditModal() {
    this.modalService.open(CreateEditCompanyComponent)
      .closed
      .subscribe(_ => this.fillData());
  }

  private openManageOwnersModal() {
    this.modalService.open(ManageRolesComponent, {size: 'lg'})
      .closed
      .subscribe(_ => this.fillData());
  }

  private fillData(): void {
    this.companyService.getCompanyBoard()
      .subscribe(companies => this.companies = companies);
  }
}
