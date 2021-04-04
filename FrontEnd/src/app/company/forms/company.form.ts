import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { CompanyModel } from '../models/company.model';

@Injectable()
export class CompanyForm extends BaseFormModel<CompanyModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}
