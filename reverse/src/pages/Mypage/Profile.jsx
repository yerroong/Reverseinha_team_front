import React from 'react';
import styled from 'styled-components';

const ProfileContainer2 = styled.div`
  border-bottom: 0.063rem solid #BBBBBB;
  width: 70rem;
  height: 12.813rem;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
width: 6.25rem;
height: 6.25rem;
margin-left: 5rem;
`;

const ProfileTextContainer = styled.div`
  //border: 2px solid red;
  margin-left: 1rem;
  display: flex;
  flex-direction:column;
  justify-content: center;
`;

const ProfileId = styled.div`
  //border: 2px solid blue;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;
const ProfileLogout = styled.button`
  width: 6.25rem;
  height: 1.813rem;
  font-size: 0.875rem;
  color:white;
  border: none;
  border-radius: 1.875rem;
  background-color: #B8C5D4;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  cursor: pointer; 

  &:hover {
    background-color: #A1B0C0;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2); /* 클릭 시 그림자 강도 감소 */
  }
`;


const Profile = () => {
  return (
      <ProfileContainer2>
          <ProfileIcon src="/profile.png"/>
          <ProfileTextContainer>
            <ProfileId>사용자 아이디</ProfileId>
            <ProfileLogout>로그아웃</ProfileLogout>
          </ProfileTextContainer>
      </ProfileContainer2>
  );
};

export default  Profile;