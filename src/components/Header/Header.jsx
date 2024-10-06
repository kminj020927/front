import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { LoginContext } from '../../contexts/LoginContextProvider';


const Header = () => {
  const { isLogin, userInfo, logout } = useContext(LoginContext);

  // 드롭다운 상태 관리
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 드롭다운 토글 함수
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <span className="logo-text">GaJa</span>
        </Link>
      </div>
      <div className="util">
        <ul>
          {/* 로그인 여부에 따라 조건부 렌더링 */}
          {!isLogin ? (
            <>
              <li><Link to="/login">로그인</Link></li>
              <li><Link to="/join">회원가입</Link></li>
              <li className="dropdown">
                {/* 게시판 버튼 클릭 시 드롭다운 토글 */}
                <button className="dropbtn" onClick={toggleDropdown}>게시판</button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/postCom">동행모집</Link>
                    <Link to="/post">자유게시판</Link>
                  </div>
                )}
              </li>
              <li><Link to="/about">소개</Link></li>
              <li><Link to="/admin">관리자</Link></li>
            </>
          ) : (
            <>
              <li style={{ color: '#4CAF50' }}>{userInfo?.username} 님 환영합니다!!</li>
              <li className="dropdown">
                {/* 로그인 후에도 게시판 드롭다운 */}
                <button className="dropbtn" onClick={toggleDropdown}>게시판</button>
                {dropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/post/companion">동행모집</Link>
                    <Link to="/post/free">자유게시판</Link>
                  </div>
                )}
              </li>
              <li><Link to="/user">마이페이지</Link></li>
              <li><Link to="/admin">관리자</Link></li>
              <li>
                <button className="btn-logout" onClick={() => logout()}>로그아웃</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
