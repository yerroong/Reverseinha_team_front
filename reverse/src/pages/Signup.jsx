import React, { useState }  from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 35rem;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const InputField = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #004EE5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

//에러메세지 출력
const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-bottom: 10px;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    emptyFields: false,
    passwordMismatch: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = formValues;

    if (!username || !password || !confirmPassword) {
      setErrors({ ...errors, emptyFields: true });
      return;
    } else {
      setErrors({ ...errors, emptyFields: false });
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      return;
    } else {
      setErrors({ ...errors, passwordMismatch: false });
    } 

    navigate('/signtest');
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        {errors.emptyFields && (
          <Error>모두 입력해주세요</Error>
        )}
        <InputField
          type="text"
          name="username"
          placeholder="아이디 입력"
          value={formValues.username}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={formValues.password}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 재입력"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {errors.passwordMismatch && (
          <Error>비밀번호가 다릅니다</Error>
        )}
        <Button type="submit">다음 단계로 넘어가기</Button>
      </Form>
    </Container>
  );
};

export default Signup;
