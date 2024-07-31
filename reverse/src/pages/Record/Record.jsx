import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosInstance from '../axiosInstance';
import Modal from 'react-modal';

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ isDimmed }) => (isDimmed ? 'hidden' : 'auto')};
  }
`;

const Container = styled.div`
  max-width: 75rem;
  margin: auto;
  margin-top: 2.5rem;
`;

const SubContainer = styled.div`
  display: flex;
  gap: 3.75rem;
`;

const Content = styled.div`
  flex: 2;
  padding: 0 0 0 1.25rem;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  flex: 1;
  padding: 0 0 0 1.25rem;
`;

// Form styles
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.3125rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.625rem;
  margin-bottom: 1.25rem;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
`;

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 36rem;
  }
  margin-bottom: 0.25rem;
`;

const FileInput = styled.input`
  margin-bottom: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
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

const SubmitButton = styled(Button)`
  background-color: #007BFF;
  color: #fff;

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

// Quill modules and formats
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

const Record = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loginPromptIsOpen, setLoginPromptIsOpen] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      setLoginPromptIsOpen(true);
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogVisible(true);
  };

  const handleDialogConfirm = async () => {
    setIsDialogVisible(false);
    
    try {
      const formData = new FormData();
      formData.append('post_title', title);
      formData.append('content', content);

      if (file) {
        formData.append('file', file);
      }

      const response = await axiosInstance.post('/with/callendar/', formData);

      if (response.status === 200) {
        const { postId } = response.data;
        setIsSuccess(true);
        navigate(`/record/${postId}`);
      } else {
        setIsSuccess(false);
        console.error('포스트 등록 실패');
      }
    } catch (error) {
      setIsSuccess(false);
      console.error('포스트 등록 에러:', error);
    }
  };

  const handleDialogCancel = () => {
    setIsDialogVisible(false);
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setFile(null);
  };

  const handleLoginConfirm = () => {
    setLoginPromptIsOpen(false);
    window.location.href = '/login';
  };

  return (
    <>
      <GlobalStyle isDimmed={isDialogVisible || loginPromptIsOpen} />
      <Container>
        <SubContainer>
          <Sidebar />
          <Content>
            <PostContainer>
              <h2>일기 쓰기</h2>
              <Form onSubmit={handleSubmit}>
                <Label htmlFor="title">제목을 입력해 주세요.</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <Label htmlFor="content">내용을 입력해 주세요.</Label>
                <QuillWrapper>
                  <ReactQuill
                    ref={quillRef}
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                  />
                </QuillWrapper>
                <FileInput type="file" onChange={handleFileChange} />
                <ButtonContainer>
                  <Button type="button" onClick={handleReset}>취소</Button>
                  <SubmitButton type="submit">등록</SubmitButton>
                </ButtonContainer>
              </Form>
              {isSuccess === true && <p>글이 성공적으로 등록되었습니다!</p>}
              {isSuccess === false && <p>글 등록에 실패했습니다.</p>}
            </PostContainer>
          </Content>
        </SubContainer>
      </Container>

      {isDialogVisible && (
        <Modal
          isOpen={isDialogVisible}
          onRequestClose={handleDialogCancel}
          style={customStyles}
          contentLabel="Confirmation"
        >
          <h2>상세정보</h2>
          <Separator />
          <p>글을 등록하시겠습니까?</p>
          <div>
            <Button onClick={handleDialogConfirm}>확인</Button>
            <Button onClick={handleDialogCancel}>취소</Button>
          </div>
        </Modal>
      )}
      
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

export default Record;
