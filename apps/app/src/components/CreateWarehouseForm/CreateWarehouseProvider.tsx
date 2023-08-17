import * as yup from 'yup';

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
  const CreateWareHouseSchema = yup.object().shape({
    name: yup.string().label('Tên kho bãi').min(2).max(50).required(),
    address: yup.string().label('Địa chỉ').max(200).required(),
    area: yup.number().label('Diện tích').moreThan(0).required(),
    price: yup.number().label('Giá').moreThan(0).required(),
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
