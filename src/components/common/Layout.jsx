import React from 'react'
import styled from 'styled-components'
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {  
  return (
    <StContainer id='container'>
      <Header/>
      { children }
      <Footer/>
    </StContainer>
  )
}

const StContainer = styled.div``;
export default Layout
