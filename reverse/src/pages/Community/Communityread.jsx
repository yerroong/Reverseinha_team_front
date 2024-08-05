import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import Communitycomment from './Communitycomment';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const stripHTMLTags = (str) => {
  if (!str) return '';
  return str.replace(/<[^>]*>/g, '');
};

const getImageUrl = (path) => {
  return path ? `${process.env.REACT_APP_BACKEND_URL}${path}?t=${new Date().getTime()}` : null;
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommunityContainer = styled.div`
  width: 68rem;
  height: 42rem;
  margin-top: 5rem;
  max-height: 42rem;
  border-radius: 1.5rem;
  box-shadow: 0rem 0rem 0.75rem rgba(0, 0, 0, 0.3);
`;

const ContentContainer = styled.div`
  height: 32rem;
  max-height: 32rem;
  display: flex;
  justify-content: flex-start; /* 수정: 왼쪽 정렬 */
  align-items: flex-start; /* 수정: 상단 정렬 */
  overflow: auto;
`;

const Content = styled.div`
  width: 100%;
  height: auto;
  max-height: 30rem;
  padding: 1rem;
  box-sizing: border-box;
`;

const ResponseContainer = styled.div`
  border-top: 0.063rem solid #BBBBBB;
  width: 66rem;
  height: 3rem;
  display: flex;
  align-items: center;
`;

const ResponseIcon = styled.img`
  width: 1.7rem;
  margin-left: 1.3rem;
  cursor: pointer;
`;

const Responsenum = styled.div`
  margin-left: 0.3rem;
  font-size: 1rem;
`;

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

const Communityread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [title, setTitle] = useState('');
  const [currentUserNickname, setCurrentUserNickname] = useState(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const postResponse = await axiosInstance.get(`/with/community/${id}/`);
        setPost(postResponse.data);
        setLikesCount(postResponse.data.total_likes);
        setLiked(postResponse.data.is_liked);
        setContent(postResponse.data.content);
        setTitle(postResponse.data.title);

        const userResponse = await axiosInstance.get('/with/user/nickname/');
        setCurrentUserNickname(userResponse.data.nickname);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPostAndUser();
  }, [id]);

  const handleLikeToggle = () => {
    axiosInstance
      .post(`/with/community/${id}/toggle_like/`)
      .then((response) => {
        setLiked(response.data.message === 'Liked.');
        setLikesCount(response.data.total_likes);
      })
      .catch((error) => {
        console.error('Error toggling like:', error);
      });
  };

  const handleEditTitle = () => {
    setIsEditingPost(true);
  };

  const handleSaveTitle = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    axiosInstance
      .put(`/with/community/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setPost(response.data);
        setIsEditingPost(false);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  const handleDeletePost = () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      axiosInstance
        .delete(`/with/community/${id}/delete/`)
        .then(() => {
          navigate('/community');
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    }
  };

  if (!post || currentUserNickname === null) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <CommunityContainer>
        <HeadContainer>
          <ProfileContainer>
            <ProfileImg src='/profile.png' />
            <ProfileInfoContainer>
              {isEditingPost ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                />
              ) : (
                <ProfileTitle>{title}</ProfileTitle>
              )}
              <ProfileInfo>
                <InfoName>{post.author_name}</InfoName>
                <InfoDate>{formatDate(post.created_at)}</InfoDate>
              </ProfileInfo>
            </ProfileInfoContainer>
          </ProfileContainer>
          {post.author_name === currentUserNickname && (
            <EditContainer>
              {isEditingPost ? (
                <div onClick={handleSaveTitle}>저장</div>
              ) : (
                <div onClick={handleEditTitle}>수정</div>
              )}
              <div onClick={handleDeletePost}>삭제</div>
            </EditContainer>
          )}
        </HeadContainer>
        <ContentContainer>
          <Content>
            {isEditingPost ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ width: '100%', height: '80%', resize: 'none' }}
              />
            ) : (
              <>
                <p style={{ width: '100%', textAlign: 'left' }}>{stripHTMLTags(content)}</p>
                {post.image && (
                  <img
                    src={getImageUrl(post.image)}
                    alt="첨부된 파일"
                    style={{ width: '100%', maxHeight: '20rem', objectFit: 'cover', textAlign: 'left' }}
                  />
                )}
              </>
            )}
          </Content>
        </ContentContainer>
        <ResponseContainer>
          <ResponseIcon
            src={liked ? '/like.png' : '/like-empty.png'}
            onClick={handleLikeToggle}
          />
          <Responsenum>{likesCount}</Responsenum>
        </ResponseContainer>
      </CommunityContainer>
      <Communitycomment comments={comments} />
    </Container>
  );
};

export default Communityread;






