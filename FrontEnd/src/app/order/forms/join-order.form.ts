import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { JoinOrderModel } from '../models/join-order.model';

const ORDER_ID_LENGTH = 6;

@Injectable()
export class JoinOrderForm extends BaseFormModel<JoinOrderModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required,
                     Validators.minLength(ORDER_ID_LENGTH),
                     Validators.maxLength(ORDER_ID_LENGTH)]],
    });
  }
}
