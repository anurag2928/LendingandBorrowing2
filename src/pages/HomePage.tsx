import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Button, Section, Heading, Text, Grid, Card } from '../styles/CommonStyles';
import { media } from '../styles/responsive';

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

const HeroTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  font-size: 48px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 16px;
  max-width: 800px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.sm} {
    font-size: 30px;
  }
`;

const HeroSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 600px;

  ${media.sm} {
    font-size: 16px;
  }
`;

// Partners Section
const PartnersSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 40px 0;
`;

const PartnerLogos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 20px;

  img {
    height: 30px;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: all 0.3s ease;

    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
  }

  ${media.sm} {
    gap: 20px;

    img {
      height: 20px;
    }
  }
`;

// Features Section
const FeaturesSection = styled(Section)`
  background-color: ${({ theme }) => theme.colors.white};
`;

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

// Benefits Section
const BenefitsSection = styled(Section)`
  background-color: #F9F9F9;
`;

const BenefitGrid = styled(Grid)`
  grid-template-columns: 1fr 1fr;
  gap: 60px;

  ${media.md} {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const BenefitContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BenefitImage = styled.div`
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.shadows.md};
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
  font-size: 48px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: 24px;

  ${media.md} {
    font-size: 36px;
  }

  ${media.sm} {
    font-size: 28px;
  }
`;

const HomePage = () => {
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroTitle>Crypto-backed loans at competitive rates¹</HeroTitle>
          <HeroSubtitle>
            Borrow USDC at 0% interest if you pledge enough collateral. Save up to 75% compared to competitors.
          </HeroSubtitle>
          <Button as="a" href="#" variant="primary" size="large">
            GET A LOAN
          </Button>
        </HeroContainer>
      </HeroSection>

      <PartnersSection>
        <Container>
          <PartnerLogos>
            <img src="https://ext.same-assets.com/4108832712/1424599652.png" alt="Product Hunt" />
            <img src="https://ext.same-assets.com/4108832712/1858559205.png" alt="ETH USDC Cash" />
            <img src="https://ext.same-assets.com/4108832712/29211738.png" alt="Market Watch" />
            <img src="https://ext.same-assets.com/4108832712/1054921023.png" alt="Business Insider" />
          </PartnerLogos>
        </Container>
      </PartnersSection>

      <FeaturesSection>
        <Container>
          <Heading style={{ textAlign: 'center', marginBottom: '60px' }}>
            Get cash without having to sell your crypto holdings
          </Heading>

          <Grid columns="repeat(auto-fit, minmax(300px, 1fr))" gap="30px">
            <FeatureCard>
              <FeatureIcon>
                <img src="https://ext.same-assets.com/4108832712/3783633550.svg" alt="Compound Icon" />
              </FeatureIcon>
              <FeatureTitle>Compound</FeatureTitle>
              <FeatureDescription>
                Access liquidity through Compound, a pioneering DeFi protocol with a proven track record of security and reliability.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <img src="https://ext.same-assets.com/4108832712/2563901416.svg" alt="Aave Icon" />
              </FeatureIcon>
              <FeatureTitle>Aave</FeatureTitle>
              <FeatureDescription>
                Utilize Aave's advanced lending features and competitive rates through our simplified interface.
              </FeatureDescription>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>
                <img src="https://ext.same-assets.com/4108832712/548389142.svg" alt="Morpho Icon" />
              </FeatureIcon>
              <FeatureTitle>Morpho</FeatureTitle>
              <FeatureDescription>
                Get the best of both worlds with Morpho's enhanced yields and security backed by Compound and Aave.
              </FeatureDescription>
            </FeatureCard>
          </Grid>
        </Container>
      </FeaturesSection>

      <BenefitsSection>
        <Container>
          <BenefitGrid>
            <BenefitImage>
              <img src="https://ext.same-assets.com/4108832712/1207204399.jpeg" alt="Borrow using your ETH, BTC, stETH" />
            </BenefitImage>
            <BenefitContent>
              <Heading>Borrow using your ETH, BTC, or stETH tokens as collateral</Heading>
              <Text>
                Keep your crypto and still access cash when you need it. No credit checks required, competitive rates, and a simple application process.
              </Text>
              <Button as={Link} to="/crypto-loan/" variant="primary" size="medium" style={{ marginTop: '20px' }}>
                LEARN MORE
              </Button>
            </BenefitContent>
          </BenefitGrid>
        </Container>
      </BenefitsSection>

      <BenefitsSection style={{ background: 'white' }}>
        <Container>
          <BenefitGrid>
            <BenefitContent>
              <Heading>Borrow with confidence and control over your crypto assets</Heading>
              <Text>
                Rocko never takes custody of your crypto. Your assets remain in smart contracts on the blockchain where you maintain full control.
              </Text>
              <Button as={Link} to="/why-defi/" variant="primary" size="medium" style={{ marginTop: '20px' }}>
                LEARN MORE
              </Button>
            </BenefitContent>
            <BenefitImage>
              <img src="https://ext.same-assets.com/4108832712/260646423.svg" alt="Security First" />
            </BenefitImage>
          </BenefitGrid>
        </Container>
      </BenefitsSection>

      <BenefitsSection>
        <Container>
          <BenefitGrid>
            <BenefitImage>
              <img src="https://ext.same-assets.com/4108832712/4061061103.svg" alt="Dashboard" />
            </BenefitImage>
            <BenefitContent>
              <Heading>Your keys, your crypto</Heading>
              <Text>
                Maintain complete ownership of your assets through self-custody. We provide the interface, you maintain the control.
              </Text>
              <Button as={Link} to="/faq/" variant="primary" size="medium" style={{ marginTop: '20px' }}>
                READ FAQ
              </Button>
            </BenefitContent>
          </BenefitGrid>
        </Container>
      </BenefitsSection>

      <CTASection>
        <Container>
          <CTATitle>Keep your crypto and get cash using Rocko</CTATitle>
          <Button as="a" href="#" variant="primary" size="large">
            GET A LOAN
          </Button>
        </Container>
      </CTASection>
    </>
  );
};

export default HomePage;
