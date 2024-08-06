import React from 'react';
import styled from 'styled-components';

const TextWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 5px 0 0 0;
`;

const LoginText = () => {
  return (
    <TextWrapper>
      <Title>로그인하기</Title>
      <Subtitle>이메일로 로그인할 수 있어요.</Subtitle>
    </TextWrapper>
  );
};

export default LoginText;