import { useState } from 'react';
import styled from 'styled-components';

import { privateApi } from '../../axios/axios';
import { useAuthStore } from '../../store/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setAccessToken] = useAuthStore((state) => [state.setAccessToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    privateApi.post('api/auth/login', { Email: email, Password: password }).then(({ data }) => {
      setAccessToken(data.jwtToken);
    });
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </Form>
    </FormContainer>
  );
};

export default Login;

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

const Input = styled.input`
  padding: 10px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
