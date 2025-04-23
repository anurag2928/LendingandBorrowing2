import styled from 'styled-components';
import { Container } from './../../styles/CommonStyles';
import { media } from './../../styles/responsive';

// Shared Layout Components
export const LoanContainer = styled(Container)`
  display: flex;
  gap: 36px;
  align-items: flex-start;
  margin: 0 auto;
  max-width: 1300px;
  padding: 48px 0 0 0;
  min-height: 70vh;
  ${media.md} {
    flex-direction: column;
    gap: 24px;
    padding: 16px 0 0 0;
  }
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 0 0 1px #e5e7eb;
  padding: 40px;
  flex: 1;
  min-width: 0;
  ${media.sm} {
    padding: 20px;
    border-radius: 10px;
  }
`;

export const LoanSummary = styled(Card)`
  flex: 0 0 360px;
  max-width: 380px;
  min-width: 270px;
  background: #fafbfc;
  ${media.md} {
    width: 100%;
    max-width: unset;
    flex: unset;
    margin: 0 auto;
  }
`;

// Typography & Layout Elements
export const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 28px;
  font-weight: 600;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const Input = styled.input`
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 16px;
  width: 150px;
  margin-right: 10px;
`;

// Navigation & Stepper
export const StepperBar = styled.div<{ $step: number }>`
  width: 100%;
  height: 4px;
  background: #ececec;
  margin-bottom: 8px;
  position: relative;
  > div {
    height: 100%;
    background: linear-gradient(90deg, #262d6a, #5532b9);
    width: ${({ $step }) => (($step + 1) / 5) * 100}%;
    border-radius: 2px;
    transition: width 0.2s;
  }
`;

export const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0 8px 0;
  margin-top: 8px;
  border-top: 2px solid #1a1a50;
  background: #fff;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  position: sticky;
  bottom: 0;
  z-index: 10;
  ${media.sm} {
    flex-direction: column;
    gap: 12px;
    padding-bottom: 10px;
  }
`;

export const StepTag = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

// Icons (shared across steps)
export const icons = {
  usdc: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png',
  usd: 'https://cryptologos.cc/logos/usd-usd-logo.png',
  btc: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  eth: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  compound: 'https://cryptologos.cc/logos/compound-comp-logo.png',
  aave: 'https://cryptologos.cc/logos/aave-aave-logo.png',
};
