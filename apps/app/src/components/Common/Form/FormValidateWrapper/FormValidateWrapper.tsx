import { FormikProps, FormikValues, useFormikContext } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';

import { FormValidPayload } from '../models';

export type FormValidateWrapperProps<Values extends FormikValues = FormikValues> = {
  children: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
  onFormValidChange?: (payload: FormValidPayload<Values>) => void;
};

export function FormValidateWrapper<Values extends FormikValues = FormikValues>({
  children,
  onFormValidChange,
}: FormValidateWrapperProps<Values>) {
  const { errors, values } = useFormikContext<Values>();

  useEffect(() => {
    if (isEmpty(errors)) {
      onFormValidChange?.({ isValid: true, values: values });
    } else {
      onFormValidChange?.({ isValid: false, errors: errors });
    }
  }, [errors, children]);

  return <>{children}</>;
}
