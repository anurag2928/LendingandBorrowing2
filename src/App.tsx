import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import DashboardPage from './pages/Dashboard';
import LoanFlowPage from './pages/LoanFlowpage1';
import LendPage from './pages/LendPage';
import { WalletProvider, useWallet } from './context/WalletContext'; // Import WalletProvider and useWallet

// Placeholder pages for routes we haven't implemented yet
const WhyDeFi = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Why DeFi?</h1></div>;
const Contact = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Contact Us</h1></div>;
const Learn = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>Learn Resources</h1></div>;
const NotFound = () => <div style={{ padding: '100px 20px', textAlign: 'center' }}><h1>404 - Page Not Found</h1></div>;

function App() {
  return (
    <WalletProvider> {/* Wrap the app with WalletProvider */}
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPageWrapper />} /> {/* Use a wrapper to pass account */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/why-defi" element={<WhyDeFi />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/get-a-loan" element={<LoanFlowPageWrapper />} /> {/* Use a wrapper to pass account */}
            <Route path="*" element={<NotFound />} />
            <Route path="/lend" element={<LendPageWrapper />} /> {/* Use a wrapper to pass account */}
          </Routes>
        </Layout>
      </ThemeProvider>
    </WalletProvider>
  );
}

// Wrapper component to pass account to LoanFlowPage
const LoanFlowPageWrapper = () => {
  const { account } = useWallet(); // Access account from WalletContext
  return <LoanFlowPage account={account} />;
};

// Wrapper component to pass account to DashboardPage
const DashboardPageWrapper = () => {
  const { account } = useWallet(); // Access account from WalletContext
  return <DashboardPage account={account} />;
};

// Wrapper component to pass account to LendPage
const LendPageWrapper = () => {
  const { account } = useWallet();
  return <LendPage account={account} />;
};

export default App;