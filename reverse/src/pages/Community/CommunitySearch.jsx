import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import 합니다.

const SearchContainer = styled.div`
  border-bottom: 0.063rem solid #BBBBBB;
  width: 66rem;
  height: 8rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative; // 상대 위치 지정
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 30rem;
`;

const Search = styled.input`
  margin-top: 0.3rem;
  margin-left: 1.7rem;
  width: 27rem;
  height: 3.5rem;
  background-color: #F5F7FF;
  box-shadow: inset 0 0.188rem 1rem rgba(0, 0, 0, 0.197), inset 0 -0.75rem 1rem rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  outline: none;

  ::placeholder {
    color: #C6C6C6;
  }
`;

const SearchIcon = styled.img`
  width: 2rem;
  margin-top: 0.3rem;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Write = styled.button`
  position: absolute;
  right: 1.5rem; // 오른쪽에 여백
  bottom: 1.7rem; // 아래쪽에 여백
  width: 6rem;
  height: 1.813rem;
  font-size: 0.875rem;
  color: white;
  border: none;
  border-radius: 1.875rem;
  background-color: #8DBAFD;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #7eaaed;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  }
`;

const CommunitySearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 호출합니다.

  const handleSearch = () => {
    onSearch(searchTerm); // 검색어를 상위 컴포넌트로 전달
    setSearchTerm('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleWriteClick = () => {
    navigate('/community/write'); // "/community/write" 경로로 이동합니다.
  };

  return (
    <SearchContainer>
      <SearchWrapper>
        <Search 
          placeholder="찾고자 하는 제목을 입력하세요.." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SearchIcon src="/search2.png" onClick={handleSearch} />
      </SearchWrapper>
      <Write onClick={handleWriteClick}>글쓰기</Write>
    </SearchContainer>
  );
};

export default CommunitySearch;

