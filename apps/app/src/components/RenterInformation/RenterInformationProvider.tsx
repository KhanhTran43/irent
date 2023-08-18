import { ReactNode } from 'react';
import { number, object, string } from 'yup';

import { FormProvider, ProviderProps } from '../Common/Form';

export type RenterInformationFormValuesType = {
  duration: number;
};

const initialFormValues: RenterInformationFormValuesType = {
  duration: 1,
};

type RenterInformationProviderProps = ProviderProps<RenterInformationFormValuesType>;

export const RenterInformationProvider = ({
  children,
  onFormValidChange,
  ...otherProps
}: RenterInformationProviderProps) => {
  const RenterInformationSchema = object().shape({
    // name: string().label('Tên người thuê').min(2).max(50).required(),
    // email: string().label('Email').email().required(),
    // phoneNumber: string().label('Số điện thoại').phone().required(),
    // ioc: string().label('CMND/CCCD').length(12).required(),
    duration: number().moreThan(0).label('Thời hạn thuê').required(),
  });

  return (
    <FormProvider
      {...otherProps}
      initialValues={initialFormValues}
      validationSchema={RenterInformationSchema}
      onFormValidChange={onFormValidChange}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {children}
    </FormProvider>
  );
};
