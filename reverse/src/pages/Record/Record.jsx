import React, { useState, useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../axiosInstance";
import Modal from "react-modal";
import "react-calendar/dist/Calendar.css";
import Sidebar from "./Sidebar"; // Import the Sidebar component

// 글로벌 스타일 설정
const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${({ isDimmed }) => (isDimmed ? "hidden" : "auto")};
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
  display: ${({ hidden }) => (hidden ? "none" : "block")}; // hidden prop에 따라 숨기기
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.25rem;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  margin-top: 0.75rem;
  border: 1px solid #b0b0b0;
  border-radius: 12px;
  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #007bff;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditButton = styled(Button)`
  background-color: ${({ isEditing }) => (isEditing ? "#28a745" : "#007bff")}; // 초록색 for Complete, 파란색 for Edit
  margin-left: 0.5rem;

  &:hover {
    background-color: ${({ isEditing }) => (isEditing ? "#218838" : "#0056b3")}; // 초록색 Hover for Complete, 파란색 Hover for Edit
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff0000; // 빨간색 for Delete
  margin-left: 0.5rem;

  &:hover {
    background-color: #cc0000;
  }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    padding: "20px",
    textAlign: "center",
  },
};

const Separator = styled.div`
  border-bottom: 1px solid #567191;
  width: 90%;
  margin: 1rem 0;
  align-self: center;
`;

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Record = () => {
  const [title, setTitle] = useState(""); // 일기 제목 상태
  const [content, setContent] = useState(""); // 일기 내용 상태
  const [isDialogVisible, setIsDialogVisible] = useState(false); // 다이얼로그 표시 여부
  const [isSuccess, setIsSuccess] = useState(null); // 성공 여부
  const [loginPromptIsOpen, setLoginPromptIsOpen] = useState(false); // 로그인 프롬프트 표시 여부
  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜
  const [isEditing, setIsEditing] = useState(false); // 수정 상태 여부
  const [diaryExists, setDiaryExists] = useState(false); // 일기 존재 여부
  const [dialogType, setDialogType] = useState(null); // 다이얼로그 타입
  const [diaryWritten, setDiaryWritten] = useState(false); // 일기 작성 여부 추적
  const quillRef = useRef(null); // Quill 에디터 참조
  const navigate = useNavigate(); // 내비게이트 훅

  useEffect(() => {
    // 로그인 여부 확인
    const token = localStorage.getItem("access_token");
    if (!token) {
      setLoginPromptIsOpen(true);
    }
  }, []);

  const fetchDiary = async (date) => {
    // 날짜에 해당하는 일기를 불러오는 함수
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axiosInstance.get(
        `/with/calendar/goal_diary/?date=${formattedDate}`
      );
      const { diary_entries } = response.data;

      if (diary_entries && diary_entries.length > 0) {
        const diary = diary_entries[0];
        setTitle(diary.title);
        setContent(diary.content);
        setDiaryExists(true); // 일기 존재 표시
        setDiaryWritten(true); // 일기 작성 여부
      } else {
        setTitle("");
        setContent("");
        setDiaryExists(false); // 일기 미존재 표시
        setDiaryWritten(false); // 일기 작성 안 됨
      }
    } catch (error) {
      console.error("Failed to fetch diary:", error);
    }
  };

  useEffect(() => {
    fetchDiary(currentDate); // 현재 날짜로 일기 불러오기
  }, [currentDate]);

  const handleDateChange = (date) => {
    // 날짜 변경 시 일기 불러오기
    setCurrentDate(date);
    fetchDiary(date);
  };

  const handleSubmit = (e) => {
    // 제출 핸들러
    e.preventDefault();
    setDialogType("submit");
    setIsDialogVisible(true);
  };

  const handleSubmitConfirm = async () => {
    if (!title || !content) {
      console.error("제목과 내용을 입력해야 합니다.");
      setIsSuccess(false);
      return;
    }

    const formattedDate = currentDate.toISOString().split("T")[0]; // 날짜 포맷팅
    console.log(`Submitting diary entry: ${formattedDate}, ${title}, ${content}`); // 디버깅용 로그

    try {
      const response = await axiosInstance.post(
        "/with/calendar/diary/create/",
        {
          day: formattedDate,
          title: title,
          content: content,
        }
      );

      if (response.status === 201) {
        setIsSuccess(true);
        console.log("일기 등록 성공:", response.data);
        setIsDialogVisible(false); // 팝업창 닫기
        setDiaryExists(true); // 일기 존재 여부 업데이트
        setIsEditing(false); // 수정 상태 초기화
        setDiaryWritten(true); // 일기 작성 완료
      } else {
        setIsSuccess(false);
        console.error("일기 제출 실패");
      }
    } catch (error) {
      setIsSuccess(false);
      console.error("일기 제출 오류:", error.response?.data || error.message);
    }
  };

  const handleDialogCancel = () => {
    // 다이얼로그 취소 핸들러
    setDialogType(null);
    setIsDialogVisible(false);
  };

  const handleReset = () => {
    // 폼 초기화
    setTitle("");
    setContent("");
  };

  const handleEdit = () => {
    // 수정 상태로 변경
    setIsEditing(true);
  };

  const handleEditConfirm = async () => {
    // 수정 완료
    setIsEditing(false);

    if (!title || !content) {
      console.error("제목과 내용을 입력해야 합니다.");
      setIsSuccess(false);
      return;
    }

    const formattedDate = currentDate.toISOString().split("T")[0]; // 날짜 포맷팅
    console.log(`Updating diary entry: ${formattedDate}, ${title}, ${content}`); // 디버깅용 로그

    try {
      const response = await axiosInstance.post("/with/calendar/diary/update/", {
        day: formattedDate, // 날짜를 사용하여 업데이트
        title: title,
        content: content,
      });

      if (response.status === 200) {
        setIsSuccess(true);
        console.log("일기 수정 성공:", response.data);
        setDiaryWritten(true); // 일기 수정 완료
      } else {
        setIsSuccess(false);
        console.error("일기 수정 실패");
      }
    } catch (error) {
      setIsSuccess(false);
      console.error("일기 수정 오류:", error.response?.data || error.message);
    }
  };

  const handleDelete = () => {
    // 삭제 상태로 변경
    setDialogType("delete");
    setIsDialogVisible(true);
  };

  const handleDeleteConfirm = async () => {
    const formattedDate = currentDate.toISOString().split("T")[0]; // 날짜 포맷팅
    console.log(`Deleting diary entry: ${formattedDate}`); // 디버깅용 로그

    try {
      const response = await axiosInstance.delete(
        "/with/calendar/diary/delete/",
        {
          data: {
            day: formattedDate, // 날짜로 삭제
          },
        }
      );

      if (response.status === 204) {
        setIsSuccess(true);
        console.log("일기 삭제 성공");
        setTitle("");
        setContent("");
        setDiaryExists(false); // 일기 삭제 표시
        setDiaryWritten(false); // 일기 미작성
        setIsDialogVisible(false); // 팝업창 닫기
      } else {
        setIsSuccess(false);
        console.error("일기 삭제 실패");
      }
    } catch (error) {
      setIsSuccess(false);
      console.error("일기 삭제 오류:", error.response?.data || error.message);
    }
  };

  const handleLoginConfirm = () => {
    // 로그인 프롬프트 확인 핸들러
    setLoginPromptIsOpen(false);
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <>
      <GlobalStyle isDimmed={isDialogVisible || loginPromptIsOpen} />
      <Container>
        <SubContainer>
          <Sidebar 
            onDateChange={handleDateChange} 
            diaryWritten={diaryWritten}  // Pass diaryWritten prop
          />
          <Content>
            <PostContainer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2>일기 쓰기</h2>
                {diaryExists && (
                  <div>
                    <EditButton
                      isEditing={isEditing}
                      onClick={isEditing ? handleEditConfirm : handleEdit}
                    >
                      {isEditing ? "완료" : "수정"}
                    </EditButton>
                    <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
                  </div>
                )}
              </div>
              <Form onSubmit={handleSubmit}>
                <Label htmlFor="title" hidden={diaryExists && !isEditing}>
                  제목을 입력해 주세요.
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={!isEditing && diaryExists}
                />
                <Label htmlFor="content" hidden={diaryExists && !isEditing}>
                  내용을 입력해 주세요.
                </Label>
                <QuillWrapper>
                  <ReactQuill
                    ref={quillRef}
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    readOnly={!isEditing && diaryExists}
                  />
                </QuillWrapper>
                {!diaryExists && (
                  <ButtonContainer>
                    <Button type="button" onClick={handleReset}>
                      취소
                    </Button>
                    <SubmitButton type="submit">등록</SubmitButton>
                  </ButtonContainer>
                )}
              </Form>
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
          ariaHideApp={false}
        >
          <h2>{dialogType === "submit" ? "등록 확인" : "삭제 확인"}</h2>
          <Separator />
          <p>
            {dialogType === "submit"
              ? "글을 등록하시겠습니까?"
              : "정말로 일기를 삭제하시겠습니까?"}
          </p>
          <div>
            <Button
              onClick={
                dialogType === "submit"
                  ? handleSubmitConfirm
                  : handleDeleteConfirm
              }
            >
              {dialogType === "submit" ? "등록" : "삭제"}
            </Button>
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
          ariaHideApp={false}
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
