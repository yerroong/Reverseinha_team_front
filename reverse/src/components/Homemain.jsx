//홈 하단 페이지 컴포넌트//
import React from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';
import '../components/Fonts.css';

const Container = styled.div`
  text-align: center;
  max-width: 100%;
  margin: 17rem auto 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const Descrip = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  font-weight: 500;
`;

const StartButton = styled.button`
  font-size: 1.2rem;
  padding: 1rem 2rem;
  color: #fff;
  background-color: #004EE5;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 16rem;
  font-weight: 500;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  background: #e9e8e8;
  margin-top: 2rem;
  font-size: 0.875rem;
  color: #888;
  padding: 1rem 0;

  p {
    margin: 0.5rem 0;
  }
`;

//바로 시작하기 버튼 클릭시 페이지 이동 
const Homemain = () => {
    const navigate = useNavigate();
  
    const handleStartClick = () => {
      navigate('/login'); //추후 수정 필요
    };
    
    return (
        <Container>
        <Title>사회적 고립청년과 자립청년을 위한 플랫폼 ‘WITH’</Title>
        <Descrip>
            고립된 청년들과 자립적인 청년들을 위한 종합 건강 지원을 제공합니다. <br />
            역량 커뮤니티, 심리 상담, 건강 관리 도구, 자립 지원 프로그램 등을 통해 <br /> 함께 더 나은 내일을 만들어가요.
        </Descrip>
        <StartButton onClick={handleStartClick}>바로 시작하기</StartButton>
        <Footer>
            <p>TEL 02-6353-0200 (연결 후 1번 → 4번을 눌러주세요) |  Email inha@naver.com</p>
            <p>Copyright© 2024 Reverse at Inha lionz.</p>
        </Footer>
        </Container>
    );
}

export default Homemain;
