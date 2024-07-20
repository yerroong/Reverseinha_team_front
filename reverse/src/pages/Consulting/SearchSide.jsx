import React, { useState } from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 1rem;
  padding-left: 0.5rem;
`;

const SearchSideContainer = styled.div`
  width: 20rem;
  height: 50rem;
  background-color: #F4F4F4;
  padding: 1rem;
  margin-right: 2rem;
`;

const SearchBox = styled.div`
  background-color: #FFF;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
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
`;

const FilterSection = styled.div`
  background-color: #FFF;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #C6C6C6;
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

const SearchSide = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    free: false,
    premium: false,
    searchTerm: '',
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
            <FilterCheckbox type="checkbox" />
            비대면 프로그램
          </FilterLabel>
          <FilterLabel>
            <FilterCheckbox type="checkbox" />
            대면프로그램
          </FilterLabel>
          <FilterLabel>
            <FilterCheckbox type="checkbox" />
            전화상담
          </FilterLabel>
          <FilterLabel>
            <FilterCheckbox type="checkbox" />
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
      </SearchSideContainer>
    </MainContainer>
  );
};

export default SearchSide;