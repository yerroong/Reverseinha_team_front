import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://withinha.kro.kr', // API의 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // 저장된 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 요청 헤더에 토큰 추가
      console.log('Token added to request:', token); // 콘솔에 토큰 출력
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized: Token is invalid or expired');
        handleLogout();
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error('Timeout error: Server took too long to respond');
      handleLogout();
    }
    return Promise.reject(error);
  }
);

// 로그아웃 처리 함수
const handleLogout = () => {
  localStorage.removeItem('access_token');
  window.location.href = '/'; // 홈 페이지로 이동
};

export default axiosInstance;
