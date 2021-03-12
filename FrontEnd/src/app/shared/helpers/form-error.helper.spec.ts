import { FormError } from './form-error.helper';

describe('FormError', () => {
  it('should contains min function', () => {
    expect(FormError.min({ min: 3, actual: 1 })).toEqual(
      'Requires value to be greater than or equal to 3 but actual is 1.'
    );
  });

  it('should contains max function', () => {
    expect(FormError.max({ max: 3, actual: 4 })).toEqual(
      'Requires value to be less than or equal to 3 but actual is 4.'
    );
  });

  it('should contains minlength function', () => {
    expect(FormError.minlength({ requiredLength: 4, actualLength: 5 })).toEqual(
      'This field must be at least 4 characters long.'
    );
  });

  it('should contains maxlength function', () => {
    expect(FormError.maxlength({ requiredLength: 4, actualLength: 5 })).toEqual(
      'The maximum length for this field is 4 characters long.'
    );
  });

  it('should contains required function', () => {
    expect(FormError.required({ required: true })).toEqual('This field is required.');
  });

  it('should contains email function', () => {
    expect(FormError.email({ email: true })).toEqual('Invalid email.');
  });
});
