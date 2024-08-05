import axios from 'axios';

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
    if (error.response.status === 401) {
      console.error('Unauthorized: Token is invalid or expired');
      // 여기서 추가적인 처리(예: 로그인 페이지로 리디렉션)를 할 수 있습니다.
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;