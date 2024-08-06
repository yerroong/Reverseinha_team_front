import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import axiosInstance from "../axiosInstance";

// 이미지 import
import profileImage from "../../img/profile.png";
import lineImage from "../../img/line.png";
import upArrowImage from "../../img/uparrow.png";
import downArrowImage from "../../img/underarrow.png";

// 스타일 컴포넌트
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
  border: 0.063rem solid #bababa;
  width: ${({ width }) => width || "20rem"};
  height: 18.5rem;
  margin: 1.688rem;
  border-radius: 1.875rem;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || "column"};
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
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
    if (score <= 30) return "green";
    if (score <= 70) return "orange";
    return "red";
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
  align-items: ${({ center }) => (center ? "center" : "flex-start")};
  width: ${({ isGoal }) => (isGoal ? "40rem" : "22.563rem")};
  height: ${({ height }) => height || "10rem"};
  max-height: ${({ maxHeight }) => maxHeight || "10rem"};
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
  background-color: #d4e3ff;
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
  background-color: #b8c5d4;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  &:hover {
    background-color: #a1b0c0;
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
  }
`;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? '오후' : '오전';

  // 12시간제 포맷으로 시간 변환
  const formattedHours = hours % 12 || 12; // 0시를 12시로 표시

  return `${year}.${month}.${day} ${period} ${formattedHours}시 ${minutes}분`;
};

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

  useEffect(() => {
    axiosInstance
      .get("/with/mypage/")
      .then((response) => {
        const data = response.data;
        setScore(data.survey_score || 0);
        setDiaryEntries(data.diary_entries || []);
        setCounselEntries(data.counseling_requests || []);
        setGoals(data.goals || []);
        setGoalAchievementRate(data.goal_achievement_rate || 0);
      })
      .catch((error) => {
        if (error.response) {
          console.error("API error:", error.response.data);
          if (error.response.status === 401) {
            console.error("Unauthorized access. Please log in.");
          }
        } else {
          console.error("Network or unknown error:", error.message);
        }
      });
  }, []);

  const handleScroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount =
        direction === "up" ? -ref.current.clientHeight : ref.current.clientHeight;
      ref.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleRetest = () => {
    navigate("/retrytest");
  };

  return (
    <Container>
      <Profile />
      <InfoContainer>
        <InfoContainerRow>
          <InfoBox width="17rem" center>
            <InfoTitle>나의 고립점수는?</InfoTitle>
            <Line src={lineImage} />
            <InfoScoreColored score={score}>{score}점</InfoScoreColored>
            <ProfileLogoutButton onClick={handleRetest}>재검사</ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="20rem" center>
            <LineContainer>
              <InfoTitle>일기목록</InfoTitle>
              <Line src={lineImage} />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton
                src={upArrowImage}
                onClick={() => handleScroll(diaryListRef, "up")}
              />
              <InfoList
                height="6.5rem"
                maxHeight="6.5rem"
                ref={diaryListRef}
                center
              >
                {diaryEntries.map((entry, index) => (
                  <CheckContainer key={index}>
                    {entry.title}
                  </CheckContainer>
                ))}
              </InfoList>
              <ScrollButton
                src={downArrowImage}
                onClick={() => handleScroll(diaryListRef, "down")}
              />
            </ScrollButtonContainer>
            <ProfileLogoutButton onClick={() => navigate("/record")}>
              더보기
            </ProfileLogoutButton>
          </InfoBox>
          <InfoBox width="20rem" center>
            <LineContainer>
              <InfoTitle>상담목록</InfoTitle>
              <Line src={lineImage} />
            </LineContainer>
            <ScrollButtonContainer>
              <ScrollButton
                src={upArrowImage}
                onClick={() => handleScroll(counselListRef, "up")}
              />
              <InfoList
                height="6.5rem"
                maxHeight="6.5rem"
                ref={counselListRef}
                center
              >
                {counselEntries.map((entry, index) => (
                  <CheckContainer key={index}>
                    {formatDate(entry.available_time)}
                  </CheckContainer>
                ))}
              </InfoList>
              <ScrollButton
                src={downArrowImage}
                onClick={() => handleScroll(counselListRef, "down")}
              />
            </ScrollButtonContainer>
          </InfoBox>
        </InfoContainerRow>
        <InfoContainerRow>
          <InfoBox width="17rem" center>
            <InfoTitle>역대 목표 달성률</InfoTitle>
            <Line src={lineImage} />
            <InfoScore>{goalAchievementRate.toFixed(1)}%</InfoScore>
          </InfoBox>
          <InfoBox width="43.5rem" flexDirection="row" center={false}>
            <Margin>
              <ScrollButtonContainer>
                <ScrollButton
                  src={upArrowImage}
                  onClick={() => handleScroll(goalListRef, "up")}
                />
                <ListContainer>
                  <InfoList
                    height="13rem"
                    maxHeight="13rem"
                    isGoal={true}
                    ref={goalListRef}
                  >
                    {goals.map((goal, index) => (
                      <CheckContainer key={index}>
                        <Check />
                        {goal.text}
                      </CheckContainer>
                    ))}
                  </InfoList>
                </ListContainer>
                <ScrollButton
                  src={downArrowImage}
                  onClick={() => handleScroll(goalListRef, "down")}
                />
              </ScrollButtonContainer>
            </Margin>
          </InfoBox>
        </InfoContainerRow>
      </InfoContainer>
    </Container>
  );
};

export default Mypage;
