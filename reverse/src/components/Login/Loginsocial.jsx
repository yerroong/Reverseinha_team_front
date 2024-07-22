import React from 'react';
import styled from 'styled-components';
import { BsGoogle } from "react-icons/bs";
import { SiNaver } from "react-icons/si";
import { SiKakaotalk } from "react-icons/si";


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
      <IconButton><BsGoogle /></IconButton>
      <IconButton><SiNaver /></IconButton>
      <IconButton><SiKakaotalk /></IconButton>
    </SocialWrapper>
  );
};

export default LoginSocial;
