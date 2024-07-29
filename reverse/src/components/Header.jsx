import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import '../style.css';
import './Fonts.css';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--preset--color--base);
  border-bottom: 1px solid var(--preset--color--contrast-2);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 70px;
    margin-left: 150px;
    cursor: pointer;
  }
`;

const Navigation = styled.nav`
  font-family: 'Notosans';
  font-weight: 400;
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    width: 100px;
    text-align: center;
    border-right: 1px solid var(--preset--color--contrast);
    font-size: 14px;

    &:last-child {
      border-right: unset;
    }
  }

  a {
    text-decoration: none;
    color: var(--preset--color--contrast);
    display: flex;
    align-items: center;
    place-content: center;

    & img {
      display: none;
      width: 12px;
      height: 12px;
      margin-right: 3px;
    }

    &.active {
      color: #000;
      & img {
        display: block;
      }
    }
  }
`;

const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const [token, setToken] = useState(localStorage.getItem('access_token')); // 키 이름 통일

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('access_token')); // 키 이름 통일
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // 사용자가 로그인했는지 여부를 확인하는 추가 로직을 사용할 수 있습니다.
    setToken(localStorage.getItem('access_token')); // 키 이름 통일
  }, [path]);

  return (
    <HeaderContainer className={path || "main"}>
      <Logo>
        <Link to="/">
          <img src="/logo.png" alt="Logo" />
        </Link>
      </Logo>
      <Navigation>
        <ul>
          <li>
            <Link to="/" className={path === "/" ? "active" : ""}>
              홈
            </Link>
          </li>
          <li>
            <Link to="/consulting" className={location.pathname.startsWith('/consulting') ? "active" : ""}>
              상담
            </Link>
          </li>
          <li>
            <Link to="/record" className={path === "/record" ? "active" : ""}>
              기록
            </Link>
          </li>
          <li>
            <Link to="/community" className={path === "/community" ? "active" : ""}>
              커뮤니티
            </Link>
          </li>
          <li>
            <Link to={token ? "/mypage" : "/login"} className={path === "/mypage" || path === "/login" ? "active" : ""}>
              {token ? "마이페이지" : "로그인"}
            </Link>
          </li>
        </ul>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;