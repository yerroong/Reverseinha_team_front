import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import Communitycomment from './Communitycomment';
import profileicon from '../../img/profile.png';
import like from '../../img/like.png';
import like_emthy from '../../img/like-empty.png';

// 날짜 형식 지정
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  return `${year}.${month}.${day} ${period} ${formattedHours}시 ${minutes}분`;
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
  margin-left: 1.5rem;
  max-height: 32rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
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
  color: #bbbbbb;
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

const StyledImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  display: block;
  text-align: left;
`;

const Communityread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [currentUserNickname, setCurrentUserNickname] = useState(null);

  useEffect(() => {
    const fetchPostAndUser = async () => {
      try {
        const postResponse = await axiosInstance.get(`/with/community/${id}/`);

        // 서버로부터 받은 liked_by_user 값을 liked 상태로 설정
        setPost(postResponse.data);
        setLikesCount(postResponse.data.total_likes);
        setLiked(postResponse.data.liked_by_user);
        //console.log(postResponse.data.liked_by_user); // liked_by_user 값을 통해 liked 상태를 설정
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
        // 서버에서 받은 좋아요 상태에 따라 업데이트
        if (response.data.message === 'Liked.') {
          setLiked(true);
          setLikesCount(likesCount + 1);
        } else {
          setLiked(false);
          setLikesCount(likesCount - 1);
        }
      })
      .catch((error) => {
        console.error('Error toggling like:', error);
      });
  };

  const handleEditRedirect = () => {
    navigate('/community/write', {
      state: {
        isEdit: true,
        postId: id,
        title: title,
        content: content,
        imageUrl: post.image,
      },
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
            <ProfileImg src={profileicon} />
            <ProfileInfoContainer>
              <ProfileTitle>{title}</ProfileTitle>
              <ProfileInfo>
                <InfoName>{post.author_name}</InfoName>
                <InfoDate>{formatDate(post.created_at)}</InfoDate>
              </ProfileInfo>
            </ProfileInfoContainer>
          </ProfileContainer>
          {post.author_name === currentUserNickname && (
            <EditContainer>
              <div onClick={handleEditRedirect}>수정</div>
              <div onClick={handleDeletePost}>삭제</div>
            </EditContainer>
          )}
        </HeadContainer>
        <ContentContainer>
          <Content>
            <p style={{ width: '100%', textAlign: 'left' }}>
              {stripHTMLTags(content)}
            </p>
            {post.image && (
              <StyledImage src={getImageUrl(post.image)} alt="첨부된 파일" />
            )}
          </Content>
        </ContentContainer>
        <ResponseContainer>
          <ResponseIcon
            src={liked ? like : like_emthy} // Corrected line
            onClick={handleLikeToggle}
            alt={liked ? '좋아요 취소' : '좋아요'}
          />
          <Responsenum>{likesCount}</Responsenum>
        </ResponseContainer>
      </CommunityContainer>
      <Communitycomment comments={post.comments} />
    </Container>
  );
};

export default Communityread;










