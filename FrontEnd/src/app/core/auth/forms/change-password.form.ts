import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { ChangePasswordModel } from '../models/change-password.model';

@Injectable()
export class ChangePasswordForm extends BaseFormModel<ChangePasswordModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}
