import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  height: 40px;
  margin-bottom: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const LoginInput = () => {
  return (
    <InputWrapper>
      <Input type="text" placeholder="아이디를 입력하세요" />
      <Input type="password" placeholder="비밀번호를 입력하세요" />
    </InputWrapper>
  );
};

export default LoginInput;
