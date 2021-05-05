import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { NewOrderModel } from '../models/new-order.model copy';

@Injectable()
export class NewOrderForm extends BaseFormModel<NewOrderModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      restaurantName: ['', Validators.required],
      tableNumber: ['', Validators.required],
    });
  }
}
