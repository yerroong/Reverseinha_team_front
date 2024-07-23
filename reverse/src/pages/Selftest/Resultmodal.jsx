import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Modalbackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
`;
const Scoretitle = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
`;
const Score = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${props => {
    if (props.score >= 70) return 'red';
    if (props.score >= 40) return 'orange';
    if (props.score <= 30) return 'green';
    return 'black';
  }};
`;

const Message = styled.p`
  margin-bottom: 20px;
  line-height: 1.8;
  color: ${props => {
    if (props.score >= 70) return 'red';
    if (props.score >= 40) return 'orange';
    if (props.score <= 30) return 'green';
    return 'black';
  }};
`;

const Linkbutton = styled.a`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #004EE5;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Footer = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: gray;
`;

const ResultModal = ({ score }) => {
    const getRiskMessage = () => {
        if (score >= 70) return '사회적 고립 고위험군에 해당합니다.';
        if (score >= 40) return '사회적 고립 중위험군에 해당합니다.';
        if (score <= 30) return '사회적 고립 저위험군에 해당합니다.';
        return '점수를 다시 확인해 주세요.';
      };

    const Link = styled.a`
        color: #004EE5;
        cursor: pointer;
        text-decoration: none;
    `;
    const navigate = useNavigate();
    const handletextclick = () => {
        navigate('/'); //수정필요
    };


  return (
    <Modalbackground>
      <Modal>
        <Scoretitle>나의 고립 점수는? </Scoretitle>
        <Score score={score}>{score}점</Score>
        <Message>
          테스트 결과, {getRiskMessage()} <br/>
          현재 상태에 맞는 상담/건강 관리 계획을 제공합니다. <br/>
          다른 테스트도 궁금하다면? <Link onClick={handletextclick}>다른 테스트 구경가기</Link>

        </Message>
        <Linkbutton href="#">맞춤서비스 확인하기</Linkbutton>
        <Footer>긴급전화: 사회적 고립가구 지원센터 전화번호(02-6353-0200)</Footer>
      </Modal>
    </Modalbackground>
  );
};

export default ResultModal;
