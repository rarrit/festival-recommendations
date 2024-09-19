import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <StContainer id="container">
      <Header />
      {children}
      <Footer />
    </StContainer>
  );
};

const StContainer = styled.div`
  height: calc(100vh - 47px);
  padding: 52.4px 0 0 0;

`;
export default Layout;
