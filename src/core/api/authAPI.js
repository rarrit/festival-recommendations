import USER_API from "../instance/userInstance";

// 회원가입
export const handleUserRegister = async (userData) => {
  const response = await USER_API.post("/register", userData);
  return response.data;
};

// 로그인
export const handleUserLogin = async (loginData) => {
  const response = await USER_API.post("/login", loginData);
  return response.data;
};

// 프로필
export const handleUserProfile = async (token) => {
  const response = await USER_API.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

// 업데이트
export const handleUserUpdate = async (userData) => {
  const token = localStorage.getItem("accessToken");
  const response = await USER_API.patch("/profile", userData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
