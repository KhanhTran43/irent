import { ReactNode } from 'react';

import { FormProvider } from '../Form/FormProvider/FormProvider';

type RenterInformationProviderProps = {
  children?: ReactNode;
};

export const RenterInformationProvider = ({ children }: RenterInformationProviderProps) => {
  return (
    <FormProvider
      initialValues={{ name: '', phoneNumber: '', email: '', ioc: '', duration: '' }}
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
