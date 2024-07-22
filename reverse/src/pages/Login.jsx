import React from 'react';
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

const Login = () => {
    return (
        <Wrapper>
            <Logintext />
            <Loginsocial />
            <Logininput />
            <Loginbutton />
            <Jointext />
        </Wrapper>
    );
}

export default Login;