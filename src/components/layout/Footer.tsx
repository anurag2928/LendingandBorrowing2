import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { Container } from '../../styles/CommonStyles';
import { media } from '../../styles/responsive';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 50px 0 32px;
`;

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;

  ${media.md} {
    flex-direction: column;
  }
`;

const FooterColumn = styled.div`
  width: 20%;

  ${media.md} {
    width: 100%;
    margin-bottom: 30px;
    text-align: center;
  }
`;

const FooterLogo = styled(Link)`
  width: 140px;
  display: inline-block;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: auto;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  transition: opacity 0.2s;
  background-color: #F5F5F5;
  padding: 6px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

const FooterHeading = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-bottom: 16px;

  ${media.sm} {
    font-size: 16px;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 16px;
  margin-bottom: 8px;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  margin-top: 8px;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterColumn>
          <FooterLogo to="/">
            <img src="https://ext.same-assets.com/4108832712/3783633550.svg" alt="Rocko Logo" />
          </FooterLogo>

          <SocialLinks>
            <SocialLink href="https://twitter.com/rockodefi" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={16} />
            </SocialLink>
            <SocialLink href="https://github.com/getrocko" target="_blank" rel="noopener noreferrer">
              <FaGithub size={16} />
            </SocialLink>
            <SocialLink href="https://discord.gg/AhtVvhDRG4" target="_blank" rel="noopener noreferrer">
              <FaDiscord size={16} />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/rockodefi" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={16} />
            </SocialLink>
          </SocialLinks>

          <Copyright>© Copyright {new Date().getFullYear()}</Copyright>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Company</FooterHeading>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/learn/#rocko-news">Blog</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Learn</FooterHeading>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/why-defi">Why DeFi</FooterLink>
          <FooterLink to="/learn">Learn Resource Center</FooterLink>
          <FooterLink to="/learn/#rocko-how-tos">Rocko How To's</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Legal</FooterHeading>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/referral-program-terms">Referral Program Terms</FooterLink>
        </FooterColumn>

        <FooterColumn>
          <FooterHeading>Crypto-Backed Loans</FooterHeading>
          <FooterLink to="/crypto-loan/eth-loan">ETH Loans</FooterLink>
          <FooterLink to="/crypto-loan/btc-loan">Bitcoin Loans</FooterLink>
          <FooterLink to="/crypto-loan/cbbtc-loan">cbBTC Loans</FooterLink>
          <FooterLink to="/refinance">Refinance Loans</FooterLink>
          <FooterLink to="/crypto-loan">See additional assets</FooterLink>
        </FooterColumn>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
