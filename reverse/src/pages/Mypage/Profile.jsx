import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import profileImage from '../../img/profile.png'; // 이미지 경로를 실제 경로로 바꾸세요

const ProfileContainer2 = styled.div`
  border-bottom: 0.063rem solid #BBBBBB;
  width: 70rem;
  height: 12.813rem;
  display: flex;
  align-items: center;
`;

const ProfileIcon = styled.img`
  width: 6rem;
  height: 6rem;
  margin-left: 5rem;
`;

const ProfileTextContainer = styled.div`
  margin-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileId = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const ProfileLogout = styled.button`
  width: 6.25rem;
  height: 1.813rem;
  font-size: 0.875rem;
  color: white;
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
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  }
`;

const Profile = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // API를 통해 사용자 닉네임 가져오기
    const fetchNickname = async () => {
      try {
        const response = await axiosInstance.get('/with/user/nickname/');
        if (response.data && response.data.nickname) {
          setNickname(response.data.nickname);
        } else {
          console.error('닉네임을 불러오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 요청 중 오류가 발생했습니다.', error);
      }
    };

    fetchNickname();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // 토큰 삭제
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <ProfileContainer2>
      <ProfileIcon src={profileImage} alt="Profile Icon" />
      <ProfileTextContainer>
        <ProfileId>{nickname || '불러오는 중...'}</ProfileId>
        <ProfileLogout onClick={handleLogout}>로그아웃</ProfileLogout>
      </ProfileTextContainer>
    </ProfileContainer2>
  );
};

export default Profile;
