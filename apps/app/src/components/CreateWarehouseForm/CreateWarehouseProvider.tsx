import { number, object, string } from 'yup';

import { FormProvider, FormValidPayload, ProviderProps } from '../Form';

export type CreateWarehouseFormValuesType = {
  name?: string;
  address?: string;
  area?: number;
  price?: number;
};

const initialFormValues: CreateWarehouseFormValuesType = {
  name: '',
};

export type CreateWarehouseFormProps = ProviderProps<CreateWarehouseFormValuesType> & {
  onFormValidChange?: (payload: FormValidPayload<CreateWarehouseFormValuesType>) => void;
};

// const CreateWarehouseForm = forwardRef<FormikProps<CreateWarehouseFormValuesType>, CreateWarehouseFormProps>(
//   ({ children, onFormValidChange }: CreateWarehouseFormProps, ref) => {
export const CreateWarehouseProvider = ({ children, onFormValidChange, innerRef }: CreateWarehouseFormProps) => {
  const CreateWareHouseSchema = object().shape({
    name: string().min(2, 'Quá ngắn!').max(50, 'Quá dài!').required('Bắt buộc'),
    address: string().max(200, 'Quá dài!').required('Bắt buộc'),
    area: number().typeError('Diện tích phải là một số').moreThan(0).required('Bắt buộc'),
    price: number().typeError('Giá phải là một số').moreThan(0).required('Bắt buộc'),
  });

  return (
    <FormProvider
      validateOnBlur
      validateOnMount
      initialValues={initialFormValues}
      innerRef={innerRef}
      validationSchema={CreateWareHouseSchema}
      onFormValidChange={onFormValidChange}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {children}
    </FormProvider>
  );
};
