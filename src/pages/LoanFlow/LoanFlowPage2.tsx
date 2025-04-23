import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Button from '../../components/ui/Button';
import {
  LoanContainer,
  LoanSummary,
  NavBar,
  StepTag,
  StepperBar,
  Card,
} from './LoanFlowstyle';  

const steps = ['Loan Amount', 'Collateral Asset', 'Lending Protocol', 'Collateral Buffer', 'Loan Summary'];

export default function LoanFlowPage2() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    currency: 'USDC',
    amount: '10000',
    collateral: 'ETH',
    protocol: 0,
    buffer: '150',
    bufferValue: ''
  });

  const CurrentStep = [Step1, Step2, Step3, Step4, Step5][step];

  const canBack = step > 0;
  const canNext = step < steps.length - 1;

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
        <div style={{ flex: 1, minWidth: 0 }}>
          <Card>
            <CurrentStep data={data} setData={setData} />
          </Card>
        </div>

        <LoanSummary>
          <h2 style={{ fontSize: 23, fontWeight: 600, marginBottom: 8 }}>
            Loan Summary
          </h2>
          <div style={{ fontSize: 16, marginBottom: 10 }}>
            Borrowing <b style={{ fontSize: 22 }}>{summaryData.amount} {summaryData.currency}</b><br />
            <span style={{ color: '#777', fontSize: 13 }}>~${summaryData.amount}</span>
          </div>
          <hr style={{ margin: '16px 0' }} />
          <div>1 Day Avg APR | Current APR <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
          <div style={{ fontSize: 26, fontWeight: 600, margin: '9px 0 8px 0' }}>{summaryData.apr}</div>
          <hr style={{ margin: '16px 0' }} />
          <div style={{ marginBottom: 14 }}>Projected Interest at Current APR</div>
          <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}><span>6 months</span><span>{summaryData.interest6}</span></div>
          <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}><span>12 months</span><span>{summaryData.interest12}</span></div>
          <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}><span>24 months</span><span>{summaryData.interest24}</span></div>
          <hr style={{ margin: '16px 0' }} />
          <div style={{ marginBottom: 10 }}>Collateral Needed <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
          <div style={{ fontWeight: 600 }}>{summaryData.collateralAmount}</div>
          <div style={{ fontSize: 12, color: '#666' }}>18.7784 {summaryData.collateralAsset}</div>
          <div style={{ marginTop: 15, marginBottom: 10 }}>Liquidation Price ({summaryData.collateralAsset}) <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
          <div style={{ fontWeight: 600 }}>{summaryData.liquidation}</div>
          <div style={{ fontSize: 12, color: '#666' }}>$1,604.01</div>
        </LoanSummary>
      </LoanContainer>

      <NavBar>
        <StepTag>
          {steps[step]}: {step + 1}/5
        </StepTag>
        <div style={{ display: 'flex', gap: 18 }}>
          <Button
            variant="outline"
            size="large"
            onClick={() => setStep((s) => s - 1)}
            disabled={!canBack}
          >
            Back
          </Button>
          {canNext ? (
            <Button
              variant="primary"
              size="large"
              onClick={() => setStep((s) => s + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              size="large"
              onClick={() => alert('Loan Finalized!')}
            >
              Finalize Loan
            </Button>
          )}
        </div>
      </NavBar>
    </>
  );
}
