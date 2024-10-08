import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import useAuthStore from "@/core/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { Wand } from "lucide-react";
import { mediaQuery } from "@/core/utils/\bresponsive";

const Header = () => {
  const { logout, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    alert("로그아웃 되었습니다. 메인으로 이동합니다.");
    return navigate("/", { state: false });
  };

  return (
    <>
      <GlobalStyle />
      <StHeader>
        <div className="inner">
          <h1>
            <Link to="/">
              <Wand />
              <p>
                <span>수료후에가는</span>
                가을축제핑
              </p>
            </Link>
          </h1>
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
                  <Link to="/sign-up">회원가입</Link>
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
  box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.25);
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 30px;
    ${
      mediaQuery.mobile`
        padding: 0 15px;
      `
    }    
    h1 {
      font-weight: bold;
      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        svg {
          width: 30px;
          height: 30px;
          margin-right: 5px;
          color: #3154b5;
        }
        p {
          display: flex;
          flex-direction: column;
          font-size: 16px;
          color: #000;
          span {
            font-size: 10px;
            color: #868686;
          }
        }
      }
    }
    ul {
      display: flex;
      align-items: center;
      gap: 15px;
      ${
        mediaQuery.mobile`
          gap: 10px;
        `
      }  
      a,
      button {
        display: block;
        text-decoration: none;
        padding: 15px 0;
        font-size: 15px;
        color: #858585;
        border: none;
        background: transparent;
        transition: all 0.25s ease;
        &:hover {
          color: #3154b5;
        }
        ${
          mediaQuery.mobile`
            font-size: 13px;
          `
        }  
      }
    }
  }
`;
export default Header;
