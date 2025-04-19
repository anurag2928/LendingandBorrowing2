import styled, { css } from 'styled-components';
import { media } from './responsive';
import theme from './theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;

  ${media.sm} {
    padding: 0 24px;
  }
`;

export const Section = styled.section`
  padding: 80px 0;

  ${media.md} {
    padding: 60px 0;
  }

  ${media.sm} {
    padding: 40px 0;
  }
`;

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.semibold};
  border-radius: ${theme.borderRadius.full};
  transition: all ${theme.transitions.default};
  text-transform: uppercase;
  cursor: pointer;

  ${props => props.fullWidth && css`
    width: 100%;
  `}

  ${props => {
    switch(props.size) {
      case 'small':
        return css`
          padding: 8px 16px;
          font-size: ${theme.fontSizes.xs};
        `;
      case 'large':
        return css`
          padding: 16px 32px;
          font-size: ${theme.fontSizes.md};
        `;
      default:
        return css`
          padding: 11px 24px;
          font-size: ${theme.fontSizes.sm};
        `;
    }
  }}

  ${props => {
    switch(props.variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.white};
          color: ${theme.colors.primaryDark};
          border: 1px solid ${theme.colors.primaryDark};
          &:hover {
            background-color: ${theme.colors.grayLight};
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `;
      case 'dark':
        return css`
          background-color: ${theme.colors.backgroundDark};
          color: ${theme.colors.white};
          &:hover {
            background-color: #0f2c33;
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover {
            background-color: ${theme.colors.primaryLight};
          }
        `;
    }
  }}
`;

export const Heading = styled.h2`
  font-size: ${theme.fontSizes['5xl']};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing.xl};

  ${media.md} {
    font-size: ${theme.fontSizes['4xl']};
    margin-bottom: ${theme.spacing.lg};
  }

  ${media.sm} {
    font-size: ${theme.fontSizes['3xl']};
    margin-bottom: ${theme.spacing.md};
  }
`;

export const SubHeading = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.textLight};

  ${media.sm} {
    font-size: ${theme.fontSizes.lg};
  }
`;

export const Text = styled.p`
  font-size: ${theme.fontSizes.md};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

export const TextLight = styled(Text)`
  color: ${theme.colors.textLight};
`;

export const Flex = styled.div<{
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  gap?: string;
  wrap?: 'wrap' | 'nowrap';
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  gap: ${props => props.gap || '0'};
  flex-wrap: ${props => props.wrap || 'nowrap'};
`;

export const Grid = styled.div<{
  columns?: string;
  gap?: string;
}>`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(1, 1fr)'};
  gap: ${props => props.gap || theme.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.sm} {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.md};
`;

export const Hero = styled.div`
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.white};
  padding: 120px 0;
  text-align: center;

  ${media.md} {
    padding: 80px 0;
  }

  ${media.sm} {
    padding: 60px 0;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

export const HeroTitle = styled.h1`
  font-size: 64px;
  font-weight: ${theme.fontWeights.medium};
  margin-bottom: ${theme.spacing.xl};

  ${media.md} {
    font-size: 48px;
  }

  ${media.sm} {
    font-size: 36px;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  margin-bottom: ${theme.spacing.xl};

  ${media.sm} {
    font-size: ${theme.fontSizes.lg};
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.grayBorder};
  margin: ${theme.spacing.xl} 0;
`;

export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.medium};

  ${props => {
    switch(props.variant) {
      case 'secondary':
        return css`
          background-color: ${theme.colors.grayLight};
          color: ${theme.colors.text};
        `;
      case 'success':
        return css`
          background-color: #E6F7EE;
          color: #16BF73;
        `;
      case 'warning':
        return css`
          background-color: #FFF8E6;
          color: #F09422;
        `;
      case 'error':
        return css`
          background-color: #FFE6E6;
          color: #FF3B3B;
        `;
      default:
        return css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        `;
    }
  }}
`;
