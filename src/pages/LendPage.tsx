import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { supabase } from './../supabaseClient';
import { useWallet } from '../context/WalletContext';

interface LendPageProps {
  account: string | null;
}

const PageWrapper = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  flex: 1;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

interface MarketOptionProps {
  selected: boolean;
}

const MarketOption = styled.div<MarketOptionProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  background: ${(props) => (props.selected ? '#eaf1ff' : '#fff')};
  border-color: ${(props) => (props.selected ? '#262d6a' : '#ddd')};

  &:hover {
    background: #f9f9f9;
  }
`;

const SummaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 14px;
    }
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const LendPage: React.FC<LendPageProps> = ({ account }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedMarket, setSelectedMarket] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const markets = [
    { name: 'Compound', network: 'Base', apy: '2.86%', apr: '3.10%', reward: '0.83%' },
    { name: 'Aave', network: 'Base', apy: '3.35%', apr: '3.13%', reward: '0.00%' },
    { name: 'Morpho', network: 'Base', apy: '4.28%', apr: '4.45%', reward: '0.85%' },
  ];

  const finalizeLend = async () => {
    if (!window.ethereum) {
      setError('Please install a wallet like MetaMask to proceed.');
      return;
    }
  
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const walletAddress = await signer.getAddress();
  
    if (!walletAddress) {
      setError('Please connect your wallet to finalize the lending.');
      return;
    }
  
    setIsLoading(true); // Start loading
    try {
      const receiverAddress = '0x557F0cA834f6a5904228cC0BBf8909AE936Fd366'; // Replace with the actual receiver address
      const lendAmountUSD = parseFloat(amount);
  
      if (lendAmountUSD <= 0) {
        setError('Invalid amount. Please enter a valid amount to lend.');
        setIsLoading(false); // Stop loading
        return;
      }
  
      // Fetch the real-time price of Ethereum in USD
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const priceData = await response.json();
      const ethPriceInUSD = priceData.ethereum.usd;
  
      if (!ethPriceInUSD) {
        setError('Failed to fetch Ethereum price. Please try again later.');
        setIsLoading(false);
        return;
      }
  
      // Convert the input amount (in USD) to Sepolia Ethereum
      const transactionAmountInETH = lendAmountUSD / ethPriceInUSD;
      const transactionAmount = ethers.parseEther(transactionAmountInETH.toFixed(18)); // Convert to Wei
  
      // Send the transaction
      const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: transactionAmount,
      });
  
      console.log('Transaction sent:', tx);
  
      // Save transaction details to Supabase
      const { data, error } = await supabase.from('lendtransactions').insert([
        {
          user_address: walletAddress, // User's wallet address
          receiver_address: receiverAddress, // Receiver's wallet address
          amount: lendAmountUSD, // Lend amount in USD
          duration: duration, // Duration in days
          apy: markets.find((m) => m.name === selectedMarket)?.apy || '--', // Current APY
          protocol: selectedMarket, // Lending protocol
          network: 'Sepolia', // Blockchain network
          transaction_hash: tx.hash, // Transaction hash
          created_at: new Date().toISOString(), // Timestamp
        },
      ]);
  
      if (error) {
        console.error('Error saving transaction to Supabase:', error);
        alert('Transaction sent successfully, but failed to save to the database.');
      } else {
        console.log('Transaction saved to Supabase:', data);
        navigate('/dashboard'); // Redirect to the dashboard after successful transaction
      }
    } catch (err) {
      console.error('Transaction failed:', err);
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleConfirm = () => {
    finalizeLend();
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const calculateProjectedInterest = (months: number) => {
    if (!amount || !selectedMarket) return '--';
    const market = markets.find((m) => m.name === selectedMarket);
    if (!market) return '--';

    const apyDecimal = parseFloat(market.apy.replace('%', '')) / 100; // Convert APY to decimal
    return ((parseFloat(amount) * apyDecimal * months) / 12).toFixed(2); // Calculate interest
  };

  const renderTransactionSummary = () => (
    <Card>
      <CardTitle>Transaction Summary</CardTitle>
      <SummaryTable>
        <tbody>
          <tr>
            <th>Supplying</th>
            <td>{amount || '--'} USDC</td>
          </tr>
          <tr>
            <th>Duration</th>
            <td>{duration || '--'} Days</td>
          </tr>
          <tr>
            <th>Current APY</th>
            <td>{selectedMarket ? markets.find((m) => m.name === selectedMarket)?.apy : '--'}</td>
          </tr>
          <tr>
            <th>Projected Interest (6 months)</th>
            <td>${calculateProjectedInterest(6)}</td>
          </tr>
          <tr>
            <th>Projected Interest (12 months)</th>
            <td>${calculateProjectedInterest(12)}</td>
          </tr>
          <tr>
            <th>Projected Interest (24 months)</th>
            <td>${calculateProjectedInterest(24)}</td>
          </tr>
        </tbody>
      </SummaryTable>
    </Card>
  );

  return (
    <PageWrapper>
      <Title>Supply USDC and Earn Interest From Borrowers</Title>
      <Subtitle>
        USDC is supplied to DeFi lending protocols which then allow users to borrow it in return for interest.
      </Subtitle>

      <ContentWrapper>
        {step === 1 && (
          <>
            <Card>
              <CardTitle>Choose how much to lend.</CardTitle>
              <Input
                type="number"
                placeholder="Enter amount (e.g., 1000)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <CardTitle>Enter Duration (in Days)</CardTitle>
              <Input
                type="number"
                placeholder="Enter duration (e.g., 30)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Card>
            {renderTransactionSummary()}
          </>
        )}

        {step === 2 && (
          <>
            <Card>
              <CardTitle>Choose a market to lend to.</CardTitle>
              {markets.map((market) => (
                <MarketOption
                  key={market.name}
                  selected={selectedMarket === market.name}
                  onClick={() => setSelectedMarket(market.name)}
                >
                  <div>
                    <strong>{market.name}</strong>
                    <p style={{ fontSize: '12px', color: '#666' }}>Network: {market.network}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', margin: 0 }}>
                      {market.apy} APY | {market.apr} APR
                    </p>
                    <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                      Reward: {market.reward}
                    </p>
                  </div>
                  <Button
                    variant={selectedMarket === market.name ? 'primary' : 'outline'}
                    onClick={() => setSelectedMarket(market.name)}
                  >
                    {selectedMarket === market.name ? 'Selected' : 'Select'}
                  </Button>
                </MarketOption>
              ))}
            </Card>
            {renderTransactionSummary()}
          </>
        )}

{step === 3 && (
  <Card>
    <CardTitle>Lend Asset Summary</CardTitle>
    {renderTransactionSummary()}

    {/* Wallet Connection Status */}
    <div style={{ marginTop: '20px' }}>
      {account ? (
        <p style={{ color: '#28a745', fontWeight: 'bold' }}>Connected Wallet: {account}</p>
      ) : (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Please connect your wallet to proceed.</p>
      )}
      {error && <p style={{ color: 'red', marginTop: '10px', fontWeight: 'bold' }}>{error}</p>}
    </div>
  </Card>
)}

  </ContentWrapper>
<Footer>
  <Button variant="outline" onClick={handleBack} disabled={step === 1}>
    Back
  </Button>
  {step < 3 ? (
    <Button variant="primary" onClick={handleNext} disabled={step === 1 && (!amount || !duration)}>
      Next
    </Button>
  ) : (
    <Button
    variant="primary"
    onClick={finalizeLend}
    disabled={!account || !amount || !duration || !selectedMarket || isLoading}
    style={{
      backgroundColor: account && !isLoading ? '#007bff' : '#ccc',
      cursor: account && !isLoading ? 'pointer' : 'not-allowed',
    }}
    >
      {isLoading ? 'Processing...' : 'Confirm'}
    </Button>
  )}
</Footer>
      {/* {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} */}
    </PageWrapper>
  );
}

export default LendPage;