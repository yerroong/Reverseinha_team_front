import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

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
  height: 5rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const EditContainer = styled.div`
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
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
`;

const ProfileTitle = styled.div`
  font-size: 1.2rem;
`;

const ProfileInfo = styled.div`
  margin-top: 0.25rem;
  display: flex;
  justify-content: flex-start;
  font-size: 0.7rem;
`;

const InfoName = styled.div`
  margin-right: 2rem;
`;

const InfoDate = styled.div``;

const Communityprofile = ({ post }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(post.title);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleSaveTitle = () => {
    const formData = new FormData();
    formData.append('title', title);

    axiosInstance
      .put(`/with/community/${post.id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setIsEditingTitle(false);
      })
      .catch((error) => {
        console.error('Error updating title:', error);
      });
  };

  return (
    <HeadContainer>
      <ProfileContainer>
        <ProfileImg src='/profile.png' />
        <ProfileInfoContainer>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <ProfileTitle>{post.title}</ProfileTitle>
          )}
          <ProfileInfo>
            <InfoName>{post.author_name}</InfoName>
            <InfoDate>{formatDate(post.created_at)}</InfoDate>
          </ProfileInfo>
        </ProfileInfoContainer>
      </ProfileContainer>
      <EditContainer>
        {isEditingTitle ? (
          <div onClick={handleSaveTitle}>저장</div>
        ) : (
          <div onClick={handleEditTitle}>수정</div>
        )}
        <div>삭제</div>
      </EditContainer>
    </HeadContainer>
  );
};

export default Communityprofile;



