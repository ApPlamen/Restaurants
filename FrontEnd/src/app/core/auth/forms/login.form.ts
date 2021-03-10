import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormModel } from "src/app/shared/models/base-form.model";
import { LogInModel } from "../models/login.model";

@Injectable()
export class LogInForm extends BaseFormModel<LogInModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
}