import React, { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 1rem;
  padding-left: 0.5rem;
`;

const SearchSideContainer = styled.div`
  width: 20rem;
  height: 57rem;
  background-color: #F4F4F4;
  padding: 1rem;
  margin-right: 2rem;
  border-radius: 0.1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchBox = styled.div`
  background-color: #FFF;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.div`
  width: 1.8em;
  height: 1.8rem;
  margin-left: 0.3rem;
  margin-right: 0.5rem;
  background-image: url('/search.png');
  background-size: cover;
  background-position: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 0.2rem;
`;

const FilterSection = styled.div`
  background-color: #FFF;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdviceSection = styled.div`
  background-color: #FFF;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const AdviceTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  border-bottom: 1px solid #C6C6C6;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
`;

const AdviceLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  padding-top: 0.3rem;
`;

const AdviceText = styled.p`
  padding-bottom: 0.1rem;
  font-size: 1rem;
  letter-spacing: 0.05rem;
`;

const FilterTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  border-bottom: 1px solid #C6C6C6;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  padding-top: 0.3rem;
`;

const FilterCheckbox = styled.input`
  margin-right: 0.5rem;
  accent-color: #0062DC;
`;

const Detail = styled.div`
  padding-top: 0.25rem;
  padding-bottom: 0.1rem;
`;

const Strong1 = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
`;

const SearchSide = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    free: false,
    premium: false,
    searchTerm: '',
    phoneConsultation: false,
    inPersonConsultation: false,
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <MainContainer>
      <SearchSideContainer>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="상담사/멘토링 검색"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
        </SearchBox>
        <FilterSection>
          <FilterTitle>찾는 유형</FilterTitle>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={filters.phoneConsultation}
              onChange={() =>
                handleFilterChange('phoneConsultation', !filters.phoneConsultation)
              }
            />
            전화상담
          </FilterLabel>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={filters.inPersonConsultation}
              onChange={() =>
                handleFilterChange('inPersonConsultation', !filters.inPersonConsultation)
              }
            />
            대면상담
          </FilterLabel>
        </FilterSection>
        <FilterSection>
          <FilterTitle>상세조건</FilterTitle>
          <Detail>가격</Detail>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={filters.free}
              onChange={() => handleFilterChange('free', !filters.free)}
            />
            무료
          </FilterLabel>
          <FilterLabel>
            <FilterCheckbox
              type="checkbox"
              checked={filters.premium}
              onChange={() => handleFilterChange('premium', !filters.premium)}
            />
            프리미엄
          </FilterLabel>
        </FilterSection>
        <AdviceSection>
          <AdviceTitle>상담서비스 도움말</AdviceTitle>
          <AdviceLabel />
          <AdviceText>
            각 상담사 또는 기관의 프로필을 참고하여 <strong>상담 유형</strong>, <strong>상담비용</strong>, <strong>상담 가능 시간</strong>을 확인하고 상담을 신청할 수 있습니다. 
            <br /><br />
            <Strong1>상담 신청 방법</Strong1>
            상담 신청을 위해 <strong>전화번호</strong>, <strong>원하는 상담 날짜와 시간</strong>, <strong>상담 사유</strong>를 입력한 후 신청 버튼을 눌러 상담 예약을 완료할 수 있습니다. 
            상담사가 확인 후 개별 연락을 통해 상담 일정을 조율해 드립니다.
            <br /><br /><br />
            추가 문의 사항이 있으시면 언제든지 문의해 주세요.
          </AdviceText>
        </AdviceSection>
      </SearchSideContainer>
    </MainContainer>
  );
};

export default SearchSide;
