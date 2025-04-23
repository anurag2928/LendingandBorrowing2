import React from 'react';
import { Card, Title, SectionTitle, Row, Label } from './LoanFlowstyle';
import Button from './../../../src/components/ui/Button';

const Step3 = ({ data, setData }: any) => {
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
        <Card
          key={opt.k + i}
          style={{
            border: 'none',
            marginBottom: '22px',
            background: '#fcfcfd',
            boxShadow: '0 0 0 1px #ececec',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 32px',
          }}
        >
          <div>
            <Row style={{ gap: 14 }}>
              <img
                src={
                  opt.k === 'Aave'
                    ? 'https://cryptologos.cc/logos/aave-aave-logo.png'
                    : 'https://cryptologos.cc/logos/compound-comp-logo.png'
                }
                style={{ width: 32 }}
                alt=''
              />
              <div>
                <Label style={{ fontSize: 17 }}>{opt.k}</Label>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 400,
                    marginTop: 2,
                    color: '#666',
                  }}
                >
                  Network: <span style={{ fontWeight: 500 }}>{opt.net}</span>
                </div>
              </div>
            </Row>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>
              <span style={{ fontWeight: 500, fontSize: 19 }}>{opt.apr}</span> APR{' '}
              <span
                style={{
                  fontWeight: 500,
                  fontSize: 17,
                  color: '#999',
                  marginLeft: 6,
                }}
              >
                {opt.apr30}
              </span>{' '}
              APR
            </div>
            <div style={{ fontSize: 13, margin: '5px 0' }}>1D Avg | 30D Avg</div>
            <div style={{ fontSize: 15 }}>
              Current Reward Rate: <b>{opt.reward}</b>
            </div>
            <a
              style={{
                color: '#6450ea',
                fontSize: 12,
                marginTop: 4,
                display: 'inline-block',
              }}
              href='#'
            >
              See more details
            </a>
          </div>
          <Button
            variant={data.protocol === i ? 'primary' : 'outline'}
            style={{ fontWeight: 600, fontSize: 15, width: 84 }}
            onClick={() => setData((d: any) => ({ ...d, protocol: i }))}
          >
            {data.protocol === i ? 'Selected' : 'Select'}
          </Button>
        </Card>
      ))}
    </>
  );
};

export default Step3;
