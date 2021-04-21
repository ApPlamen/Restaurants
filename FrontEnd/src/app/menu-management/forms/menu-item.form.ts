import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormModel } from 'src/app/shared/models/base-form.model';
import { MenuItemModel } from '../models/menu-management.model';

@Injectable()
export class MenuItemForm extends BaseFormModel<MenuItemModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      restaurantId: ['', Validators.required],
    });
  }
}
