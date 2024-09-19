import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import useAuthStore from "@/core/store/authStore";
import { Link, useNavigate } from "react-router-dom";
// import logo from "@/assets/img/logo.png"

const Header = () => {
  const { logout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다. 메인으로 이동합니다.");
    return navigate("/");
  };

  return (
    <>
      <GlobalStyle />
      <StHeader>
        <div className="inner">
          <h1><Link to="/">가을축제핑</Link></h1>
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/mypage">마이페이지</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>로그아웃</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">로그인</Link>
                </li>
                <li>
                  <Link to="/sign">회원가입</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </StHeader>
    </>
  );
};

const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  background: #fff;
  box-shadow: .5px .5px 10px rgba(0,0,0,.25);
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 30px;
    h1 {
      font-weight: bold;
    }
    ul {
      display: flex;
      align-items: center;
      gap: 15px;
      a, button {
        display: block;
        text-decoration: none;
        padding: 15px 0;
        font-size: 15px;
        color: #858585;
        border: none;
        background: transparent;
        transition: all .25s ease;
        &:hover {
          color:#3154b5;
        }
      }
    }
  }
`;
export default Header;
