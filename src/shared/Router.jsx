import { BrowserRouter, Routes, Route } from "react-router-dom";
import useAuthStore from "@/core/store/authStore";
import Layout from "@/components/common/Layout";
import Main from "@/pages/Main";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import MyPage from "@/pages/MyPage";
import ProtectedRoute from "@/shared/ProtectedRoute";
import PublicRoute from "@/shared/PublicRoute";
import DetailPage from "@/pages/DetailPage";

const Router = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detailpage/:fstvlCo" element={<DetailPage />} />
          {/* 디테일 페이지 */}
          <Route
            path="/login"
            element={
              <PublicRoute isLogin={isLoggedIn}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/sign"
            element={
              <PublicRoute isLogin={isLoggedIn}>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute isLogin={isLoggedIn}>
                <MyPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
