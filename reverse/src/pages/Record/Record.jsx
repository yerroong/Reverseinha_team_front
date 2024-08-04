import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Calendar from 'react-calendar';
import axiosInstance from '../axiosInstance'; // axiosInstance의 경로를 적절히 수정하세요
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';

// 글로벌 스타일 설정
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

const SidebarContainer = styled.div`
  width: 100%;
  max-width: 18.75rem;
  height: 60rem;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  align-items: center;
  overflow-y: auto;
  box-sizing: border-box;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
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

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  border-radius: 0.625rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  .react-calendar__tile {
    border-radius: 0.625rem;
  }
  .react-calendar__tile--now {
    background-color: #FFFACD !important;
  }
  .react-calendar__tile--active {
    background-color: #ff7070 !important;
  }
  .react-calendar__tile--some-completion {
    background-color: #BBDEFB !important;
  }
  .react-calendar__tile--half-completion {
    background-color: #8c95f7 !important;
  }
  .react-calendar__tile--full-completion {
    background-color: #007BFF !important;
    color: white !important;
  }
`;

const GoalContainer = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const GoalHeader = styled.h3`
  font-weight: bold;
  margin-bottom: 0.625rem;
  text-align: center;
`;

const GoalList = styled.div`
  width: 100%;
`;

const GoalItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
`;

const GoalText = styled.span`
  flex: 1;
  font-size: 1rem;
`;

const GoalInput = styled.input`
  flex: 1;
  padding: 0.3125rem;
  border: 1px solid #ddd;
  border-radius: 0.3125rem;
  margin-right: 0.625rem;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 0.625rem;
  accent-color: #007BFF;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.625rem;
`;

const GoalButton = styled.button`
  margin-top: 0.625rem;
  padding: 0.3125rem 0.625rem;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CustomPlanContainer = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const CustomPlanHeader = styled.h3`
  font-weight: bold;
  margin-bottom: 0.2rem;
  text-align: center;
`;

const CustomPlanDescription = styled.p`
  font-size: 0.65rem;
  color: #888888;
  text-align: center;
  margin-bottom: 0.625rem;
`;

const CustomPlanList = styled.ul`
  width: 100%;
  padding-left: 1rem;
`;

const CustomPlanItem = styled.li`
  margin-bottom: 0.625rem;
`;

const Record = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [severity, setSeverity] = useState('심함');
  const [customPlans, setCustomPlans] = useState([]);
  const [selectedDateGoals, setSelectedDateGoals] = useState([]);
  const [selectedDateDiary, setSelectedDateDiary] = useState('');
  const [defaultGoalDone, setDefaultGoalDone] = useState(false);
  const [date, setDate] = useState(new Date());
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

  useEffect(() => {
    setCustomPlans(generateCustomPlans());
  }, [severity]);

  useEffect(() => {
    const fetchGoalsAndDiary = async () => {
      try {
        const response = await axiosInstance.get(`/with/calendar/goal_diary/?date=${date.toISOString().split('T')[0]}`);
        const { goals, diary_entry } = response.data;

        setSelectedDateGoals(goals.map(goal => ({
          ...goal,
          date: new Date(goal.day).toDateString(),
          done: goal.is_completed
        })));
        setSelectedDateDiary(diary_entry ? diary_entry.content : '작성된 일기가 없습니다.');
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchGoalsAndDiary();
  }, [date]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleGoalChange = async (id) => {
    const updatedGoals = selectedDateGoals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setSelectedDateGoals(updatedGoals);

    try {
      await axiosInstance.post(`/with/calendar/goal_diary/update/`, {
        goal: {
          id: id,
          is_completed: !selectedDateGoals.find(goal => goal.id === id).done
        }
      });
    } catch (error) {
      console.error('목표 상태 업데이트에 실패했습니다:', error);
    }
  };

  const handleDefaultGoalChange = () => {
    setDefaultGoalDone(!defaultGoalDone);
  };

  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = async () => {
    if (newGoal.trim()) {
      const newGoalObj = {
        text: newGoal,
        is_completed: false,
        day: date.toISOString().split('T')[0],
      };

      try {
        const response = await axiosInstance.post('/with/calendar/goal_diary/create/', {
          goals: [newGoalObj],
          diary_entry: {
            title: title || 'No Title', // Providing a default title if not entered
            content: content || 'No Content', // Providing default content if not entered
            day: date.toISOString().split('T')[0],
          }
        });
        setSelectedDateGoals([...selectedDateGoals, { ...newGoalObj, id: response.data.id }]);
        setNewGoal('');
      } catch (error) {
        console.error('새 목표 추가에 실패했습니다:', error);
      }
    }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await axiosInstance.delete(`/with/calendar/goal_diary/delete/${id}/`);
      const updatedGoals = selectedDateGoals.filter((goal) => goal.id !== id);
      setSelectedDateGoals(updatedGoals);
    } catch (error) {
      console.error('목표 삭제에 실패했습니다:', error);
    }
  };

  const getTileClass = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const dayGoals = goals.filter((goal) => goal.date === tileDate.toDateString());
      const isToday = tileDate.toDateString() === new Date().toDateString();
      const totalGoals = dayGoals.length + (isToday ? 1 : 0); // 오늘 날짜에만 기본 목표 포함
      const completedGoals = dayGoals.filter((goal) => goal.done).length + (isToday && defaultGoalDone ? 1 : 0);
      const goalCompletion = totalGoals > 0 ? completedGoals / totalGoals : 0;
      if (goalCompletion === 1) {
        return 'react-calendar__tile--full-completion';
      } else if (goalCompletion >= 0.5) {
        return 'react-calendar__tile--half-completion';
      } else if (goalCompletion > 0) {
        return 'react-calendar__tile--some-completion';
      }
    }
    return '';
  };

  const severePlans = [
    '오전에 기상하기',
    '하루 세끼 다 챙겨먹기',
    '직접 점심 차려먹기',
    '밥 먹고 바로 눕지 않기',
    '방청소하기',
    '명상하기',
    '오늘의 칭찬할 점 쓰기',
    '밝은노래듣기',
    '스트레칭하기',
    '씻기',
    '열두시 전에 잠들기',
    '집밖에 나가기',
    '버킷리스트 쓰기',
    '상담받기',
  ];

  const moderatePlans = [
    '가족과 친구와 소통하기',
    '자기개발 하기',
    '하루 세끼 다 챙겨먹기',
    '직접 점심 차려먹기',
    '방청소하기',
    '조깅하기',
    '명상하기',
    '오늘의 칭찬할 점 쓰기',
    '열두시 전에 잠들기',
    '사람 만나기',
    '45분 이상 일주일 3회 이상 꾸준한 유산소운동',
    '1만보 이상 걷기',
  ];

  const generateCustomPlans = () => {
    let plans = [];
    if (severity === '심함') {
      plans = severePlans
        .filter((plan) => plan !== '상담받기')
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      plans.unshift('상담받기');
    } else if (severity === '보통') {
      plans = moderatePlans.sort(() => 0.5 - Math.random()).slice(0, 5);
    }
    return plans;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogVisible(true);
  };

  const handleDialogConfirm = async () => {
    setIsDialogVisible(false);

    if (selectedDateGoals.length === 0 && (!title || !content)) {
      console.error('Goals and diary entry cannot be empty.');
      setIsSuccess(false);
      return;
    }

    try {
      const currentDate = date.toISOString().split('T')[0];
      const response = await axiosInstance.post(`/with/calendar/goal_diary/create/`, {
        goals: selectedDateGoals.length > 0 ? selectedDateGoals.map(goal => ({
          text: goal.text,
          is_completed: goal.done,
          day: currentDate
        })) : [{
          text: "일기 작성",
          is_completed: defaultGoalDone,
          day: currentDate
        }],
        diary_entry: { 
          title: title || 'No Title',
          content: content || 'No Content',
          day: currentDate
        }
      });

      if (response.status === 201) {
        setIsSuccess(true);
        navigate(`/record/${response.data.id}`);
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
          <SidebarContainer>
            <StyledCalendar
              onChange={handleDateChange}
              value={date}
              tileClassName={getTileClass}
              formatDay={(locale, date) => date.getDate().toString()}
            />
            <GoalContainer>
              <GoalHeader>오늘의 목표</GoalHeader>
              <GoalList>
                {selectedDateGoals.length === 0 && (
                  <GoalText>작성된 목표가 없습니다</GoalText>
                )}
                {selectedDateGoals.map((goal) => (
                  <GoalItem key={goal.id}>
                    <Checkbox
                      checked={goal.done}
                      onChange={() => handleGoalChange(goal.id)}
                    />
                    <GoalText>{goal.text}</GoalText>
                    <DeleteButton onClick={() => handleDeleteGoal(goal.id)}>×</DeleteButton>
                  </GoalItem>
                ))}
              </GoalList>
              <GoalItem>
                <GoalInput
                  type="text"
                  value={newGoal}
                  onChange={handleNewGoalChange}
                  placeholder="새 목표 입력"
                />
                <GoalButton onClick={handleAddGoal}>추가</GoalButton>
              </GoalItem>
            </GoalContainer>
            {selectedDateGoals.length > 0 && (
              <GoalContainer>
                <GoalHeader>{`${date.toDateString()} 목표`}</GoalHeader>
                <GoalList>
                  <GoalItem>
                    <Checkbox
                      checked={defaultGoalDone}
                      onChange={handleDefaultGoalChange}
                    />
                    <GoalText>일기 작성</GoalText>
                  </GoalItem>
                  {selectedDateGoals.map((goal) => (
                    <GoalItem key={goal.id}>
                      <Checkbox
                        checked={goal.done}
                        onChange={() => handleGoalChange(goal.id)}
                      />
                      <GoalText>{goal.text}</GoalText>
                    </GoalItem>
                  ))}
                </GoalList>
                <GoalHeader>일기</GoalHeader>
                <GoalText>{selectedDateDiary || '작성된 일기가 없습니다.'}</GoalText>
              </GoalContainer>
            )}
            <CustomPlanContainer>
              <CustomPlanHeader>맞춤 계획 추천</CustomPlanHeader>
              <CustomPlanDescription>
                사회적 고립 자가진단 테스트에서 나온 심각도에 따라 맞춤 계획을 제공합니다. 마이페이지에서 재검사가 가능합니다
              </CustomPlanDescription>
              <CustomPlanList>
                {customPlans.map((plan, index) => (
                  <CustomPlanItem key={index}>{plan}</CustomPlanItem>
                ))}
              </CustomPlanList>
            </CustomPlanContainer>
          </SidebarContainer>
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