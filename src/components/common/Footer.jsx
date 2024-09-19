import { memberProfile } from "@/core/utils/memberProfile"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Footer = () => {
  return (
    <StFooter>
      <div className="inner">
        <strong>가을축제핑</strong>
        <ul>
          {
            memberProfile.map(member => {
              return (
                <li key={member.id}>
                  {member.name}
                  <div className="linkBox">
                    <Link>깃</Link>/
                    <Link>블로그</Link>
                  </div>
                </li>
              )
            })
          }          
        </ul>
      </div>
      <div className="copyright">
        Copyright 2024. <b>가을축제핑</b> All pictures cannot be copied without permission. 
      </div>
    </StFooter>
  )
}

const StFooter = styled.footer`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #e1e1e1;
  box-shadow: .5px -.5px 10px rgba(0,0,0,.15);  
  .copyright {
    font-size: 11px;
    font-weight: 300;
    color: #858585;
    text-align: center;
    padding: 5px 0;
    border-top: 1px solid #e1e1e1;
    b {      
      font-weight: 400;
    }
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px 30px;
    strong {
      font-weight: bold;
    }
    ul {
      display: flex;
      align-items: center;
      gap: 15px;
      li {
        font-size: 12px
      }
    }
  }
`
export default Footer
