import React, { useState } from 'react';
import styled from 'styled-components';
import Jointext from '../components/Login/Jointext';
import Loginbutton from '../components/Login/Loginbutton';
import Logintext from '../components/Login/LoginText';
import Logininput from '../components/Login/Logininput';
import axiosInstance from './axiosInstance';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 35rem;
`;

const Errormessage = styled.div`
  color: red;
  margin-bottom: 10px;
  font-size:13px;
`;

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!id || !password) {
            setError('아이디와 비밀번호를 모두 입력해주세요');
            return;
        }

        try {
            const response = await axiosInstance.post('/with/login/', {
                id: id,
                password: password,
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            setError('');
            window.location.href = '/';
        } catch (error) {
            let errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
            if (error.response && error.response.data) {
                errorMessage = error.response.data.error || errorMessage;
            }
            setError(errorMessage);
            console.error('Login error:', error.response || error);
        }
    };

    return (
        <Wrapper>
            <Logintext />
            {error && <Errormessage>{error}</Errormessage>}
            <form onSubmit={handleLogin}>
                <Logininput
                    id={id}
                    password={password}
                    onIdChange={setId}
                    onPasswordChange={setPassword}
                />
                <Loginbutton />
            </form>
            <Jointext />
        </Wrapper>
    );
}

export default Login;
