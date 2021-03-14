import { AbstractControl, FormBuilder, NgControl } from '@angular/forms';
import { get } from 'lodash-es';
import { formError } from '../../helpers/form-error.helper';

import { DEFAULT_SHOW_ERRORS_ON } from './form-util.config';

export class FormUtil {
  constructor(public builder: FormBuilder) {}

  /**
   * Gets error message or key of the first error object found in control
   *
   * @param ngControl control to be checked
   * @returns error message or key to be translated
   */
  public static getErrorMessage(ngControl: AbstractControl | NgControl, customErrorMessages = {}): string {
    let message = '';

    if (ngControl && ngControl.errors) {
      const errorType = Object.keys(ngControl.errors)[0];
      const errorValue = Object.values(ngControl.errors)[0];
      const getErrorMessage = get(formError, errorType);

      message = get(customErrorMessages, errorType) || (getErrorMessage && getErrorMessage(errorValue));
    }

    return message;
  }

  /**
   * By default, errors are shown (if any) when control is touched but is not `disabled`
   *
   * @param ngControl control to be checked
   * @param [showErrorsOn] `optional` config indicating to show errors on `dirty` || `touched`. Default is `touched`
   * @param [isLocked] `optional` indicates if control is locked
   * @returns `true` if errors should be shown if any, `false` if not
   */
  public static areErrorsShown(
    ngControl: NgControl | AbstractControl,
    showErrorsOn: 'dirty' | 'touched' | 'pristine' = DEFAULT_SHOW_ERRORS_ON
  ): boolean {
    return (
      ngControl &&
      !ngControl.disabled &&
      ((showErrorsOn === 'dirty' && ngControl.dirty) ||
        (showErrorsOn === 'touched' && (ngControl.touched || ngControl.dirty)))
    );
  }
}
