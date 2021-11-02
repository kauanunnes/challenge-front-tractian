import styled from 'styled-components'

export const NavBar = styled.nav`
  width: 100%;
  height: 65px;
  
  background: #ECECEC;

  display: flex;
  justify-content: space-between;
  color: #031D44;
  align-items: center;
  
  padding: 5px 15px;
  
  h1 {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #031D44;
  }

  a:hover {
    text-decoration: underline;
  }

  ul {
    display: flex;
    list-style-type: none;
    gap: 15px;
    margin: 0;
  }
`