import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance';

const CommentContainer = styled.div`
  width: 68rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5rem; /* 페이지 하단 여백 추가 */
`;

const CommentHeader = styled.div`
  width: 68rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
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
  right: 6rem;
  bottom: 3rem;
  width: 1.7rem;
  height: 1.7rem;
  background-color: #004EE5;
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const Commentwrite = styled.textarea`
  width: 60rem;
  height: 2rem; /* 고정된 높이 */
  margin: 1.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #C6C6C6;
  border: none;
  outline: none;
  box-shadow: inset 0 0.1rem 0.25rem rgba(0, 0, 0, 0.35), inset 0 -0.75rem 1rem rgba(255, 255, 255, 0.5);
  resize: none; /* 사용자가 높이를 조절하지 못하도록 함 */
  overflow: hidden; /* 스크롤바를 숨김 */
  ::placeholder {
    color: #C6C6C6;
  }
`;

const AllComment = styled.div`
  width: 60rem;
  margin-bottom: 1rem; /* 댓글 간 간격 추가 */
`;

const Comment = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  padding-bottom: 1rem; /* 하단 여백 추가 */
  border-bottom: 1px solid #e0e0e0; /* 구분선 색상 및 두께 */
`;

const CommentProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Profileimg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Profilename = styled.div`
  font-size: 1rem;
`;

const CommentContent = styled.div`
  margin-left: 0.5rem;
  font-size: 1rem;
  color: #333;
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: gray;
`;

const CommentDate = styled.div``;

const CommentEdit = styled.div`
  width: 4.5rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const EditInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  };
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const Communitycomment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickname] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    // 전체 댓글 가져오기
    axiosInstance.get(`/with/community/${id}/comments/all`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('댓글 로드 오류:', error.response ? error.response.data : error.message);
      });

    // 사용자 id 가져오기
    axiosInstance.get('/with/user/id/')
      .then((response) => {
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.error('사용자 id 로드 오류:', error.response ? error.response.data : error.message);
      });

    // 사용자 닉네임 가져오기
    axiosInstance.get('/with/user/nickname/')
      .then((response) => {
        setUserNickname(response.data.nickname);
      })
      .catch((error) => {
        console.error('사용자 닉네임 로드 오류:', error.response ? error.response.data : error.message);
      });
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    if (e.key === "Enter" && comment.trim() && userId) {
      const newComment = {
        content: comment.trim(),
        post: id, // 게시물 id
        author: userId // 사용자 id
      };

      // 새 댓글 추가
      axiosInstance
        .post(`/with/community/${id}/comment/`, newComment)
        .then((response) => {
          setComments([...comments, response.data]);
          setComment("");
        })
        .catch((error) => {
          console.error('댓글 작성 오류:', error.response ? error.response.data : error.message);
        });
    }
  };

  // 댓글 수정
  const handleEditComment = (commentId, content) => {
    setIsEditing(true);
    setEditCommentId(commentId);
    setEditContent(content);
  };

  const handleSaveEditComment = (commentId) => {
    axiosInstance
      .put(`/with/community/${id}/comments/${commentId}/update/`, { 
        content: editContent,
        post: id, // Include post ID
        author: userId // Include author ID
      })
      .then((response) => {
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? { ...comment, content: editContent } : comment
          )
        );
        setIsEditing(false);
        setEditCommentId(null);
        setEditContent("");
      })
      .catch((error) => {
        console.error('댓글 수정 오류:', error.response ? error.response.data : error.message);
      });
  };

  // 댓글 삭제
  const handleDeleteComment = (commentId) => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      axiosInstance
        .delete(`/with/community/${id}/comments/${commentId}/delete/`)
        .then(() => {
          setComments(comments.filter((comment) => comment.id !== commentId));
        })
        .catch((error) => {
          console.error('댓글 삭제 오류:', error.response ? error.response.data : error.message);
        });
    }
  };

  return (
    <>
      <CommentContainer>
        <CommentHeader>
          <Back src='/back.png' onClick={() => navigate(-1)} />
          <CommentTitleContainer>
            <CommentTitle color='#004EE5'>댓글</CommentTitle>
            <CommentTitle>{comments.length}</CommentTitle>
          </CommentTitleContainer>
        </CommentHeader>
        <Commentwrite
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
                <Profilename>{comment.author}</Profilename>
              </CommentProfileContainer>
              {isEditing && editCommentId === comment.id ? (
                <EditInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onBlur={() => handleSaveEditComment(comment.id)}
                />
              ) : (
                <CommentContent onDoubleClick={() => handleEditComment(comment.id, comment.content)}>
                  {comment.content}
                </CommentContent>
              )}
              <CommentInfo>
                <CommentDate>{formatDate(comment.created_at)}</CommentDate>
                {/* 본인이 작성한 댓글일 때만 수정 및 삭제 버튼 표시 */}
                {comment.author.id === userId && (
                  <CommentEdit>
                    <div onClick={() => isEditing ? handleSaveEditComment(comment.id) : handleEditComment(comment.id, comment.content)}>
                      {isEditing && editCommentId === comment.id ? "저장" : "수정"}
                    </div>
                    <div onClick={() => handleDeleteComment(comment.id)}>삭제</div>
                  </CommentEdit>
                )}
              </CommentInfo>
            </Comment>
          ))}
        </AllComment>
      </CommentContainer>
      <ContentButton onClick={scrollToTop}>↑</ContentButton>
    </>
  );
};

export default Communitycomment;
