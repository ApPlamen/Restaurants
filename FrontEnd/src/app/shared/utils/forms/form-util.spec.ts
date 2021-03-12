import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { FormUtil } from './form-util.helper';

describe('FormUtil', () => {
  it('should returns correct validation message, when control has errors.', () => {
    const ngControl: NgControl | AbstractControl = { errors: { required: true } as ValidationErrors | null } as
      | NgControl
      | AbstractControl;

    expect(FormUtil.getErrorMessage(ngControl)).toBe('This field is required.');
  });

  it('should returns custom validation message, when control has errors and custom errors is passed.', () => {
    const ngControl: NgControl | AbstractControl = { errors: { required: true } as ValidationErrors | null } as
      | NgControl
      | AbstractControl;

    expect(FormUtil.getErrorMessage(ngControl, { required: 'Custom error message.' })).toBe('Custom error message.');
  });

  it('should returns false, when control is disabled.', () => {
    const ngControl: NgControl | AbstractControl = { disabled: true } as NgControl | AbstractControl;

    expect(FormUtil.areErrorsShown(ngControl)).toBeFalse();
  });

  it('should returns true, when control is enabled and dirty.', () => {
    const ngControl: NgControl | AbstractControl = { disabled: false, dirty: true } as NgControl | AbstractControl;

    expect(FormUtil.areErrorsShown(ngControl)).toBeTrue();
  });

  it('should returns true, when control is enabled and touched.', () => {
    const ngControl: NgControl | AbstractControl = { disabled: false, touched: true } as NgControl | AbstractControl;

    expect(FormUtil.areErrorsShown(ngControl)).toBeTrue();
  });
});
