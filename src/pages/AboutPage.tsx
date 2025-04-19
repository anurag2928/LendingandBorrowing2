import styled from 'styled-components';
import { Container, Button, Section, Heading, Text } from '../styles/CommonStyles';
import { media } from '../styles/responsive';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

// Hero Section
const HeroSection = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  padding: 120px 0;
  text-align: center;

  ${media.md} {
    padding: 80px 0;
  }

  ${media.sm} {
    padding: 50px 0;
  }
`;

const HeroContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MissionText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 24px;
  margin-bottom: 16px;

  ${media.sm} {
    font-size: 18px;
  }
`;

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 48px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  max-width: 800px;
  line-height: 1.2;

  ${media.md} {
    font-size: 40px;
  }

  ${media.sm} {
    font-size: 30px;
  }
`;

// Team Section
const TeamSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.white};
`;

const TeamContainer = styled(Container)`
  max-width: 675px;
`;

const TeamGrid = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 30px;

  ${media.md} {
    flex-direction: column;
  }
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const TeamMemberImage = styled.div`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TeamMemberName = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: 8px;
`;

const TeamMemberTitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 16px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 8px;
`;

const SocialLink = styled.a`
  background-color: ${({ theme }) => theme.colors.grayLight};
  color: ${({ theme }) => theme.colors.textLight};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
`;

// CTA Section
const CTASection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  padding: 100px 0;
  text-align: center;

  ${media.md} {
    padding: 80px 0;
  }

  ${media.sm} {
    padding: 60px 0;
  }
`;

const CTATitle = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  font-size: 64px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 24px;

  ${media.md} {
    font-size: 40px;
  }

  ${media.sm} {
    font-size: 30px;
  }
`;

const AboutPage = () => {
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <MissionText>Our Mission</MissionText>
          <HeroTitle>
            Help people access DeFi in a secure and simple manner to get the most value from their crypto assets
          </HeroTitle>
        </HeroContainer>
      </HeroSection>

      <TeamSection>
        <TeamContainer>
          <Heading>Who we are</Heading>
          <Text>
            We're a team of experienced fintech founders who have built and launched innovative consumer financial products such as the Gemini Credit Card, MarcusPay by Goldman Sachs, and Ondo Finance. We started Rocko as we're passionate about crypto and DeFi, but find it too complex for most people to use. We want to make DeFi more accessible so that everyone can take advantage of its benefits and improve their financial lives.
          </Text>

          <TeamGrid>
            <TeamMember>
              <TeamMemberImage>
                <img src="https://ext.same-assets.com/989645081/2257591797.jpeg" alt="Thomas Harrison" />
              </TeamMemberImage>
              <TeamMemberName>Thomas Harrison</TeamMemberName>
              <TeamMemberTitle>CEO & Co-Founder</TeamMemberTitle>
              <SocialLinks>
                <SocialLink href="https://x.com/whatsuptom1" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={16} />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/thomasharrisonscu/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={16} />
                </SocialLink>
                <SocialLink href="https://github.com/rockotom" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={16} />
                </SocialLink>
              </SocialLinks>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage>
                <img src="https://ext.same-assets.com/989645081/2660198038.jpeg" alt="Vince DePalma" />
              </TeamMemberImage>
              <TeamMemberName>Vince DePalma</TeamMemberName>
              <TeamMemberTitle>CTO & Co-Founder</TeamMemberTitle>
              <SocialLinks>
                <SocialLink href="https://x.com/0xVinnieJames" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={16} />
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/vincentdepalma/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={16} />
                </SocialLink>
                <SocialLink href="https://github.com/vinniejames" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={16} />
                </SocialLink>
              </SocialLinks>
            </TeamMember>
          </TeamGrid>

          <Text style={{ marginTop: '40px' }}>
            Please don't hesitate to reach out with product feedback and ideas for us to improve Rocko using the contact tab above. Thanks for your support!
          </Text>
        </TeamContainer>
      </TeamSection>

      <CTASection>
        <Container>
          <CTATitle>Be one of the first to get a crypto-backed loan using Rocko</CTATitle>
          <Button as="a" href="#" variant="primary" size="large">
            GET A LOAN
          </Button>
        </Container>
      </CTASection>
    </>
  );
};

export default AboutPage;
