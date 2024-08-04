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
  max-width: 75rem;
  margin: auto;
  margin-top: 2.5rem;
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
  margin-bottom: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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

const Communitywrite = () => {
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
    
    // 필수 필드 검증
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    setIsDialogVisible(true);
  };

  const handleDialogConfirm = async () => {
    setIsDialogVisible(false);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);

      if (file) {
        formData.append('file', file);
      }

      console.log('Access Token:', localStorage.getItem('access_token'));
      console.log('FormData:', Array.from(formData.entries())); // 디버깅용: 전송되는 FormData 확인

      const response = await axiosInstance.post('with/community/', formData);

      console.log('Response:', response);
      
      if (response.status === 200) {
        navigate('/Posting');
      } else {
        console.error('포스트 등록 실패:', response.data);
      }
    } catch (error) {
      console.error('포스트 등록 에러:', error.response ? error.response.data : error);
    }
  };

  const handleDialogCancel = () => {
    setIsDialogVisible(false);
  };

  return (
    <>
      <GlobalStyle isDimmed={isDialogVisible} />
      <Container>
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

export default Communitywrite;



//제목 테두리삭제
//등록완료시에 posting으로 이동하는게아니라 각각의 게시물 id어쩌구