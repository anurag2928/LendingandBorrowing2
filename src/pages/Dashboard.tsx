import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Adjust the path as necessary

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

// Removed duplicate LoanTable declaration

const LoanTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling for smaller screens */
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

export default function DashboardPage({ account }: { account: string | null }) {
  const [activeTab, setActiveTab] = useState('Loans');
  const [activeSubTab, setActiveSubTab] = useState('Active Loans');
  const [loans, setLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!account) return;

    const fetchLoans = async () => {
      try {
        setLoading(true);

        // Fetch loans from Supabase
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .eq('user_address', account)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching loans:', error);
        } else {
          console.log('Fetched loans:', data); // Log fetched data for debugging
          setLoans(data || []);
        }
      } catch (err) {
        console.error('Error fetching loans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [account]);

  // Filter loans based on the activeSubTab
  const filteredLoans =
    activeSubTab === 'Active Loans'
      ? loans.filter((loan) => loan.status === 'active') // Show only active loans
      : loans.filter((loan) => loan.status === 'inactive'); // Show only inactive loans

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
                    <th>Created At</th>
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
                      <td>{new Date(loan.created_at).toLocaleString()}</td>
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
          <p>Deposits section content goes here.</p>
        </Section>
      )}
    </DashboardWrapper>
  );
}