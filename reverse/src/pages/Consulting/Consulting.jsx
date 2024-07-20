import React, { useState } from 'react';
import styled from 'styled-components';
import SearchSide from './SearchSide';
import Modal from 'react-modal';

const ConsultingContainer = styled.div`
  display: flex;
  background-color: #FFF;
  padding: 2rem;
`;

const ResultSide = styled.div`
  flex: 1;
  padding: 2rem;
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
  background-color: #FFF;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
`;

const ResultContent = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const ResultImage = styled.img`
  width: 6rem;
  height: 6rem;
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
  color: #0062DC;
`;

const ResultDescription = styled.p`
  color: #7D7D7D;
  margin: 0.5rem 0 0 0;
`;

const Prices = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #C6C6C6;
  padding-top: 1rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SitePrice = styled.div`
  display: flex;
  align-items: center;
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
  background-color: #C6D700;
`;

const CallIconWrapper = styled(PriceIconWrapper)`
  background-color: #00BD1E;
`;

const LocationIconWrapper = styled(PriceIconWrapper)`
  background-color: #FFB800;
`;

const PriceIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;

const PriceText = styled.span`
  font-size: 1.2rem;
`;

// Modal Styles
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

const ModalForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 80%;
  border: 1px solid #C6C6C6;
  box-sizing: border-box;
  font-family: inherit;
`;

const TextArea = styled.textarea`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 80%;
  height: 100px;
  border: 1px solid #C6C6C6;
  box-sizing: border-box;
  font-family: inherit;
`;

const Button = styled.button`
  margin: 1rem 0.5rem 0 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const WarningText = styled.p`
  color: #888888;
  font-size: 0.7rem;
  font-family: inherit;
`;

const Separator = styled.div`
  border-bottom: 1px solid #567191;
  width: 90%;
  margin: 1rem 0;
  align-self: center;
`;

const consultingData = [
  {
    id: 'supportCenter',
    imgSrc: '/consul1.png',
    title: '사회적고립기구',
    type: '지원센터',
    description: '#고독사예방 #사회적고립예방 #서울 사회적고립가구와 고독사 예방, 지원을 위해 전국 최초로 서울시가 설치한 전문기관',
    prices: {
      message: '무료',
      call: '무료',
      site: '사이트',
    },
  },
  {
    id: 'kimYoungMi',
    imgSrc: '/consul2.png',
    title: '김영미',
    type: '상담사',
    description: '#상담분야 #심리상담 #서울 상담심리사로서 다년간의 상담 경험을 바탕으로 청소년 상담을 진행',
    prices: {
      message: '30,000원',
      call: '30,000원',
      site: '문의하기',
    },
  },
  {
    id: 'kimOkJa',
    imgSrc: '/consul3.png',
    title: '김옥자',
    type: '상담사',
    description: '#상담분야 #가족상담 #서울 가족상담사로서 가족 간의 갈등 해결 및 소통을 돕는 상담을 진행',
    prices: {
      message: '30,000원',
      call: '30,000원',
      site: '문의하기',
    },
  },
];

const Consulting = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    free: false,
    premium: false,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredData = consultingData.filter((consultant) => {
    if (filters.free && filters.premium) {
      return true;
    } else if (filters.free) {
      return consultant.prices.message === '무료';
    } else if (filters.premium) {
      return consultant.prices.message !== '무료';
    } else {
      return true;
    }
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
                  <ResultTitle>
                    {consultant.title} <Highlight>{consultant.type}</Highlight>
                  </ResultTitle>
                  <ResultDescription>
                    {consultant.description.split(' ').slice(0, 3).join(' ')}
                    <br />
                    {consultant.description.split(' ').slice(3).join(' ')}
                  </ResultDescription>
                </ResultDetails>
              </ResultContent>
              <Prices>
                <Price onClick={openModal}>
                  <MessageIconWrapper>
                    <PriceIcon src="/message.png" />
                  </MessageIconWrapper>
                  <PriceText>{consultant.prices.message}</PriceText>
                </Price>
                <Price onClick={openModal}>
                  <CallIconWrapper>
                    <PriceIcon src="/call.png" />
                  </CallIconWrapper>
                  <PriceText>{consultant.prices.call}</PriceText>
                </Price>
                {consultant.prices.site === '문의하기' ? (
                  <Price onClick={openModal}>
                    <LocationIconWrapper>
                      <PriceIcon src="/location.png" />
                    </LocationIconWrapper>
                    <PriceText>{consultant.prices.site}</PriceText>
                  </Price>
                ) : (
                  <SitePrice>
                    <LocationIconWrapper>
                      <PriceIcon src="/location.png" />
                    </LocationIconWrapper>
                    <PriceText>{consultant.prices.site}</PriceText>
                  </SitePrice>
                )}
              </Prices>
            </ResultItem>
          ))}
        </Result>
      </ResultSide>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Application Form"
      >
        <h2>신청</h2>
        <Separator />
        <ModalForm>
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="나이" />
          <Input type="text" placeholder="전화번호" />
          <Input type="text" placeholder="가능한 시간대" />
          <TextArea placeholder="신청 사유" />
          <WarningText>
            신청된 정보는 상담사에게 전달됩니다. 상담 시간 및 신청 조율은 개인 문자 확인바랍니다.
            <br />
            상담 사유가 적절하다고 판단하지 않을시 신청이 취소될 수 있습니다.
          </WarningText>
          <div>
            <Button onClick={closeModal}>취소</Button>
            <Button>신청</Button>
          </div>
        </ModalForm>
      </Modal>
    </ConsultingContainer>
  );
};

export default Consulting;