import React from 'react';
import styled from 'styled-components';

const HeadContainer = styled.div`
  border-bottom: 0.063rem solid #BBBBBB;
  width: 66rem;
  height: 6.5rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileContainer = styled.div`
 // border: 2px solid pink;
  height: 5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;
const EditContainer = styled.div`
//  border: 2px solid pink;
  width: 3.9rem;
  height: 5rem;
  margin-top: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #BBBBBB;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 3rem;
  display: flex;
`;
const ProfileInfoContainer = styled.div`
 // border: 2px solid black;
  width: 10rem;
  display: flex;
  flex-direction: column;
`;
const ProfileTitle = styled.div`
 // border: 2px solid red;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
`;
const ProfileInfo = styled.div`
 // border: 2px solid red;
 margin-top:0.25rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
`;

const Communityprofile = ({ post }) => {
  return (
    <HeadContainer>
      <ProfileContainer>
        <ProfileImg src='/profile.png' />
        <ProfileInfoContainer>
          <ProfileTitle>{post.title}</ProfileTitle>
          <ProfileInfo>
            <div>{post.nickname}</div>
            <div>{new Date().toLocaleDateString()}</div>
          </ProfileInfo>
        </ProfileInfoContainer>
      </ProfileContainer>
      <EditContainer>
        <div>수정</div>
        <div>삭제</div>
      </EditContainer>
    </HeadContainer>
  );
};

export default Communityprofile;

