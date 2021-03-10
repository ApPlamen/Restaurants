import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseFormModel } from "src/app/shared/models/base-form.model";
import { ProfileModel } from "../models/profile.model";

@Injectable()
export class ProfileForm extends BaseFormModel<ProfileModel> {
  constructor() {
    super();

    this.formGroup = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      fullname: ['', Validators.required],
    });
  }
}