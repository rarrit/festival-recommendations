import { useState } from "react";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit}) => {

  const [formData, setFormData] = useState({
    id       : "",
    password : "",
    nickname : ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <StAuthForm onSubmit={handleSubmit}>
      <h2>
        {mode === "login" ? "로그인" : "회원가입"}
      </h2>
      <input 
        type="text" 
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디를 입력해주세요."
        required
      />
      <input 
        type="password" 
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해주세요."
        required
      />
      {
        mode === "sign" 
        ? (
          <input 
            type="text" 
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        ) : (
          ""
        )
      }      
      <button 
        type="submit">
        { mode === "login" ? "로그인" : "회원가입" }
      </button>
    </StAuthForm>
  )
}

const StAuthForm = styled.form`
  
`

export default AuthForm
