import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Adjust the path as necessary
import { ethers } from 'ethers';

const DashboardWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  font-family: Arial, sans-serif;
  background-color: ${({ theme }) => theme.colors.grayLight};
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.grayLight)};
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.text)};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ active, theme }) => (active ? theme.colors.primaryDark : theme.colors.grayBorder)};
  }
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grayBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SubTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SubTab = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.grayLight)};
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.text)};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ active, theme }) => (active ? theme.colors.primaryDark : theme.colors.grayBorder)};
  }
`;

const CreateButton = styled(Link)`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  text-decoration: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const LoanTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    overflow-x: scroll;
  }
`;

const LoanTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    text-align: left;
    padding: ${({ theme }) => theme.spacing.sm};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayBorder};
  }

  th {
    background: ${({ theme }) => theme.colors.grayLight};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  @media (max-width: 768px) {
    th, td {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      padding: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const ModalButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin: ${({ theme }) => theme.spacing.sm};
  transition: background ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:last-child {
    background: ${({ theme }) => theme.colors.grayLight};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default function DashboardPage({ account }: { account: string | null }) {
  const [activeTab, setActiveTab] = useState('Loans');
  const [activeSubTab, setActiveSubTab] = useState('Active Loans');
  const [loans, setLoans] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState<any | null>(null);

  const openWithdrawForm = (id: string, amount: number) => {
    setSelectedDeposit({ id, amount });
    setIsWithdrawModalOpen(true);
  };

  const closeWithdrawForm = () => {
    setSelectedDeposit(null);
    setIsWithdrawModalOpen(false);
  };

 const handleWithdrawRequest = async (id: string, amount: number) => {
  try {
    setLoading(true);
    const { error } = await supabase
      .from('lendtransactions')
      .update({
        withdrawal_requested: true,
        withdrawal_amount: amount,
        withdrawal_status: 'pending', // Set the status to 'pending'
        withdrawal_requested_at: new Date().toISOString(), // Add the current timestamp
        withdrawal_processed_at: null, // Reset processed timestamp to null
      })
      .eq('id', id);

    if (error) {
      console.error('Error requesting withdrawal:', error);
      alert('Failed to submit withdraw request.');
    } else {
      alert('Withdraw request submitted successfully!');
      setDeposits((prev) =>
        prev.map((deposit) =>
          deposit.id === id
            ? {
                ...deposit,
                withdrawal_requested: true,
                withdrawal_amount: amount,
                withdrawal_status: 'pending',
                withdrawal_requested_at: new Date().toISOString(),
                withdrawal_processed_at: null,
              }
            : deposit
        )
      );
      closeWithdrawForm();
    }
  } catch (err) {
    console.error('Error requesting withdrawal:', err);
    alert('Something went wrong.');
  } finally {
    setLoading(false);
  }
};

const handleRepayLoan = async (loanId: string, amount: number, receiverAddress: string) => {
  try {
    if (!window.ethereum) {
      alert('MetaMask is not installed');
      return;
    }

    // Request the user to switch to the Sepolia Testnet for testing
    // You can remove this part if you want to use the mainnet or another network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0xaa36a7' }], // Chain ID for Sepolia Testnet
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Convert USDC amount to ETH
    const ethAmount = await convertUSDCtoETH(amount); // Fetch the equivalent ETH value
    // console.log(`Converted USDC amount (${amount}) to ETH: ${ethAmount}`);

    // Create a transaction object
    const tx = {
      to: receiverAddress, // Receiver's wallet address
      value: ethers.parseEther(ethAmount.toString()), // Amount to send in ETH
    };

    // Send the transaction
    const transactionResponse = await signer.sendTransaction(tx);
    // console.log('Transaction sent:', transactionResponse);

    // Wait for the transaction to be mined
    const receipt = await transactionResponse.wait();
    // console.log('Transaction mined:', receipt);

    // Update loan status in the database
    const { error } = await supabase
      .from('transactions')
      .update({ status: 'inactive' }) // Mark the loan as repaid
      .eq('id', loanId);

    if (error) {
      console.error('Error updating loan status:', error);
      alert('Failed to update loan status.');
    } else {
      alert('Loan repaid successfully!, your collateral will be released within 24 hours');
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.id === loanId ? { ...loan, status: 'inactive' } : loan
        )
      );
    }
  } catch (err) {
    console.error('Error repaying loan:', err);
    alert('Something went wrong. Please try again.');
  }
};

// Function to convert USDC to ETH using CoinGecko API only for testing purposes
const convertUSDCtoETH = async (usdcAmount: number): Promise<number> => {
  try {
    // Fetch the real-time price of USDC and ETH from CoinGecko
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,ethereum&vs_currencies=usd'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch conversion rates');
    }

    const data = await response.json();

    // Extract the USD price of 1 ETH and 1 USDC
    const ethPriceInUSD = data.ethereum.usd; // Price of 1 ETH in USD
    const usdcPriceInUSD = data['usd-coin'].usd; // Price of 1 USDC in USD (should be close to 1)

    // Calculate the conversion rate: 1 USDC to ETH
    const conversionRate = 1 / (ethPriceInUSD / usdcPriceInUSD);

    // Convert the USDC amount to ETH
    const ethAmount = usdcAmount * conversionRate;

    console.log(`Conversion Rate (1 USDC to ETH): ${conversionRate}`);
    console.log(`Converted Amount: ${ethAmount} ETH`);

    return ethAmount;
  } catch (err) {
    console.error('Error converting USDC to ETH:', err);
    throw new Error('Failed to convert USDC to ETH');
  }
};


  useEffect(() => {
    if (!account) return;

    const fetchLoans = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_address', account)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching loans:', error);
        } else {
          setLoans(data || []);
        }
      } catch (err) {
        console.error('Error fetching loans:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDeposits = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('lendtransactions')
          .select('*')
          .eq('user_address', account)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching deposits:', error);
        } else {
          setDeposits(data || []);
        }
      } catch (err) {
        console.error('Error fetching deposits:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
    fetchDeposits();
  }, [account]);


  const filteredLoans =
    activeSubTab === 'Active Loans'
      ? loans.filter((loan) => loan.status === 'active')
      : loans.filter((loan) => loan.status === 'inactive');

  return (
    <DashboardWrapper>
      <Title>Rocko Dashboard</Title>
      <Tabs>
        <Tab active={activeTab === 'Loans'} onClick={() => setActiveTab('Loans')}>
          Loans
        </Tab>
        <Tab active={activeTab === 'Deposits'} onClick={() => setActiveTab('Deposits')}>
          Deposits
        </Tab>
      </Tabs>

      {activeTab === 'Loans' && (
        <Section>
          <SubTabs>
            <SubTab active={activeSubTab === 'Active Loans'} onClick={() => setActiveSubTab('Active Loans')}>
              Active Loans
            </SubTab>
            <SubTab active={activeSubTab === 'Closed Loans'} onClick={() => setActiveSubTab('Closed Loans')}>
              Closed Loans
            </SubTab>
          </SubTabs>
          <CreateButton to="/get-a-loan">Create New Loan</CreateButton>

          
          {loading ? (
            <p>Loading loans...</p>
          ) : filteredLoans.length === 0 ? (
            <p>No loans found for the account: {account}</p>
          ) : (
            <LoanTableWrapper>
              <LoanTable>
                <thead>
                  <tr>
                    <th>Transaction Hash</th>
                    <th>Amount</th>
                    <th>Currency</th>
                    <th>Collateral</th>
                    <th>APR</th>
                    <th>Loan Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLoans.map((loan) => (
                    <tr key={loan.id}>
                      <td>{loan.transaction_hash}</td>
                      <td>{loan.amount}</td>
                      <td>{loan.currency}</td>
                      <td>
                        {loan.collateral_amount} {loan.collateral_asset}
                      </td>
                      <td>{loan.apr}</td>
                      <td>{loan.days} days</td>
                      <td>
                        {loan.status === 'active' && (
                          <ActionButton
                            onClick={() => handleRepayLoan(loan.id, loan.amount, loan.receiver_address)}
                          >
                            Repay
                          </ActionButton>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </LoanTable>
            </LoanTableWrapper>
          )}
        </Section>
      )}

      {activeTab === 'Deposits' && (
        <Section>
          {loading ? (
            <p>Loading deposits...</p>
          ) : deposits.length === 0 ? (
            <p>No deposits found for the account: {account}</p>
          ) : (
            <LoanTableWrapper>
              <LoanTable>
                <thead>
                  <tr>
                    <th>Transaction Hash</th>
                    <th>Amount</th>
                    <th>Duration</th>
                    <th>APY</th>
                    <th>Protocol</th>
                    <th>Network</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((deposit) => (
                    <tr key={deposit.id}>
                      <td>{deposit.transaction_hash}</td>
                      <td>{deposit.amount} USD</td>
                      <td>{deposit.duration} days</td>
                      <td>{deposit.apy}</td>
                      <td>{deposit.protocol}</td>
                      <td>{deposit.network}</td>
                      <td>{new Date(deposit.created_at).toLocaleString()}</td>
                      <td>
                        {deposit.withdrawal_requested ? (
                          <span>Request Pending</span>
                        ) : (
                          <ActionButton onClick={() => openWithdrawForm(deposit.id, deposit.amount)}>
                            Withdraw
                          </ActionButton>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </LoanTable>
            </LoanTableWrapper>
          )}
        </Section>
      )}

      {isWithdrawModalOpen && selectedDeposit && (
        <ModalWrapper>
          <ModalContent>
            <h2>Withdraw Request</h2>
            <p>Are you sure you want to request a withdrawal of {selectedDeposit.amount} USD?</p>
            <ModalButton onClick={() => handleWithdrawRequest(selectedDeposit.id, selectedDeposit.amount)}>
              Confirm
            </ModalButton>
            <ModalButton onClick={closeWithdrawForm}>Cancel</ModalButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </DashboardWrapper>
  );
}