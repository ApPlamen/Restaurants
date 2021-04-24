import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { PriceModel } from '../models/price.model';

@Injectable()
export class PriceForm extends BaseFormModel<PriceModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      type: ['', Validators.required],
      price: [0, Validators.required],
    });
  }
}
