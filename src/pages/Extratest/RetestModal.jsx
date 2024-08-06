import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
`;

const Scoretitle = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Title = styled.p`
  color: ${props => (props.result.includes('정상') ? 'green' : 'red')};
  font-size: 32px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-top: 1rem;
  color: #404040;
  line-height: 1.8;
  letter-spacing: 0.5px;
`;

const CloseButton = styled.a`
  display: inline-block;
  margin: 10px;
  padding: 10px 20px;
  background-color: #004EE5;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  letter-spacing: 0.5px;
`;

const Footer = styled.div`
    margin-top: 10px;
    font-size: 12px;
    color: gray;
`;


const RetestModal = ({ result }) => {
  return (
    <Overlay>
      <Modal>
        <Scoretitle>나의 외로움과 사회적 고립 수준은? </Scoretitle>
        <Title result={result}>{result}</Title>
        <Description>테스트 결과, {result}에 해당합니다. 
            <br/>현재 상태에 맞는 상담/건강 관리 계획을 제공합니다.</Description>
        <CloseButton href="/">시작화면으로 돌아가기</CloseButton>
        <Footer>긴급전화: 사회적 고립가구 지원센터 전화번호(02-6353-0200)</Footer>
      </Modal>
    </Overlay>
  );
};

export default RetestModal;
