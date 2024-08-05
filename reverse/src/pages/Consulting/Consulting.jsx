import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchSide from './SearchSide'; // Make sure this component exists
import Modal from 'react-modal';
import '../../components/Fonts.css';

// Styled components
const ConsultingContainer = styled.div`
  display: flex;
  background-color: #fff;
  padding: 2rem 10rem;
`;

const ResultSide = styled.div`
  flex: 1;
  padding: 1rem;
`;

const ResultHeader = styled.h2`
  margin-bottom: 1rem;
`;

const ResultBorder = styled.div`
  border-bottom: 1px solid #000;
  margin-bottom: 1rem;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 1rem;
  border: 1px solid #c6c6c6;
`;

const ResultContent = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const ResultImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const ResultDetails = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h3`
  margin: 0;
  font-size: 1.6rem;
`;

const Highlight = styled.span`
  color: #0062dc;
`;

const ResultDescription = styled.p`
  color: #7d7d7d;
  margin: 0.5rem 0 0 0;
`;

const Prices = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #c6c6c6;
  padding-top: 1rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const PriceIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  border-radius: 50%;
`;

const MessageIconWrapper = styled(PriceIconWrapper)`
  background-color: #c6d700;
`;

const CallIconWrapper = styled(PriceIconWrapper)`
  background-color: #00bd1e;
`;

const LocationIconWrapper = styled(PriceIconWrapper)`
  background-color: #ffb800;
`;

const PriceIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const PriceText = styled.span`
  font-size: 1.2rem;
`;

// Define Modal Styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
    padding: '20px',
    textAlign: 'center',
  },
};

// Define Button Component
const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  margin-top: 0.75rem;
  border: none;
  border-radius: 12px;
  &:hover {
    background-color: #0056b3;
  }
`;

// Sample data for consulting services
const consultingData = [
  {
    id: 'supportCenter',
    imgSrc: '/consul1.png',
    title: '사회적고립기구',
    type: '지원센터',
    description:
      '#고독사예방 #사회적고립예방 #서울 사회적고립가구와 고독사 문제를 해결하기 위한 다양한 프로그램과 지원을 제공',
    prices: {
      message: '무료',
      call: '무료',
      site: '사이트',
    },
  },
  {
    id: 'kimYoungMi',
    imgSrc: '/consul4.png',
    title: '김영미',
    type: '상담사',
    description:
      '#청년상담 #취업상담 #자립상담 #비대면 사회에 나가기 막막하신 분들 상담을 진행합니다. 평일 12~18시 상담 대기중',
    prices: {
      message: '30,000원',
      call: '30,000원',
      site: '문의하기',
    },
  },
  {
    id: 'kimOkJa',
    imgSrc: '/consul5.png',
    title: '최윤정',
    type: '상담사',
    description:
      '#외로움 #고독 #정신상담 #심리상담 #비대면 인하대 정신센터 근무중입니다. 휴일제외 12~18시 상담 대기중',
    prices: {
      message: '30,000원',
      call: '30,000원',
      site: '문의하기',
    },
  },
];

const Consulting = () => {
  const [loginPromptIsOpen, setLoginPromptIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    free: false,
    premium: false,
    searchTerm: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLoginConfirm = () => {
    setLoginPromptIsOpen(false);
    window.location.href = '/login';
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handlePriceClick = () => {
    if (!localStorage.getItem('access_token')) {
      setLoginPromptIsOpen(true);
    } else {
      navigate('/consulting/application'); // Navigate to the new consultation application page
    }
  };

  const filteredData = consultingData.filter((consultant) => {
    const matchesFree = filters.free ? consultant.prices.message === '무료' : true;
    const matchesPremium = filters.premium ? consultant.prices.message !== '무료' : true;
    const matchesSearchTerm =
      consultant.title.includes(filters.searchTerm) ||
      consultant.description.includes(filters.searchTerm);

    return matchesFree && matchesPremium && matchesSearchTerm;
  });

  return (
    <ConsultingContainer>
      <SearchSide onFilterChange={handleFilterChange} />
      <ResultSide>
        <ResultHeader>상담 서비스 / 청년 멘토링 찾기</ResultHeader>
        <ResultBorder />
        <Result>
          {filteredData.map((consultant) => (
            <ResultItem key={consultant.id}>
              <ResultContent>
                <ResultImage src={consultant.imgSrc} alt={consultant.title} />
                <ResultDetails>
                  <ResultTitle>{consultant.title}</ResultTitle>
                  <Highlight>{consultant.type}</Highlight>
                  <ResultDescription>{consultant.description}</ResultDescription>
                </ResultDetails>
              </ResultContent>
              <Prices>
                <Price onClick={handlePriceClick}>
                  <MessageIconWrapper>
                    <PriceIcon src="/message.png" alt="Message" />
                  </MessageIconWrapper>
                  <PriceText>문자상담: {consultant.prices.message}</PriceText>
                </Price>
                <Price onClick={handlePriceClick}>
                  <CallIconWrapper>
                    <PriceIcon src="/call.png" alt="Call" />
                  </CallIconWrapper>
                  <PriceText>전화상담: {consultant.prices.call}</PriceText>
                </Price>
                <Price onClick={handlePriceClick}>
                  <LocationIconWrapper>
                    <PriceIcon src="/location.png" alt="Location" />
                  </LocationIconWrapper>
                  <PriceText>현장상담: {consultant.prices.site}</PriceText>
                </Price>
              </Prices>
            </ResultItem>
          ))}
        </Result>
      </ResultSide>

      {loginPromptIsOpen && (
        <Modal
          isOpen={loginPromptIsOpen}
          onRequestClose={() => setLoginPromptIsOpen(false)}
          contentLabel="로그인 필요"
          ariaHideApp={false}
          style={customStyles}
        >
          <h2>로그인이 필요합니다</h2>
          <p>상담 신청을 위해 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?</p>
          <Button onClick={handleLoginConfirm}>로그인 하러가기</Button>
        </Modal>
      )}
    </ConsultingContainer>
  );
};

export default Consulting;
