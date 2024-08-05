import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../axiosInstance';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ isDimmed }) => (isDimmed ? 'hidden' : 'auto')};
  }
`;


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
  height: 53rem;
  margin-top: 3rem;
  margin-bottom: 5rem;
  max-height: 45rem;
  border-radius: 1.5rem;
  box-shadow: 0rem 0rem 0.75rem rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  flex: 2;
  padding: 0 0 0 1.25rem;
  display: flex;
  flex-direction: column;
  margin-right: 2.7rem;
  margin-top: 1.25rem;
`;

const PostContainer = styled.div`
  flex: 1;
  padding: 0 0 0 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.625rem;
  margin-bottom: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
  color: gray;

  ::placeholder {
    color: gray;
  }
`;

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 30rem;
  }
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
  margin-top: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 0.625rem 1.25rem;
  background-color: #004EE5;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-left: 0.625rem;

  &:hover {
    background-color: #316be0;
  }
`;

const CommunityOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Community = styled.div`
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 0.3125rem;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
`;

const CommunityTitle = styled.h2`
  margin-top: 0;
`;

const CommunityButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

const CommunityButton = styled(Button)`
  background-color: #007BFF;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`;

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
};

const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

const Communitywrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isCommunityVisible, setIsCommunityVisible] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    setIsCommunityVisible(true);
  };

  const handleCommunityConfirm = async () => {
    setIsCommunityVisible(false);

    try {
      const formData = new FormData();
      formData.append('title', title);

      // HTML 태그 제거 후 content 추가
      const plainContent = content.replace(/(<([^>]+)>)/gi, '');
      formData.append('content', plainContent);

      if (file) {
        formData.append('image', file); // 'image' 키로 파일 추가
      }

      console.log('FormData:', Array.from(formData.entries())); // 디버깅용: 전송되는 FormData 확인

      const response = await axiosInstance.post('with/community/', formData);

      console.log('Response:', response);
      
      if (response.status === 200 || response.status === 201) {
        const postId = response.data.id; // 생성된 게시물 ID 가져오기
        navigate(`/Community/${postId}`); // 생성된 게시물로 이동
      } else {
        console.error('포스트 등록 실패:', response.data);
      }
    } catch (error) {
      console.error('포스트 등록 에러:', error.response ? error.response.data : error);
    }
  };

  const handleCommunityCancel = () => {
    setIsCommunityVisible(false);
  };

  return (
    <>
      <GlobalStyle isDimmed={isCommunityVisible} />
      <Container>
      <CommunityContainer>
        <Content>
          <PostContainer>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                id="title"
                placeholder="제목을 입력해 주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <QuillWrapper>
                <ReactQuill
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="내용을 입력해 주세요."
                />
              </QuillWrapper>
              <FileInput type="file" onChange={handleFileChange} />
              <ButtonContainer>
                <Button type="submit">등록</Button>
              </ButtonContainer>
            </Form>
          </PostContainer>
        </Content>
      </CommunityContainer>
      </Container>

      {isCommunityVisible && (
        <CommunityOverlay>
          <Community>
            <CommunityTitle>상세정보</CommunityTitle>
            <p>글을 등록하시겠습니까?</p>
            <CommunityButtonContainer>
              <CommunityButton onClick={handleCommunityConfirm}>확인</CommunityButton>
              <Button onClick={handleCommunityCancel}>취소</Button>
            </CommunityButtonContainer>
          </Community>
        </CommunityOverlay>
      )}
    </>
  );
};

export default Communitywrite;




//제목 테두리삭제
//등록완료시에 posting으로 이동하는게아니라 각각의 게시물 id어쩌구