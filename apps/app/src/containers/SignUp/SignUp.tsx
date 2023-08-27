import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { api } from '@/axios/axios';
import { FieldError, FormProvider } from '@/components/Common/Form';

import { signUpFormValidateSchema, SignUpFormValues } from './SignUpItem';

const signUpFormInitialValues: SignUpFormValues = {
  name: '',
  address: '',
  email: '',
  password: '',
  confirmPassword: '',
  dob: new Date(),
  ioc: '',
  phoneNumber: '',
  role: 1,
};

export const SignUp = () => {
  const navigate = useNavigate();

  const handleOnFormSubmit = (
    values: SignUpFormValues,
    { setSubmitting, setErrors }: FormikHelpers<SignUpFormValues>,
  ) => {
    setSubmitting(true);

    api
      .post('user', values)
      .then(() => {
        navigate('/login');
      })
      .catch((e) => {
        if (e.response.status === 400) {
          if (e.response.data.errors.Email !== undefined) setErrors({ email: 'Email đã tồn tại' });
        }
        setSubmitting(false);
      });
  };

  return (
    <FormProvider
      initialValues={signUpFormInitialValues}
      validationSchema={signUpFormValidateSchema}
      onSubmit={handleOnFormSubmit}
    >
      {({ values, handleSubmit, handleBlur, handleChange, setErrors }) => (
        <FormContainer>
          <h2>Đăng ký</h2>
          <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">Tên:</Label>
            <Field>
              <Input id="name" placeholder="Tên" type="text" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="name"></FieldError>
            </Field>
            <Label htmlFor="email">Địa chỉ email:</Label>
            <Field>
              <Input id="email" placeholder="Địa chỉ email" type="email" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="email"></FieldError>
            </Field>
            <Label htmlFor="ioc">CCCD/CMND:</Label>
            <Field>
              <Input id="ioc" placeholder="CCCD/CMND" type="text" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="ioc"></FieldError>
            </Field>
            <Label htmlFor="phoneNumber">Số điện thoại:</Label>
            <Field>
              <Input
                id="phoneNumber"
                placeholder="Số điện thoại"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FieldError errorFor="phoneNumber"></FieldError>
            </Field>
            <Label htmlFor="address">Địa chỉ:</Label>
            <Field>
              <Input id="address" placeholder="Địa chỉ" type="text" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="address"></FieldError>
            </Field>
            <Label htmlFor="dob">Ngày sinh:</Label>
            <Field>
              <Input id="dob" placeholder="Ngày sinh" type="date" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="dob"></FieldError>
            </Field>
            <Label htmlFor="password">Mật khẩu:</Label>
            <Field>
              <Input id="password" placeholder="Mật khẩu" type="password" onBlur={handleBlur} onChange={handleChange} />
              <FieldError errorFor="password"></FieldError>
            </Field>
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu:</Label>
            <Field>
              <Input
                id="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <FieldError errorFor="confirmPassword"></FieldError>
            </Field>

            <RadioButtonContainer>
              <RadioButtonLabel>
                <RadioButton
                  defaultChecked={values.role === 1}
                  name="role"
                  type="radio"
                  value={1}
                  onChange={handleChange}
                />
                Người thuê
              </RadioButtonLabel>
              <RadioButtonLabel>
                <RadioButton
                  defaultChecked={values.role === 2}
                  name="role"
                  type="radio"
                  value={2}
                  onChange={handleChange}
                />
                Chủ kho bãi
              </RadioButtonLabel>
            </RadioButtonContainer>
            <Button type="submit">Đăng ký</Button>
          </Form>
        </FormContainer>
      )}
    </FormProvider>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Label = styled.label`
  width: 100%;
  text-align: left;
`;

const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 10px;
  width: 350px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const RadioButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input``;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
