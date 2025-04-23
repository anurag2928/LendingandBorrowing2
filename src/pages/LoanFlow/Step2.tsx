import React from 'react';
import { Card, Title, SectionTitle, Row, Label } from './LoanFlowstyle';

const btcIcon = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
const ethIcon = 'https://cryptologos.cc/logos/ethereum-eth-logo.png';
const protocolIcon = 'https://cryptologos.cc/logos/compound-comp-logo.png';
const aaveIcon = 'https://cryptologos.cc/logos/aave-aave-logo.png';

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

export default function Step2({ data, setData }: any) {
  return (
    <>
      <Title>Customize Your Loan</Title>
      <SectionTitle>Choose which asset you will post as collateral.</SectionTitle>
      <Row style={{ flexWrap: 'wrap', gap: '22px 30px' }}>
        {options.map((opt) => (
          <Card
            key={opt.k}
            style={{
              borderColor: data.collateral === opt.k ? '#262d6a' : '#eee',
              borderWidth: 2,
              width: 140,
              cursor: 'pointer',
              textAlign: 'center',
              padding: '24px 8px',
            }}
            onClick={() => setData((d: any) => ({ ...d, collateral: opt.k }))}
          >
            <img
              src={opt.icon}
              alt=''
              style={{
                width: 34,
                marginBottom: 7,
                filter:
                  opt.k === 'UNI' || opt.k === 'LINK'
                    ? 'hue-rotate(200deg)'
                    : undefined,
              }}
            />
            <Label>
              {opt.k}
              <br />
              <span style={{ fontWeight: 400, fontSize: 13 }}>{opt.n}</span>
            </Label>
          </Card>
        ))}
      </Row>
    </>
  );
}
