import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import Button from '../components/ui/Button';
import {
    LoanContainer,
    LoanSummary,
    NavBar,
    StepTag,
    StepperBar,
    Card,
    Title,
    SectionTitle,
    Row,
    Label,
    Input,
} from './LoanFlow/LoanFlowstyle';
import { supabase } from './../supabaseClient'; // Adjust the import path as necessary
import {useNavigate } from 'react-router-dom';

interface LoanFlowPageProps {
    account: string | null;
}

const steps = ['Loan Amount', 'Collateral Asset', 'Lending Protocol', 'Collateral Buffer', 'Loan Summary'];

const usdcIcon = 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png';
const usdIcon = 'https://cryptologos.cc/logos/usd-usd-logo.png';
const ethIcon = 'https://cryptologos.cc/logos/ethereum-eth-logo.png';
const btcIcon = 'https://cryptologos.cc/logos/bitcoin-btc-logo.png';
const arbitrumIcon = 'https://cryptologos.cc/logos/arbitrum-arb-logo.png';

const lendingOptions = [
    { k: 'Compound', net: 'Base', apr: '4.08%', apr30: '4.44%', reward: '0.51%' },
    { k: 'Aave', net: 'Optimism', apr: '4.09%', apr30: '4.36%', reward: '1.65%' },
    { k: 'Compound', net: 'Arbitrum', apr: '4.10%', apr30: '4.28%', reward: '0.60%' },
    { k: 'Compound', net: 'Optimism', apr: '4.18%', apr30: '4.12%', reward: '1.73%' },
];

// const collateralPrices = {
//     ETH: 1600, // in USD
//     BTC: 80000,
// };

export default function LoanFlowPage({ account }: LoanFlowPageProps) {
    const [collateralPrices, setCollateralPrices] = useState({
        ETH: 1600, // Default value
        BTC: 80000, // Default value
    });

    useEffect(() => {
        const fetchCollateralPrices = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                    params: {
                        ids: 'ethereum,bitcoin',
                        vs_currencies: 'usd',
                    },
                });

                console.log('Collateral Prices:', response.data);
                setCollateralPrices({
                    ETH: response.data.ethereum.usd,
                    BTC: response.data.bitcoin.usd,
                });
            } catch (error) {
                console.error('Error fetching collateral prices:', error);
            }
        };

        fetchCollateralPrices();

        // Optional: Refresh prices every 1 minutes
        const interval = setInterval(fetchCollateralPrices, 60000); // 60000 ms = 1 minute
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const [step, setStep] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState({
        currency: 'USDC',
        amount: '',
        days: '', // Added state for loan duration
        collateral: 'ETH',
        protocol: 0,
        buffer: '150',
        bufferValue: '',
        collateralNeeded: '--',
        liquidationPrice: '--',
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate(); // Use useNavigate from react-router-dom

    const canBack = step > 0;
    const canNext = step < steps.length - 1;

    const parseAPR = (aprString: string) => parseFloat(aprString.replace('%', '')) / 100;
    const parseAmount = (amountString: string) => parseFloat(amountString) || 0;

    const amount = parseAmount(data.amount);
    const aprDecimal = step >= 2 ? parseAPR(lendingOptions[data.protocol].apr) : 0;

    const interest6 = amount ? (amount * aprDecimal * 0.5).toFixed(2) : '--';
    const interest12 = amount ? (amount * aprDecimal * 1).toFixed(2) : '--';
    const interest24 = amount ? (amount * aprDecimal * 2).toFixed(2) : '--';

    // const normalizedCollateral = (data.collateral || '').toUpperCase();
    // const collateralPrice = collateralPrices[normalizedCollateral as 'ETH' | 'BTC'] || 1;

    const updateCollateralData = (bufferValue: string) => {
        const amount = parseFloat(data.amount) || 0;
        const collateralPrice = collateralPrices[data.collateral as 'ETH' | 'BTC'] || 1;

        const updatedCollateralNeeded =
            amount && collateralPrice
                ? (amount / collateralPrice * (parseFloat(bufferValue) / 100)).toFixed(4)
                : '--';
        const updatedLiquidationPrice =
            amount && updatedCollateralNeeded !== '--'
                ? (amount / (parseFloat(updatedCollateralNeeded) * 0.8)).toFixed(2)
                : '--';

        return { updatedCollateralNeeded, updatedLiquidationPrice };
    };


    const validateStep = () => {
        if (step === 0) {
            if (!data.amount || parseFloat(data.amount) < 0) {
                setError('Please enter a valid loan amount.');
                return false;
            }
            if (!data.days || parseInt(data.days) < 0) {
                setError('Please enter the number of days for the loan.');
                return false;
            }
        } else if (step === 1) {
            if (!data.collateral) {
                setError('Please select a collateral asset.');
                return false;
            }
        } else if (step === 2) {
            if (data.protocol === null) {
                setError('Please select a lending protocol.');
                return false;
            }
        } else if (step === 3) {
            if (!data.buffer || parseFloat(data.buffer) < 100 || parseFloat(data.buffer) > 300) {
                setError('Please set a valid collateral buffer (100% - 300%).');
                return false;
            }
        }
        setError(null); // Clear error if validation passes
        return true;
    };

    const handleNext = () => {
        if (validateStep()) {
            setStep((s) => s + 1);
        }
    };

    const summaryData = {
        amount: data.amount || '--',
        currency: data.currency || '--',
        days: data.days || '--', // Added days to summary data
        apr: step >= 2 ? lendingOptions[data.protocol].apr : '--',
        apr30: step >= 2 ? lendingOptions[data.protocol].apr30 : '--',
        protocol: lendingOptions[data.protocol].k,
        net: lendingOptions[data.protocol].net,
        interest6: step >= 2 && amount ? `$${interest6}` : '--',
        interest12: step >= 2 && amount ? `$${interest12}` : '--',
        interest24: step >= 2 && amount ? `$${interest24}` : '--',
        collateralAmount: data.collateralNeeded,
        collateralAsset: step >= 1 ? data.collateral : '--',
        liquidation: data.liquidationPrice,
    };


    const finalizeLoan = async () => {
        if (!account) {
            setError('Please connect your wallet to finalize the loan.');
            return;
        }

        setIsLoading(true); // Start loading
        try {
            const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
            const signer = await provider.getSigner();

            const receiverAddress = '0x557F0cA834f6a5904228cC0BBf8909AE936Fd366'; // Replace with the actual receiver address
            const collateralAmount = parseFloat(summaryData.collateralAmount || '0');

            if (collateralAmount <= 0) {
                setError('Invalid collateral amount. Please check your loan details.');
                setIsLoading(false); // Stop loading
                return;
            }

            const transactionAmount = ethers.parseEther(collateralAmount.toString());

            // Send the transaction
            const tx = await signer.sendTransaction({
                to: receiverAddress,
                value: transactionAmount,
            });

            console.log('Transaction sent:', tx);

            // Save transaction details and summary data to Supabase
            const { data, error } = await supabase.from('transactions').insert([
                {
                    user_address: account, // User's wallet address
                    receiver_address: receiverAddress, // Receiver's wallet address
                    amount: summaryData.amount, // Loan amount
                    currency: summaryData.currency, // Currency (e.g., USDC)
                    days: summaryData.days, // Loan duration in days
                    apr: summaryData.apr, // Current APR
                    apr30: summaryData.apr30, // 30-day average APR
                    protocol: summaryData.protocol, // Lending protocol
                    net: summaryData.net, // Blockchain network
                    interest6: summaryData.interest6, // Projected interest for 6 months
                    interest12: summaryData.interest12, // Projected interest for 12 months
                    interest24: summaryData.interest24, // Projected interest for 24 months
                    collateral_amount: summaryData.collateralAmount, // Collateral amount
                    collateral_asset: summaryData.collateralAsset, // Collateral asset (e.g., ETH)
                    liquidation_price: summaryData.liquidation, // Liquidation price
                    transaction_hash: tx.hash, // Transaction hash
                    network: 'Sepolia', // Network name
                    created_at: new Date().toISOString(), // Timestamp
                },
            ]);

            if (error) {
                console.error('Error saving transaction to Supabase:', error);
                alert('Transaction sent successfully, but failed to save to the database.');
            } else {
                console.log('Transaction saved to Supabase:', data);
                console.log('Transaction Hash: ' + tx.hash);
                navigate('/Dashboard'); // Redirect to the dashboard after successful transaction
            }
        } catch (err) {
            console.error('Transaction failed:', err);
            setError('Transaction failed. Please try again.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <>
            <StepperBar $step={step}><div /></StepperBar>

            <LoanContainer>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <Card>
                        {step === 0 && (
                            <>
                                <Title>Customize Your Loan</Title>
                                <SectionTitle>What do you want to borrow?</SectionTitle>
                                <Row style={{ gap: '24px', marginBottom: 22 }}>
                                    <Card
                                        style={{ borderColor: data.currency === 'USDC' ? '#262d6a' : '#eee', borderWidth: 2, cursor: 'pointer', maxWidth: 140 }}
                                        onClick={() => setData((d) => ({ ...d, currency: 'USDC' }))}
                                    >
                                        <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png" alt='' style={{ width: 32, marginBottom: 7 }} />
                                        <Label>USDC<br /><span style={{ fontWeight: 400, fontSize: 12 }}>USD Coin</span></Label>
                                    </Card>
                                </Row>
                                <SectionTitle style={{ marginTop: '30px' }}>How much do you want to borrow?</SectionTitle>
                                <Row>
                                    <Input
                                        value={data.amount}
                                        type='number'
                                        min={1}
                                        max={500000}
                                        onChange={(e) => setData((d) => ({ ...d, amount: e.target.value }))}
                                    />
                                    <span style={{ fontWeight: 500 }}>{data.currency}</span>
                                </Row>
                                <SectionTitle style={{ marginTop: '30px' }}>How many days do you want to borrow?</SectionTitle>
                                <Row>
                                    <Input
                                        value={data.days}
                                        type='number'
                                        min={1}
                                        max={365}
                                        onChange={(e) => setData((d) => ({ ...d, days: e.target.value }))}
                                    />
                                    <span style={{ fontWeight: 500 }}>Days</span>
                                </Row>
                            </>
                        )}

                        {step === 1 && (
                            <>
                                <Title>Select Collateral Asset</Title>
                                <SectionTitle>What will you deposit as collateral?</SectionTitle>
                                <Row style={{ gap: '24px' }}>
                                    <Card
                                        style={{ borderColor: data.collateral === 'ETH' ? '#262d6a' : '#eee', background: data.collateral === 'ETH' ? '#eaf1ff' : '#fff', borderWidth: 2, maxWidth: 140, cursor: 'pointer' }}
                                        onClick={() => setData((d) => ({ ...d, collateral: 'ETH' }))}
                                    >
                                        <img src={ethIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
                                        <Label>ETH<br /><span style={{ fontWeight: 400, fontSize: 12 }}>Ethereum</span></Label>
                                    </Card>

                                    <Card
                                        style={{ borderColor: data.collateral === 'BTC' ? '#262d6a' : '#eee', background: data.collateral === 'BTC' ? '#eaf1ff' : '#fff', borderWidth: 2, maxWidth: 140, cursor: 'pointer' }}
                                        onClick={() => setData((d) => ({ ...d, collateral: 'BTC' }))}
                                    >
                                        <img src={btcIcon} alt='' style={{ width: 32, marginBottom: 7 }} />
                                        <Label>BTC<br /><span style={{ fontWeight: 400, fontSize: 12 }}>Bitcoin</span></Label>
                                    </Card>
                                </Row>
                            </>
                        )}

                        {/* Remaining steps remain unchanged */}

                        {step === 2 && (
                            <>
                                <Title>Customize Your Loan</Title>
                                <SectionTitle>Choose a lending protocol and loan offer.</SectionTitle>
                                {lendingOptions.map((opt, i) => (
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
                                                </span> APR
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
                                            onClick={() => setData((d) => ({ ...d, protocol: i }))}
                                        >
                                            {data.protocol === i ? 'Selected' : 'Select'}
                                        </Button>
                                    </Card>
                                ))}
                            </>
                        )}


                        {step === 3 && (
                            <>
                                <Title>Set Your Collateral Buffer</Title>
                                <SectionTitle>Collateral Buffer</SectionTitle>
                                <Row>
                                    <Input
                                        value={data.buffer === 'other' ? data.bufferValue : data.buffer}
                                        type="number"
                                        min={100}
                                        max={300}
                                        onChange={(e) => {
                                            const newBufferValue = e.target.value;
                                            const { updatedCollateralNeeded, updatedLiquidationPrice } = updateCollateralData(newBufferValue);

                                            setData((d) => ({
                                                ...d,
                                                buffer: 'other',
                                                bufferValue: newBufferValue,
                                                collateralNeeded: updatedCollateralNeeded,
                                                liquidationPrice: updatedLiquidationPrice,
                                            }));
                                        }}
                                    />
                                    <span style={{ fontWeight: 500 }}>%</span>
                                </Row>
                            </>
                        )}


                        {step === 4 && (
                            <>
                                <Title>Finalize Your Loan</Title>
                                <SectionTitle>Loan Summary</SectionTitle>
                                <Card style={{ background: '#f4f4f9', marginBottom: 32 }}>
                                    <table style={{ width: '100%', fontSize: 16, lineHeight: 1.7 }}>
                                        <tbody>
                                            <tr><td>Lending Protocol</td><td><b>{lendingOptions[data.protocol].k}</b></td></tr>
                                            <tr><td>Blockchain Network</td><td><img src={arbitrumIcon} alt='' style={{ width: 22, verticalAlign: 'middle', marginRight: 4 }} /> {lendingOptions[data.protocol].net}</td></tr>
                                            <tr><td>Loan Amount</td><td><b>{Number(data.amount || '0').toLocaleString(undefined, { maximumFractionDigits: 2 })} {data.currency}</b><div style={{ fontSize: 13, color: '#888' }}>~${Number(data.amount || '0').toLocaleString(undefined)}</div></td></tr>
                                            <tr><td>Loan Duration</td><td>{data.days} Days</td></tr>
                                            <tr><td>Interest Rate Type</td><td>Floating</td></tr>
                                            <tr><td>Current APR</td><td>{summaryData.apr}</td></tr>
                                            <tr><td>One Day Trailing Average APR</td><td>{summaryData.apr30}</td></tr>
                                            <tr><td>Amount Required for Loan</td><td>{summaryData.collateralAmount}<div style={{ fontSize: 13, color: '#888' }}>${Number(data.amount || '0').toLocaleString(undefined)}</div></td></tr>
                                            <tr><td>Collateral</td><td>{summaryData.collateralAmount}<div style={{ fontSize: 13, color: '#888' }}>${Number(collateralPrices[data.collateral as 'ETH' | 'BTC'] * parseFloat(summaryData.collateralAmount) || '0').toLocaleString(undefined)}</div></td></tr>
                                            <tr><td>Rocko Service Fee</td><td>~0.0623 ETH<div style={{ fontSize: 13, color: '#888' }}>$100.00</div></td></tr>
                                            <tr><td>Collateral Buffer</td><td>{data.buffer === 'other' ? `${data.bufferValue}%` : `${data.buffer}%`}</td></tr>
                                            <tr><td>Liquidation Price</td><td>{summaryData.liquidation}</td></tr>
                                            <tr><td>Estimated Time to Receive Loan</td><td>&lt;5 Minutes*</td></tr>
                                        </tbody>
                                    </table>
                                </Card>
                            </>
                        )}
                    </Card>
                </div>

                {step !== 4 && (
                    <LoanSummary>
                        <h2 style={{ fontSize: 23, fontWeight: 600, marginBottom: 8 }}>Loan Summary</h2>
                        <div style={{ fontSize: 16, marginBottom: 10 }}>Borrowing <b style={{ fontSize: 22 }}>{summaryData.amount} {summaryData.currency}</b><br /><span style={{ color: '#777', fontSize: 13 }}>~${summaryData.amount}</span></div>
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
                        <div style={{ fontSize: 12, color: '#666' }}>{summaryData.collateralAmount}</div>
                        <div style={{ marginTop: 15, marginBottom: 10 }}>Liquidation Price ({summaryData.collateralAsset}) <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
                        <div style={{ fontWeight: 600 }}>{summaryData.liquidation}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{summaryData.liquidation}</div>
                    </LoanSummary>
                )}

                {step === 4 && (
                    <LoanSummary>
                        <h2 style={{ fontSize: 23, fontWeight: 600, marginBottom: 8 }}>Loan Summary</h2>
                        <div style={{ fontSize: 16, marginBottom: 10 }}>
                            Borrowing <b style={{ fontSize: 22 }}>{summaryData.amount} {summaryData.currency}</b>
                            <br />
                            <span style={{ color: '#777', fontSize: 13 }}>~${summaryData.amount}</span>
                        </div>
                        <hr style={{ margin: '16px 0' }} />
                        <div>1 Day Avg APR | Current APR <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
                        <div style={{ fontSize: 26, fontWeight: 600, margin: '9px 0 8px 0' }}>{summaryData.apr}</div>
                        <hr style={{ margin: '16px 0' }} />
                        <div style={{ marginBottom: 14 }}>Projected Interest at Current APR</div>
                        <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}>
                            <span>6 months</span><span>{summaryData.interest6}</span>
                        </div>
                        <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}>
                            <span>12 months</span><span>{summaryData.interest12}</span>
                        </div>
                        <div style={{ fontSize: 15, display: 'flex', justifyContent: 'space-between' }}>
                            <span>24 months</span><span>{summaryData.interest24}</span>
                        </div>
                        <hr style={{ margin: '16px 0' }} />
                        <div style={{ marginBottom: 10 }}>Collateral Needed <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span></div>
                        <div style={{ fontWeight: 600 }}>{summaryData.collateralAmount}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{summaryData.collateralAmount}</div>
                        <div style={{ marginTop: 15, marginBottom: 10 }}>
                            Liquidation Price ({summaryData.collateralAsset}) <span style={{ marginLeft: 6, fontSize: 13 }}>ⓘ</span>
                        </div>
                        <div style={{ fontWeight: 600 }}>{summaryData.liquidation}</div>
                        <div style={{ fontSize: 12, color: '#666' }}>{summaryData.liquidation}</div>
                    </LoanSummary>
                )}
            </LoanContainer>

            {error && (
                <div style={{ color: 'red', marginBottom: '16px', fontWeight: 500, textAlign: 'center' }}>
                    {error}
                </div>
            )}

            <NavBar>
                <StepTag>{steps[step]}: {step + 1}/5</StepTag>
                <div style={{ display: 'flex', gap: 18 }}>
                    <Button variant="outline" size="large" onClick={() => setStep((s) => s - 1)} disabled={!canBack}>Back</Button>
                    {canNext ? (
                        <Button variant="primary" size="large" onClick={handleNext}>Next</Button>
                    ) : (
                        <Button variant="primary" size="large" onClick={finalizeLoan}>Finalize Loan</Button>
                    )}
                </div>
            </NavBar>
        </>
    );
}
