import { useState } from 'react';
import styled from 'styled-components';
import { Container, Section, Heading } from '../styles/CommonStyles';
import { media } from '../styles/responsive';
import { FaPlus, FaMinus } from 'react-icons/fa';

// FAQ Section
const FAQSection = styled(Section)`
  background-color: #F9F9F9;
`;

const FAQContainer = styled(Container)`
  max-width: 900px;
`;

const FAQTitle = styled(Heading)`
  margin-bottom: 40px;
`;

// Accordion Styles
const AccordionContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
`;

const AccordionHeader = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 0;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  border-bottom: ${({ isOpen, theme }) => isOpen ? 'none' : `1px solid ${theme.colors.grayBorder}`};

  ${media.sm} {
    padding: 16px 0;
  }
`;

const AccordionTitle = styled.h3`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  color: ${({ theme }) => theme.colors.text};
  width: 80%;

  ${media.sm} {
    font-size: 16px;
  }
`;

const AccordionIcon = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-bottom: ${({ isOpen }) => (isOpen ? '24px' : '0')};
`;

const AccordionText = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 16px;
`;

interface AccordionItemProps {
  question: string;
  answer: string | React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <AccordionContainer>
      <AccordionHeader isOpen={isOpen} onClick={onClick}>
        <AccordionTitle>{question}</AccordionTitle>
        <AccordionIcon>
          {isOpen ? <FaMinus /> : <FaPlus />}
        </AccordionIcon>
      </AccordionHeader>
      <AccordionContent isOpen={isOpen}>
        {typeof answer === 'string' ? (
          <AccordionText>{answer}</AccordionText>
        ) : (
          answer
        )}
      </AccordionContent>
    </AccordionContainer>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Is Rocko a lender?",
      answer: "No, Rocko is not a lender. We're a platform that connects users with DeFi protocols like Aave, Compound, and Morpho. These protocols act as the lenders, providing the USDC for your loan. Rocko simplifies the process of interacting with these protocols and handles all the technical complexities behind the scenes."
    },
    {
      question: "What are Aave, Compound, and Morpho?",
      answer: "Aave, Compound, and Morpho are decentralized lending protocols built on the Ethereum blockchain. These protocols enable crypto lending and borrowing without the need for a centralized intermediary. They utilize smart contracts (self-executing code) to automatically match lenders and borrowers, determine interest rates, and handle collateral. Rocko integrates with these established protocols to provide you with secure, reliable lending services."
    },
    {
      question: "Does Rocko charge a fee?",
      answer: "Rocko charges a small fee when you take out a loan. This fee is transparently displayed before you confirm your loan. We also earn a portion of the interest that you pay to the protocol. Our goal is to make DeFi accessible while maintaining a sustainable business model."
    },
    {
      question: "Which crypto assets can I use as collateral for my loan?",
      answer: "You can use ETH, BTC (via wrapped tokens like WBTC), stETH, and several other major cryptocurrencies as collateral. The specific assets available depend on the underlying protocols we integrate with. The complete list of supported assets is visible when you're applying for a loan."
    },
    {
      question: "How do I use bitcoin as collateral for my loan?",
      answer: "To use Bitcoin as collateral, you'll need to convert it to a wrapped version like WBTC (Wrapped Bitcoin) or use a bridge service that creates a tokenized version of your Bitcoin on the Ethereum network. Once you have your Bitcoin represented as an ERC-20 token on Ethereum, you can use it as collateral on Rocko."
    },
    {
      question: "What are the benefits and risks of crypto loans from DeFi protocols vs. traditional loans?",
      answer: <>
        <AccordionText>
          <strong>Benefits:</strong>
        </AccordionText>
        <AccordionText>
          - No credit checks or lengthy approval processes<br />
          - Instant liquidity<br />
          - Competitive interest rates<br />
          - Maintain exposure to your crypto assets<br />
          - Full transparency and control of your assets<br />
          - 24/7 availability
        </AccordionText>
        <AccordionText>
          <strong>Risks:</strong>
        </AccordionText>
        <AccordionText>
          - Collateral requirements (loans are overcollateralized)<br />
          - Liquidation risk if the value of your collateral drops significantly<br />
          - Smart contract risks (though we only integrate with the most audited and battle-tested protocols)<br />
          - Crypto market volatility
        </AccordionText>
      </>
    },
    {
      question: "Which DeFi protocols can I borrow from using Rocko?",
      answer: "Rocko currently integrates with Aave, Compound, and Morpho. These are among the most established, secure, and well-audited DeFi lending protocols in the ecosystem. We're continually evaluating other protocols to potentially add to our platform in the future."
    },
    {
      question: "Do all loans require over-collateralization?",
      answer: "Yes, all loans on Rocko require over-collateralization, meaning you need to deposit more value in crypto than the value of the stablecoin loan you're taking out. This is a fundamental aspect of DeFi lending that provides security for the protocol in the event of market volatility. Different assets have different collateralization requirements based on their volatility and liquidity."
    },
    {
      question: "Is a credit check required?",
      answer: "No, Rocko does not require any credit checks. DeFi loans are secured by your crypto collateral rather than your credit history. This allows for immediate loan approval and disbursement without the need for personal financial information."
    },
    {
      question: "Will getting a DeFi loan using Rocko impact my credit score?",
      answer: "No, getting a loan through Rocko will not impact your credit score. Since we don't perform credit checks and don't report to credit bureaus, your activities on our platform are completely separate from traditional financial systems and won't affect your credit history."
    },
    {
      question: "What is the maximum amount I can borrow?",
      answer: "The maximum amount you can borrow depends on the value of your collateral and the loan-to-value (LTV) ratio of the asset you're using as collateral. For example, if you provide $10,000 worth of ETH and the maximum LTV is 80%, you could borrow up to $8,000 in stablecoins. Different assets have different maximum LTV ratios based on their risk profiles."
    },
    {
      question: "How is the interest rate determined?",
      answer: "Interest rates are determined by the underlying DeFi protocols based on supply and demand dynamics. When there's high demand for borrowing a particular asset, the interest rates increase, and vice versa. These rates are variable and can change over time based on market conditions. Rocko displays the current rates for all supported assets when you're applying for a loan."
    },
    {
      question: "What happens if I don't repay my loan?",
      answer: "If you don't repay your loan and the value of your collateral drops to a certain threshold (the liquidation threshold), a portion of your collateral may be automatically liquidated to cover the outstanding loan amount. This process is handled by the underlying DeFi protocol. To avoid liquidation, you can either repay part of your loan or add more collateral to improve your loan-to-value ratio."
    }
  ];

  return (
    <FAQSection>
      <FAQContainer>
        <FAQTitle>Frequently Asked Questions</FAQTitle>

        {faqItems.map((item, index) => (
          <AccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => toggleAccordion(index)}
          />
        ))}
      </FAQContainer>
    </FAQSection>
  );
};

export default FAQPage;
