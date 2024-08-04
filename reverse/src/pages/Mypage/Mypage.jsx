import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
import axiosInstance from '../axiosInstance';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InfoContainerRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBox = styled.div`
  border: 0.063rem solid #BABABA;
  width: ${({ width }) => width || '20rem'};
  height: 18.5rem;
  margin: 1.688rem;
  border-radius: 1.875rem;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  position: relative;
`;

const InfoTitle = styled.div`
  font-size: 1.7rem;
  margin-bottom: 1rem;
`;

const LineContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const Line = styled.img`
  width: 5rem;
  height: 5px;
`;

const InfoScoreColored = styled.div`
  font-size: 5.625rem;
  font-weight: 500;
  color: ${({ score }) => {
    if (score <= 30) return 'green';
    if (score >= 40) return 'orange';
    if (score >= 70) return 'red';
    return 'black';
  }};
`;

const InfoScore = styled.div`
  font-size: 5.625rem;
  font-weight: 500;
  color: black;
`;

const InfoList = styled.div`
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  width: ${({ isGoal }) => (isGoal ? '40rem' : '22.563rem')};
  height: ${({ height }) => height || '10rem'};
  max-height: ${({ maxHeight }) => maxHeight || '10rem'};
  overflow: hidden;
  position: relative;
`;

const ListContainer = styled.div`
  display: flex;
  height: 14rem;
  width: 48.5rem;
  max-height: 16rem;
`;

const Check = styled.div`
  border-radius: 0.625rem;
  width: 2.188rem;
  height: 2.188rem;
  background-color: #D4E3FF;
  margin-right: 1rem;
  margin-left: 2rem;
`;

const CheckContainer = styled.div`
  display: flex;
  margin: 0.3rem;
  font-size: 1.3rem;
`;

const Margin = styled.div`
  margin-top: 2rem;
`;

const ScrollButton = styled.img`
  width: 1.3rem;
  cursor: pointer;
`;

const ScrollButtonContainer = styled.div`
  width: 48.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProfileLogoutButton = styled.button`
  width: 6.25rem;
  height: 1.813rem;
  font-size: 0.875rem;
  color: white;
  border: none;
  border-radius: 1.875rem;
  background-color: #B8C5D4;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  &:hover {
    background-color: #A1B0C0;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  }
`;

const Mypage = () => {
  const [score, setScore] = useState(0);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [counselEntries, setCounselEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [goalAchievementRate, setGoalAchievementRate] = useState(0);

  const diaryListRef = useRef(null);
  const counselListRef = useRef(null);
  const goalListRef = useRef(null);
  const navigate = useNavigate();

  const fetchDiaryEntry = (date) => {
    return axiosInstance.get(`/with/calendar/goal_diary/?date=${date}`)
      .then(response => response.data.diary_entry.title)
      .catch(error => {
        console.error('Error fetching diary entry for date:', error);
        return '';
      });
  };

  const fetchDiaryEntriesForLastWeek = () => {
    const today = new Date();
    const promises = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const formattedDate = date.toISOString().split('T')[0];
      promises.push(fetchDiaryEntry(formattedDate));
    }
    Promise.all(promises)
      .then(results => setDiaryEntries(results))
      .catch(error => console.error('Error fetching diary entries for last week:', error));
  };

  useEffect(() => {
    axiosInstance
      .get('/with/mypage/')
      .then(response => {
        const data = response.data;
        setScore(data.score || 0);
        setDiaryEntries(data.diary_entries || []);
        setCounselEntries(data.counseling_requests || []);
        setGoals(data.goals || []);
        setGoalAchievementRate(Math.floor(data.goal_achievement_rate || 0));
      })
      .catch(error => console.error('Error fetching mypage data:', error));

    fetchDiaryEntriesForLastWeek();
  }, []);

  useEffect(() => {
    axiosInstance
      .get('/with/signup/survey/')
      .then(response => {
        const data = response.data;
        setScore(prevScore => data.score || prevScore); // 기존 score 값을 유지하면서 업데이트
      })
      .catch(error => console.error('Error fetching survey data:', error));
  }, []);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'up' ? -ref.current.clientHeight : ref.current.clientHeight;
      ref.current.scrollBy({
        top: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleRetest = () => {
    navigate('/signtest');
  };

  return (
    <Container>
      <Profile />
      <InfoContainer>
        <InfoContainerRow>
          <InfoBox width="17rem" center>
            <InfoTitle>나의 고립점수는?</InfoTitle>
            <Line src="/line.png" />
            <InfoScoreColored score={score}>{score}점</InfoScoreColored>
            <ProfileLogoutButton onClick={handleRetest}>재검사</ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="20rem" center>
            <LineContainer>
              <InfoTitle>일기목록</InfoTitle>
              <Line src="/line.png" />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton src="/uparrow.png" onClick={() => handleScroll(diaryListRef, 'up')} />
              <InfoList height="6.5rem" maxHeight="6.5rem" ref={diaryListRef} center>
                {diaryEntries.map((entry, index) => (
                  <CheckContainer key={index}>{entry}</CheckContainer>
                ))}
              </InfoList>
              <ScrollButton src="/underarrow.png" onClick={() => handleScroll(diaryListRef, 'down')} />
            </ScrollButtonContainer>
            <ProfileLogoutButton onClick={() => navigate('/record')}>더보기</ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="20rem" center>
            <LineContainer>
              <InfoTitle>상담목록</InfoTitle>
              <Line src="/line.png" />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton src="/uparrow.png" onClick={() => handleScroll(counselListRef, 'up')} />
              <InfoList height="6.5rem" maxHeight="6.5rem" ref={counselListRef} center>
                {counselEntries.map((entry, index) => (
                  <CheckContainer key={index}>{entry.available_time}</CheckContainer>
                ))}
              </InfoList>
              <ScrollButton src="/underarrow.png" onClick={() => handleScroll(counselListRef, 'down')} />
            </ScrollButtonContainer>
          </InfoBox>
        </InfoContainerRow>
        <InfoContainerRow>
          <InfoBox width="17rem" center>
            <InfoTitle>역대 목표 달성률</InfoTitle>
            <Line src="/line.png" />
            <InfoScore>{goalAchievementRate}%</InfoScore>
          </InfoBox>
          <InfoBox width="43.5rem" flexDirection="row" center={false}>
            <Margin>
              <ScrollButtonContainer>
                <ScrollButton src="/uparrow.png" onClick={() => handleScroll(goalListRef, 'up')} />
                <ListContainer>
                  <InfoList height="13rem" maxHeight="13rem" isGoal={true} ref={goalListRef}>
                    {goals.map((goal, index) => (
                      <CheckContainer key={index}>
                        <Check /> {goal}
                      </CheckContainer>
                    ))}
                  </InfoList>
                </ListContainer>
                <ScrollButton src="/underarrow.png" onClick={() => handleScroll(goalListRef, 'down')} />
              </ScrollButtonContainer>
            </Margin>
          </InfoBox>
        </InfoContainerRow>
      </InfoContainer>
    </Container>
  );
};

export default Mypage;
