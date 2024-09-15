import AuthForm from '@/components/auth/AuthForm'
import { handleUserRegister } from '@/core/api/authAPI'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const SignUp = () => {
  const navigate = useNavigate();
  const handleSignUp = async (formData) => {
    await handleUserRegister(formData);
    
  }
  return (
    <StSignArea>
      <AuthForm mode={"sign"} onSubmit={handleSignUp}/>
    </StSignArea>
  )
}

const StSignArea = styled.div``
export default SignUp
