import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import { LoginContext } from '../../contexts/LoginContextProvider';

const Header = () => {

    // isLogin   : 로그인 여부 - Y(true), N(false)
    // logout()  : 로그아웃 함수 - setIsLogin(false)
    const { isLogin, userInfo, logout } = useContext(LoginContext);
    return (
      <header>
          <div className="logo">
              <Link to="/">
                <span className="logo-text">가보자 GO</span> {/* 로고 옆에 텍스트 추가 */}
              </Link>
          </div>
          <div className="util">
              <ul>
                {/* 로그인 여부에 따라 조건부 랜더링 */}
                { !isLogin ? 
                  <>
                    <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/join">회원가입</Link></li>
                    <li><Link to="/post">게시판 </Link></li>
                    <li><Link to="/about">소개</Link></li>
                    <li><Link to="/admin">관리자</Link></li>
                  </>
                :
                  <>
                    <li style={{ color: 'lightseagreen' }}> {userInfo?.username} 님 환영합니다 !     </li>
                    <li><Link to="/post">게시판 </Link></li>
                    <li><Link to="/user">마이페이지 </Link></li>
                    <li><Link to="/admin">관리자</Link></li>

                    <li><button className='btn-logout' onClick={ () => logout() }>로그아웃</button></li>
                  </>
                }
              </ul>
          </div>
      </header>
  )
}

export default Header