import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddRoleForm } from '../../forms/add-role.form';
import { SimpleTableColumn } from '../../models/simple-table.model';

@Component({
  templateUrl: './manage-roles.component.html',
})
export class ManageRolesComponent implements OnInit {
  @ViewChild('tableActionCellTemplate', { static: true }) tableActionCellTemplate: TemplateRef<any>;
  
  public addRoleForm: AddRoleForm = new AddRoleForm();
  public users;

  public columns: SimpleTableColumn<{ [key: string]: string }>[] = [
    {
      header: 'Name',
      field: 'name',
    },
    {
      header: 'Email',
      field: 'email',
    },
  ];

  constructor(private activeModalService: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.columns = [
      ...this.columns,
      {
        field: 'id',
        cellTemplate: this.tableActionCellTemplate
      }
    ];
  }

  close(): void {
    this.activeModalService.close();
  }

  onSubmit(): void {
    if (this.addRoleForm.formGroup.valid) {
      // this.companyService.saveCompany(this.addRoleForm.model)
      //   .subscribe(_ => {
      //     this.toastr.success('Success!');
      //     this.activeModalService.close();
      //   });
    }
  }
}
