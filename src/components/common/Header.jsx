import styled from "styled-components"
import GlobalStyle from "./GlobalStyle"

const Header = () => {
  return (
    <>
      <GlobalStyle/>
      <StHeader>
        <div className="inner">
          헤더
        </div>
      </StHeader>
    </>
  )
}

const StHeader = styled.header``
export default Header
