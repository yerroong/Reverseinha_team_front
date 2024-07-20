import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SidebarContainer = styled.div`
  width: 18.75rem;
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;
  align-items: center;
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
  width: 90%;
  padding: 1.25rem;
  border-radius: 0.625rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Sidebar = () => {
  const [date, setDate] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

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
    </SidebarContainer>
  );
};

export default Sidebar;
