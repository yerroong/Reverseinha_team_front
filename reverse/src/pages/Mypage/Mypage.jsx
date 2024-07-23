import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import Profile from './Profile';
import axios from 'axios';

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
  width: ${({ width }) => width || '20.813rem'};
  height: 21.563rem;
  margin: 1.688rem;
  border-radius: 1.875rem;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  align-items: ${({ center }) => (center ? 'center' : 'flex-start')};
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  position: relative;
`;

const InfoTitle = styled.div`
  font-size: 1.875rem;
  margin-bottom:1rem;
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
  color: ${({ score }) => {
    if (score <= 30) return 'green';
    if (score <= 60) return 'orange';
    return '#BE0000';
  }};
`;

const InfoScore = styled.div`
  font-size: 5.625rem;
  color: black;
`;

const InfoList = styled.div`
  padding-bottom: 1rem;
  display:flex;
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
  height: 16rem;
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
  width:48.5rem;
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
  const diaryListRef = useRef(null);
  const counselListRef = useRef(null);
  const goalListRef = useRef(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get('/api/score');
        setScore(response.data.score);
      } catch (error) {
        console.error('Error fetching score:', error);
      }
    };

    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get('/api/diary');
        setDiaryEntries(response.data.entries);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    const fetchCounselEntries = async () => {
      try {
        const response = await axios.get('/api/counsel');
        setCounselEntries(response.data.entries);
      } catch (error) {
        console.error('Error fetching counsel entries:', error);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await axios.get('/api/goals');
        setGoals(response.data.goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    };

    fetchScore();
    fetchDiaryEntries();
    fetchCounselEntries();
    fetchGoals();
  }, []);

  useEffect(() => {
    setScore(45);
    setDiaryEntries([
      { date: '24.07.21', title: '첫 번째 일기' },
      { date: '24.07.22', title: '두 번째 일기' },
      { date: '24.07.23', title: '세 번째 일기' },
    ]);
    setCounselEntries([
      { date: '24.07.21', title: '첫 번째 상담' },
      { date: '24.07.22', title: '두 번째 상담' },
      { date: '24.07.23', title: '세 번째 상담' },
      { date: '24.07.21', title: '첫 번째 상담' },
      { date: '24.07.22', title: '두 번째 상담' },
      { date: '24.07.23', title: '세 번째 상담' },
      { date: '24.07.21', title: '첫 번째 상담' },
      { date: '24.07.22', title: '두 번째 상담' },
      { date: '24.07.23', title: '세 번째 상담' },
    ]);
    setGoals([
      '아침 먹기',
      '운동하기',
      '독서하기',
      '코딩하기',
      '아침 먹기',
      '운동하기',
      '독서하기',
      '코딩하기',
      '아침 먹기',
      '운동하기',
      '독서하기',
      '코딩하기'
    ]);
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

  // 추가된 함수: 재검사 버튼 클릭시 호출되는 함수
  const handleRetest = () => {
    navigate('/signtest');
  };

  return (
    <Container>
      <Profile />
      <InfoContainer>
        <InfoContainerRow>
          <InfoBox width="17.813rem" center>
            <InfoTitle>나의 고립점수는?</InfoTitle>
            <Line src="/line.png" />
            <InfoScoreColored score={score}>{score}점</InfoScoreColored>
            <ProfileLogoutButton onClick={handleRetest}>재검사</ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="22.563rem" center>
            <LineContainer>
              <InfoTitle>일기목록</InfoTitle>
              <Line src="/line.png" />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton src="/uparrow.png" onClick={() => handleScroll(diaryListRef, 'up')} />
              <InfoList height="6.5rem" maxHeight="6.5rem" ref={diaryListRef} center>
                {diaryEntries.map((entry, index) => (
                  <CheckContainer key={index}>{entry.date} {entry.title}</CheckContainer>
                ))}
              </InfoList>
              <ScrollButton src="/underarrow.png" onClick={() => handleScroll(diaryListRef, 'down')} />
            </ScrollButtonContainer>
            <ProfileLogoutButton onClick={() => navigate('/record')}>더보기</ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="22.563rem" center>
            <LineContainer>
              <InfoTitle>상담목록</InfoTitle>
              <Line src="/line.png" />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton src="/uparrow.png" onClick={() => handleScroll(counselListRef, 'up')} />
              <InfoList height="6.5rem" maxHeight="6.5rem" ref={counselListRef} center>
                {counselEntries.map((entry, index) => (
                  <CheckContainer key={index}>{entry.date} {entry.title}</CheckContainer>
                ))}
              </InfoList>
              <ScrollButton src="/underarrow.png" onClick={() => handleScroll(counselListRef, 'down')} />
            </ScrollButtonContainer>
          </InfoBox>
        </InfoContainerRow>
        <InfoContainerRow>
          <InfoBox width="17.813rem" center>
            <InfoTitle>역대 목표 달성률</InfoTitle>
            <Line src="/line.png" />
            <InfoScore>70%</InfoScore>
          </InfoBox>
          <InfoBox width="48.5rem" flexDirection="row" center={false}>
            <Margin>
              <ScrollButtonContainer>
                <ScrollButton src="/uparrow.png" onClick={() => handleScroll(goalListRef, 'up')} />
                <ListContainer>
                  <InfoList height="14.5rem" maxHeight="14.5rem" isGoal={true} ref={goalListRef}>
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



//아이디 받아오기
//로그아웃버튼 활성화
//폰트
//재검사버튼 활성화


//나중에 가능하면 웹페이지 축소시에 요소들은 그대로있고 창만 쫄아들게하면좋을듯
//네모들이 넘 큰거같앵;;
//헤더 고정되면 좋을듯