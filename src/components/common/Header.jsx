import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"
import useAuthStore from "@/core/store/authStore";
import { Link, useNavigate } from "react-router-dom"

const Header = ( ) => {
  const { logout, isLoggedIn } = useAuthStore();  
  const navigate = useNavigate();
  const handleLogout = () => {    
    logout();
    alert("로그아웃 되었습니다. 메인으로 이동합니다.");
    return navigate("/");
    
  }

  return (
    <>
      <GlobalStyle/>
      <StHeader>
        <div className="inner">
          <h1></h1>
          <ul>
            {
              isLoggedIn ? (
                <>
                  <li><Link to="/mypage">마이페이지</Link></li>
                  <li><button onClick={handleLogout}>로그아웃</button></li>
                </>
              ) : (
              <>
                <li><Link to="/login">로그인</Link></li>
                <li><Link to="/sign">회원가입</Link></li>
              </>
              )
            }            
          </ul>
        </div>
      </StHeader>
    </>
  )
}

const StHeader = styled.header``
export default Header
