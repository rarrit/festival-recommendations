import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <StAuthForm onSubmit={handleSubmit}>
      <div className="formInner">
        <h2>{mode === "login" ? "Login" : "SignUp"}</h2>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          required
        />
        {mode === "sign" ? (
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="닉네임을 입력해주세요."
            required
          />
        ) : (
          ""
        )}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          required
        />
        <button type="submit">{mode === "login" ? "로그인" : "회원가입"}</button>
        <div className="linkArea">
          {mode === "login" ? <Link to={`/sign`}>회원가입</Link> : <Link to={`/login`}>로그인</Link>}
        </div>
      </div>
    </StAuthForm>
  );
};

const StAuthForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .formInner {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0.5px 0.5px 10px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    padding: 50px 30px;
    h2 {
      font-size: 40px;
      font-weight: bold;
      text-align: center;
      margin: 0 0 20px;
    }
    input {
      height: 60px;
      padding: 15px;
      border: 1px solid #e5e5e5;
      border-radius: 10px;
      &:focus {
        outline: 1px solid #3154b5;
      }
    }
    button {
      height: 60px;
      font-size: 20px;
      color: white;
      background: #3154b5;
      border: 0px;
      border-radius: 10px;
    }
    a {
      font-size: 16px;
      color: #000;
      display: block;
      text-align: center;
      margin: 15px 0 0 0;
    }
  }
`;

export default AuthForm;
