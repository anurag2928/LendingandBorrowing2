
// Step5.tsx
import React from 'react';
import { Card, Title, SectionTitle, Row } from './LoanFlowstyle';
import Button from '../../components/ui/Button';

export default function Step5({ data }: any) {
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
