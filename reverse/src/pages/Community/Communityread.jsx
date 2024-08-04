import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
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
  box-shadow: 0rem 0.75rem 0.75rem rgba(0, 0, 0, 0.3);
`;

const ContentContainer = styled.div`
  height: 32rem;
  max-height: 32rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 60rem;
  height: 30rem;
  max-height: 30rem;
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

const CommentContainer = styled.div`
  width: 68rem;
  height: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentHeader = styled.div`
  width: 68rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Back = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const CommentTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CommentTitle = styled.div`
  font-size: 1rem;
  color: ${props => props.color || 'black'};
  margin-right: 0.5rem;
`;

const ContentButton = styled.div`
  cursor: pointer;
  position: fixed;
  right: 10rem;
  bottom: 3rem;
  background-color: #f3f3f3;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border: 0.08rem solid black;
`;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Commentwrite = styled.input`
  width: 60rem;
  height: 5rem;
  margin: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #C6C6C6;
  border: none;
  outline: none;
  box-shadow: inset 0 0.25rem 0.25rem rgba(0, 0, 0, 0.35), inset 0 -0.75rem 1rem rgba(255, 255, 255, 0.5);
  ::placeholder {
    color: #C6C6C6;
  }
`;

const AllComment = styled.div`
  width: 60rem;
`;

const Comment = styled.div`
  width: 60rem;
  margin-bottom: 1rem;
`;

const CommentProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Profileimg = styled.img`
  width: 2.5rem;
`;

const Profilename = styled.div`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const CommentContent = styled.div`
  margin-left: 0.5rem;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5rem;
`;

const CommentDate = styled.div``;

const CommentEdit = styled.div`
  width: 4.5rem;
  font-size: 0.8rem;
  color: gray;
  display: flex;
  justify-content: space-between;
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [content, setContent] = useState('');
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/with/community/${id}/`)
      .then((response) => {
        setPost(response.data);
        setLikesCount(response.data.total_likes);
        setLiked(response.data.is_liked);
        setContent(response.data.content);
        setTitle(response.data.title);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });

    axiosInstance
      .get(`/with/community/${id}/comments/all`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleLikeToggle = () => {
    axiosInstance
      .post(`/with/community/${id}/toggle_like/`)
      .then((response) => {
        setLiked(response.data.message === "Liked.");
        setLikesCount(response.data.total_likes);
      })
      .catch((error) => {
        console.error('Error toggling like:', error);
      });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    if (e.key === "Enter" && comment.trim()) {
      const newComment = {
        content: comment.trim(),
        post: id,
        author: id // 이 부분은 실제로 어떻게 작동하는지 확인 필요
      };

      axiosInstance
        .post(`/with/community/${id}/comment/`, newComment)
        .then((response) => {
          setComments([...comments, response.data]);
          setComment("");
        })
        .catch((error) => {
          console.error('Error posting comment:', error.response ? error.response.data : error.message);
        });
    }
  };

  const handleEditComment = (commentId) => {
    const newContent = prompt('수정할 내용을 입력하세요:');
    if (newContent) {
      axiosInstance
        .put(`/with/community/${id}/comments/${commentId}/update/`, { content: newContent })
        .then((response) => {
          setComments(
            comments.map((comment) =>
              comment.id === commentId ? { ...comment, content: newContent } : comment
            )
          );
        })
        .catch((error) => {
          console.error('Error editing comment:', error);
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      axiosInstance
        .delete(`/with/community/${id}/comments/${commentId}/delete/`)
        .then(() => {
          setComments(comments.filter((comment) => comment.id !== commentId));
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  const handleEditContent = () => {
    setIsEditingContent(true);
  };

  const handleSaveContent = () => {
    const formData = new FormData();
    formData.append('content', content);

    axiosInstance
      .put(`/with/community/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setIsEditingContent(false);
      })
      .catch((error) => {
        console.error('Error updating content:', error);
      });
  };

  const handleEditTitle = () => {
    setIsEditingPost(true);
  };

  const handleSaveTitle = () => {
    const formData = new FormData();
    formData.append('title', title);

    axiosInstance
      .put(`/with/community/${id}/update/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setIsEditingPost(false);
      })
      .catch((error) => {
        console.error('Error updating title:', error);
      });
  };

  const handleDeletePost = () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      axiosInstance
        .delete(`/with/community/${id}/delete/`)
        .then(() => {
          navigate('/with/community');
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    }
  };

  if (!post) {
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
          <EditContainer>
            {isEditingPost ? (
              <div onClick={handleSaveTitle}>저장</div>
            ) : (
              <div onClick={handleEditTitle}>수정</div>
            )}
            <div onClick={handleDeletePost}>삭제</div>
          </EditContainer>
        </HeadContainer>
        <ContentContainer>
          <Content>
            {isEditingPost ? (
              <>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </>
            ) : (
              <>
                <p>{content}</p>
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
      <CommentContainer>
        <CommentHeader>
          <Back src='/back.png' onClick={() => navigate(-1)} />
          <CommentTitleContainer>
            <CommentTitle color='#6691FF'>댓글</CommentTitle>
            <CommentTitle>{comments.length}</CommentTitle>
          </CommentTitleContainer>
        </CommentHeader>
        <Commentwrite
          type='text'
          placeholder='댓글을 작성하세요.'
          value={comment}
          onChange={handleCommentChange}
          onKeyPress={handleCommentSubmit}
        />
        <AllComment>
          {comments.map((comment) => (
            <Comment key={comment.id}>
              <CommentProfileContainer>
                <Profileimg src='/profile.png' />
                <Profilename>{comment.name}</Profilename>
              </CommentProfileContainer>
              <CommentContent>{comment.content}</CommentContent>
              <CommentInfo>
                <CommentDate>{comment.date}</CommentDate>
                <CommentEdit>
                  <div onClick={() => handleEditComment(comment.id)}>수정</div>
                  <div onClick={() => handleDeleteComment(comment.id)}>삭제</div>
                </CommentEdit>
              </CommentInfo>
            </Comment>
          ))}
        </AllComment>
      </CommentContainer>
      <ContentButton onClick={scrollToTop}>본문 가기</ContentButton>
    </Container>
  );
};

export default Communityread;






// CommunityProfile에 있는 수정 삭제버튼을 누르면 이곳에 있는 내용이 수정될 수 있도록 하
//나중에 백엔드랑 연결하면 글 주인인 경우에만 수정삭제가 가능하도록 수정하기
//왜안돼?