import AuthForm from "@/components/auth/AuthForm";
import { handleUserRegister } from "@/core/api/authAPI";
import { useUserRegister } from "@/core/hooks/mutations/authMutation";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();

  const { mutate: registerUser, isPending, isError } = useUserRegister();
  if (isPending) return <div>로딩중 입니다.</div>;

  const handleSignUp = (formData) => {
    registerUser(formData, {
      onSuccess: (response) => {
        alert(`${response.message}, 로그인 페이지로 이동합니다.`);
        navigate("/login");
      },
      onError: (error) => {
        alert(error.response?.data?.message || "회원가입에 실패했습니다.");
      }
    });
  };
  return (
    <StSignArea>
      <AuthForm mode={"sign"} onSubmit={handleSignUp} />
    </StSignArea>
  );
};

const StSignArea = styled.div`
  height: calc(100% - 35px);
`;
export default SignUp;
