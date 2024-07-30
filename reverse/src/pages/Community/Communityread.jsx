import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';
import Communityprofile from './Communityprofile';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommunityContainer = styled.div`
 // border: 0.125rem solid green;
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
 // border: 0.125rem solid red;
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
 // border: 0.125rem solid green;
  width: 68rem;
  height: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentHeader = styled.div`
 // border: 0.125rem solid green;
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
  border:0.08rem solid black;
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
//  border: 0.125rem solid green;
  width: 60rem;
`;

const Comment = styled.div`
 // border: 0.125rem solid red;
  width: 60rem;
  margin-bottom: 1rem;
`;

const CommentProfileContainer = styled.div`
 // border: 0.125rem solid red;
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
 // border: 0.125rem solid red;
  margin-left: 0.5rem;
`;

const CommentInfo = styled.div`
 // border: 0.125rem solid red;
  display: flex;
  justify-content: space-between;
  margin-left: 0.5rem;
`;

const CommentDate = styled.div`
//  border: 0.125rem solid red;
`;

const CommentEdit = styled.div`
 // border: 0.125rem solid red;
  width: 4.5rem;
  font-size: 0.8rem;
  color: gray;
  display: flex;
  justify-content: space-between;
`;

const Communityread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/with/community/${id}/`)
      .then((response) => {
        setPost(response.data);
        setLikesCount(response.data.total_likes);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });

    axiosInstance
      .get(`/with/community/${id}/comment/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleLikeToggle = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    if (e.key === "Enter" && comment.trim()) {
      const newComment = {
        content: comment,
      };

      axiosInstance
        .post(`/with/community/${id}/comment/`, newComment)
        .then((response) => {
          setComments([...comments, response.data]);
          setComment("");
        })
        .catch((error) => {
          console.error('Error posting comment:', error);
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
    axiosInstance
      .delete(`/with/community/${id}/comments/${commentId}/delete/`)
      .then((response) => {
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <CommunityContainer>
        <Communityprofile post={post} />
        <ContentContainer>
          <Content>{post.content}</Content>
        </ContentContainer>
        <ResponseContainer>
          <ResponseIcon
            src={liked ? '/like.png' : '/like-empty.png'}
            onClick={handleLikeToggle}
          />
          <Responsenum>{likesCount}</Responsenum>
          <ResponseIcon src='/comment.png' />
          <Responsenum>{comments.length}</Responsenum>
        </ResponseContainer>
      </CommunityContainer>
      <CommentContainer>
        <CommentHeader>
          <Back src='/back.png' onClick={handleBackClick} />
          <CommentTitleContainer>
            <CommentTitle color="black">댓글</CommentTitle>
            <CommentTitle color="blue">{comments.length}개</CommentTitle>
          </CommentTitleContainer>
        </CommentHeader>
        <Commentwrite
          placeholder="내용을 입력해 주세요."
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