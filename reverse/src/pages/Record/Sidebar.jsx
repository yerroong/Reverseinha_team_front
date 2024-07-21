import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  .react-calendar__tile--full-completion {
    background-color: #007BFF !important;
    color: white !important;
  }
  .react-calendar__tile--partial-completion {
    background-color: #BBDEFB !important;
    color: black !important;
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
  font-size: 0.6rem;
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

const Sidebar = () => {
  const [date, setDate] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [severity, setSeverity] = useState('심함'); // 초기값을 '심함'으로 설정
  const [customPlans, setCustomPlans] = useState([]);

  useEffect(() => {
    setCustomPlans(generateCustomPlans());
  }, [severity]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const handleGoalChange = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(updatedGoals);
  };

  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      const newGoalObj = {
        id: goals.length + 1,
        text: newGoal,
        done: false,
        date: new Date().toDateString(), // 목표를 추가한 날짜를 오늘 날짜로 저장
      };
      setGoals([...goals, newGoalObj]);
      setNewGoal('');
    }
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
  };

  const getTileClass = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const dayGoals = goals.filter((goal) => goal.date === tileDate.toDateString());
      const goalCompletion = dayGoals.filter((goal) => goal.done).length / dayGoals.length;
      if (goalCompletion === 1) {
        return 'react-calendar__tile--full-completion';
      } else if (goalCompletion > 0) {
        return 'react-calendar__tile--partial-completion';
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
    '상담받기'
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
    '1만보 이상 걷기'
  ];

  const generateCustomPlans = () => {
    let plans = [];
    if (severity === '심함') {
      plans = severePlans
        .filter((plan) => plan !== '상담받기')
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      plans.unshift('상담받기'); // 상담받기를 맨 위에 추가
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
          {goals.filter((goal) => goal.date === new Date().toDateString()).map((goal) => (
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
      <CustomPlanContainer>
        <CustomPlanHeader>맞춤 계획 추천</CustomPlanHeader>
        <CustomPlanDescription>사회적 고립 자가진단 테스트에서 나온 심각도에 따라 맞춤 계획을 제공합니다. 마이페이지에서 재검사가 가능합니다</CustomPlanDescription>
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