import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormModel } from "src/custom-elements/controls/base-form-model/base-form-model";
import { RegisterModel } from "../models/register.model";

@Injectable()
export class RegisterForm extends BaseFormModel<RegisterModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}