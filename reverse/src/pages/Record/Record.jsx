import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  padding: 0.625rem 1.25rem;
  background-color: #ccc;
  color: #000;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  margin-left: 0.625rem;

  &:hover {
    background-color: #bbb;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #007BFF;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`;

const DialogOverlay = styled.div`
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

const Dialog = styled.div`
  background-color: #fff;
  padding: 1.25rem;
  border-radius: 0.3125rem;
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
`;

const DialogTitle = styled.h2`
  margin-top: 0;
`;

const DialogButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

const DialogButton = styled(Button)`
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

const Record = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const navigate = useNavigate();

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

      const response = await fetch('백엔드 예시', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        navigate('/Posting');
      } else {
        console.error('포스트 등록 실패');
      }
    } catch (error) {
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

  return (
    <>
      <GlobalStyle isDimmed={isDialogVisible} />
      <Container>
        <SubContainer>
          <Sidebar />
          <Content>
            <PostContainer>
              <h2>글쓰기</h2>
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
            </PostContainer>
          </Content>
        </SubContainer>
      </Container>

      {isDialogVisible && (
        <DialogOverlay>
          <Dialog>
            <DialogTitle>상세정보</DialogTitle>
            <p>글을 등록하시겠습니까?</p>
            <DialogButtonContainer>
              <DialogButton onClick={handleDialogConfirm}>확인</DialogButton>
              <Button onClick={handleDialogCancel}>취소</Button>
            </DialogButtonContainer>
          </Dialog>
        </DialogOverlay>
      )}
    </>
  );
};

export default Record;