import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Link  as LinkR} from 'react-router-dom'
const NavbarContainer = styled.div`
    width: 100%;  
    height: 60px;
    background-color: ${({ theme }) => theme.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 1rem;
    position : sticky;
    
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;
const Navlogo = styled(LinkR)`
   padding: 0 6px;
   text-decoration: none;
   color: white;
`;
const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    padding: 0 6px;
    list-style: none;
`;
const NavLink = styled.a`
  text-decoration: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: ${({ theme }) => theme.text_primary };
  &:hover {
    color: #00bcd4;
  }
`;
const NavButton = styled.button`
  padding: 8px 16px;
  background-color: #00bcd4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    background-color: #008c9e;
  }
`;
const Navbar = () => {
  return <NavbarContainer>
    <Navlogo to="/">Portfolio</Navlogo>
    <NavItems>
        <NavLink href = "#About">About</NavLink>
        <NavLink href = "#Skills">Skills</NavLink>
        <NavLink href = "#Project">Projects</NavLink>
        <NavLink href = "#Experiance">Experiance</NavLink>
        
    </NavItems>
    {/* <NavItems>
        <NavLink href = "">Contact</NavLink>
    </NavItems> */}
     <NavButton>Contact</NavButton>
  
    </NavbarContainer>
}

export default Navbar