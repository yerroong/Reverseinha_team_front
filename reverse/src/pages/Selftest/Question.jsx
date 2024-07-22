import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const Text = styled.p`
  flex: 1;
  text-align: left;
  margin-left: 0.75rem;
  font-size: 14px;
  display: flex;
`;

const Checkbox = styled.input`
  margin-left: 10px;
  margin-right: 10px;
`;

const Question = ({ question, index, onChange }) => {
  return (
    <Container>
      <Text>{question}</Text>
      <Checkbox
        type="checkbox"
        onChange={() => onChange(index)}
      />
    </Container>
  );
};

export default Question;
