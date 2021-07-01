import { ChangeDetectorRef, Directive, HostBinding, Input, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormUtil } from '../../utils/forms/form-util.helper';

@Directive()
// eslint-disable-next-line
export abstract class CustomControlDirective implements ControlValueAccessor {
  @HostBinding('class.control--showErrors') get areErrorsShown(): boolean {
    return FormUtil.areErrorsShown(this.ngControl, this.showErrorsOn);
  }

  @Input() id: string = Math.random().toString();
  @Input() disabled = false;
  @Input() showErrorsOn: 'dirty' | 'touched';
  @Input() customErrorMessages: { [validatorType: string]: string } = {};
  @Input() displayError = true;

  @Input()
  get value(): any {
    return this.internalValue;
  }
  set value(value: any) {
    this.internalValue = value;
    this.onChange(value);
    this.onTouch(value);
  }
  protected internalValue: any;

  constructor(@Optional() public ngControl: NgControl, protected cd: ChangeDetectorRef) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public onChange = (_: any) => {};
  public onTouch = (_: any) => {};

  public getErrorMessage(): string {
    return FormUtil.getErrorMessage(this.ngControl, this.customErrorMessages);
  }

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
