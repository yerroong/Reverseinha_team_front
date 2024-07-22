//다음 단계로 넘어가기 구현 아직 안 함
import React from 'react';
import styled from 'styled-components';

const SignupContainer = styled.div`
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Signup = () => {
  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Form>
        <InputField type="text" placeholder="아이디 입력" />
        <InputField type="password" placeholder="비밀번호 입력" />
        <InputField type="password" placeholder="비밀번호 재입력" />
        <Button type="submit">다음 단계로 넘어가기</Button> 
      </Form>
    </SignupContainer>
  );
};

export default Signup;
