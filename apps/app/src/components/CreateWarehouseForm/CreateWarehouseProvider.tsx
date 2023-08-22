import * as yup from 'yup';

import { FormProvider, ProviderProps } from '../Common/Form';

export type CreateWarehouseFormValuesType = {
  name?: string;
  address?: string;
  ward?: number;
  area?: number;
  price?: number;
};

const initialFormValues: CreateWarehouseFormValuesType = {
  name: '',
};

export type CreateWarehouseFormProps = ProviderProps<CreateWarehouseFormValuesType>;

// const CreateWarehouseForm = forwardRef<FormikProps<CreateWarehouseFormValuesType>, CreateWarehouseFormProps>(
//   ({ children, onFormValidChange }: CreateWarehouseFormProps, ref) => {
export const CreateWarehouseProvider = ({ children, onFormValidChange, innerRef }: CreateWarehouseFormProps) => {
  const CreateWareHouseSchema = yup.object().shape({
    name: yup.string().label('Tên kho bãi').min(2).max(50).required(),
    ward: yup.number().label('Quận').required(),
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
