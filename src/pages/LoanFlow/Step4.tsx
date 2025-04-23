

// Step4.tsx
import React from 'react';
import { Card, Title, SectionTitle, Row, Label, Input } from './LoanFlowstyle';

export default function Step4({ data, setData }: any) {
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
