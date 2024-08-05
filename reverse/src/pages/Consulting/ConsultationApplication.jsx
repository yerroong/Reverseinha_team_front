import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../axiosInstance'; // axiosInstance는 올바른 베이스 URL을 포함해야 함

// 스타일 컴포넌트 설정
const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 100%;
  height: 100px;
  border: 1px solid #c6c6c6;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  margin-top: 1rem;
  border: none;
  border-radius: 12px;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  font-weight: bold;
  text-align: center;
`;

const Separator = styled.div`
  border-bottom: 1px solid #567191;
  width: 100%;
  margin: 1rem 0;
`;

const WarningText = styled.p`
  color: #888888;
  font-size: 0.8rem;
  text-align: center;
`;

const ConsultationApplication = () => {
  const [form, setForm] = useState({
    available_time: '',
    reason: '',
    phone_number: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { available_time, reason, phone_number } = form;

    // 필드 유효성 검사
    if (!available_time || !reason || !phone_number) {
      setSuccessMessage('모든 필드를 입력해주세요.');
      setIsError(true);
      return;
    }

    const dataToSend = { available_time, reason, phone_number };

    try {
      setSuccessMessage('신청을 처리 중입니다...');

      // 요청 보내기 전에 토큰 유효성 검사
      const token = localStorage.getItem('access_token');
      if (!token) {
        setSuccessMessage('로그인이 필요합니다.');
        setIsError(true);
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
        return;
      }

      // 엔드포인트 수정: 변경된 경로로 API 호출
      const response = await axiosInstance.post('/with/consulting/application/', dataToSend);

      console.log('Form submitted successfully:', response.data);

      setSuccessMessage('신청이 완료되었습니다. 마이페이지에서 신청기록을 확인할 수 있습니다.');
      setIsError(false);
      setForm({
        available_time: '',
        reason: '',
        phone_number: '',
      });
    } catch (error) {
      console.error('신청 중 오류가 발생했습니다:', error);
      
      if (error.response && error.response.status === 401) {
        // 인증 오류 처리
        setSuccessMessage('토큰이 유효하지 않습니다. 다시 로그인하세요.');
        setIsError(true);
        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';
      } else {
        setSuccessMessage('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        setIsError(true);
      }
    }
  };

  return (
    <Container>
      <Title>상담 신청</Title>
      <Form>
        <Input
          type="tel"
          name="phone_number"
          placeholder="전화번호"
          value={form.phone_number}
          onChange={handleInputChange}
        />
        <Input
          type="datetime-local"
          name="available_time"
          placeholder="가능한 시간"
          value={form.available_time}
          onChange={handleInputChange}
        />
        <TextArea
          name="reason"
          placeholder="상담 이유"
          value={form.reason}
          onChange={handleInputChange}
        />
        <WarningText>
          무료/유료 서비스에 대한 상담 예약을 위해 위 정보를 정확히 기입해주세요. <br />
          상담사가 확인 후 상담 조율에 대해 개별 연락 드립니다.
        </WarningText>
        <Button onClick={handleSubmit}>신청</Button>
        {successMessage && (
          <>
            <Separator />
            <Message isError={isError}>{successMessage}</Message>
          </>
        )}
      </Form>
    </Container>
  );
};

export default ConsultationApplication;
