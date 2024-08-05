import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import CommunitySearch from './CommunitySearch';
import Modal from 'react-modal';
import "../../components/Fonts.css";

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
  box-shadow: 0rem 0rem 0.75rem rgba(0, 0, 0, 0.3);
`;

const SortContainer = styled.div`
  height: 4rem;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: relative;
`;

const SortButton = styled.button`
  width: 6rem;
  height: 1.82rem;
  margin: 1.8rem;
  margin-right: 2.5rem;
  font-size: 0.875rem;
  color: white;
  border: none;
  border-radius: 1.875rem;
  background-color: #a5bbd4;
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
  width: 6.9rem;
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
  height: 25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
`;

const ContentContainer = styled(Link)`
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
  height: 1.3rem;
  margin-right: 1.8rem;
  display: flex;
`;

const ContentTitle = styled.div`
  height: 3rem;
  width: 20rem;
  max-width: 20rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
`;

const ContentWriter = styled.div`
  height: 3rem;
  width: 5rem;
  margin-left: 2rem;
  display: flex;
  font-size: 1rem;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007BFF;
  color: #fff;
  padding: 0.75rem 1.5rem;
  margin-top: 0.75rem;
  border: 1px solid #B0B0B0;
  border-radius: 12px;
  &:hover {
    background-color: #0056b3;
  }
`;

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    padding: '20px',
    textAlign: 'center',
  },
};

const Separator = styled.div`
  border-bottom: 1px solid #567191;
  width: 90%;
  margin: 1rem 0;
  align-self: center;
`;

const Community = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('최신순');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loginPromptIsOpen, setLoginPromptIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      setLoginPromptIsOpen(true);
    } else {
      axiosInstance
        .get('/with/community/all/')
        .then((response) => {
          console.log('Fetched posts:', response.data); // 데이터 확인을 위한 로그 추가
          const sortedData = response.data.sort((a, b) => b.id - a.id); // 초기 데이터 최신순 정렬
          setPosts(sortedData);
          setFilteredPosts(sortedData); // 처음에는 필터링된 게시글이 전체 게시글로 설정
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });
    }
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

    if (order === '인기순') {
      axiosInstance
        .get('/with/community/search/?sort=likes')
        .then((response) => {
          setFilteredPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching sorted posts:', error);
        });
    } else {
      let sortedPosts = [...posts];
      if (order === '최신순') {
        sortedPosts.sort((a, b) => b.id - a.id);
      } else if (order === '오래된순') {
        sortedPosts.sort((a, b) => a.id - b.id);
      }
      setFilteredPosts(sortedPosts);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleLoginConfirm = () => {
    setLoginPromptIsOpen(false);
    window.location.href = '/login';
  };

  return (
    <>
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
              <ContentContainer key={post.id} to={`/Community/${post.id}`}>
                <ContentIcon src="/community.png" />
                <ContentTitle>{post.title}</ContentTitle>
                <ContentWriter>{post.nickname}</ContentWriter>
              </ContentContainer>
            ))}
          </AllContentContainer>
        </CommunityContainer>
      </Container>

      {loginPromptIsOpen && (
        <Modal
          isOpen={loginPromptIsOpen}
          onRequestClose={() => setLoginPromptIsOpen(false)}
          style={customStyles}
          contentLabel="Login Prompt"
        >
          <h2>로그인 필요</h2>
          <Separator />
          <p>서비스를 이용하시려면 로그인이 필요합니다.</p>
          <Button onClick={handleLoginConfirm}>확인</Button>
        </Modal>
      )}
    </>
  );
};

export default Community;









