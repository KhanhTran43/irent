import { FormikErrors } from 'formik';

export type FormValidPayload<Values> =
  | {
      isValid: true;
      values: Values;
    }
  | { isValid: false; errors: FormikErrors<Values> };
