import React, { useState } from 'react';
import styled from 'styled-components';
import Question from './Question';
import Resultmodal from './Resultmodal';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Descrip = styled.p`
  margin-bottom: 30px;
  line-height: 1.5;
  color: gray;
  font-size: 16px;
`;

const Qlist = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
  text-align: left;
`;

const Category = styled.p`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 0.6rem;
  font-size: 17px;
  font-weight: bold;
  color: #333;
`;

const Qstyle = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  height: 2.8rem;
`;

const Submit = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  background-color: #004EE5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FooterText = styled.p`
  margin-top: 20px;
  color: gray;
  font-size: 10px;
  text-align: left;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Signtest = () => {
  const questions = [
    "최근 10년간 일과 관계(이별, 배신, 폭력, 실패, 노숙)에서 실직에 상실 경험 횟수는? (2회 이상 체크)",
    "지난 1주일 평균 하루 식사 횟수는? (1회 이하 체크)",
    "지난 1주일 동안 외출 횟수는? (1회 이하 체크)",
    "지난 1주일 동안 필름이 끊길 정도(Blackout)로 문제가 술 마신 횟수는? (1회 이상 체크)",
    "돈이 필요할 때 빌려 줄 사람이 몇 명 있는가? (없으면 체크)",
    "몸이 아플 때 돌봐줄 사람이 몇 명 있는가? (없으면 체크)",
    "마음이 울적할 때 대화 나눌 사람이 몇 명 있는가? (없으면 체크)",
    "지난 10년간 이사 10회 이상 또는 거주지 미상인 경우 등 (해당되면 체크)",
    "이용하던 돌봄서비스와 치료 중단(퇴원) 또는 서비스 이용이 없는 경우 (해당되면 체크)",
    "만성관리 질병이 있는 경우 (암, 알콜중독, 빈혈, 폐렴, 당뇨, 신장질환)"
  ];

  const [selectedCount, setSelectedCount] = useState(Array(questions.length).fill(false));
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleCheckboxChange = (index) => {
    const newSelectedCount = [...selectedCount];
    newSelectedCount[index] = !newSelectedCount[index];
    setSelectedCount(newSelectedCount);
  };

  const calculateScore = () => {
    const totalScore = selectedCount.filter(selected => selected).length * 10;
    setScore(totalScore);
    setShowResult(true);
  };

  return (
    <Container>
      <Title>고립 자가 진단</Title>
      <Descrip>
        테스트를 통해 사회적 고립정도를 판단하세요! <br />
        해당 테스트는 마이페이지에서 재검사 가능합니다. <br />
        사회적 고립에 심각도에 따라 각기 다른 해결 방안을 안내해드립니다.
      </Descrip>
      <Qlist>
        <Category>실패, 상실감 누적 (1)</Category>
        <Qstyle>
          <Question
          question="최근 10년간 일과 관계(이별, 배신, 폭력, 실패, 노숙)에서 실직에 상실 경험 횟수는? (2회 이상 체크)"
          index={0}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        
        
        <Category>고립적 일상 (3)</Category>
        <Qstyle>
          <Question
          question="지난 1주일 평균 하루 식사 횟수는? (1회 이하 체크)"
          index={1}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        <Qstyle>
          <Question
          question="지난 1주일 동안 외출 횟수는? (1회 이하 체크)"
          index={2}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        <Qstyle>
          <Question
          question="지난 1주일 동안 필름이 끊길 정도(Blackout)로 문제가 술 마신 횟수는? (1회 이상 체크)"
          index={3}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        
        <Category>사회적 일상 (3)</Category>
        <Qstyle>
          <Question
          question="돈이 필요할 때 빌려 줄 사람이 몇 명 있는가? (없으면 체크)"
          index={4}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        <Qstyle>
          <Question
          question="몸이 아플 때 돌봐줄 사람이 몇 명 있는가? (없으면 체크)"
          index={5}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        <Qstyle>
          <Question
          question="마음이 울적할 때 대화 나눌 사람이 몇 명 있는가? (없으면 체크)"
          index={6}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        
        <Category>이동성 높은 생애 (1)</Category>
        <Qstyle>
          <Question
          question="지난 10년간 이사 10회 이상 또는 거주지 미상인 경우 등 (해당되면 체크)"
          index={7}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        
        <Category>건강과 돌봄 (2)</Category>
        <Qstyle>
          <Question
          question="이용하던 돌봄서비스와 치료 중단(퇴원) 또는 서비스 이용이 없는 경우 (해당되면 체크)"
          index={8}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        <Qstyle>
          <Question
          question="만성관리 질병이 있는 경우 (암, 알콜중독, 빈혈, 폐렴, 당뇨, 신장질환)"
          index={9}
          onChange={handleCheckboxChange}
        />
        </Qstyle>
        
      </Qlist>
      <FooterText>
        각 항목에 대해 "예" 또는 "아니오"로 체크하여 스스로 평가해보세요. 체크 결과에 따라 사회적 고립의 정도를 파악할 수 있습니다. 자가평가 결과에 따라 사회적 고립을 경험하는 것으로 판단된다면, 이를 인지하고 필요한 조치를 취하는 것이 중요합니다. 
        <BoldText>전문가의 도움이 필요하다면 상담사나 의료진에게 도움을 요청하세요.</BoldText>
        <br />
        <br />
        * 출처: 서울시복지재단(2022), 고독사 위험현황 연구
      </FooterText>
      <Submit onClick={calculateScore}>나의 상태 확인하기</Submit>
      {showResult && <Resultmodal score={score} />}
    </Container>
  );
};

export default Signtest;
