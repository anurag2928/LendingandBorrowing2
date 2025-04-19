import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import LoanFlowPage from './pages/LoanFlowPage'; // Importing LoanFlowPage

// Placeholder pages for routes we haven't implemented yet
const WhyDeFi = () => <div style={{padding: '100px 20px', textAlign: 'center'}}><h1>Why DeFi?</h1></div>;
const Contact = () => <div style={{padding: '100px 20px', textAlign: 'center'}}><h1>Contact Us</h1></div>;
const Learn = () => <div style={{padding: '100px 20px', textAlign: 'center'}}><h1>Learn Resources</h1></div>;
const NotFound = () => <div style={{padding: '100px 20px', textAlign: 'center'}}><h1>404 - Page Not Found</h1></div>;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/why-defi" element={<WhyDeFi />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/get-a-loan" element={<LoanFlowPage />} /> {/* Added route for LoanFlowPage */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
