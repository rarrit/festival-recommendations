import Layout from "@/components/common/Layout"
import Main from "@/pages/Main"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
