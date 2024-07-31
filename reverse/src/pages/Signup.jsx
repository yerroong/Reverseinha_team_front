import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 18.75rem; /* 300px */
`;

const SelectField = styled.select`
  margin-bottom: 1.25rem;
  padding: 0.625rem;
  font-size: 1rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 0.625rem;
  font-size: 1rem;
  background-color: #004ee5;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-bottom: 0.625rem;
`;

const FieldGroup = styled.div`
  margin-bottom: 1.875rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  margin-bottom: 0.3125rem;
  display: block;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  gap: 0.625rem;
`;

const HalfWidthInput = styled.input`
  width: 80%;
  padding: 0.625rem;
  font-size: 1rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  margin-bottom: 0.3125rem;
`;

const FullWidthInput = styled.input`
  width: 100%;
  padding: 0.625rem;
  font-size: 1rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.25rem;
  margin-bottom: 0.3125rem;
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    id: '',
    username: '',
    nickname: '',
    email: '',
    birth_date: '',
    gender: '',
    phone_number: '',
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, username, nickname, email, birth_date, gender, phone_number, password, confirmPassword } = formValues;

    if (!id || !username || !nickname || !email || !birth_date || !gender || !phone_number || !password || !confirmPassword) {
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

    try {
      const response = await axiosInstance.post('/with/signup/', {
        id: id,
        username: username,
        nickname: nickname,
        email: email,
        birth_date: birth_date,
        gender: gender,
        phone_number: phone_number,
        password: password,
        password_confirm: confirmPassword,
      });

      if (response.status !== 201) {
        throw new Error('Network response was not ok');
      }

      navigate('/signtest');
    } catch (error) {
      console.error('회원가입 요청에 문제가 발생했습니다:', error.response || error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        {errors.emptyFields && <Error>모두 입력해주세요</Error>}
        <FieldGroup>
          <Label>아이디</Label>
          <FullWidthInput
            type="text"
            name="id"
            placeholder="아이디"
            value={formValues.id}
            onChange={handleChange}
          />
          <Label>비밀번호</Label>
          <FullWidthInput
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formValues.password}
            onChange={handleChange}
          />
          <Label>비밀번호 재입력</Label>
          <FullWidthInput
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 재입력"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
        </FieldGroup>
        <FieldGroup>
          <Label>사용자 이름</Label>
          <FullWidthInput
            type="text"
            name="username"
            placeholder="사용자 이름"
            value={formValues.username}
            onChange={handleChange}
          />
          <Label>닉네임</Label>
          <FullWidthInput
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={formValues.nickname}
            onChange={handleChange}
          />
          <Label>이메일</Label>
          <FullWidthInput
            type="email"
            name="email"
            placeholder="이메일"
            value={formValues.email}
            onChange={handleChange}
          />
          <Label>전화번호</Label>
          <FullWidthInput
            type="text"
            name="phone_number"
            placeholder="전화번호"
            value={formValues.phone_number}
            onChange={handleChange}
          />
          <Row>
            <div style={{ width: '80%' }}>
              <Label>생년월일</Label>
              <HalfWidthInput
                type="date"
                name="birth_date"
                value={formValues.birth_date}
                onChange={handleChange}
              />
            </div>
            <div style={{ width: '48%' }}>
              <Label>성별</Label>
              <SelectField
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
              >
                <option value="">성별 선택</option>
                <option value="M">남자</option>
                <option value="F">여자</option>
              </SelectField>
            </div>
          </Row>
        </FieldGroup>
        {errors.passwordMismatch && <Error>비밀번호가 다릅니다</Error>}
        <Button type="submit">다음으로 넘어가기</Button>
      </Form>
    </Container>
  );
};

export default Signup;