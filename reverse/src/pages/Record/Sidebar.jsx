import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../axiosInstance";
import Modal from "react-modal";
import HelpIcon from "../../img/help.png";

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
    background-color: #cccccc !important; /* 회색으로 선택된 날짜 표시 */
  }
  .react-calendar__tile--selected {
    background-color: #ccff99 !important;
  }
  .react-calendar__tile--full-completion {
    background-color: #003366 !important; /* 가장 진한 파란색 */
    color: white !important;
  }
  .react-calendar__tile--high-completion {
    background-color: #336699 !important; /* 중간 정도의 파란색 */
    color: white !important;
  }
  .react-calendar__tile--medium-completion {
    background-color: #6699cc !important; /* 중간 정도의 파란색 */
  }
  .react-calendar__tile--low-completion {
    background-color: #99ccff !important; /* 가장 연한 파란색 */
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
  text-align: left; /* 목표는 왼쪽 정렬 */
`;

const NoGoalsText = styled.div`
  text-align: center; /* '작성된 목표가 없습니다'는 가운데 정렬 */
  font-size: 1rem;
  color: #888;
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

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 0.625rem;
  accent-color: #007bff;
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
  padding: 0.4rem 0.5rem;
  background-color: #004ee5;
  color: #fff;
  border: none;
  border-radius: 0.3125rem;
  cursor: pointer;
  font-size: 0.7rem;
  height: 1.8rem;
  width: 3rem;
  &:hover {
    background-color: #2b6ae7;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RiskLabel = styled.span`
  font-size: 0.85rem;
  margin-left: 0.5rem;
  color: ${({ severity }) => {
    if (severity === "고위험") return "red";
    if (severity === "중위험") return "orange";
    return "green";
  }};
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

const DiaryPrompt = styled.p`
  color: #ff0000;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
`;

const HelpButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-top: 1rem;
  align-self: flex-start; // Align the icon to the left
  margin-left: 1rem;
  margin-top: 1rem;
`;

const Separator = styled.div`
  border-bottom: 1px solid #567191;
  width: 90%;
  margin: 1rem 0;
  align-self: center;
`;

const Sidebar = ({ onDateChange, diaryWritten }) => {
  // 한국 시간으로 오늘 날짜 가져오기
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const [date, setDate] = useState(today);
  const [goalsByDate, setGoalsByDate] = useState({}); // 날짜별 목표 데이터를 저장할 객체
  const [newGoal, setNewGoal] = useState("");
  const [severity, setSeverity] = useState("저위험"); // 기본 심각도
  const [customPlans, setCustomPlans] = useState([]);
  const [selectedDateGoals, setSelectedDateGoals] = useState([]);
  const [selectedDateDiary, setSelectedDateDiary] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const [score, setScore] = useState(0); // 설문 점수 상태 추가
  const [helpModalIsOpen, setHelpModalIsOpen] = useState(false); // 도움말 모달 상태 추가

  // Unique ID generator for local goals
  const generateUniqueId = () => {
    return `local-${Math.random().toString(36).substr(2, 9)}`;
  };

  // 마이페이지와 동일하게 설문 점수를 가져옵니다.
  useEffect(() => {
    axiosInstance
      .get("/with/mypage/")
      .then((response) => {
        const data = response.data;
        const surveyScore = data.survey_score || 0;
        setScore(surveyScore);

        // 설문 점수에 따라 심각도 설정
        if (surveyScore >= 0 && surveyScore <= 30) {
          setSeverity("저위험"); // Low risk
        } else if (surveyScore > 30 && surveyScore <= 60) {
          setSeverity("중위험"); // Medium risk
        } else if (surveyScore > 60 && surveyScore <= 100) {
          setSeverity("고위험"); // High risk
        }
        setErrorMessage(""); // 오류 메시지 초기화
        console.log(`Survey score fetched: ${surveyScore}`);
      })
      .catch((error) => {
        console.error("설문 점수를 가져오는 데 실패했습니다:", error);
        setErrorMessage(
          "설문 점수를 가져오는 데 문제가 발생했습니다. 나중에 다시 시도해 주세요."
        );
        if (error.response) {
          console.error("응답 데이터:", error.response.data);
          console.error("응답 상태:", error.response.status);
          console.error("응답 헤더:", error.response.headers);
        }
      });
  }, []);

  // Fetch and set custom plans based on severity
  useEffect(() => {
    setCustomPlans(generateCustomPlans());
  }, [severity]);

  // 모든 날짜의 목표 데이터를 한 번에 가져오기
  useEffect(() => {
    const fetchAllGoals = async () => {
      try {
        const response = await axiosInstance.get("/with/calendar/goal/all/");
        const allGoals = response.data;

        console.log("All goals fetched:", allGoals);

        // 날짜별로 목표 데이터를 정리
        const goalsByDateObj = allGoals.reduce((acc, goal) => {
          const day = new Date(goal.day).toISOString().split("T")[0];
          if (!acc[day]) {
            acc[day] = [];
          }
          acc[day].push({
            ...goal,
            done: goal.is_completed, // 완료 상태 저장
          });
          return acc;
        }, {});

        setGoalsByDate(goalsByDateObj);
      } catch (error) {
        console.error("모든 목표를 가져오는 데 실패했습니다:", error);
      }
    };

    fetchAllGoals(); // 컴포넌트가 마운트될 때 모든 목표 데이터를 가져옵니다.
  }, []);

  // 현재 보이는 월의 목표 데이터를 불러오기 위한 함수
  const fetchGoalsForMonth = async (activeStartDate) => {
    try {
      const year = activeStartDate.getFullYear();
      const month = activeStartDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
      console.log(`Fetching goals for year: ${year}, month: ${month}`);

      // 이 엔드포인트는 주어진 연도와 월에 해당하는 모든 목표를 가져오는 것으로 가정합니다.
      const response = await axiosInstance.get(
        `/with/calendar/goal/monthly/?year=${year}&month=${month}`
      );

      const monthGoals = response.data;
      const goalsByDateObj = monthGoals.reduce((acc, goal) => {
        const day = new Date(goal.day).toISOString().split("T")[0];
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push({
          ...goal,
          done: goal.is_completed, // 완료 상태 저장
        });
        return acc;
      }, {});

      setGoalsByDate((prevGoalsByDate) => ({
        ...prevGoalsByDate,
        ...goalsByDateObj,
      }));
    } catch (error) {
      console.error("Failed to fetch monthly goals:", error);
    }
  };

  // 선택된 날짜에 따른 목표 및 일기 가져오기
  useEffect(() => {
    const fetchGoalsAndDiary = async (selectedDate) => {
      try {
        console.log(
          `Fetching goals and diary for date: ${selectedDate
            .toISOString()
            .split("T")[0]}`
        );
        const response = await axiosInstance.get(
          `/with/calendar/goal_diary/?date=${selectedDate
            .toISOString()
            .split("T")[0]}`
        );
        const { goals, diary_entries } = response.data;

        console.log("Received goals for selected date:", goals);

        const goalsWithIds = goals.map((goal) => ({
          ...goal,
          done: goal.is_completed, // is_completed를 사용하여 완료 상태 저장
        }));

        // 선택된 날짜의 목표를 상태에 저장
        setSelectedDateGoals(goalsWithIds);

        // 날짜별 목표 데이터 저장 (다시 불러온 날짜별 목표 포함)
        setGoalsByDate((prevGoalsByDate) => ({
          ...prevGoalsByDate,
          [selectedDate.toISOString().split("T")[0]]: goalsWithIds,
        }));

        if (diary_entries && diary_entries.length > 0) {
          const diary = diary_entries[0];
          setSelectedDateDiary(diary.content);
        } else {
          setSelectedDateDiary("");
        }
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchGoalsAndDiary(date); // 한국 시간 기준의 오늘 날짜에 대한 데이터를 가져옵니다.
  }, [date]);

  // 날짜 변경 핸들러
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (onDateChange) onDateChange(selectedDate); // 전달받은 onDateChange 콜백 실행
  };

  // 달력이 보여주는 월이 변경될 때 목표 데이터를 불러오기
  const handleActiveStartDateChange = ({ activeStartDate }) => {
    fetchGoalsForMonth(activeStartDate);
  };

  // 목표 완료 상태 변경
  const handleGoalChange = async (id) => {
    const goalToUpdate = selectedDateGoals.find((goal) => goal.id === id);

    // 업데이트된 상태로 로컬 목표를 설정
    const updatedGoals = selectedDateGoals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setSelectedDateGoals(updatedGoals);

    // 목표 체크 변경 시 날짜별 목표 데이터 상태 업데이트
    setGoalsByDate((prevGoalsByDate) => ({
      ...prevGoalsByDate,
      [date.toISOString().split("T")[0]]: updatedGoals,
    }));

    console.log("Goal Completion Updated: ", !goalToUpdate.done);

    try {
      await axiosInstance.patch(
        `/with/calendar/goal/${goalToUpdate.id}/completed/`,
        {
          id: goalToUpdate.id,
          is_completed: !goalToUpdate.done,
        }
      );
    } catch (error) {
      console.error("목표 상태 업데이트에 실패했습니다:", error);
    }
  };

  // 새 목표 입력 핸들러
  const handleNewGoalChange = (event) => {
    setNewGoal(event.target.value);
  };

  // 새 목표 추가
  const handleAddGoal = async () => {
    if (newGoal.trim()) {
      const newGoalObj = {
        id: generateUniqueId(), // Generate unique ID for local goal
        text: newGoal,
        day: date.toISOString().split("T")[0],
        is_completed: false,
      };

      try {
        const response = await axiosInstance.post(
          "/with/calendar/goal/create/",
          newGoalObj
        );
        // Add new goal with the ID returned from the server
        setSelectedDateGoals([
          ...selectedDateGoals,
          { ...newGoalObj, id: response.data.id },
        ]);

        // 새로운 목표가 추가된 후 날짜별 목표 데이터 업데이트
        setGoalsByDate((prevGoalsByDate) => ({
          ...prevGoalsByDate,
          [date.toISOString().split("T")[0]]: [
            ...prevGoalsByDate[date.toISOString().split("T")[0]],
            { ...newGoalObj, id: response.data.id },
          ],
        }));

        setNewGoal("");
      } catch (error) {
        console.error("새 목표 추가에 실패했습니다:", error);
      }
    }
  };

  // 목표 삭제
  const handleDeleteGoal = async (id) => {
    try {
      await axiosInstance.delete(`/with/calendar/goal/${id}/delete/`);
      const updatedGoals = selectedDateGoals.filter((goal) => goal.id !== id);
      setSelectedDateGoals(updatedGoals);

      // 삭제된 목표가 반영된 날짜별 목표 데이터 업데이트
      setGoalsByDate((prevGoalsByDate) => ({
        ...prevGoalsByDate,
        [date.toISOString().split("T")[0]]: updatedGoals,
      }));
    } catch (error) {
      console.error("목표 삭제에 실패했습니다:", error);
    }
  };

  const getTileClass = ({ date: tileDate, view }) => {
    if (view === "month") {
      const dayString = tileDate.toISOString().split("T")[0];
      const dayGoals = goalsByDate[dayString] || [];
      const totalGoals = dayGoals.length;
      const completedGoals = dayGoals.filter((goal) => goal.done).length; // done 필드 사용
      const goalCompletion = totalGoals > 0 ? completedGoals / totalGoals : 0;

      console.log(`Date: ${dayString}`);
      console.log(`Total Goals: ${totalGoals}`);
      console.log(`Completed Goals: ${completedGoals}`);
      console.log(`Completion Ratio: ${goalCompletion}`);

      if (goalCompletion === 1) {
        console.log("Returning full-completion class");
        return "react-calendar__tile--full-completion";
      } else if (goalCompletion >= 0.34) {
        console.log("Returning high-completion class");
        return "react-calendar__tile--high-completion";
      } else if (goalCompletion > 0) {
        console.log("Returning medium-completion class");
        return "react-calendar__tile--medium-completion";
      }

      if (tileDate.toDateString() === date.toDateString()) {
        console.log("Returning selected class");
        return "react-calendar__tile--selected";
      }

      if (tileDate.toDateString() === today.toDateString()) {
        console.log("Returning now class");
        return "react-calendar__tile--now";
      }
    }
    return "";
  };

  const severePlans = [
    "오전에 기상하기",
    "하루 세끼 다 챙겨먹기",
    "직접 점심 차려먹기",
    "밥 먹고 바로 눕지 않기",
    "방청소하기",
    "명상하기",
    "오늘의 칭찬할 점 쓰기",
    "밝은노래듣기",
    "스트레칭하기",
    "씻기",
    "열두시 전에 잠들기",
    "집밖에 나가기",
    "버킷리스트 쓰기",
    "상담받기",
  ];

  const moderatePlans = [
    "가족과 친구와 소통하기",
    "자기개발 하기",
    "하루 세끼 다 챙겨먹기",
    "직접 점심 차려먹기",
    "방청소하기",
    "조깅하기",
    "명상하기",
    "오늘의 칭찬할 점 쓰기",
    "열두시 전에 잠들기",
    "사람 만나기",
    "45분 이상 일주일 3회 이상 꾸준한 유산소운동",
    "1만보 이상 걷기",
  ];

  const lowPlans = ["목표세우기", "취미생활하기"];

  const generateCustomPlans = () => {
    let plans = [];
    if (severity === "고위험") {
      // Use the severe plans for high risk
      plans = severePlans
        .filter((plan) => plan !== "상담받기")
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      plans.unshift("상담받기");
    } else if (severity === "중위험") {
      // Use the moderate plans for medium risk
      plans = moderatePlans.sort(() => 0.5 - Math.random()).slice(0, 5);
    } else if (severity === "저위험") {
      // Use the low plans for low risk
      plans = lowPlans;
    }
    console.log("Generated plans:", plans);
    return plans;
  };

  // 도움말 모달 열기
  const openHelpModal = () => {
    setHelpModalIsOpen(true);
  };

  // 도움말 모달 닫기
  const closeHelpModal = () => {
    setHelpModalIsOpen(false);
  };

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

  return (
    <SidebarContainer>
      <StyledCalendar
        onChange={handleDateChange}
        onActiveStartDateChange={handleActiveStartDateChange} // Add this line to fetch monthly data when the calendar view changes
        value={date}
        tileClassName={getTileClass}
        formatDay={(locale, date) => date.getDate().toString()}
      />
      <GoalContainer>
        <GoalHeader>오늘의 목표</GoalHeader>
        <GoalList>
          {selectedDateGoals.length === 0 && (
            <NoGoalsText>작성된 목표가 없습니다</NoGoalsText>
          )}
          {selectedDateGoals.map((goal) => (
            <GoalItem key={goal.id}>
              <Checkbox
                checked={goal.done}
                onChange={() => handleGoalChange(goal.id)}
              />
              <GoalText>{goal.text}</GoalText>
              <DeleteButton onClick={() => handleDeleteGoal(goal.id)}>
                ×
              </DeleteButton>
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
        {/* 일기 작성 안내 메시지 */}
        {selectedDateDiary === "" && !diaryWritten && (
          <DiaryPrompt>오늘의 일기를 작성하세요!</DiaryPrompt>
        )}
      </GoalContainer>
      <CustomPlanContainer>
        <CustomPlanHeader>
          맞춤 계획 추천
          <RiskLabel severity={severity}>
            - {severity === "고위험"
              ? "고위험"
              : severity === "중위험"
              ? "중위험"
              : "저위험"}
          </RiskLabel>
        </CustomPlanHeader>
        <CustomPlanDescription>
          사회적 고립 자가진단 테스트에서 나온 심각도에 따라 맞춤 계획을
          추천합니다.
        </CustomPlanDescription>
        <CustomPlanList>
          {customPlans.map((plan, index) => (
            <CustomPlanItem key={index}>{plan}</CustomPlanItem>
          ))}
        </CustomPlanList>
      </CustomPlanContainer>

      <HelpButton src={HelpIcon} alt="Help" onClick={openHelpModal} />

      {helpModalIsOpen && (
        <Modal
          isOpen={helpModalIsOpen}
          onRequestClose={closeHelpModal}
          style={customStyles}
          contentLabel="Help"
          ariaHideApp={false}
        >
          <h2>일기 서비스 도움말</h2>
          <Separator />
          <p>날짜마다 매일 자신의 일기를 캘린더에 작성하고 오늘의 목표를 추가하세요!</p>
          <p>목표를 완료할수록 달력이 파란색으로 물듭니다!</p>
          <p>자신의 고립점수에 맞는 맞춤 계획 추천과</p>
          <p>곧 업데이트될 맞춤 멘토링/상담 서비스 추천을 받아보세요!</p>
          <GoalButton onClick={closeHelpModal}>확인</GoalButton>
        </Modal>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
