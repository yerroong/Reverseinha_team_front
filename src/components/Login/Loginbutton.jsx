import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 300px;
  height: 40px;
  background-color: #004EE5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
`;

const LoginButton = () => {
  return (
    <Button>로그인</Button>
  );
};

export default LoginButton;
