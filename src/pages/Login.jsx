import AuthForm from "@/components/auth/AuthForm"
import { handleUserLogin, handleUserProfile } from "@/core/api/authAPI"
import useAuthStore from "@/core/store/authStore"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Login = () => {
  const navigate = useNavigate();
  const {setAccessToken, setNickname, setUserId } = useAuthStore();

  const handleLogin = async (formData) => {
    try{
      const loginData = await handleUserLogin(formData);
      setAccessToken(loginData.accessToken);
      setNickname(loginData.nickname);
      setUserId(loginData.userId);    
      alert("로그인 되었습니다. 메인으로 이동합니다.");
      navigate("/", {
        state: true
      });
    }catch(e){
      console.log("에러가 발생했습니다.", e);
    }
  }

  return (
    <StLoginArea>
      <AuthForm mode={"login"} onSubmit={handleLogin}/>
    </StLoginArea>
  )
}

const StLoginArea = styled.div`
  
`

export default Login
