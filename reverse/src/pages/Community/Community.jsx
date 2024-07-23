import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Link } from 'react-router-dom';
import CommunitySearch from './CommunitySearch';
import "../../components/Fonts.css";

// Mock 데이터 설정을 컴포넌트 외부에서 
const mock = new MockAdapter(axios, { delayResponse: 200 });
const testData = [
  { id: 1, title: '첫 번째 글', nickname: '사용자1', likes: 10, content: '첫 번째 글의 내용입니다.' },
  { id: 2, title: '두 번째 글', nickname: '사용자2', likes: 5, content: '두 번째 글의 내용입니다.' },
  { id: 3, title: '세 번째 글', nickname: '사용자3', likes: 20, content: '세 번째 글의 내용입니다.' },
];

mock.onGet('/api/posts').reply(200, testData);

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommunityContainer = styled.div`
  width: 68rem;
  height: 42rem;
  max-height: 42rem;
  margin: 5rem;
  border-radius: 1.5rem;
  box-shadow: 0rem 0.75rem 0.75rem rgba(0, 0, 0, 0.3);
`;

const SortContainer = styled.div`
 // border: 2px solid blue;
  height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
`;

const SortButton = styled.button`
  width: 7.5rem;
  height: 1.813rem;
  margin: 1.8rem;
  font-size: 0.875rem;
  color: white;
  border: none;
  border-radius: 1.875rem;
  background-color: #b8c5d4;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;

  &:hover {
    background-color: #a1b0c0;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  width: 7.5rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: black;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const AllContentContainer = styled.div`
 // border: 2px solid blue;
  height: 25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled(Link)`
 // border: 2px solid red;
  height: 3rem;
  width: 30rem;
  margin-left: 5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ContentIcon = styled.img`
  height: 1.5rem;
  margin-right: 1.8rem;
  display: flex;
`;

const ContentTitle = styled.div`
  //border: 2px solid pink;
  height: 3rem;
  width: 20rem;
  max-width: 20rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
`;

const ContentWriter = styled.div`
 // border: 2px solid skyblue;
  height: 3rem;
  width: 5rem;
  margin-left: 2rem;
  display: flex;
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const Community = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('최신순');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('/api/posts')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => b.id - a.id); // 초기 데이터 최신순 정렬
        setPosts(sortedData);
        setFilteredPosts(sortedData); // 처음에는 필터링된 게시글이 전체 게시글로 설정
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  useEffect(() => {
    // 검색어에 따라 게시글 필터링
    const results = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsDropdownOpen(false);

    let sortedPosts = [...filteredPosts];
    if (order === '최신순') {
      sortedPosts.sort((a, b) => b.id - a.id);
    } else if (order === '오래된순') {
      sortedPosts.sort((a, b) => a.id - b.id);
    } else if (order === '인기순') {
      sortedPosts.sort((a, b) => b.likes - a.likes);
    }
    setFilteredPosts(sortedPosts);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Container>
      <CommunityContainer>
        <CommunitySearch onSearch={handleSearch} />
        <SortContainer>
          <SortButton onClick={toggleDropdown}>{sortOrder} ▼</SortButton>
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleSort('최신순')}>최신순</DropdownItem>
              <DropdownItem onClick={() => handleSort('오래된순')}>오래된순</DropdownItem>
              <DropdownItem onClick={() => handleSort('인기순')}>인기순</DropdownItem>
            </DropdownMenu>
          )}
        </SortContainer>
        <AllContentContainer>
          {filteredPosts.map((post) => (
            <ContentContainer key={post.id} to={`/Communityread/${post.id}`}>
              <ContentIcon src="/community.png" />
              <ContentTitle>{post.title}</ContentTitle>
              <ContentWriter>{post.nickname}</ContentWriter>
            </ContentContainer>
          ))}
        </AllContentContainer>
      </CommunityContainer>
    </Container>
  );
};

export default Community;







