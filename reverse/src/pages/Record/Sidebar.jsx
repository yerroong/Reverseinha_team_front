import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import axiosInstance from '../axiosInstance';
import 'react-calendar/dist/Calendar.css';

// 스타일 컴포넌트 정의
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

const Sidebar = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [severity, setSeverity] = useState('심함');
  const [customPlans, setCustomPlans] = useState([]);
  const [selectedDateGoals, setSelectedDateGoals] = useState([]);
  const [selectedDateDiary, setSelectedDateDiary] = useState('');
  const [defaultGoalDone, setDefaultGoalDone] = useState(false);

  useEffect(() => {
    setCustomPlans(generateCustomPlans());
  }, [severity]);

  // 날짜 선택 시 목표 및 일기 불러오기
  useEffect(() => {
    const fetchGoalsAndDiary = async () => {
      try {
        console.log(`Fetching goals and diary for date: ${date.toISOString().split('T')[0]}`);
        const response = await axiosInstance.get(`/with/calendar/goal_diary/?date=${date.toISOString().split('T')[0]}`);
        const { goals, diary_entries } = response.data;

        setSelectedDateGoals(goals.map(goal => ({
          ...goal,
          date: new Date(goal.day).toDateString(),
          done: goal.is_completed
        })));

        if (diary_entries && diary_entries.length > 0) {
          const diary = diary_entries[0];
          setSelectedDateDiary(diary.content);
        } else {
          setSelectedDateDiary('');
        }

        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchGoalsAndDiary();
  }, [date]);

  // 날짜 변경 핸들러
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (onDateChange) onDateChange(selectedDate); // 전달받은 onDateChange 콜백 실행
  };

  // 목표 완료 상태 변경
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

  // 기본 목표 완료 상태 변경
  const handleDefaultGoalChange = () => {
    setDefaultGoalDone(!defaultGoalDone);
  };

  // 새 목표 입력 핸들러
  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  // 새 목표 추가
  const handleAddGoal = async () => {
    if (newGoal.trim()) {
      const newGoalObj = {
        text: newGoal,
        is_completed: false,
        day: date.toISOString().split('T')[0],
      };

      try {
        const response = await axiosInstance.post('/with/calendar/goal_diary/create/', { goals: [newGoalObj] });
        setSelectedDateGoals([...selectedDateGoals, { ...newGoalObj, id: response.data.id }]);
        setNewGoal('');
      } catch (error) {
        console.error('새 목표 추가에 실패했습니다:', error);
      }
    }
  };

  // 목표 삭제
  const handleDeleteGoal = async (id) => {
    try {
      await axiosInstance.delete(`/with/calendar/goal_diary/delete/${id}/`);
      const updatedGoals = selectedDateGoals.filter((goal) => goal.id !== id);
      setSelectedDateGoals(updatedGoals);
    } catch (error) {
      console.error('목표 삭제에 실패했습니다:', error);
    }
  };

  // 달력 타일의 클래스 결정
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

  return (
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
  );
};

export default Sidebar;
