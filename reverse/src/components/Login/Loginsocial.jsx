import React from 'react';
import styled from 'styled-components';
import google from "../../img/googlelogo.png";
import naver from "../../img/naverlogo.png";
import kakao from "../../img/kakaologo.png";


const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  margin: 0 10px;
  font-size: 30px;
  cursor: pointer;
`;

const LoginSocial = () => {
  return (
    <SocialWrapper>
      <IconButton><img src = {google}/></IconButton>
      <IconButton><img src = {naver}/></IconButton>
      <IconButton><img src = {kakao}/></IconButton>
    </SocialWrapper>
  );
};

export default LoginSocial;
