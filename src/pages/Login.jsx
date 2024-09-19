import AuthForm from "@/components/auth/AuthForm"
import { handleUserLogin } from "@/core/api/authAPI"
import { useUserLogin } from "@/core/hooks/mutations/authMutation"
import useAuthStore from "@/core/store/authStore"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Login = () => {
  const navigate = useNavigate();
  const {setAccessToken, setNickname, setUserId } = useAuthStore();
  const { mutate: loginUser } = useUserLogin();

  
  const handleLogin = (formData) => {
    loginUser(formData, {
      onSuccess: (response) => {
        setAccessToken(response.accessToken);
        setNickname(response.nickname);
        setUserId(response.userId);    
        alert("로그인 되었습니다. 메인으로 이동합니다.");
        navigate("/", { state: true });
      },
      onError: (error) => {
        alert(error.response?.data?.message || "로그인에 실패했습니다.");
      }
    });
  };

  return (
    <StLoginArea>
      <AuthForm mode={"login"} onSubmit={handleLogin}/>
    </StLoginArea>
  )
}

const StLoginArea = styled.div`
  height: calc(100% - 35px);
`

export default Login
