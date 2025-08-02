import React, { useState, useEffect, useRef, createRef } from 'react';
import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
import { gsap } from 'gsap';

const navItems = [
  { name: "About", href: "#About", color: "#f44336" },
  { name: "Skills", href: "#Skills", color: "#e91e63" },
  { name: "Projects", href: "#Project", color: "#9c27b0" },
  { name: "Experience", href: "#Experiance", color: "#673ab7" },
  { name: "Contact", href: "#Contact", color: "#3f51b5" },
  { name: "Links", color: "#0e500aff" }
];

// Styled components for the Navbar
const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 1;
  padding: 10px;
  max-width: 900px;
  margin: 10px auto;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);

  @media (min-width: 651px) {
    justify-content: center;
    flex-wrap: nowrap;
  }
`;

const NavLogo = styled(LinkR)`
  padding: 18px 28px;
  text-decoration: none;
  color: #111;
  font-weight: bold;
  letter-spacing: 0.05em;
  font-size: 14px;
  order: 1;

  @media (min-width: 651px) {
    order: 1;
  }
`;

const MenuItem = styled.a`
  padding: 18px 28px;
  cursor: pointer;
  transition: color 0.3s ease-out;
  text-decoration: none;
  color: #333;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 12px;
  margin: 5px 0;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;

  &.active {
    color: #fff;
  }

  @media (min-width: 651px) {
    width: auto;
    margin: 0;
  }
`;

const Indicator = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 30px;
  display: ${({ $isMobile, $menuOpen }) => 
    ($isMobile && !$menuOpen) ? 'none' : 'block'};
`;

const MenuItemsContainer = styled.div`
  order: 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  max-height: ${({ $isOpen }) => $isOpen ? '500px' : '0'};
  transition: max-height 0.3s ease;
  position: relative;
  z-index: 2;

  @media (min-width: 651px) {
    order: 2;
    width: auto;
    max-height: none;
    flex-direction: row;
    justify-content: center;
  }
`;

const MobileIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.8rem;
  padding: 10px;
  order: 2;
  z-index: 3;

  @media (max-width: 650px) {
    display: block;
  }
`;

// --- REACT COMPONENT ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 650);
  const menuRef = useRef();
  const indicator1Ref = useRef();
  const indicator2Ref = useRef();
  const itemRefs = useRef(navItems.map(() => createRef()));
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 650;
      setIsMobile(mobile);
      
      // Close menu when switching to desktop view
      if (!mobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const animate = () => {
    if (!menuRef.current || !itemRefs.current[activeIndex]?.current) return;

    // Skip animation on mobile when menu is closed
    if (isMobile && !isOpen) return;

    const menuOffset = menuRef.current.getBoundingClientRect();
    const activeItem = itemRefs.current[activeIndex].current;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: navItems[activeIndex].color,
      ease: 'elastic.out(0.7, 0.7)',
      duration: 0.8
    };

    gsap.to(indicator1Ref.current, settings);
    gsap.to(indicator2Ref.current, { ...settings, duration: 1 });
  };

  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [activeIndex, isOpen, isMobile]);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <MenuContainer ref={menuRef}>
      <NavLogo to="/">Portfolio</NavLogo>

      <MenuItemsContainer $isOpen={isOpen}>
        {navItems.map((item, index) => (
          <MenuItem
            key={item.name}
            ref={itemRefs.current[index]}
            className={activeIndex === index ? 'active' : ''}
            onMouseEnter={() => !isMobile && setActiveIndex(index)}
            onClick={() => handleItemClick(index)}
            href={item.href}
          >
            {item.name}
          </MenuItem>
        ))}
      </MenuItemsContainer>

      <MobileIcon onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '☰'}
      </MobileIcon>

      <Indicator 
        ref={indicator1Ref} 
        $isMobile={isMobile} 
        $menuOpen={isOpen} 
      />
      <Indicator 
        ref={indicator2Ref} 
        $isMobile={isMobile} 
        $menuOpen={isOpen} 
      />
    </MenuContainer>
  );
};

export default Navbar;