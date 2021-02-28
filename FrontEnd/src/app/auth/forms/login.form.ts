import { Injectable, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormModel } from "src/custom-elements/controls/base-form-model/base-form-model";
import { LogInModel } from "../models/login.model";

@Injectable()
export class LogInForm extends BaseFormModel<LogInModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    });
  }
}