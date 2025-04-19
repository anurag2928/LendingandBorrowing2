import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Container, Button } from '../../styles/CommonStyles';
import { media } from '../../styles/responsive';

const HeaderWrapper = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 10px 0;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  width: 100px;
  height: 52px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;

  ${media.md} {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    flex-direction: column;
    justify-content: center;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)<{ active?: boolean }>`
  margin: 0 12px;
  color: ${({ theme, active }) => active ? theme.colors.primaryLight : theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 14px;
  letter-spacing: 0.5px;
  transition: color 0.2s ease;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  ${media.md} {
    margin: 10px 0;
    font-size: 18px;
  }

  ${({ active }) => active && `
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
    }
  `}
`;

const DropdownContent = styled.div<{ isVisible: boolean }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px 0;
  z-index: 1;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
  transform: ${({ isVisible }) => isVisible ? 'translateY(0)' : 'translateY(-10px)'};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  top: 40px;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayLight};
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 12px;

  ${media.md} {
    margin: 10px 0;
  }
`;

const DropdownTrigger = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }

  ${media.md} {
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  ${media.md} {
    flex-direction: column;
    margin-top: 20px;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
  z-index: 1001;

  ${media.md} {
    display: block;
  }
`;

interface DropdownProps {
  label: string;
  items: { label: string; link: string }[];
}

const Dropdown = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownTrigger onClick={() => setIsOpen(!isOpen)}>
        {label}
      </DropdownTrigger>
      <DropdownContent isVisible={isOpen}>
        {items.map((item) => (
          <DropdownItem key={item.link} to={item.link}>
            {item.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const businessesDropdown = [
    { label: 'Business Loans', link: '/businesses/businessloans' },
    { label: 'Platform Offering', link: '/businesses/platform' }
  ];

  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Logo to="/">
          <img src="https://ext.same-assets.com/4108832712/3783633550.svg" alt="Rocko Logo" />
        </Logo>

        <MobileToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileToggle>

        <NavLinks isOpen={isMenuOpen}>
          <Dropdown label="BUSINESSES" items={businessesDropdown} />
          <NavLink to="/why-defi" active={currentPath === '/why-defi'}>WHY DEFI?</NavLink>
          <NavLink to="/about" active={currentPath === '/about'}>ABOUT US</NavLink>
          <NavLink to="/faq" active={currentPath === '/faq'}>FAQ</NavLink>
          <NavLink to="/contact" active={currentPath === '/contact'}>CONTACT</NavLink>
          <NavLink to="/learn" active={currentPath === '/learn'}>LEARN</NavLink>

          <ButtonContainer>
            <Button as={Link} to="/get-a-loan" variant="primary" size="medium" style={{ marginRight: '10px' }}>
              GET A LOAN
            </Button>
            <Button as="a" href="#" variant="dark" size="medium">
              Connect
            </Button>
          </ButtonContainer>
        </NavLinks>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

export default Header;
