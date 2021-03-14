import { Injector } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export abstract class BaseFormModel<T> {
  public formGroup: FormGroup;

  protected formBuilder: FormBuilder;
  private _model: T;

  constructor() {
    // eslint-disable-next-line
    const injector = Injector.create([{ provide: FormBuilder, deps: [] }]);
    this.formBuilder = injector.get(FormBuilder);
  }

  static markControlsAsDirty(form: FormGroup): void {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        const control = form.controls[key];

        if (!(control instanceof FormControl)) {
          this.markControlsAsDirty(control as FormGroup);
        }

        control.markAsDirty();
      }
    }
  }

  setModel(model: T): void {
    this._model = model;
    this.formGroup.patchValue(model);
  }

  // eslint-disable-next-line
  patchModel(property: { [key: string]: any }): void {
    // eslint-disable-next-line
    this._model = { ...<any> this._model, ...property };
    this.formGroup.patchValue(property);
  }

  setValidators(controlName: string, validators: ValidatorFn[]): void {
    this.formGroup.get(controlName).setValidators(validators);
  }

  setAsyncValidators(controlName: string, validators: AsyncValidatorFn[]): void {
    this.formGroup.get(controlName).setAsyncValidators(validators);
  }

  get model(): T {
    const formGroupRawValue = this.formGroup.getRawValue();

    // eslint-disable-next-line
    return { ...<any> this._model, ...formGroupRawValue };
  }

  isValid(): boolean {
    return this.formGroup.valid;
  }

  clear(): void {
    this.formGroup.reset();
  }
}
