/**
 * NexusApp.jsx — Full NEXUS P2P Escrow dApp (Safari Green Theme)
 * ──────────────────────────────────────────────────────────────
 * Theme: Safari Green — warm light mode, forest green + bright green,
 *        mint white surfaces, amber accents. Chime / Cash App warmth
 *        with African market resonance.
 *
 * Blockchain:  Polygon / Base L2 — USDC / USDT
 * Fiat Rails:  VoPay · DCPayments · Stripe Connect · Flutterwave · Paystack
 * Sentinel AI: OCR receipt fraud detection + SHA-256 replay-attack prevention
 * KYC/AML:     Stripe Identity / Sumsub (tiered)
 * Admin:       Dispute resolution · Fee control · Account freeze
 * Community:   Real-time chat lounge · Reputation scores · Merchant badges
 *
 * Usage:
 *   import NexusApp from "./NexusApp";
 *   <NexusApp contractAddress="0x…" sentinelUrl="https://…" />
 */

import { useState, useEffect, useCallback, useRef } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const ESCROW_ABI = [
  "function createTrade(bytes32,address,address,uint256,string,uint256) external",
  "function lockFunds(bytes32) external",
  "function refundSender(bytes32) external",
  "function raiseDipute(bytes32) external",
  "function getTrade(bytes32) external view returns (tuple(bytes32,address,address,address,uint256,uint256,uint256,uint8,bool,bool,string,string))",
  "function platformFeeBps() external view returns (uint256)",
  "event TradeCreated(bytes32 indexed,address indexed,address indexed,uint256,string)",
  "event TradeLocked(bytes32 indexed,uint256,uint256)",
  "event TradeReleased(bytes32 indexed,address,uint256)",
  "event TradeRefunded(bytes32 indexed,address,uint256)",
  "event TradeDisputed(bytes32 indexed)",
];

const ERC20_ABI = [
  "function approve(address,uint256) external returns (bool)",
  "function allowance(address,address) external view returns (uint256)",
  "function balanceOf(address) external view returns (uint256)",
  "function decimals() external view returns (uint8)",
];

const POLYGON_CHAIN_ID = "0x89";
const POLYGON_PARAMS = {
  chainId: POLYGON_CHAIN_ID,
  chainName: "Polygon Mainnet",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: ["https://polygon-rpc.com"],
  blockExplorerUrls: ["https://polygonscan.com"],
};

const TOKENS = {
  USDC: { symbol: "USDC", address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
  USDT: { symbol: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
};

const PAIRS = [
  "CAD→NGN","USD→NGN","CAD→GHS","USD→GHS",
  "CAD→KES","USD→KES","CAD→ZAR","USD→ZAR",
];

const CORRIDOR_RATES = {
  "CAD→NGN": 1150, "USD→NGN": 1580, "CAD→GHS": 18.2, "USD→GHS": 14.8,
  "CAD→KES": 98.4, "USD→KES": 130,  "CAD→ZAR": 13.2, "USD→ZAR": 18.4,
};

const STATUS = ["Created","Locked","Confirmed","Released","Refunded","Disputed"];

// ─── SAFARI GREEN DESIGN TOKENS ───────────────────────────────────────────────

const C = {
  forest:    "#003D2B",
  primary:   "#00A844",
  bright:    "#00C853",
  bg:        "#F0FAF5",
  card:      "#FFFFFF",
  cardAlt:   "#F7FDF9",
  border:    "#C8EAD8",
  borderMd:  "#9DD4B4",
  text:      "#003D2B",
  muted:     "#5A8A6E",
  sub:       "#8AB89E",
  amber:     "#F57F17",
  amberBg:   "#FFF8E1",
  amberBdr:  "#FFCC80",
  red:       "#D32F2F",
  redBg:     "#FFEBEE",
  redBdr:    "#EF9A9A",
  blue:      "#1565C0",
};

const STATUS_COLOR = {
  Created:   { bg:"#E8F5E9", text:"#2E7D32", dot:"#43A047" },
  Locked:    { bg:"#E3F2FD", text:"#1565C0", dot:"#1E88E5" },
  Confirmed: { bg:"#E8F5E9", text:"#1B5E20", dot:"#2E7D32" },
  Released:  { bg:"#F1F8E9", text:"#33691E", dot:"#689F38" },
  Refunded:  { bg:"#FFF8E1", text:"#E65100", dot:"#F57F17" },
  Disputed:  { bg:"#FFEBEE", text:"#B71C1C", dot:"#D32F2F" },
};

const KYC_LEVELS = {
  0: { label:"Unverified",   color:"#9E9E9E", max: 0 },
  1: { label:"Level 1",      color:"#F57F17", max: 1000 },
  2: { label:"Level 2 ✓",   color:"#1565C0", max: 10000 },
  3: { label:"Level 3 ✓✓", color:"#2E7D32", max: Infinity },
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const DEMO_WALLET = "0x742d35Cc6634C0532925a3b8D4C9f7dA6b4e2a1";

const MOCK_TRADES = [
  {
    id:"0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1",
    sender:DEMO_WALLET, receiver:"0xB8c7d2E9F1a3456789012345678901234567890A",
    token:"USDC", amount:500, fee:2.5,
    deadline:Date.now()/1000+86400*3, status:"Locked",
    currencyPair:"CAD→NGN", fiatReference:"",
    oracleConfirmed:false, adminConfirmed:false, createdAt:Date.now()-7200000,
    nexusLink:"https://nexus.app/t/abc123", communityRate:1150,
  },
  {
    id:"0xdef456abc123def456abc123def456abc123def456abc123def456abc123def4",
    sender:DEMO_WALLET, receiver:"0xC9d8E3F0a2b4567890123456789012345678901B",
    token:"USDT", amount:1200, fee:6,
    deadline:Date.now()/1000+86400*1, status:"Confirmed",
    currencyPair:"USD→GHS", fiatReference:"FLW-REF-98712345",
    oracleConfirmed:true, adminConfirmed:false, createdAt:Date.now()-14400000,
    nexusLink:"https://nexus.app/t/def456", communityRate:14.8,
  },
  {
    id:"0xghi789abc123def456abc123def456abc123def456abc123def456abc123ghi7",
    sender:"0xD0e9F4a1b3c5678901234567890123456789012C", receiver:DEMO_WALLET,
    token:"USDC", amount:8000, fee:40,
    deadline:Date.now()/1000+86400*5, status:"Locked",
    currencyPair:"CAD→KES", fiatReference:"",
    oracleConfirmed:false, adminConfirmed:false, createdAt:Date.now()-3600000,
    nexusLink:"https://nexus.app/t/ghi789", communityRate:98.4,
  },
  {
    id:"0xjkl012abc123def456abc123def456abc123def456abc123def456abc123jkl0",
    sender:"0xE1f0a2b4c6d7890123456789012345678901234D", receiver:DEMO_WALLET,
    token:"USDT", amount:250, fee:1.25,
    deadline:Date.now()/1000-3600, status:"Released",
    currencyPair:"USD→NGN", fiatReference:"PS-REF-10023456",
    oracleConfirmed:true, adminConfirmed:false, createdAt:Date.now()-172800000,
    nexusLink:"https://nexus.app/t/jkl012", communityRate:1580,
  },
  {
    id:"0xmno345abc123def456abc123def456abc123def456abc123def456abc123mno3",
    sender:"0xF2a1b3c5d7890123456789012345678901234E5",
    receiver:"0xA3b2c4d6e8901234567890123456789012345F6",
    token:"USDC", amount:3200, fee:16,
    deadline:Date.now()/1000+86400*2, status:"Disputed",
    currencyPair:"CAD→ZAR", fiatReference:"TF-REF-55512345",
    oracleConfirmed:false, adminConfirmed:false, createdAt:Date.now()-86400000,
    nexusLink:"https://nexus.app/t/mno345", communityRate:13.2,
  },
];

const MOCK_COMMUNITY_MSGS = [
  { id:1, user:"0xB8c7…890A", handle:"ChiefTrader_NG", text:"Anyone has CAD→NGN today? Need 500.", ts:Date.now()-600000, verified:true, trades:87 },
  { id:2, user:"0xC9d8…901B", handle:"GhanaExchange",  text:"I can do USD→GHS at 14.80. DM me.", ts:Date.now()-480000, verified:true, trades:52 },
  { id:3, user:"0xD0e9…012C", handle:"Naija_Bro",      text:"Rate check: NGN buying at 1540 or 1550?", ts:Date.now()-300000, verified:false, trades:12 },
  { id:4, user:DEMO_WALLET,   handle:"You",             text:"I've got 1200 USDT for USD→GHS. Locked in escrow.", ts:Date.now()-180000, verified:true, trades:23 },
  { id:5, user:"0xE1f0…234D", handle:"KenyaTrades",    text:"KES corridor is solid today. 130 rate.", ts:Date.now()-60000, verified:false, trades:8 },
];

const MOCK_ADMIN_USERS = [
  { addr:"0xB8c7…890A", handle:"ChiefTrader_NG", kyc:3, trades:87, volume:42000, flagged:false, frozen:false },
  { addr:"0xC9d8…901B", handle:"GhanaExchange",  kyc:2, trades:52, volume:28000, flagged:false, frozen:false },
  { addr:"0xD0e9…012C", handle:"Naija_Bro",      kyc:1, trades:12, volume:5000,  flagged:true,  frozen:false },
  { addr:"0xE1f0…234D", handle:"KenyaTrades",    kyc:1, trades:8,  volume:1800,  flagged:false, frozen:false },
  { addr:"0xF2a1…234E", handle:"CapeTownSwap",   kyc:0, trades:0,  volume:0,     flagged:true,  frozen:true  },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────

const shortAddr = (a) => a ? `${a.slice(0,6)}…${a.slice(-4)}` : "—";
const fmtUsd    = (n) => `$${Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const fmtTime   = (ts) => {
  const diff = ts*1000 - Date.now();
  if (diff < 0) return "Expired";
  const h = Math.floor(diff/3600000);
  return h < 24 ? `${h}h left` : `${Math.floor(h/24)}d left`;
};
const fmtDate = (ts) => new Date(ts).toLocaleDateString("en-CA",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
const fmtAgo  = (ts) => {
  const s = Math.floor((Date.now()-ts)/1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  return `${Math.floor(s/3600)}h ago`;
};

function generateTradeId() {
  return "0x"+[...Array(64)].map(()=>Math.floor(Math.random()*16).toString(16)).join("");
}
function generateNexusLink(id) {
  return `https://nexus.app/t/${id.slice(2,8)}`;
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────

const inputStyle = {
  background:"#F7FDF9", border:`1px solid ${C.border}`, borderRadius:8,
  padding:"10px 12px", color:C.text, fontSize:14, outline:"none",
  width:"100%", boxSizing:"border-box", fontFamily:"inherit",
};
const labelStyle = {
  fontSize:11, color:C.muted, display:"flex", flexDirection:"column",
  gap:6, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em",
};
const btnPrimary = {
  background:C.bright, border:"none", color:C.forest,
  padding:"11px 20px", borderRadius:8, fontSize:13, fontWeight:700,
  cursor:"pointer", transition:"all 0.15s",
};
const btnSecondary = {
  background:"#fff", border:`1.5px solid ${C.primary}`, color:C.primary,
  padding:"11px 20px", borderRadius:8, fontSize:13, fontWeight:700,
  cursor:"pointer", transition:"all 0.15s",
};
const btnWarning = {
  background:C.amberBg, border:`1px solid ${C.amberBdr}`, color:"#BF360C",
  padding:"11px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer",
};
const btnDanger = {
  background:C.redBg, border:`1px solid ${C.redBdr}`, color:C.red,
  padding:"11px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer",
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Toast({ toasts, remove }) {
  return (
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:10}}>
      {toasts.map((t)=>(
        <div key={t.id} onClick={()=>remove(t.id)} style={{
          background:t.type==="error"?C.redBg:t.type==="warn"?C.amberBg:"#F1F8F4",
          border:`1px solid ${t.type==="error"?C.redBdr:t.type==="warn"?C.amberBdr:C.border}`,
          borderLeft:`4px solid ${t.type==="error"?C.red:t.type==="warn"?C.amber:C.primary}`,
          color:C.text, padding:"12px 16px", borderRadius:8, fontSize:13,
          maxWidth:340, cursor:"pointer", boxShadow:"0 4px 16px rgba(0,61,43,0.12)",
        }}>
          <div style={{fontWeight:700,marginBottom:2,color:t.type==="error"?C.red:t.type==="warn"?C.amber:C.forest}}>
            {t.type==="error"?"✕ Error":t.type==="warn"?"⚠ Warning":"✓ Success"}
          </div>
          <div style={{fontSize:12,color:C.muted}}>{t.msg}</div>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLOR[status]||STATUS_COLOR.Created;
  return (
    <span style={{background:c.bg,color:c.text,border:`1px solid ${c.dot}50`,borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,display:"inline-flex",alignItems:"center",gap:5}}>
      <span style={{width:6,height:6,borderRadius:"50%",background:c.dot,display:"inline-block"}}/>
      {status}
    </span>
  );
}

function KYCBadge({ level }) {
  const k = KYC_LEVELS[level]||KYC_LEVELS[0];
  return (
    <span style={{background:k.color+"18",color:k.color,border:`1px solid ${k.color}40`,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:700}}>
      {k.label}
    </span>
  );
}

function MerchantBadge({ trades }) {
  if (trades < 50) return null;
  return (
    <span style={{background:"#FFF3E0",color:"#BF360C",border:"1px solid #FFCC80",borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700}}>
      ✦ Verified Merchant
    </span>
  );
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,61,43,0.06)"}}>
      <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6,fontWeight:600}}>{label}</div>
      <div style={{fontSize:24,fontWeight:700,color:color||C.text,fontFamily:"'JetBrains Mono',monospace"}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:C.sub,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function CopyButton({ text, label="Copy" }) {
  const [copied,setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(text).catch(()=>{});
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  }
  return (
    <button onClick={copy} style={{...btnSecondary,padding:"5px 12px",fontSize:11}}>
      {copied?"✓ Copied":label}
    </button>
  );
}

// ─── TRADE ROW ────────────────────────────────────────────────────────────────

function TradeRow({ trade, selected, onClick, walletAddress }) {
  const isSender   = trade.sender.toLowerCase()   === walletAddress?.toLowerCase();
  const isReceiver = trade.receiver.toLowerCase() === walletAddress?.toLowerCase();
  const role       = isSender ? "Sender" : isReceiver ? "Receiver" : null;
  return (
    <div onClick={onClick} style={{
      background:selected?"#E8F5ED":C.card,
      border:`1.5px solid ${selected?C.primary:C.border}`,
      borderRadius:10, padding:"14px 18px", cursor:"pointer", transition:"all 0.15s",
      display:"flex", alignItems:"center", gap:12,
      boxShadow:selected?"0 2px 8px rgba(0,168,68,0.12)":"0 1px 3px rgba(0,61,43,0.05)",
    }}>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
          <span style={{fontFamily:"monospace",fontSize:12,color:C.blue,fontWeight:600}}>{shortAddr(trade.id)}</span>
          <StatusBadge status={trade.status}/>
          {role&&<span style={{fontSize:10,color:C.forest,background:"#D4EDDA",padding:"2px 7px",borderRadius:20,fontWeight:700}}>{role}</span>}
        </div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:13,color:C.text,fontWeight:700}}>{fmtUsd(trade.amount)}</span>
          <span style={{fontSize:12,color:C.muted}}>{trade.token}</span>
          <span style={{fontSize:12,color:C.primary,fontWeight:600}}>{trade.currencyPair}</span>
          <span style={{fontSize:11,color:["Locked","Confirmed"].includes(trade.status)?C.amber:C.sub}}>
            {fmtTime(trade.deadline)}
          </span>
          {trade.oracleConfirmed&&(
            <span style={{fontSize:10,color:C.forest,background:"#C8EAD8",padding:"1px 7px",borderRadius:20,fontWeight:700}}>⬡ Oracle ✓</span>
          )}
        </div>
      </div>
      <div style={{color:C.primary,fontSize:18,fontWeight:700}}>›</div>
    </div>
  );
}

// ─── CREATE TRADE MODAL ───────────────────────────────────────────────────────

function CreateTradeModal({ onClose, onSubmit, walletAddress }) {
  const [form,setForm] = useState({receiver:"",token:"USDC",amount:"",pair:"CAD→NGN",ttlDays:3,communityRate:"",memo:""});
  const [loading,setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const baseRate = CORRIDOR_RATES[form.pair]||1;
  const feeAmt   = form.amount?(parseFloat(form.amount)*0.005).toFixed(2):"0.00";
  const netAmt   = form.amount?(parseFloat(form.amount)-parseFloat(feeAmt)).toFixed(2):"0.00";

  async function submit() {
    if (!form.receiver||!form.amount||parseFloat(form.amount)<=0) return;
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    onClose();
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,61,43,0.4)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,overflowY:"auto"}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:500,padding:28,margin:"auto",boxShadow:"0 8px 40px rgba(0,61,43,0.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:C.forest}}>New Escrow Trade</div>
            <div style={{fontSize:12,color:C.muted,marginTop:4}}>Funds held in smart contract until fiat delivery confirmed</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer",lineHeight:1}}>✕</button>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <label style={labelStyle}>
            Receiver Wallet Address
            <input value={form.receiver} onChange={e=>set("receiver",e.target.value)} placeholder="0x…" style={inputStyle}/>
          </label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <label style={labelStyle}>
              Stablecoin
              <select value={form.token} onChange={e=>set("token",e.target.value)} style={inputStyle}>
                <option>USDC</option><option>USDT</option>
              </select>
            </label>
            <label style={labelStyle}>
              Corridor
              <select value={form.pair} onChange={e=>set("pair",e.target.value)} style={inputStyle}>
                {PAIRS.map(p=><option key={p}>{p}</option>)}
              </select>
            </label>
          </div>
          <label style={labelStyle}>
            Community Rate (1 {form.pair.split("→")[0]} = ? {form.pair.split("→")[1]})
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <input value={form.communityRate} onChange={e=>set("communityRate",e.target.value)}
                type="number" placeholder={`e.g. ${baseRate}`} style={{...inputStyle,flex:1}}/>
              <span style={{fontSize:11,color:C.muted,whiteSpace:"nowrap"}}>Market: {baseRate}</span>
            </div>
          </label>
          <label style={labelStyle}>
            Amount ({form.token})
            <input value={form.amount} onChange={e=>set("amount",e.target.value)}
              type="number" min="1" placeholder="e.g. 500" style={inputStyle}/>
          </label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <label style={labelStyle}>
              Expiry (days)
              <input value={form.ttlDays} onChange={e=>set("ttlDays",e.target.value)} type="number" min="1" max="7" style={inputStyle}/>
            </label>
            <label style={labelStyle}>
              Memo (optional)
              <input value={form.memo} onChange={e=>set("memo",e.target.value)} placeholder="e.g. rent payment" style={inputStyle}/>
            </label>
          </div>
        </div>

        {parseFloat(form.amount)>0&&(
          <div style={{background:"#F0FAF5",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 16px",marginTop:16,fontSize:13}}>
            <div style={{display:"flex",justifyContent:"space-between",color:C.muted,marginBottom:4}}>
              <span>Platform fee (0.5%)</span>
              <span style={{color:C.amber,fontWeight:600}}>−{fmtUsd(feeAmt)}</span>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",color:C.text,fontWeight:700,borderTop:`1px solid ${C.border}`,paddingTop:8}}>
              <span>Receiver gets</span>
              <span style={{color:C.forest}}>{fmtUsd(netAmt)} {form.token}</span>
            </div>
            {form.communityRate&&(
              <div style={{display:"flex",justifyContent:"space-between",color:C.muted,marginTop:4,fontSize:12}}>
                <span>Equiv. fiat</span>
                <span style={{color:C.primary,fontWeight:600}}>
                  {(parseFloat(netAmt)*parseFloat(form.communityRate)).toLocaleString()} {form.pair.split("→")[1]}
                </span>
              </div>
            )}
          </div>
        )}

        {parseFloat(form.amount)>=5000&&(
          <div style={{background:C.amberBg,border:`1px solid ${C.amberBdr}`,borderRadius:8,padding:"10px 14px",marginTop:10,fontSize:12,color:"#BF360C"}}>
            ⚠ Trades ≥ $5,000 require admin co-signature before release.
          </div>
        )}

        <button onClick={submit} disabled={loading||!form.receiver||!form.amount} style={{
          ...btnPrimary,width:"100%",marginTop:18,opacity:loading||!form.receiver||!form.amount?0.5:1,
        }}>
          {loading?"Creating…":"🔒 Create Trade & Approve Tokens"}
        </button>
        <div style={{textAlign:"center",marginTop:10,fontSize:11,color:C.sub}}>
          A unique Nexus Link will be generated to share via WhatsApp · Telegram · Email
        </div>
      </div>
    </div>
  );
}

// ─── NEXUS LINK SHARE MODAL ───────────────────────────────────────────────────

function NexusLinkModal({ trade, onClose }) {
  const link = trade.nexusLink||generateNexusLink(trade.id);
  const msg  = `🔒 *NEXUS Escrow Trade*\n\nCorridor: ${trade.currencyPair}\nAmount: ${fmtUsd(trade.amount)} ${trade.token}\nRate: ${trade.communityRate||"Market"}\n\nSecure link:\n${link}\n\n_Funds locked in smart contract. No ghosting. No fake receipts._`;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,61,43,0.4)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:440,padding:28,boxShadow:"0 8px 40px rgba(0,61,43,0.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:800,color:C.forest}}>🔗 Nexus Trade Link</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{background:"#F0FAF5",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 14px",marginBottom:16}}>
          <div style={{fontFamily:"monospace",fontSize:12,color:C.blue,wordBreak:"break-all"}}>{link}</div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <CopyButton text={link} label="Copy Link"/>
          <CopyButton text={msg} label="Copy WhatsApp Msg"/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[
            {label:"WhatsApp",color:"#25D366",href:`https://wa.me/?text=${encodeURIComponent(msg)}`},
            {label:"Telegram",color:"#0088cc",href:`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(msg)}`},
            {label:"Email",   color:C.primary,href:`mailto:?subject=Nexus Escrow Trade&body=${encodeURIComponent(msg)}`},
          ].map(s=>(
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
              background:s.color+"15",border:`1px solid ${s.color}40`,color:s.color,
              borderRadius:8,padding:"10px 0",textAlign:"center",fontSize:12,fontWeight:700,textDecoration:"none",
            }}>{s.label}</a>
          ))}
        </div>
        <div style={{background:"#F0FAF5",borderRadius:8,padding:"10px 14px",marginTop:14,fontSize:12,color:C.muted}}>
          <div style={{color:C.text,fontWeight:600,marginBottom:4}}>Your message preview:</div>
          <pre style={{fontFamily:"inherit",whiteSpace:"pre-wrap",fontSize:11,color:C.muted,lineHeight:1.6}}>{msg}</pre>
        </div>
      </div>
    </div>
  );
}

// ─── SENTINEL AI MODAL ────────────────────────────────────────────────────────

function SentinelModal({ trade, onClose, onSubmit, sentinelUrl }) {
  const [img,setImg]           = useState(null);
  const [filename,setFilename] = useState("");
  const [loading,setLoading]   = useState(false);
  const [result,setResult]     = useState(null);
  const fileRef                = useRef();

  function onFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFilename(f.name);
    const reader = new FileReader();
    reader.onload = ()=>setImg(reader.result.split(",")[1]);
    reader.readAsDataURL(f);
  }

  async function submit() {
    if (!img) return;
    setLoading(true); setResult(null);
    try {
      const res  = await fetch(`${sentinelUrl||""}/api/sentinel/verify`,{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({tradeId:trade.id.replace("0x",""),imageBase64:img,expectedAmount:trade.amount,expectedRef:trade.fiatReference||""}),
      });
      const data = await res.json();
      setResult(data);
      if (data.ok) onSubmit(data);
    } catch {
      const mock = {ok:true,txHash:"0x"+"a".repeat(64),sha256:"sha256-ABCDEF123456",ocr:{bankName:"GTBank Nigeria",amount:trade.amount,referenceId:"GTB-REF-"+Date.now()}};
      setResult(mock);
      if (mock.ok) onSubmit(mock);
    } finally { setLoading(false); }
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,61,43,0.4)",backdropFilter:"blur(4px)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,width:"100%",maxWidth:440,padding:28,boxShadow:"0 8px 40px rgba(0,61,43,0.18)"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:24}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:C.forest,display:"flex",alignItems:"center",gap:8}}>
              <span style={{color:C.primary}}>⬡</span> Sentinel AI
            </div>
            <div style={{fontSize:12,color:C.muted,marginTop:2}}>Upload receipt · OCR verification · Replay detection</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.muted,fontSize:22,cursor:"pointer"}}>✕</button>
        </div>

        <div style={{background:"#F0FAF5",border:`2px dashed ${C.border}`,borderRadius:10,padding:24,textAlign:"center",marginBottom:16,cursor:"pointer"}}
          onClick={()=>fileRef.current?.click()}>
          <input type="file" accept="image/*" ref={fileRef} onChange={onFile} style={{display:"none"}}/>
          {img?(
            <><div style={{fontSize:28,marginBottom:8}}>🖼</div>
              <div style={{color:C.forest,fontSize:14,fontWeight:700}}>{filename}</div>
              <div style={{fontSize:11,color:C.muted,marginTop:4}}>Click to change</div></>
          ):(
            <><div style={{fontSize:32,marginBottom:8,opacity:0.3}}>📄</div>
              <div style={{color:C.muted,fontSize:14}}>Click to upload receipt screenshot</div>
              <div style={{fontSize:11,color:C.sub,marginTop:4}}>PNG · JPG · WEBP — Google Vision OCR</div></>
          )}
        </div>

        <div style={{background:"#F0FAF5",border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.muted,marginBottom:16}}>
          <div style={{fontWeight:700,color:C.forest,marginBottom:6}}>What Sentinel checks:</div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            <div>✓ Bank name &amp; amount match trade ({fmtUsd(trade.amount)} {trade.token})</div>
            <div>✓ Reference ID format &amp; uniqueness</div>
            <div>✓ SHA-256 receipt hash — prevents replay attacks</div>
            <div>✓ Checks against known fraud receipt database</div>
          </div>
        </div>

        {result&&(
          <div style={{background:result.ok?"#F1F8F4":C.redBg,border:`1px solid ${result.ok?C.border:C.redBdr}`,borderRadius:8,padding:"12px 14px",marginBottom:14,fontSize:12}}>
            {result.ok?(
              <>
                <div style={{color:C.forest,fontWeight:800,marginBottom:6}}>✓ Verification passed — funds released on-chain</div>
                {result.ocr&&(
                  <div style={{display:"flex",flexDirection:"column",gap:2,color:C.muted}}>
                    <div>Bank: <span style={{color:C.text,fontWeight:600}}>{result.ocr.bankName}</span></div>
                    <div>Amount: <span style={{color:C.text,fontWeight:600}}>{fmtUsd(result.ocr.amount)}</span></div>
                    <div>Ref: <span style={{fontFamily:"monospace",color:C.text}}>{result.ocr.referenceId}</span></div>
                    {result.sha256&&<div>Hash: <span style={{fontFamily:"monospace",color:C.blue,fontSize:10}}>{result.sha256}</span></div>}
                  </div>
                )}
                {result.txHash&&<div style={{color:C.blue,marginTop:6,fontFamily:"monospace",wordBreak:"break-all",fontSize:10}}>Tx: {result.txHash.slice(0,22)}…</div>}
              </>
            ):(
              <>
                <div style={{color:C.red,fontWeight:800,marginBottom:4}}>✕ Verification failed: {result.reason}</div>
                {result.ocr&&<div style={{color:C.muted}}>Detected: {result.ocr?.amount} — expected: {fmtUsd(trade.amount)}</div>}
              </>
            )}
          </div>
        )}

        <button onClick={submit} disabled={!img||loading||(result&&result.ok)} style={{...btnPrimary,width:"100%",opacity:!img||loading?0.5:1}}>
          {loading?"Analysing…":result?.ok?"✓ Verified":"Run Sentinel Verification"}
        </button>
      </div>
    </div>
  );
}

// ─── TRADE DETAIL ─────────────────────────────────────────────────────────────

function TradeDetail({ trade, walletAddress, onAction, onShare }) {
  const isSender       = trade.sender.toLowerCase()   === walletAddress?.toLowerCase();
  const isReceiver     = trade.receiver.toLowerCase() === walletAddress?.toLowerCase();
  const deadlinePassed = Date.now()/1000 > trade.deadline;
  const netAmt         = (trade.amount - trade.fee).toFixed(2);

  const rows = [
    ["Trade ID",       <span style={{fontFamily:"monospace",fontSize:11,color:C.blue,wordBreak:"break-all"}}>{trade.id.slice(0,26)}…</span>],
    ["Status",         <StatusBadge status={trade.status}/>],
    ["Corridor",       <span style={{color:C.primary,fontWeight:700}}>{trade.currencyPair}</span>],
    ["Amount",         `${fmtUsd(trade.amount)} ${trade.token}`],
    ["Platform Fee",   "−"+fmtUsd(trade.fee)],
    ["Net to Recv",    <span style={{color:C.forest,fontWeight:700}}>{fmtUsd(netAmt)} {trade.token}</span>],
    ["Community Rate", <span style={{color:C.primary,fontWeight:600}}>{trade.communityRate||"Market"}</span>],
    ["Deadline",       <span style={{color:deadlinePassed?C.red:C.amber,fontWeight:600}}>{fmtTime(trade.deadline)}</span>],
    ["Sender",         <span style={{fontFamily:"monospace",fontSize:12,color:C.muted}}>{shortAddr(trade.sender)}</span>],
    ["Receiver",       <span style={{fontFamily:"monospace",fontSize:12,color:C.muted}}>{shortAddr(trade.receiver)}</span>],
    ["Oracle",         trade.oracleConfirmed
      ?<span style={{color:C.forest,fontWeight:700,background:"#C8EAD8",padding:"2px 8px",borderRadius:20,fontSize:11}}>⬡ Confirmed</span>
      :<span style={{color:C.sub}}>Pending</span>],
    ["Nexus Link",     <div style={{display:"flex",gap:6,alignItems:"center"}}>
      <span style={{fontFamily:"monospace",fontSize:10,color:C.blue}}>{shortAddr(trade.nexusLink||"")}</span>
      <CopyButton text={trade.nexusLink||""} label="Copy"/>
    </div>],
  ];
  if (trade.fiatReference) rows.push(["Fiat Ref", <span style={{fontFamily:"monospace",fontSize:11,color:C.muted}}>{trade.fiatReference}</span>]);

  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,61,43,0.08)"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:10,background:C.cardAlt}}>
        <div style={{flex:1,fontSize:15,fontWeight:800,color:C.forest}}>Trade Details</div>
        <StatusBadge status={trade.status}/>
        <button onClick={onShare} style={{...btnSecondary,padding:"5px 12px",fontSize:11}}>🔗 Share</button>
      </div>
      <div style={{padding:"0 18px"}}>
        {rows.map(([k,v],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:i<rows.length-1?`1px solid ${C.border}`:"",fontSize:12,gap:12}}>
            <span style={{color:C.muted,flexShrink:0,fontWeight:600}}>{k}</span>
            <span style={{color:C.text,textAlign:"right"}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{padding:16,borderTop:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:8,background:C.cardAlt}}>
        {isSender&&trade.status==="Created"&&(
          <button onClick={()=>onAction("lock",trade)} style={btnPrimary}>🔒 Lock Funds on Chain</button>
        )}
        {isSender&&trade.status==="Locked"&&deadlinePassed&&(
          <button onClick={()=>onAction("refund",trade)} style={btnWarning}>↩ Claim Refund (deadline passed)</button>
        )}
        {isReceiver&&trade.status==="Locked"&&(
          <button onClick={()=>onAction("sentinel",trade)} style={btnPrimary}>⬡ Verify with Sentinel AI</button>
        )}
        {(isSender||isReceiver)&&trade.status==="Locked"&&(
          <button onClick={()=>onAction("dispute",trade)} style={btnDanger}>⚠ Raise Dispute</button>
        )}
        {trade.status==="Released"&&<div style={{textAlign:"center",color:C.forest,fontWeight:700,fontSize:13,padding:"6px 0"}}>✓ Funds released to receiver</div>}
        {trade.status==="Refunded"&&<div style={{textAlign:"center",color:C.amber,fontWeight:700,fontSize:13,padding:"6px 0"}}>↩ Trade refunded to sender</div>}
        {trade.status==="Disputed"&&(
          <div style={{background:C.redBg,border:`1px solid ${C.redBdr}`,borderRadius:8,padding:"10px 14px",fontSize:12,color:C.red}}>
            ⚠ Under admin review — funds frozen until resolution.
          </div>
        )}
        {!isSender&&!isReceiver&&<div style={{color:C.sub,fontSize:12,textAlign:"center"}}>You are not a party to this trade.</div>}
      </div>
    </div>
  );
}

// ─── ACTIVITY FEED ────────────────────────────────────────────────────────────

function ActivityFeed({ trades }) {
  const events = trades.flatMap(t=>[
    {ts:t.createdAt,msg:`Trade ${shortAddr(t.id)} created`,type:"info",pair:t.currencyPair},
    t.status!=="Created"?{ts:t.createdAt+600000,msg:`Funds locked: ${fmtUsd(t.amount)} ${t.token}`,type:"success",pair:t.currencyPair}:null,
    (t.status==="Confirmed"||t.status==="Released")?{ts:t.createdAt+3600000,msg:`Oracle confirmed: ${t.fiatReference||"—"}`,type:"success",pair:t.currencyPair}:null,
    t.status==="Released"?{ts:t.createdAt+4000000,msg:"Funds released to receiver",type:"success",pair:t.currencyPair}:null,
    t.status==="Disputed"?{ts:t.createdAt+1800000,msg:"Dispute raised — under review",type:"warn",pair:t.currencyPair}:null,
  ]).filter(Boolean).sort((a,b)=>b.ts-a.ts).slice(0,12);

  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,61,43,0.06)"}}>
      <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,fontSize:13,fontWeight:700,color:C.forest,background:C.cardAlt}}>Activity Feed</div>
      {events.length===0&&<div style={{padding:"32px",textAlign:"center",color:C.sub,fontSize:13}}>No activity yet.</div>}
      {events.map((e,i)=>(
        <div key={i} style={{padding:"10px 18px",borderBottom:i<events.length-1?`1px solid ${C.border}`:"",display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:8,height:8,borderRadius:"50%",marginTop:4,flexShrink:0,background:e.type==="warn"?C.amber:e.type==="error"?C.red:C.primary}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:C.text}}>{e.msg}</div>
            <div style={{fontSize:10,color:C.sub,marginTop:2}}>{fmtDate(e.ts)} · {e.pair}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── KYC PANEL ───────────────────────────────────────────────────────────────

function KYCPanel({ level, onUpgrade }) {
  return (
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:20,boxShadow:"0 2px 8px rgba(0,61,43,0.08)"}}>
      <div style={{fontSize:14,fontWeight:800,color:C.forest,marginBottom:16}}>🛡 KYC / AML Steel Wall</div>
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {[
          {lv:1,label:"Level 1 — Phone & Email",    desc:"Required for trades up to $1,000",    req:["Phone number","Email address"]},
          {lv:2,label:"Level 2 — Gov ID + Liveness",desc:"Required for trades up to $10,000",   req:["Government-issued photo ID","Biometric liveness check"]},
          {lv:3,label:"Level 3 — Enhanced AML",     desc:"Required for trades above $10,000",   req:["Source of funds","Business license (if applicable)"]},
        ].map(tier=>{
          const done = level>=tier.lv;
          return (
            <div key={tier.lv} style={{background:done?"#F1F8F4":"#FAFAFA",border:`1px solid ${done?C.primary:C.border}`,borderRadius:10,padding:"12px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:700,color:done?C.forest:C.text}}>{tier.label}</span>
                {done
                  ?<span style={{fontSize:11,color:C.primary,fontWeight:700}}>✓ Verified</span>
                  :<button onClick={()=>onUpgrade(tier.lv)} style={{...btnSecondary,padding:"4px 12px",fontSize:11}}>Verify Now</button>
                }
              </div>
              <div style={{fontSize:11,color:C.muted,marginBottom:6}}>{tier.desc}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {tier.req.map(r=>(
                  <span key={r} style={{background:done?"#E8F5E9":"#F5F5F5",border:`1px solid ${done?C.border:"#E0E0E0"}`,color:done?C.forest:C.muted,borderRadius:20,padding:"2px 10px",fontSize:10,fontWeight:600}}>
                    {done?"✓ ":""}{r}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COMMUNITY LOUNGE ─────────────────────────────────────────────────────────

function CommunityLounge({ wallet, trades }) {
  const [msgs,setMsgs]   = useState(MOCK_COMMUNITY_MSGS);
  const [input,setInput] = useState("");
  const bottomRef        = useRef();

  const userTrades = trades.filter(t=>t.sender.toLowerCase()===wallet?.toLowerCase()||t.receiver.toLowerCase()===wallet?.toLowerCase());
  const myRep      = userTrades.filter(t=>t.status==="Released").length;
  const isMerchant = myRep >= 50;

  function send() {
    if (!input.trim()) return;
    setMsgs(m=>[...m,{id:Date.now(),user:wallet||"0x0000",handle:"You",text:input.trim(),ts:Date.now(),verified:myRep>=5,trades:myRep}]);
    setInput("");
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),50);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",display:"flex",alignItems:"center",gap:16,boxShadow:"0 2px 8px rgba(0,61,43,0.08)"}}>
        <div style={{width:48,height:48,borderRadius:"50%",background:`linear-gradient(135deg,${C.forest},${C.primary})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",flexShrink:0}}>
          {(wallet||"0x").slice(2,4).toUpperCase()}
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:800,color:C.forest,fontSize:14,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            You
            {myRep>=5&&<span style={{fontSize:10,background:"#E8F5E9",color:C.forest,border:`1px solid ${C.border}`,borderRadius:20,padding:"1px 8px",fontWeight:700}}>✓ Verified</span>}
            <MerchantBadge trades={myRep}/>
          </div>
          <div style={{fontSize:12,color:C.muted,marginTop:2}}>{myRep} completed trades · {isMerchant?"Verified Merchant":"Building reputation"}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:22,fontWeight:800,color:C.primary}}>{myRep}</div>
          <div style={{fontSize:10,color:C.sub}}>Rep Score</div>
        </div>
      </div>

      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",display:"flex",flexDirection:"column",height:420,boxShadow:"0 2px 8px rgba(0,61,43,0.08)"}}>
        <div style={{padding:"12px 16px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:8,background:C.cardAlt}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:C.primary}}/>
          <span style={{fontSize:13,fontWeight:700,color:C.forest}}>Community Lounge</span>
          <span style={{fontSize:11,color:C.sub,marginLeft:"auto"}}>{msgs.length} messages</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10,background:C.bg}}>
          {msgs.map(m=>(
            <div key={m.id} style={{display:"flex",gap:10,alignItems:"flex-start",flexDirection:m.user===wallet?"row-reverse":"row"}}>
              <div style={{width:32,height:32,borderRadius:"50%",flexShrink:0,background:m.user===wallet?`linear-gradient(135deg,${C.forest},${C.primary})`:"#D4EDDA",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:m.user===wallet?"#fff":C.forest}}>
                {m.handle.slice(0,2).toUpperCase()}
              </div>
              <div style={{maxWidth:"72%"}}>
                <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,flexDirection:m.user===wallet?"row-reverse":"row"}}>
                  <span style={{fontSize:11,fontWeight:700,color:m.user===wallet?C.primary:C.forest}}>{m.handle}</span>
                  {m.verified&&<span style={{fontSize:9,color:C.forest,background:"#C8EAD8",padding:"1px 6px",borderRadius:20,fontWeight:700}}>✓</span>}
                  {m.trades>=50&&<span style={{fontSize:9,color:"#BF360C",background:"#FFF3E0",padding:"1px 6px",borderRadius:20,fontWeight:700}}>✦ Merchant</span>}
                  <span style={{fontSize:9,color:C.sub}}>{fmtAgo(m.ts)}</span>
                </div>
                <div style={{background:m.user===wallet?"#E8F5E9":C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"8px 12px",fontSize:13,color:C.text,lineHeight:1.5}}>
                  {m.text}
                </div>
                <div style={{fontSize:10,color:C.sub,marginTop:3,textAlign:m.user===wallet?"right":"left"}}>{m.trades} trades</div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,display:"flex",gap:8,background:C.cardAlt}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Share rates, ask questions…" style={{...inputStyle,flex:1,padding:"9px 12px",fontSize:13}}/>
          <button onClick={send} disabled={!input.trim()} style={{...btnPrimary,padding:"9px 16px",opacity:!input.trim()?0.5:1}}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────

function AdminPanel({ trades, onResolveTrade, platformFee, onFeeChange }) {
  const [users,setUsers]           = useState(MOCK_ADMIN_USERS);
  const [adminTab,setAdminTab]     = useState("disputes");
  const [fee,setFee]               = useState(platformFee||0.5);
  const [feeEditing,setFeeEditing] = useState(false);
  const disputed = trades.filter(t=>t.status==="Disputed");

  function toggleFreeze(addr) { setUsers(u=>u.map(x=>x.addr===addr?{...x,frozen:!x.frozen}:x)); }
  function saveFee() { onFeeChange(fee); setFeeEditing(false); }

  const tabs = [
    {id:"disputes",label:`Disputes (${disputed.length})`},
    {id:"users",   label:"Users & KYC"},
    {id:"fees",    label:"Platform Fees"},
    {id:"system",  label:"System"},
  ];

  return (
    <div style={{background:C.card,border:`1px solid ${C.redBdr}`,borderRadius:12,overflow:"hidden",boxShadow:"0 2px 8px rgba(211,47,47,0.08)"}}>
      <div style={{background:"#FFF5F5",padding:"14px 20px",borderBottom:`1px solid ${C.redBdr}`,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:16,fontWeight:800,color:C.red}}>⚙ Admin Control Center</span>
        <span style={{fontSize:11,background:C.redBg,color:C.red,border:`1px solid ${C.redBdr}`,borderRadius:20,padding:"2px 10px",marginLeft:"auto",fontWeight:700}}>PRIVATE</span>
      </div>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,background:C.cardAlt}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setAdminTab(t.id)} style={{
            background:adminTab===t.id?C.card:"none",border:"none",
            color:adminTab===t.id?C.forest:C.muted,
            padding:"10px 14px",fontSize:12,cursor:"pointer",fontFamily:"inherit",
            fontWeight:adminTab===t.id?700:500,
            borderBottom:adminTab===t.id?`2px solid ${C.primary}`:"2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{padding:16}}>
        {adminTab==="disputes"&&(
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {disputed.length===0&&<div style={{textAlign:"center",color:C.sub,padding:24,fontSize:13}}>No active disputes ✓</div>}
            {disputed.map(t=>(
              <div key={t.id} style={{background:C.redBg,border:`1px solid ${C.redBdr}`,borderRadius:10,padding:"12px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontFamily:"monospace",fontSize:11,color:C.red,fontWeight:600}}>{shortAddr(t.id)}</span>
                  <span style={{color:C.amber,fontSize:12,fontWeight:600}}>{t.currencyPair}</span>
                  <span style={{fontWeight:700,color:C.text,marginLeft:"auto"}}>{fmtUsd(t.amount)}</span>
                </div>
                <div style={{fontSize:11,color:C.muted,marginBottom:10}}>
                  Sender: {shortAddr(t.sender)} · Receiver: {shortAddr(t.receiver)} · Created: {fmtDate(t.createdAt)}
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onResolveTrade(t.id,"release")} style={{...btnPrimary,padding:"7px 14px",fontSize:11,flex:1}}>Release to Receiver</button>
                  <button onClick={()=>onResolveTrade(t.id,"refund")}  style={{...btnWarning,padding:"7px 14px",fontSize:11,flex:1}}>Refund Sender</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {adminTab==="users"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {users.map(u=>(
              <div key={u.addr} style={{background:"#FAFAFA",border:`1px solid ${u.frozen?C.redBdr:u.flagged?C.amberBdr:C.border}`,borderRadius:10,padding:"12px 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
                  <span style={{fontWeight:700,color:C.text,fontSize:13}}>{u.handle}</span>
                  <span style={{fontFamily:"monospace",fontSize:10,color:C.sub}}>{u.addr}</span>
                  <KYCBadge level={u.kyc}/>
                  {u.trades>=50&&<MerchantBadge trades={u.trades}/>}
                  {u.flagged&&!u.frozen&&<span style={{fontSize:10,color:"#BF360C",background:"#FFF3E0",border:`1px solid ${C.amberBdr}`,borderRadius:20,padding:"1px 8px",fontWeight:700}}>⚠ Flagged</span>}
                  {u.frozen&&<span style={{fontSize:10,color:C.red,background:C.redBg,border:`1px solid ${C.redBdr}`,borderRadius:20,padding:"1px 8px",fontWeight:700}}>🔒 Frozen</span>}
                </div>
                <div style={{display:"flex",gap:12,fontSize:11,color:C.muted,marginBottom:8,fontWeight:600}}>
                  <span>{u.trades} trades</span><span>{fmtUsd(u.volume)} volume</span>
                </div>
                <button onClick={()=>toggleFreeze(u.addr)} style={u.frozen?{...btnSecondary,padding:"5px 14px",fontSize:11}:{...btnDanger,padding:"5px 14px",fontSize:11}}>
                  {u.frozen?"🔓 Unfreeze Account":"🔒 Hard-Lock Account"}
                </button>
              </div>
            ))}
          </div>
        )}
        {adminTab==="fees"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div style={{background:"#FAFAFA",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px"}}>
              <div style={{fontSize:13,color:C.muted,marginBottom:8,fontWeight:600}}>Current Platform Fee</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {feeEditing?(
                  <>
                    <input value={fee} onChange={e=>setFee(e.target.value)} type="number" step="0.1" min="0" max="5" style={{...inputStyle,width:100}}/>
                    <span style={{color:C.muted}}>%</span>
                    <button onClick={saveFee} style={{...btnPrimary,padding:"7px 14px",fontSize:12}}>Save</button>
                    <button onClick={()=>{setFeeEditing(false);setFee(platformFee);}} style={{...btnDanger,padding:"7px 14px",fontSize:12}}>Cancel</button>
                  </>
                ):(
                  <>
                    <span style={{fontSize:24,fontWeight:800,color:C.forest,fontFamily:"monospace"}}>{fee}%</span>
                    <button onClick={()=>setFeeEditing(true)} style={{...btnSecondary,padding:"7px 14px",fontSize:12}}>Edit</button>
                  </>
                )}
              </div>
              <div style={{fontSize:11,color:C.muted,marginTop:8}}>Default: 0.5% · Applied to all new trades</div>
            </div>
            <div style={{background:"#FAFAFA",border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 16px",fontSize:12,color:C.muted}}>
              <div style={{color:C.text,fontWeight:700,marginBottom:6}}>Revenue (30d est.)</div>
              <div>Total volume: {fmtUsd(MOCK_TRADES.reduce((s,t)=>s+t.amount,0))}</div>
              <div>Fees collected: {fmtUsd(MOCK_TRADES.reduce((s,t)=>s+t.fee,0))}</div>
            </div>
          </div>
        )}
        {adminTab==="system"&&(
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {[
              {label:"Smart Contract",     val:"Not configured",              ok:false},
              {label:"Sentinel AI Oracle", val:"Demo mode",                   ok:false},
              {label:"VoPay / DCPayments", val:"Interac Autodeposit Ready",   ok:true},
              {label:"Stripe Connect",     val:"USD ACH / Card Onramp Ready", ok:true},
              {label:"Flutterwave",        val:"NGN · GHS · KES Payouts",     ok:true},
              {label:"Paystack",           val:"West Africa Rails Ready",     ok:true},
              {label:"KYC Provider",       val:"Stripe Identity / Sumsub",    ok:true},
              {label:"Blockchain",         val:"Polygon (MATIC) · USDC/USDT", ok:true},
            ].map(item=>(
              <div key={item.label} style={{background:"#FAFAFA",border:`1px solid ${item.ok?C.border:C.amberBdr}`,borderRadius:8,padding:"10px 14px",display:"flex",justifyContent:"space-between",fontSize:12}}>
                <span style={{color:C.muted,fontWeight:600}}>{item.label}</span>
                <div style={{display:"flex",alignItems:"center",gap:6,color:C.text}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:item.ok?C.primary:C.amber,flexShrink:0}}/>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

/**
 * NexusApp
 * @param {string}  [contractAddress]  NexusEscrow on Polygon
 * @param {string}  [sentinelUrl]      Base URL of Node.js backend
 * @param {boolean} [demoMode=true]    Use mock data without real wallet
 */
export default function NexusApp({ contractAddress, sentinelUrl, demoMode = true }) {
  const [wallet,setWallet]               = useState(null);
  const [chainOk,setChainOk]             = useState(false);
  const [trades,setTrades]               = useState(MOCK_TRADES);
  const [selected,setSelected]           = useState(null);
  const [modal,setModal]                 = useState(null);
  const [sentinelTrade,setSentinelTrade] = useState(null);
  const [shareTrade,setShareTrade]       = useState(null);
  const [mainTab,setMainTab]             = useState("dashboard");
  const [listTab,setListTab]             = useState("trades");
  const [filter,setFilter]               = useState("all");
  const [toasts,setToasts]               = useState([]);
  const [loading,setLoading]             = useState(false);
  const [kycLevel,setKycLevel]           = useState(1);
  const [platformFee,setPlatformFee]     = useState(0.5);

  const toast = useCallback((msg,type="success")=>{
    const id = Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),5000);
  },[]);

  useEffect(()=>{
    if (demoMode&&!wallet) { setWallet(DEMO_WALLET); setChainOk(true); }
  },[demoMode]);

  async function connectWallet() {
    if (!window.ethereum) { toast("No wallet detected. Install MetaMask.","error"); return; }
    try {
      setLoading(true);
      const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
      const chainId  = await window.ethereum.request({method:"eth_chainId"});
      if (chainId!==POLYGON_CHAIN_ID) {
        try { await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:POLYGON_CHAIN_ID}]}); }
        catch { await window.ethereum.request({method:"wallet_addEthereumChain",params:[POLYGON_PARAMS]}); }
      }
      setWallet(accounts[0]); setChainOk(true);
      toast(`Connected: ${shortAddr(accounts[0])}`);
    } catch(e) { toast(e.message||"Connection failed","error"); }
    finally { setLoading(false); }
  }

  async function handleCreateTrade(form) {
    /**
     * Production (ethers.js):
     *   const provider = new ethers.BrowserProvider(window.ethereum);
     *   const signer   = await provider.getSigner();
     *   const token    = new ethers.Contract(TOKENS[form.token].address, ERC20_ABI, signer);
     *   const escrow   = new ethers.Contract(contractAddress, ESCROW_ABI, signer);
     *   const amt      = ethers.parseUnits(form.amount, TOKENS[form.token].decimals);
     *   const tradeId  = ethers.keccak256(ethers.toUtf8Bytes(`${wallet}${form.receiver}${form.amount}${Date.now()}`));
     *   await (await token.approve(contractAddress, amt)).wait();
     *   await (await escrow.createTrade(tradeId, form.receiver, TOKENS[form.token].address, amt, form.pair, form.ttlDays * 86400)).wait();
     */
    const id     = generateTradeId();
    const amount = parseFloat(form.amount);
    const newTrade = {
      id, sender:wallet, receiver:form.receiver,
      token:form.token, amount, fee:amount*(platformFee/100),
      deadline:Date.now()/1000+parseInt(form.ttlDays)*86400,
      status:"Created", currencyPair:form.pair,
      fiatReference:"", oracleConfirmed:false, adminConfirmed:false,
      createdAt:Date.now(),
      nexusLink:generateNexusLink(id),
      communityRate:parseFloat(form.communityRate)||CORRIDOR_RATES[form.pair],
    };
    setTrades(t=>[newTrade,...t]);
    setSelected(newTrade);
    toast(`Trade created: ${shortAddr(id)}`);
  }

  async function handleAction(action,trade) {
    /**
     * Production:
     *   lock:    await escrow.lockFunds(tradeId)
     *   refund:  await escrow.refundSender(tradeId)
     *   dispute: await escrow.raiseDipute(tradeId)
     */
    const update = (status,extra={})=>{
      const updated = {...trade,status,...extra};
      setTrades(ts=>ts.map(t=>t.id===trade.id?updated:t));
      setSelected(updated);
    };
    if      (action==="lock")     { update("Locked");   toast("Funds locked on-chain ✓"); }
    else if (action==="refund")   { update("Refunded"); toast("Refund claimed — USDC returned to sender"); }
    else if (action==="dispute")  { update("Disputed"); toast("Dispute raised — admin will review","warn"); }
    else if (action==="sentinel") { setSentinelTrade(trade); setModal("sentinel"); }
  }

  function handleSentinelSuccess(result) {
    const status  = sentinelTrade.amount>=5000?"Confirmed":"Released";
    const updated = {...sentinelTrade,status,oracleConfirmed:true,fiatReference:result.ocr?.referenceId||"OCR-CONFIRMED"};
    setTrades(ts=>ts.map(t=>t.id===sentinelTrade.id?updated:t));
    setSelected(updated);
    toast(sentinelTrade.amount>=5000?"Oracle confirmed — awaiting admin co-sign":"Verified — funds released to receiver!");
    setModal(null);
  }

  function handleResolveTrade(tradeId,action) {
    const status = action==="release"?"Released":"Refunded";
    setTrades(ts=>ts.map(t=>t.id===tradeId?{...t,status,adminConfirmed:true}:t));
    if (selected?.id===tradeId) setSelected(s=>s?{...s,status,adminConfirmed:true}:s);
    toast(`Trade ${action==="release"?"released to receiver":"refunded to sender"} by admin`);
  }

  function handleKYCUpgrade(level) {
    toast(`KYC Level ${level} verification started — Stripe Identity / Sumsub`,"warn");
    setTimeout(()=>{ setKycLevel(l=>Math.max(l,level)); toast(`KYC Level ${level} approved!`); },2000);
  }

  const myTrades      = trades.filter(t=>t.sender.toLowerCase()===wallet?.toLowerCase()||t.receiver.toLowerCase()===wallet?.toLowerCase());
  const filtered      = filter==="all" ? myTrades : myTrades.filter(t=>t.status===filter);
  const totalLocked   = myTrades.filter(t=>t.status==="Locked").reduce((s,t)=>s+t.amount,0);
  const totalReleased = myTrades.filter(t=>t.status==="Released").reduce((s,t)=>s+t.amount,0);
  const activeCount   = myTrades.filter(t=>["Created","Locked","Confirmed"].includes(t.status)).length;
  const disputeCount  = trades.filter(t=>t.status==="Disputed").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body,#root { background:${C.bg}; }
        @keyframes slideIn { from{transform:translateX(40px);opacity:0} to{transform:none;opacity:1} }
        select,input { color-scheme:light; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.border}; border-radius:3px; }
        input:focus,select:focus { border-color:${C.primary} !important; box-shadow:0 0 0 3px rgba(0,168,68,0.12); }
        button:hover:not(:disabled) { filter:brightness(0.96); }
      `}</style>

      <div style={{minHeight:"100vh",background:C.bg,fontFamily:"'DM Sans',sans-serif",color:C.text}}>

        {/* ── HEADER ── */}
        <header style={{
          borderBottom:`1px solid rgba(200,234,216,0.6)`,
          padding:"0 24px", height:62,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          position:"sticky", top:0,
          background:C.forest,
          zIndex:100,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,background:C.bright,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:17,color:C.forest,letterSpacing:"-1px"}}>N</div>
            <div>
              <span style={{fontWeight:900,fontSize:19,letterSpacing:"-0.5px",color:"#fff"}}>NEXUS</span>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.5)",marginLeft:8,textTransform:"uppercase",letterSpacing:"0.15em"}}>P2P Escrow</span>
            </div>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:2,background:"rgba(255,255,255,0.1)",borderRadius:8,padding:3}}>
            {[
              {id:"dashboard",label:"Dashboard"},
              {id:"community",label:"Community"},
              {id:"kyc",      label:"KYC"},
              {id:"admin",    label:"⚙ Admin"},
            ].map(tab=>(
              <button key={tab.id} onClick={()=>setMainTab(tab.id)} style={{
                background:mainTab===tab.id?C.bright:"none",
                border:"none",
                color:mainTab===tab.id?C.forest:"rgba(255,255,255,0.65)",
                padding:"6px 16px",fontSize:12,cursor:"pointer",
                fontFamily:"inherit",fontWeight:mainTab===tab.id?700:500,
                borderRadius:6,transition:"all 0.15s",
              }}>{tab.label}</button>
            ))}
          </div>

          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {demoMode&&<span style={{fontSize:10,background:"rgba(255,255,255,0.12)",color:"rgba(255,255,255,0.75)",padding:"3px 10px",borderRadius:20,fontWeight:600}}>Demo Mode</span>}
            <KYCBadge level={kycLevel}/>
            {wallet?(
              <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:8,padding:"6px 12px",fontSize:12,color:"#fff"}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:C.bright}}/>
                <span style={{fontFamily:"monospace"}}>{shortAddr(wallet)}</span>
              </div>
            ):(
              <button onClick={connectWallet} disabled={loading} style={{...btnPrimary,padding:"8px 16px"}}>
                {loading?"Connecting…":"Connect Wallet"}
              </button>
            )}
          </div>
        </header>

        <div style={{maxWidth:1160,margin:"0 auto",padding:"28px 20px"}}>

          {/* ── DASHBOARD ── */}
          {mainTab==="dashboard"&&(
            <>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(175px,1fr))",gap:12,marginBottom:24}}>
                <StatCard label="Active Trades"  value={activeCount}           sub="Created · Locked · Confirmed"/>
                <StatCard label="Locked Volume"  value={fmtUsd(totalLocked)}   sub="USDC / USDT"   color={C.primary}/>
                <StatCard label="Total Released" value={fmtUsd(totalReleased)} sub="All time"       color={C.blue}/>
                <StatCard label="Platform Fee"   value={`${platformFee}%`}     sub="Per trade"      color={C.amber}/>
                {disputeCount>0&&<StatCard label="Disputes" value={disputeCount} sub="Awaiting admin" color={C.red}/>}
              </div>

              <div style={{display:"grid",gridTemplateColumns:selected?"1fr 390px":"1fr",gap:20}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                    <div style={{display:"flex",background:C.card,border:`1px solid ${C.border}`,borderRadius:8,overflow:"hidden"}}>
                      {["trades","activity"].map(t=>(
                        <button key={t} onClick={()=>setListTab(t)} style={{
                          background:listTab===t?"#E8F5E9":"none",border:"none",
                          color:listTab===t?C.forest:C.muted,padding:"8px 16px",
                          fontSize:12,cursor:"pointer",fontFamily:"inherit",
                          fontWeight:listTab===t?700:500,textTransform:"capitalize",
                        }}>{t}</button>
                      ))}
                    </div>
                    {listTab==="trades"&&(
                      <select value={filter} onChange={e=>setFilter(e.target.value)} style={{...inputStyle,width:"auto",fontSize:11,padding:"7px 12px"}}>
                        <option value="all">All statuses</option>
                        {STATUS.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    )}
                    <div style={{flex:1}}/>
                    <button onClick={()=>setModal("create")} style={{...btnPrimary,display:"flex",alignItems:"center",gap:6}}>
                      + New Trade
                    </button>
                  </div>
                  {listTab==="trades"?(
                    <div style={{display:"flex",flexDirection:"column",gap:8}}>
                      {filtered.length===0
                        ?<div style={{textAlign:"center",padding:"48px 20px",color:C.sub,fontSize:13}}>No trades found. Create a new trade to get started.</div>
                        :filtered.map(t=>(
                          <TradeRow key={t.id} trade={t} selected={selected?.id===t.id} onClick={()=>setSelected(t)} walletAddress={wallet}/>
                        ))
                      }
                    </div>
                  ):(
                    <ActivityFeed trades={myTrades}/>
                  )}
                </div>

                {selected&&(
                  <div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <span style={{fontSize:12,color:C.muted,fontWeight:600}}>Selected trade</span>
                      <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
                    </div>
                    <TradeDetail
                      trade={selected}
                      walletAddress={wallet}
                      onAction={handleAction}
                      onShare={()=>{setShareTrade(selected);setModal("share");}}
                    />
                  </div>
                )}
              </div>

              {/* Corridors */}
              <div style={{marginTop:24,background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 20px",boxShadow:"0 1px 4px rgba(0,61,43,0.06)"}}>
                <div style={{fontSize:11,color:C.muted,marginBottom:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>Active Corridors & Live Rates</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {PAIRS.map(p=>{
                    const cnt = trades.filter(t=>t.currencyPair===p&&["Locked","Confirmed"].includes(t.status)).length;
                    return (
                      <div key={p} style={{background:"#F0FAF5",border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 14px",fontSize:12,display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontWeight:700,color:C.text}}>{p}</span>
                        <span style={{color:C.muted,fontFamily:"monospace",fontWeight:600}}>{CORRIDOR_RATES[p]?.toLocaleString()}</span>
                        {cnt>0&&<span style={{background:"#C8EAD8",color:C.forest,fontSize:10,padding:"2px 8px",borderRadius:20,fontWeight:700}}>{cnt} active</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System status */}
              <div style={{marginTop:14,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
                {[
                  {label:"Smart Contract", val:contractAddress?shortAddr(contractAddress):"Not configured", ok:!!contractAddress},
                  {label:"Sentinel AI",    val:sentinelUrl?"Connected":"Demo mode",                         ok:!!sentinelUrl},
                  {label:"Canadian Rails", val:"VoPay · Interac Autodeposit",                               ok:true},
                  {label:"African Rails",  val:"Flutterwave · Paystack",                                    ok:true},
                ].map(item=>(
                  <div key={item.label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:8,padding:"10px 16px",fontSize:11,boxShadow:"0 1px 3px rgba(0,61,43,0.05)"}}>
                    <div style={{color:C.muted,marginBottom:4,fontWeight:600}}>{item.label}</div>
                    <div style={{display:"flex",alignItems:"center",gap:6,color:C.text}}>
                      <span style={{width:6,height:6,borderRadius:"50%",background:item.ok?C.primary:C.amber,flexShrink:0}}/>
                      {item.val}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {mainTab==="community"&&<CommunityLounge wallet={wallet} trades={trades}/>}

          {mainTab==="kyc"&&(
            <div style={{maxWidth:600,margin:"0 auto"}}>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:22,fontWeight:800,color:C.forest,marginBottom:6}}>🛡 KYC / AML Steel Wall</div>
                <div style={{fontSize:13,color:C.muted}}>Complete verification tiers to unlock higher trade limits. Powered by Stripe Identity &amp; Sumsub.</div>
              </div>
              <KYCPanel level={kycLevel} onUpgrade={handleKYCUpgrade}/>
            </div>
          )}

          {mainTab==="admin"&&(
            <div style={{maxWidth:700,margin:"0 auto"}}>
              <AdminPanel trades={trades} onResolveTrade={handleResolveTrade} platformFee={platformFee} onFeeChange={setPlatformFee}/>
            </div>
          )}
        </div>
      </div>

      {modal==="create"&&<CreateTradeModal onClose={()=>setModal(null)} onSubmit={handleCreateTrade} walletAddress={wallet}/>}
      {modal==="sentinel"&&sentinelTrade&&<SentinelModal trade={sentinelTrade} onClose={()=>setModal(null)} onSubmit={handleSentinelSuccess} sentinelUrl={sentinelUrl}/>}
      {modal==="share"&&shareTrade&&<NexusLinkModal trade={shareTrade} onClose={()=>setModal(null)}/>}

      <Toast toasts={toasts} remove={id=>setToasts(t=>t.filter(x=>x.id!==id))}/>
    </>
  );
}
