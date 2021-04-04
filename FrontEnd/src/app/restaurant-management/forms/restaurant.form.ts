import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { RestaurantModel } from '../models/restaurant.model';

@Injectable()
export class RestaurantForm extends BaseFormModel<RestaurantModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}
