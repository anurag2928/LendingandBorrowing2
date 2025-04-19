import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  as?: 'button' | 'a';
  href?: string;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primaryLight};
        }
      `;
    case 'secondary':
      return css`
        background-color: ${({ theme }) => theme.colors.backgroundDark};
        color: ${({ theme }) => theme.colors.white};
        &:hover {
          background-color: ${({ theme }) => theme.colors.text};
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 1px solid ${({ theme }) => theme.colors.primary};
        &:hover {
          background-color: ${({ theme }) => theme.colors.grayLight};
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        &:hover {
          text-decoration: underline;
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `;
    case 'medium':
      return css`
        padding: 11px 24.6px;
        font-size: ${({ theme }) => theme.fontSizes.md};
      `;
    case 'large':
      return css`
        padding: 18px 32px;
        font-size: ${({ theme }) => theme.fontSizes.lg};
      `;
    default:
      return '';
  }
};

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-align: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  white-space: nowrap;

  ${({ variant = 'primary' }) => getButtonStyles(variant)}
  ${({ size = 'medium' }) => getButtonSize(size)}
  ${({ fullWidth }) => fullWidth && css`width: 100%;`}
  ${({ uppercase }) => uppercase && css`text-transform: uppercase;`}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      &:hover {
        opacity: 0.6;
      }
    `}
`;

export default Button;
