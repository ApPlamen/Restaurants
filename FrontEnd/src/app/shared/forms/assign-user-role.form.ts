import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { AssignUserRoleModel } from '../models/assign-user-role.model';

@Injectable()
export class AssignUserRoleForm extends BaseFormModel<AssignUserRoleModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }
}
