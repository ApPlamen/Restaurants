import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { AddRoleModel } from '../models/add-role.model';

@Injectable()
export class AddRoleForm extends BaseFormModel<AddRoleModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
