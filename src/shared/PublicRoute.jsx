import useAuthStore from '@/core/store/authStore';
import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  if(isLoggedIn) {
    alert("현재 로그인되어있습니다.");
    return <Navigate to="/"/>
  }
  return children;
}

export default PublicRoute
