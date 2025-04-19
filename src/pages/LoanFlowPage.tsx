import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/ui/Button';
import { Container } from '../styles/CommonStyles';
import { media } from '../styles/responsive';

const steps = [
  'Loan Amount',
  'Collateral Asset',
  'Lending Protocol',
  'Collateral Buffer',
  'Loan Summary',
];

// Styled Components
const LoanContainer = styled(Container)`
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

const Card = styled.div`
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

const LoanSummary = styled(Card)`
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

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 28px;
  font-weight: 600;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
`;
const Label = styled.span`
  font-size: 16px;
  font-weight: 500;
`;
const Input = styled.input`
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px 16px;
  width: 150px;
  margin-right: 10px;
`;
const StepperBar = styled.div<{ $step: number }>`
  width: 100%;
  height: 4px;
  background: #ececec;
  margin-bottom: 8px;
  position: relative;
  > div {
    height: 100%;
    background: linear-gradient(90deg, #262d6a, #5532b9);
    width: ${({ $step }) => (($step + 1) / steps.length) * 100}%;
    border-radius: 2px;
    transition: width 0.2s;
  }
`;
const NavBar = styled.div`
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
const StepTag = styled.div`
  font-weight: 400;
  font-size: 15px;
`;

// Placeholder logos/icons
const usdcIcon = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png';
const usdIcon = 'https://cryptologos.cc/logos/usd-usd-logo.png';
const btcIcon = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
const ethIcon = 'https://cryptologos.cc/logos/ethereum-eth-logo.png';
const protocolIcon = 'https://cryptologos.cc/logos/compound-comp-logo.png';
const aaveIcon = 'https://cryptologos.cc/logos/aave-aave-logo.png';

// Step Components (simplified/mocked for now)
function Step1({ data, setData }: any) {
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>What do you want to borrow?</SectionTitle>
      <Row style={{ gap: '24px', marginBottom: 22 }}>
        <Card style={{ borderColor: data.currency === 'USDC' ? '#262d6a' : '#eee', borderWidth: 2, cursor: 'pointer', maxWidth:140 }} onClick={() => setData((d:any) => ({ ...d, currency: 'USDC' }))}>
          <img src={usdcIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
          <Label>USDC<br /><span style={{ fontWeight: 400, fontSize: 12 }}>USD Coin</span></Label>
        </Card>
        <Card style={{ filter: 'grayscale(1)', opacity: 0.6, maxWidth:140 }}>
          <img src={usdIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
          <Label>USD<br /><span style={{ fontWeight: 400, fontSize: 12 }}>US Dollar</span></Label>
          <div style={{ fontSize: 12, marginTop: 6, color: '#999', padding: '4px 12px', background: '#ededed', borderRadius: 7, width: 'fit-content' }}>
            Coming Soon
          </div>
        </Card>
      </Row>
      <SectionTitle style={{marginTop:"30px"}}>How much do you want to borrow?</SectionTitle>
      <Row>
        <Input value={data.amount} type="number" min={1} max={500000} onChange={e=>setData((d:any)=>({...d, amount:e.target.value}))} />
        <span style={{fontWeight:500}}>{data.currency}</span>
      </Row>
    </>
  );
}

function Step2({ data, setData }: any) {
  const options = [
    { k: 'BTC', n: 'Bitcoin', icon: btcIcon },
    { k: 'ETH', n: 'Ether', icon: ethIcon },
    { k: 'WBTC', n: 'Wrapped Bitcoin', icon: btcIcon },
    { k: 'CBBTC', n: 'Coinbase Wrapped BTC', icon: btcIcon },
    { k: 'WSTETH', n: 'Wrapped Staked Ether', icon: ethIcon },
    { k: 'TBTC', n: 'Threshold tBTC', icon: btcIcon },
    { k: 'UNI', n: 'Uniswap', icon: protocolIcon },
    { k: 'LINK', n: 'Chainlink', icon: protocolIcon },
    { k: 'CBETH', n: 'Coinbase Staked ETH', icon: ethIcon },
    { k: 'AAVE', n: 'Aave', icon: aaveIcon },
  ];
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>Choose which asset you will post as collateral.</SectionTitle>
      <Row style={{flexWrap:'wrap', gap: '22px 30px'}}>
        {options.map(opt => (
          <Card key={opt.k} style={{ borderColor: data.collateral === opt.k ? '#262d6a' : '#eee', borderWidth: 2, width: 140, cursor: 'pointer', textAlign:'center', padding:'24px 8px' }} onClick={() => setData((d:any)=>({...d, collateral:opt.k}))}>
            <img src={opt.icon} alt='' style={{ width: 34, marginBottom: 7, filter: opt.k === 'UNI' || opt.k === 'LINK' ? 'hue-rotate(200deg)' : undefined }} />
            <Label>{opt.k}<br /><span style={{ fontWeight: 400, fontSize: 13 }}>{opt.n}</span></Label>
          </Card>
        ))}
      </Row>
    </>
  );
}

function Step3({ data, setData }: any) {
  const options = [
    { k: 'Compound', net: 'Base', apr: '4.08%', apr30: '4.44%', reward: '0.51%' },
    { k: 'Aave', net: 'Optimism', apr: '4.09%', apr30: '4.36%', reward: '1.65%' },
    { k: 'Compound', net: 'Arbitrum', apr: '4.10%', apr30: '4.28%', reward: '0.60%' },
    { k: 'Compound', net: 'Optimism', apr: '4.18%', apr30: '4.12%', reward: '1.73%' },
  ];
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>Choose a lending protocol and loan offer.</SectionTitle>
      {options.map((opt, i) => (
        <Card key={opt.k + i} style={{border:'none', marginBottom:'22px', background:'#fcfcfd', boxShadow:'0 0 0 1px #ececec', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 32px'}}>
          <div>
            <Row style={{gap:14}}>
              <img src={opt.k==='Aave'?aaveIcon:protocolIcon} style={{width:32}} alt='' />
              <div>
                <Label style={{fontSize:17}}>{opt.k}</Label>
                <div style={{fontSize:13, fontWeight:400, marginTop:2, color:'#666'}}>Network: <span style={{fontWeight:500}}>{opt.net}</span></div>
              </div>
            </Row>
          </div>
          <div style={{textAlign:'right'}}>
            <div><span style={{fontWeight:500, fontSize:19}}>{opt.apr}</span> APR <span style={{fontWeight:500, fontSize:17, color:'#999',marginLeft:6}}>{opt.apr30}</span> APR</div>
            <div style={{fontSize:13, margin:'5px 0'}}>1D Avg | 30D Avg</div>
            <div style={{fontSize:15}}>Current Reward Rate: <b>{opt.reward}</b></div>
            <a style={{color:'#6450ea', fontSize:12,marginTop:4, display:'inline-block'}} href="#">See more details</a>
          </div>
          <Button variant={data.protocol===i?"primary":"outline"} style={{fontWeight:600, fontSize:15, width:84}} onClick={()=>setData((d:any)=>({...d, protocol:i}))}>{data.protocol===i?"Selected":"Select"}</Button>
        </Card>
      ))}
    </>
  );
}

function Step4({ data, setData }: any) {
  const opts = [
    { v: '150', c: '#24ad43', desc: 'Lower risk of liquidation' },
    { v: '100', c: '#eadb2c', desc: '' },
    { v: '50', c: '#ea942c', desc: 'Higher risk of liquidation' },
  ];
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>Choose how much additional collateral to post for your loan.</SectionTitle>
      <Row style={{gap:'20px'}}>
        {opts.map(opt => (
          <Card key={opt.v} style={{ borderColor: data.buffer === opt.v ? opt.c : '#eee', borderWidth: 2, width:180, cursor:'pointer', textAlign:'center', padding:'20px 8px' }} onClick={()=>setData((d:any)=>({...d, buffer:opt.v}))}>
            <div style={{height:16}}><span style={{display:'inline-block',width:18,height:18,borderRadius:'50%',background:opt.c,marginBottom:5}} /></div>
            <Label>{opt.v}% extra<br /><span style={{ fontWeight: 400, fontSize: 13 }}>{opt.desc}</span></Label>
          </Card>
        ))}
      </Row>
      <Row style={{marginTop:20, alignItems:'center'}}>
        <input type="radio" name="bufferOption" checked={data.buffer==='other'} onChange={()=>setData((d:any)=>({...d, buffer:'other'}))} />
        <span style={{marginLeft:10, fontWeight:500}}>Input other value</span>
        {data.buffer==='other' && <Input value={data.bufferValue || ''} type="number" min={10} max={1000} onChange={e=>setData((d:any)=>({...d, bufferValue: e.target.value}))} style={{marginLeft:18}} placeholder="% extra" />}
      </Row>
      <div style={{marginTop:26, fontSize:15, background:'#f7f7f9', padding:'24px 20px', borderRadius:12, color:'#333',maxWidth:600}}>
        Your loan requires your collateral to maintain a certain value at all times, otherwise your collateral may be liquidated (i.e. sold) by the lending protocol. <b>A collateral buffer is the percentage of collateral you provide above what is required for your loan.</b> A larger collateral buffer will reduce the asset price at which your collateral would be liquidated (i.e. liquidation price). <a href="#" style={{ color: '#6450ea' }}>Learn more.</a>
      </div>
    </>
  );
}

function Step5({ data }: any) {
  return (
    <>
      <Title>Finalize Your Loan</Title>
      <SectionTitle>Loan Summary</SectionTitle>
      <Card style={{background:'#f4f4f9',marginBottom: 32}}>
        <table style={{width:'100%',fontSize:16, lineHeight:1.7}}>
          <tbody>
            <tr><td>Lending Protocol</td><td><b>Compound</b></td></tr>
            <tr><td>Blockchain Network</td><td><img src="https://cryptologos.cc/logos/arbitrum-arb-logo.png" alt='' style={{width:22,verticalAlign:'middle',marginRight:4}}/> Arbitrum</td></tr>
            <tr><td>Loan Amount</td><td><b>${Number(data.amount||'10000').toLocaleString(undefined,{maximumFractionDigits:2})} {data.currency}</b><div style={{fontSize:13,color:'#888'}}>~${Number(data.amount||'10000').toLocaleString(undefined)}</div></td></tr>
            <tr><td>Interest Rate Type</td><td>Floating <span style={{fontSize:15,marginLeft:6}} title="Floating rate">ⓘ</span></td></tr>
            <tr><td>Current APR</td><td>4.08% <span style={{fontSize:15,marginLeft:6}} title="Current APR">ⓘ</span></td></tr>
            <tr><td>One Day Trailing Average APR</td><td>4.10%</td></tr>
            <tr><td>Amount Required for Loan</td><td>18.84 ETH<div style={{fontSize:13,color:'#888'}}>$30,220.49</div></td></tr>
            <tr><td>Collateral</td><td>18.77 ETH<div style={{fontSize:13,color:'#888'}}>$30,120.49</div></td></tr>
            <tr><td>Rocko Service Fee</td><td>~0.0623 ETH<div style={{fontSize:13,color:'#888'}}>$100.00</div></td></tr>
            <tr><td>Collateral Buffer</td><td>{data.buffer==='other'?`${data.bufferValue}%`: `${data.buffer}%`}</td></tr>
            <tr><td>Liquidation Price</td><td>$605.15 <span style={{fontSize:15,marginLeft:6}} title="Liquidation Price">ⓘ</span></td></tr>
            <tr><td>Estimated Time to Receive Loan</td><td>&lt;5 Minutes*</td></tr>
          </tbody>
        </table>
        <div style={{fontSize:13,color:'#888', marginTop:18}}>
          * Loan fulfillment times are subject to the Arbitrum network and when the collateral is received. Fulfillment may be delayed during periods of high congestion.
        </div>
      </Card>
      <SectionTitle>Where do you want to receive your loan?</SectionTitle>
      <Card style={{background:'#fafbfc',marginBottom:24}}>
        <Row style={{marginBottom:18}}>
          <input type='radio' name='walletType' defaultChecked/>
          <div style={{marginLeft:9}}>
            <b>Ethereum Wallet</b> <span style={{marginLeft:8}}>Connect your wallet (MetaMask, Phantom, and more supported)</span>
            <Button variant='outline' style={{marginLeft:20}}>Connect</Button>
          </div>
        </Row>
        <Row><input type='radio' name='walletType' /><span style={{marginLeft:9}}><b>Exchange or Wallet Address</b> Input the exchange or wallet address where you wish to receive your USDC</span></Row>
      </Card>
      <Card style={{background:'#f4f4f7', fontSize:15, color:'#232'}}>
        <ul style={{paddingLeft:'20px', marginBottom:8}}>
          <li>By finalizing your loan request, you will receive a self-custodial Rocko smart wallet that will help facilitate your loan. You must transfer the Amount Required (shown above) to your Rocko smart wallet in order for your loan to be fulfilled.</li>
          <li>Additionally, you authorize your Rocko smart wallet to pay the service fee (shown above). More info on Rocko's fee can be found <a href="#" style={{color:'#6450ea'}}>here</a>.</li>
        </ul>
        <div style={{marginTop:10}}><input type='checkbox'/> By checking this box, you agree to the Rocko Terms of Service which can be found <a href="#" style={{color:'#6450ea'}}>here</a>. <b>You also understand and acknowledge the risks of using DeFi protocols, self-custodial wallets, and blockchain networks which can include loss of funds.</b></div>
      </Card>
    </>
  );
}

function LoanFlowPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ currency: 'USDC', amount: '10000', collateral: 'ETH', protocol: 0, buffer: '150', bufferValue: '' });

  const canNext = step < 4;
  const canBack = step > 0;

  // Simplified static summary
  const summaryData = {
    amount: data.amount,
    currency: data.currency,
    apr: '4.34%',
    apr30: '4.44%',
    protocol: 'Compound',
    net: 'Arbitrum',
    interest6: '$216.16',
    interest12: '$436.98',
    interest24: '$893.06',
    collateralAmount: '$30,120.49',
    collateralAsset: 'ETH',
    liquidation: '$605.15',
  };

  return (
    <>
      <StepperBar $step={step}><div /></StepperBar>
      <LoanContainer>
        <div style={{flex:1,minWidth:0}}>
          <Card>
            {step === 0 && <Step1 data={data} setData={setData} />}
            {step === 1 && <Step2 data={data} setData={setData} />}
            {step === 2 && <Step3 data={data} setData={setData} />}
            {step === 3 && <Step4 data={data} setData={setData} />}
            {step === 4 && <Step5 data={data} />}
          </Card>
        </div>
        <LoanSummary>
          <h2 style={{fontSize:23, fontWeight:600, marginBottom:8}}>Loan Summary</h2>
          <div style={{fontSize:16,marginBottom:10}}>Borrowing <b style={{fontSize:22}}>{summaryData.amount} {summaryData.currency}</b><br /><span style={{color:'#777',fontSize:13}}>~${summaryData.amount}</span></div>
          <hr style={{margin:'16px 0'}}/>
          <div>1 Day Avg APR | Current APR <span style={{marginLeft:6,fontSize:13}}>ⓘ</span></div>
          <div style={{fontSize:26, fontWeight:600, margin:'9px 0 8px 0'}}>{summaryData.apr}</div>
          <hr style={{margin:'16px 0'}}/>
          <div style={{marginBottom:14}}>Projected Interest at Current APR</div>
          <div style={{fontSize:15,display:'flex',justifyContent:'space-between'}}><span>6 months</span><span>{summaryData.interest6}</span></div>
          <div style={{fontSize:15,display:'flex',justifyContent:'space-between'}}><span>12 months</span><span>{summaryData.interest12}</span></div>
          <div style={{fontSize:15,display:'flex',justifyContent:'space-between'}}><span>24 months</span><span>{summaryData.interest24}</span></div>
          <hr style={{margin:'16px 0'}}/>
          <div style={{marginBottom:10}}>Collateral Needed <span style={{marginLeft:6,fontSize:13}}>ⓘ</span></div>
          <div style={{fontWeight:600}}>{summaryData.collateralAmount}</div>
          <div style={{fontSize:12, color:'#666'}}>18.7784 ETH</div>
          <div style={{marginTop:15,marginBottom:10}}>Liquidation Price (ETH) <span style={{marginLeft:6,fontSize:13}}>ⓘ</span></div>
          <div style={{fontWeight:600}}>{summaryData.liquidation}</div>
          <div style={{fontSize:12, color:'#666'}}>$1,604.01</div>
        </LoanSummary>
      </LoanContainer>
      <NavBar>
        <StepTag>
          {steps[step]}: {step+1}/5
        </StepTag>
        <div style={{display:'flex',gap:18}}>
          <Button variant='outline' size='large' onClick={()=>setStep(s=>s-1)} disabled={!canBack}>Back</Button>
          {step < 4 ? (
            <Button variant='primary' size='large' onClick={()=>setStep(s=>s+1)} disabled={step>=4}>Next</Button>
          ) : (
            <Button variant='primary' size='large' onClick={()=>alert('Loan finalized!')}>Finalize Loan</Button>
          )}
        </div>
      </NavBar>
    </>
  );
}

export default LoanFlowPage;
