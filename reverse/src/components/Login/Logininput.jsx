import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

const LoginInput = ({ id, password, onIdChange, onPasswordChange }) => {
  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="아이디 입력"
        value={id}
        onChange={(e) => onIdChange(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
      />
    </Wrapper>
  );
};

export default LoginInput;
