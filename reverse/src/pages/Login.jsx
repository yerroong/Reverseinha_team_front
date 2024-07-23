import React, { useState }  from 'react';
import styled from 'styled-components';
import Jointext from '../components/Login/Jointext';
import Loginbutton from '../components/Login/Loginbutton';
import Logintext from '../components/Login/LoginText';
import Logininput from '../components/Login/Logininput';
import Loginsocial from '../components/Login/Loginsocial';

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

    const handleLogin = (event) => {
        event.preventDefault();
        if (!id || !password) {
        setError('아이디와 비밀번호를 모두 입력해주세요');
        } else {
        setError('');
        }
    };
    return (
        <Wrapper>
            <Logintext />
            <Loginsocial />
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