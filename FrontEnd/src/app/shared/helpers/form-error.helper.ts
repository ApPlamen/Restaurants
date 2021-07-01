type MinValue = { min: number; actual: number };
type MaxValue = { max: number; actual: number };
type MinLength = { requiredLength: number; actualLength: number };
type MaxLength = { requiredLength: number; actualLength: number };
type Required = { required: boolean };
type Email = { email: boolean };

export const formError = {
  min: (validation: MinValue) =>
    `Requires value to be greater than or equal to ${validation.min} but actual is ${validation.actual}.`,
  max: (validation: MaxValue) =>
    `Requires value to be less than or equal to ${validation.max} but actual is ${validation.actual}.`,
  minlength: (validation: MinLength) => `This field must be at least ${validation.requiredLength} characters long.`,
  maxlength: (validation: MaxLength) =>
    `The maximum length for this field is ${validation.requiredLength} characters long.`,
  required: (_: Required) => `This field is required.`,
  email: (_: Email) => `Invalid email.`
};
