import React from 'react';
import styled from 'styled-components';
import RetestModal from './RetestModal'; 
import { useState } from 'react';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #adacac;
  margin-bottom: 1.6rem
`;

const Qlist = styled.div`
  border: 1px solid #dadada;
  border-radius: 10px;
  background-color: #f4f4f4;
  padding: 15px;
  margin-bottom: 20px;
  text-align: left;
`;

const Category = styled.h2`
  margin-top: 1rem;
  margin-bottom: 10px;
  margin-left: 0.6rem;
  font-size: 18px;
  font-weight: bold;
  color: black;
`;

const Qstyle = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  height: 22rem;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  margin-left: 1.5rem;
  font-size: 15px;
  font-weight: bold;
`;

const Line = styled.div`
  position: flex;
  width: 40rem;
  height: 0.1rem;
  background: #747474;
`;

const List = styled.ul`
  list-style-type: none;
  margin-left: 30rem;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
  font-size: 14px;
`;

const RadioInput = styled.input`
  margin-right: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 3.5rem;
`;

const SubmitButton = styled.button`
  padding: 15px 30px;
  font-size: 16px;
  background-color: #004EE5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 3rem;
  margin-top: 3rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const Retest = () => {
  const [answers, setAnswers] = useState({
    loneliness1: null,
    loneliness2: null,
    support1: null,
    support2: null,
    network1: null,
    network2: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = () => {
    if (Object.values(answers).includes(null)) {
      setError('모든 항목에 응답 후 제출하세요');
      return;
    }

    const lonelinessScore = answers.loneliness1 + answers.loneliness2;
    const supportScore = answers.support1 + answers.support2;
    const networkScore = answers.network1 + answers.network2;

    let resultText = '정상';
    if (lonelinessScore >= 3 && (supportScore >= 4 || networkScore >= 4)) {
      resultText = '외로움 경험군, 사회적 고립군';
    } else if (lonelinessScore >= 3) {
      resultText = '외로움 경험군';
    } else if (supportScore >= 4 || networkScore >= 4) {
      resultText = '사회적 고립군';
    }

    setResult(resultText);
    setShowModal(true);
    setError('');
  };

  return (
    <Container>
      <Title>외로움과 사회적 고립 자가 측정표</Title>
      <Subtitle>최근 한 달간 자신의 상태 기준으로 작성해주세요</Subtitle>
      
      <Qlist>
        <Category>외로움 척도</Category>
        <Qstyle>
          <br />
          <Label>외롭다고 느낀다</Label>
          <List>
            <ListItem><RadioInput type="radio" name="loneliness1" value="0" onChange={handleChange}/> 거의 그렇지 않다 (0점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness1" value="1" onChange={handleChange}/> 다소 그렇지 않다 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness1" value="2" onChange={handleChange}/> 다소 그렇다 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness1" value="3" onChange={handleChange}/> 매우 그렇다 (3점)</ListItem>
          </List>
          <Line />
          <br />
          <Label>소외돼 있다고 느낀다</Label>
          <List>
            <ListItem><RadioInput type="radio" name="loneliness2" value="0" onChange={handleChange}/> 거의 그렇지 않다 (0점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness2" value="1" onChange={handleChange}/> 다소 그렇지 않다 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness2" value="2" onChange={handleChange}/> 다소 그렇다 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="loneliness2" value="3" onChange={handleChange}/> 매우 그렇다 (3점)</ListItem>
          </List>
        </Qstyle>
        
        <Category>사회적 지지 척도</Category>
        <Qstyle>
          <br />
          <Label>가족이나 친구들에게 편하게 의지할 수 있다</Label>
          <List>
            <ListItem><RadioInput type="radio" name="support1" value="3" onChange={handleChange}/> 거의 그렇지 않다 (3점)</ListItem>
            <ListItem><RadioInput type="radio" name="support1" value="2" onChange={handleChange}/> 다소 그렇지 않다 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="support1" value="1" onChange={handleChange}/> 다소 그렇다 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="support1" value="0" onChange={handleChange}/> 매우 그렇다 (0점)</ListItem>
          </List>
          <Line />
          <br />
          <Label>일상적인 일에 도움을 줄 사람이 있다</Label>
          <List>
            <ListItem><RadioInput type="radio" name="support2" value="3" onChange={handleChange}/> 거의 그렇지 않다 (3점)</ListItem>
            <ListItem><RadioInput type="radio" name="support2" value="2" onChange={handleChange}/> 다소 그렇지 않다 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="support2" value="1" onChange={handleChange}/> 다소 그렇다 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="support2" value="0" onChange={handleChange}/> 매우 그렇다 (0점)</ListItem>
          </List>
        </Qstyle>
        
        <Category>사회적 네트워크 척도</Category>
        <Qstyle> 
          <br />
          <Label>월 1회 이상 사적 만남, 주 1회 이상 연락하는 사람은?</Label>
          <List>
            <ListItem><RadioInput type="radio" name="network1" value="3" onChange={handleChange}/> 0명 (3점)</ListItem>
            <ListItem><RadioInput type="radio" name="network1" value="2" onChange={handleChange}/> 1 ~ 2명 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="network1" value="1" onChange={handleChange}/> 3 ~ 6명 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="network1" value="0" onChange={handleChange}/> 7명 이상 (0점)</ListItem>
          </List>
          <Line />
          <br />
          <Label>가족이나 친구와 사적으로 연락하는 데 드는 시간은 하루 평균 얼마?</Label>
          <List>
            <ListItem><RadioInput type="radio" name="network2" value="3" onChange={handleChange}/> 전혀 안 함 (3점)</ListItem>
            <ListItem><RadioInput type="radio" name="network2" value="2" onChange={handleChange}/> 15분 이하 (2점)</ListItem>
            <ListItem><RadioInput type="radio" name="network2" value="1" onChange={handleChange}/> 15분 ~ 1시간 (1점)</ListItem>
            <ListItem><RadioInput type="radio" name="network2" value="0" onChange={handleChange}/> 1시간 이상 (0점)</ListItem>
          </List>
        </Qstyle>
      </Qlist>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton onClick={handleSubmit}>결과 확인하기</SubmitButton>
      {showModal && <RetestModal result={result} onClose={() => setShowModal(false)} />}
    </Container>
  );
};

export default Retest;
