import React from 'react';
import { Card, Title, SectionTitle, Row, Label, Input } from './LoanFlowstyle';

const usdcIcon = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png';
const usdIcon = 'https://cryptologos.cc/logos/usd-usd-logo.png';

export default function Step1({ data, setData }: any) {
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>What do you want to borrow?</SectionTitle>
      <Row style={{ gap: '24px', marginBottom: 22 }}>
        <Card
          style={{
            borderColor: data.currency === 'USDC' ? '#262d6a' : '#eee',
            borderWidth: 2,
            cursor: 'pointer',
            maxWidth: 140,
          }}
          onClick={() => setData((d: any) => ({ ...d, currency: 'USDC' }))}
        >
          <img src={usdcIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
          <Label>
            USDC
            <br />
            <span style={{ fontWeight: 400, fontSize: 12 }}>USD Coin</span>
          </Label>
        </Card>

        <Card style={{ filter: 'grayscale(1)', opacity: 0.6, maxWidth: 140 }}>
          <img src={usdIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
          <Label>
            USD
            <br />
            <span style={{ fontWeight: 400, fontSize: 12 }}>US Dollar</span>
          </Label>
          <div
            style={{
              fontSize: 12,
              marginTop: 6,
              color: '#999',
              padding: '4px 12px',
              background: '#ededed',
              borderRadius: 7,
              width: 'fit-content',
            }}
          >
            Coming Soon
          </div>
        </Card>
      </Row>

      <SectionTitle style={{ marginTop: '30px' }}>
        How much do you want to borrow?
      </SectionTitle>
      <Row>
        <Input
          value={data.amount}
          type='number'
          min={1}
          max={500000}
          onChange={(e) =>
            setData((d: any) => ({ ...d, amount: e.target.value }))
          }
        />
        <span style={{ fontWeight: 500 }}>{data.currency}</span>
      </Row>
    </>
  );
}
