import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

// JWT 디코딩 함수
const decodeToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    console.log('Decoded token:', decoded); // 디코딩된 토큰을 로그로 출력
    return decoded;
  } catch (error) {
    console.error('토큰을 디코딩하는 데 실패했습니다.', error);
    return null;
  }
};

const Profile = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와서 디코딩하여 사용자 ID를 추출
    const token = localStorage.getItem('access_token');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.user_id) {
        setUserId(decoded.user_id); // 올바른 필드명 사용
      } else {
        console.error('디코딩된 토큰에 사용자 ID가 없습니다.');
      }
    } else {
      console.error('로컬 스토리지에 토큰이 없습니다.');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token'); // 토큰 삭제
    navigate('/'); // 홈 페이지로 이동
  };

  return (
    <ProfileContainer2>
      <ProfileIcon src="/profile.png" />
      <ProfileTextContainer>
        <ProfileId>{userId || '불러오는 중...'}</ProfileId>
        <ProfileLogout onClick={handleLogout}>로그아웃</ProfileLogout>
      </ProfileTextContainer>
    </ProfileContainer2>
  );
};

export default Profile;




