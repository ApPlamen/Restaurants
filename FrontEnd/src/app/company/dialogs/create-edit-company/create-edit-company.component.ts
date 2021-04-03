import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CompanyForm } from '../../forms/company.form';
import { CompanyService } from '../../services/company.service';
import { CompanyStoreService } from '../../store/companyStore.service';

@Component({
  templateUrl: './create-edit-company.component.html',
})
export class CreateEditCompanyComponent implements OnInit, OnDestroy {
  isNew = true;

  constructor(private companyService: CompanyService,
              private companyStoreService: CompanyStoreService,
              private activeModalService: NgbActiveModal,
              private toastr: ToastrService,
              public companyForm: CompanyForm) { }

  ngOnInit(): void {
    this.companyStoreService.getCompanyId$.subscribe(
      companyId => {
        if ( companyId ) {
          this.isNew = false;
          this.companyService.getCompany(companyId).subscribe( company => this.companyForm.setModel(company) );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.companyForm.clear();
  }

  onSubmit(): void {
    if (this.companyForm.formGroup.valid) {
      this.companyService.saveCompany(this.companyForm.model)
        .subscribe(_ => {
          this.toastr.success('Success!');
          this.activeModalService.close();
        });
    }
  }
}
