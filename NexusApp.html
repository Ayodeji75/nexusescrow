<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>NEXUS — P2P Escrow</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --forest:#003D2B;
    --deep:#051A10;
    --card:#0D2A1A;
    --card2:#112E1C;
    --primary:#00C853;
    --primary-dim:#00A844;
    --glow:rgba(0,200,83,0.18);
    --border:rgba(0,200,83,0.14);
    --border-md:rgba(0,200,83,0.28);
    --text:#E4F5EB;
    --muted:#7DB08A;
    --sub:#3D6B4F;
    --amber:#FFB300;
    --amber-bg:rgba(255,179,0,0.1);
    --amber-bdr:rgba(255,179,0,0.3);
    --red:#F44336;
    --red-bg:rgba(244,67,54,0.1);
    --red-bdr:rgba(244,67,54,0.3);
    --blue:#64B5F6;
    --radius:14px;
    --radius-sm:8px;
  }
  html{background:var(--deep);color:var(--text);font-family:'Space Grotesk',sans-serif;min-height:100vh}
  body{background:var(--deep);overflow-x:hidden}
  ::-webkit-scrollbar{width:4px;height:4px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:var(--sub);border-radius:4px}
  input,select,textarea{font-family:inherit;color:var(--text)}
  input::placeholder{color:var(--sub)}
  select option{background:var(--card);color:var(--text)}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  @keyframes glow{0%,100%{box-shadow:0 0 20px var(--glow)}50%{box-shadow:0 0 40px rgba(0,200,83,0.3)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
  @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
  @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(0.95)}to{opacity:1;transform:none}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .fade-up{animation:fadeUp 0.35s ease both}
  .slide-in{animation:slideIn 0.3s ease both}
  .card{
    background:var(--card);
    border:1px solid var(--border);
    border-radius:var(--radius);
    transition:border-color 0.2s,box-shadow 0.2s;
  }
  .card:hover{border-color:var(--border-md)}
  .card-glow{animation:glow 3s infinite}
  .dot-pulse{animation:pulse 1.5s infinite}
  .btn-primary{
    background:var(--primary);color:var(--forest);
    border:none;border-radius:var(--radius-sm);
    padding:10px 20px;font-size:13px;font-weight:700;
    cursor:pointer;transition:all 0.18s;font-family:inherit;
    letter-spacing:0.02em;
  }
  .btn-primary:hover{background:#00E564;box-shadow:0 0 20px rgba(0,200,83,0.4)}
  .btn-primary:disabled{opacity:0.4;cursor:not-allowed}
  .btn-secondary{
    background:transparent;color:var(--primary);
    border:1px solid var(--primary-dim);border-radius:var(--radius-sm);
    padding:10px 20px;font-size:13px;font-weight:600;
    cursor:pointer;transition:all 0.18s;font-family:inherit;
  }
  .btn-secondary:hover{background:var(--glow);border-color:var(--primary)}
  .btn-warn{
    background:var(--amber-bg);color:var(--amber);
    border:1px solid var(--amber-bdr);border-radius:var(--radius-sm);
    padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;
    transition:all 0.18s;
  }
  .btn-danger{
    background:var(--red-bg);color:var(--red);
    border:1px solid var(--red-bdr);border-radius:var(--radius-sm);
    padding:10px 20px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;
    transition:all 0.18s;
  }
  .input-field{
    background:rgba(255,255,255,0.04);
    border:1px solid var(--border);
    border-radius:var(--radius-sm);
    padding:11px 14px;font-size:14px;
    color:var(--text);outline:none;
    width:100%;transition:border-color 0.18s,box-shadow 0.18s;
  }
  .input-field:focus{border-color:var(--primary-dim);box-shadow:0 0 0 3px var(--glow)}
  .label{font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;display:block}
  .mono{font-family:'DM Mono',monospace}
  .tag{display:inline-flex;align-items:center;gap:5px;border-radius:20px;padding:3px 10px;font-size:11px;font-weight:700}
  .divider{height:1px;background:var(--border);margin:0}
  .modal-overlay{
    position:fixed;inset:0;background:rgba(0,0,0,0.75);
    backdrop-filter:blur(6px);z-index:1000;
    display:flex;align-items:center;justify-content:center;padding:20px;
    animation:fadeUp 0.2s ease;
  }
  .modal-box{
    background:var(--card);border:1px solid var(--border-md);
    border-radius:18px;width:100%;max-width:520px;
    max-height:90vh;overflow-y:auto;
    box-shadow:0 24px 80px rgba(0,0,0,0.6),0 0 0 1px var(--border);
  }
  .tab-pill{
    display:flex;background:rgba(255,255,255,0.04);
    border:1px solid var(--border);border-radius:10px;overflow:hidden;
  }
  .tab-pill button{
    flex:1;border:none;background:transparent;
    color:var(--muted);padding:8px 16px;font-size:12px;
    font-weight:600;cursor:pointer;font-family:inherit;
    transition:all 0.18s;white-space:nowrap;
  }
  .tab-pill button.active{background:var(--primary);color:var(--forest)}
  .stat-card{
    background:var(--card);border:1px solid var(--border);
    border-radius:var(--radius);padding:18px 20px;
    transition:transform 0.18s,border-color 0.18s;
  }
  .stat-card:hover{transform:translateY(-2px);border-color:var(--border-md)}
  .trade-row{
    background:var(--card);border:1px solid var(--border);
    border-radius:var(--radius-sm);padding:14px 16px;
    cursor:pointer;transition:all 0.18s;
    display:flex;align-items:center;gap:12px;
  }
  .trade-row:hover,.trade-row.selected{border-color:var(--primary-dim);background:var(--card2)}
  .trade-row.selected{box-shadow:0 0 0 2px var(--glow)}
  /* grid bg */
  body::before{
    content:'';position:fixed;inset:0;
    background-image:
      linear-gradient(rgba(0,200,83,0.03) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,200,83,0.03) 1px,transparent 1px);
    background-size:40px 40px;pointer-events:none;z-index:0;
  }
  #root{position:relative;z-index:1}
</style>
</head>
<body>
<div id="root"></div>

<script type="text/babel">
const { useState, useEffect, useCallback, useRef, useMemo } = React;

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const DEMO_WALLET = "0x742d35Cc6634C0532925a3b8D4C9f7dA6b4e2a1";
const PAIRS = ["CAD→NGN","USD→NGN","CAD→GHS","USD→GHS","CAD→KES","USD→KES","CAD→ZAR","USD→ZAR"];
const CORRIDOR_RATES = {
  "CAD→NGN":1150,"USD→NGN":1580,"CAD→GHS":18.2,"USD→GHS":14.8,
  "CAD→KES":98.4,"USD→KES":130,"CAD→ZAR":13.2,"USD→ZAR":18.4,
};
const STATUS = ["Created","Locked","Confirmed","Released","Refunded","Disputed"];
const TOKENS = {
  USDC:{symbol:"USDC",address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",decimals:6},
  USDT:{symbol:"USDT",address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",decimals:6},
};

const STATUS_STYLE = {
  Created:  {bg:"rgba(100,181,246,0.12)",text:"#64B5F6",dot:"#64B5F6"},
  Locked:   {bg:"rgba(0,200,83,0.12)",  text:"#00C853",dot:"#00C853"},
  Confirmed:{bg:"rgba(0,200,83,0.18)",  text:"#69F0AE",dot:"#69F0AE"},
  Released: {bg:"rgba(105,240,174,0.12)",text:"#69F0AE",dot:"#69F0AE"},
  Refunded: {bg:"rgba(255,179,0,0.12)", text:"#FFB300",dot:"#FFB300"},
  Disputed: {bg:"rgba(244,67,54,0.12)", text:"#F44336",dot:"#F44336"},
};

const KYC_LEVELS = {
  0:{label:"Unverified",  color:"#757575",max:0},
  1:{label:"Level 1",     color:"#FFB300",max:1000},
  2:{label:"Level 2 ✓",  color:"#64B5F6",max:10000},
  3:{label:"Level 3 ✓✓",color:"#00C853",max:Infinity},
};

const MOCK_TRADES = [
  {id:"0xabc123def456abc123def456abc123def456abc123def456abc123def456abc1",
   sender:DEMO_WALLET,receiver:"0xB8c7d2E9F1a3456789012345678901234567890A",
   token:"USDC",amount:500,fee:2.5,deadline:Date.now()/1000+86400*3,status:"Locked",
   currencyPair:"CAD→NGN",fiatReference:"",oracleConfirmed:false,createdAt:Date.now()-7200000,
   nexusLink:"https://nexus.app/t/abc123",communityRate:1150},
  {id:"0xdef456abc123def456abc123def456abc123def456abc123def456abc123def4",
   sender:DEMO_WALLET,receiver:"0xC9d8E3F0a2b4567890123456789012345678901B",
   token:"USDT",amount:1200,fee:6,deadline:Date.now()/1000+86400*1,status:"Confirmed",
   currencyPair:"USD→GHS",fiatReference:"FLW-REF-98712345",oracleConfirmed:true,createdAt:Date.now()-14400000,
   nexusLink:"https://nexus.app/t/def456",communityRate:14.8},
  {id:"0xghi789abc123def456abc123def456abc123def456abc123def456abc123ghi7",
   sender:"0xD0e9F4a1b3c5678901234567890123456789012C",receiver:DEMO_WALLET,
   token:"USDC",amount:8000,fee:40,deadline:Date.now()/1000+86400*5,status:"Locked",
   currencyPair:"CAD→KES",fiatReference:"",oracleConfirmed:false,createdAt:Date.now()-3600000,
   nexusLink:"https://nexus.app/t/ghi789",communityRate:98.4},
  {id:"0xjkl012abc123def456abc123def456abc123def456abc123def456abc123jkl0",
   sender:"0xE1f0a2b4c6d7890123456789012345678901234D",receiver:DEMO_WALLET,
   token:"USDT",amount:250,fee:1.25,deadline:Date.now()/1000-3600,status:"Released",
   currencyPair:"USD→NGN",fiatReference:"PS-REF-10023456",oracleConfirmed:true,createdAt:Date.now()-172800000,
   nexusLink:"https://nexus.app/t/jkl012",communityRate:1580},
  {id:"0xmno345abc123def456abc123def456abc123def456abc123def456abc123mno3",
   sender:"0xF2a1b3c5d7890123456789012345678901234E5",receiver:"0xA3b2c4d6e8901234567890123456789012345F6",
   token:"USDC",amount:3200,fee:16,deadline:Date.now()/1000+86400*2,status:"Disputed",
   currencyPair:"CAD→ZAR",fiatReference:"TF-REF-55512345",oracleConfirmed:false,createdAt:Date.now()-86400000,
   nexusLink:"https://nexus.app/t/mno345",communityRate:13.2},
];

const MOCK_MSGS = [
  {id:1,user:"0xB8c7…890A",handle:"ChiefTrader_NG",text:"Anyone has CAD→NGN today? Need 500.",ts:Date.now()-600000,verified:true,trades:87},
  {id:2,user:"0xC9d8…901B",handle:"GhanaExchange",text:"I can do USD→GHS at 14.80. DM me.",ts:Date.now()-480000,verified:true,trades:52},
  {id:3,user:"0xD0e9…012C",handle:"Naija_Bro",text:"Rate check: NGN buying at 1540 or 1550?",ts:Date.now()-300000,verified:false,trades:12},
  {id:4,user:DEMO_WALLET,handle:"You",text:"I've got 1200 USDT for USD→GHS. Locked in escrow.",ts:Date.now()-180000,verified:true,trades:23},
  {id:5,user:"0xE1f0…234D",handle:"KenyaTrades",text:"KES corridor is solid today. 130 rate.",ts:Date.now()-60000,verified:false,trades:8},
];

const MOCK_USERS = [
  {addr:"0xB8c7…890A",handle:"ChiefTrader_NG",kyc:3,trades:87,volume:42000,flagged:false,frozen:false},
  {addr:"0xC9d8…901B",handle:"GhanaExchange",kyc:2,trades:52,volume:28000,flagged:false,frozen:false},
  {addr:"0xD0e9…012C",handle:"Naija_Bro",kyc:1,trades:12,volume:5000,flagged:true,frozen:false},
  {addr:"0xE1f0…234D",handle:"KenyaTrades",kyc:1,trades:8,volume:1800,flagged:false,frozen:false},
  {addr:"0xF2a1…234E",handle:"CapeTownSwap",kyc:0,trades:0,volume:0,flagged:true,frozen:true},
];

// ── UTILS ────────────────────────────────────────────────────────────────────
const shortAddr = a => a?`${a.slice(0,6)}…${a.slice(-4)}`:"—";
const fmtUsd = n => `$${Number(n).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const fmtTime = ts => {
  const diff = ts*1000-Date.now();
  if(diff<0) return "Expired";
  const h = Math.floor(diff/3600000);
  return h<24?`${h}h left`:`${Math.floor(h/24)}d left`;
};
const fmtDate = ts => new Date(ts).toLocaleDateString("en-CA",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});
const fmtAgo = ts => {
  const s = Math.floor((Date.now()-ts)/1000);
  if(s<60) return `${s}s ago`;
  if(s<3600) return `${Math.floor(s/60)}m ago`;
  return `${Math.floor(s/3600)}h ago`;
};
function genId() { return "0x"+[...Array(64)].map(()=>Math.floor(Math.random()*16).toString(16)).join(""); }

// ── STATUS BADGE ────────────────────────────────────────────────────────────
function StatusBadge({status}){
  const s = STATUS_STYLE[status]||STATUS_STYLE.Created;
  return(
    <span className="tag" style={{background:s.bg,color:s.text,border:`1px solid ${s.dot}40`}}>
      <span style={{width:5,height:5,borderRadius:"50%",background:s.dot,flexShrink:0}}/>
      {status}
    </span>
  );
}

// ── KYC BADGE ───────────────────────────────────────────────────────────────
function KYCBadge({level}){
  const k = KYC_LEVELS[level]||KYC_LEVELS[0];
  return(
    <span className="tag" style={{background:k.color+"18",color:k.color,border:`1px solid ${k.color}40`}}>
      {k.label}
    </span>
  );
}

// ── COPY BUTTON ─────────────────────────────────────────────────────────────
function CopyBtn({text}){
  const [ok,setOk] = useState(false);
  function copy(){
    navigator.clipboard?.writeText(text).catch(()=>{});
    setOk(true); setTimeout(()=>setOk(false),2000);
  }
  return(
    <button onClick={copy} style={{background:"transparent",border:"1px solid var(--border-md)",color:ok?"var(--primary)":"var(--muted)",borderRadius:6,padding:"3px 10px",fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"all 0.15s"}}>
      {ok?"✓ Copied":"Copy"}
    </button>
  );
}

// ── TOAST ────────────────────────────────────────────────────────────────────
function Toast({toasts,remove}){
  return(
    <div style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
      {toasts.map(t=>(
        <div key={t.id} onClick={()=>remove(t.id)} style={{
          background:t.type==="error"?"rgba(244,67,54,0.15)":t.type==="warn"?"rgba(255,179,0,0.15)":"rgba(0,200,83,0.12)",
          border:`1px solid ${t.type==="error"?"var(--red-bdr)":t.type==="warn"?"var(--amber-bdr)":"var(--border-md)"}`,
          borderLeft:`3px solid ${t.type==="error"?"var(--red)":t.type==="warn"?"var(--amber)":"var(--primary)"}`,
          color:"var(--text)",padding:"12px 16px",borderRadius:10,fontSize:13,
          maxWidth:320,cursor:"pointer",backdropFilter:"blur(10px)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)",animation:"toastIn 0.3s ease",pointerEvents:"all",
        }}>
          <div style={{fontWeight:700,marginBottom:2,fontSize:12,color:t.type==="error"?"var(--red)":t.type==="warn"?"var(--amber)":"var(--primary)"}}>
            {t.type==="error"?"✕ Error":t.type==="warn"?"⚠ Warning":"✓ Success"}
          </div>
          <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.4}}>{t.msg}</div>
        </div>
      ))}
    </div>
  );
}

// ── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({label,value,sub,color,icon}){
  return(
    <div className="stat-card fade-up">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <span style={{fontSize:10,color:"var(--muted)",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>{label}</span>
        {icon&&<span style={{fontSize:18,opacity:0.6}}>{icon}</span>}
      </div>
      <div className="mono" style={{fontSize:26,fontWeight:700,color:color||"var(--text)",lineHeight:1}}>{value}</div>
      {sub&&<div style={{fontSize:11,color:"var(--sub)",marginTop:6}}>{sub}</div>}
    </div>
  );
}

// ── TRADE ROW ────────────────────────────────────────────────────────────────
function TradeRow({trade,selected,onClick,walletAddr}){
  const isMine = trade.sender.toLowerCase()===walletAddr?.toLowerCase()||trade.receiver.toLowerCase()===walletAddr?.toLowerCase();
  const dir = trade.sender.toLowerCase()===walletAddr?.toLowerCase()?"OUT":"IN";
  return(
    <div className={`trade-row${selected?" selected":""} fade-up`} onClick={onClick}>
      <div style={{width:38,height:38,borderRadius:10,background:dir==="OUT"?"var(--amber-bg)":"var(--glow)",border:`1px solid ${dir==="OUT"?"var(--amber-bdr)":"var(--border-md)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
        {dir==="OUT"?"↑":"↓"}
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,flexWrap:"wrap"}}>
          <span className="mono" style={{fontSize:11,color:"var(--primary)",fontWeight:500}}>{trade.id.slice(0,10)}…</span>
          <StatusBadge status={trade.status}/>
        </div>
        <div style={{display:"flex",gap:12,fontSize:12,color:"var(--muted)"}}>
          <span style={{color:"var(--text)",fontWeight:600}}>{trade.currencyPair}</span>
          <span>{fmtUsd(trade.amount)} {trade.token}</span>
        </div>
      </div>
      <div style={{textAlign:"right",flexShrink:0}}>
        <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{fmtUsd(trade.amount)}</div>
        <div style={{fontSize:10,color:"var(--sub)",marginTop:2}}>{fmtTime(trade.deadline)}</div>
      </div>
    </div>
  );
}

// ── TRADE DETAIL ─────────────────────────────────────────────────────────────
function TradeDetail({trade,walletAddr,onAction,onShare}){
  const isSender   = trade.sender.toLowerCase()===walletAddr?.toLowerCase();
  const isReceiver = trade.receiver.toLowerCase()===walletAddr?.toLowerCase();
  const expired    = Date.now()/1000>trade.deadline;
  const net        = (trade.amount-trade.fee).toFixed(2);

  const rows=[
    ["Trade ID",    <span className="mono" style={{fontSize:10,color:"var(--primary)",wordBreak:"break-all"}}>{trade.id.slice(0,28)}…</span>],
    ["Status",      <StatusBadge status={trade.status}/>],
    ["Corridor",    <span style={{color:"var(--primary)",fontWeight:700}}>{trade.currencyPair}</span>],
    ["Amount",      <span className="mono">{fmtUsd(trade.amount)} {trade.token}</span>],
    ["Fee",         <span className="mono" style={{color:"var(--sub)"}}>−{fmtUsd(trade.fee)}</span>],
    ["Net recv",    <span className="mono" style={{color:"var(--primary)",fontWeight:700}}>{fmtUsd(net)} {trade.token}</span>],
    ["Rate",        <span style={{color:"var(--amber)",fontWeight:600}}>{trade.communityRate||"Market"}</span>],
    ["Deadline",    <span style={{color:expired?"var(--red)":"var(--amber)",fontWeight:600}}>{fmtTime(trade.deadline)}</span>],
    ["Sender",      <span className="mono" style={{fontSize:11,color:"var(--muted)"}}>{shortAddr(trade.sender)}</span>],
    ["Receiver",    <span className="mono" style={{fontSize:11,color:"var(--muted)"}}>{shortAddr(trade.receiver)}</span>],
    ["Oracle",      trade.oracleConfirmed
      ?<span className="tag" style={{background:"rgba(0,200,83,0.12)",color:"var(--primary)",border:"1px solid var(--border-md)"}}>⬡ Confirmed</span>
      :<span style={{color:"var(--sub)"}}>Pending</span>],
    ["Nexus Link",  <div style={{display:"flex",gap:6,alignItems:"center"}}>
      <span className="mono" style={{fontSize:10,color:"var(--blue)"}}>{shortAddr(trade.nexusLink||"")}</span>
      <CopyBtn text={trade.nexusLink||""}/>
    </div>],
  ];
  if(trade.fiatReference) rows.push(["Fiat Ref",<span className="mono" style={{fontSize:10,color:"var(--muted)"}}>{trade.fiatReference}</span>]);

  return(
    <div className="card slide-in" style={{overflow:"hidden"}}>
      <div style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:10,background:"var(--card2)",borderBottom:"1px solid var(--border)"}}>
        <div style={{flex:1,fontSize:14,fontWeight:700,color:"var(--text)"}}>Trade Details</div>
        <StatusBadge status={trade.status}/>
        <button onClick={onShare} className="btn-secondary" style={{padding:"5px 12px",fontSize:11}}>🔗 Share</button>
      </div>
      <div style={{padding:"0 18px"}}>
        {rows.map(([k,v],i)=>(
          <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:i<rows.length-1?"1px solid var(--border)":"",gap:12}}>
            <span style={{fontSize:11,color:"var(--muted)",flexShrink:0,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>{k}</span>
            <span style={{fontSize:12,color:"var(--text)",textAlign:"right"}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{padding:16,borderTop:"1px solid var(--border)",display:"flex",flexDirection:"column",gap:8,background:"var(--card2)"}}>
        {isSender&&trade.status==="Created"&&<button onClick={()=>onAction("lock",trade)} className="btn-primary" style={{width:"100%"}}>🔒 Lock Funds on Chain</button>}
        {isSender&&trade.status==="Locked"&&expired&&<button onClick={()=>onAction("refund",trade)} className="btn-warn" style={{width:"100%"}}>↩ Claim Refund</button>}
        {isReceiver&&trade.status==="Locked"&&<button onClick={()=>onAction("sentinel",trade)} className="btn-primary" style={{width:"100%"}}>⬡ Verify with Sentinel AI</button>}
        {(isSender||isReceiver)&&trade.status==="Locked"&&<button onClick={()=>onAction("dispute",trade)} className="btn-danger" style={{width:"100%"}}>⚠ Raise Dispute</button>}
        {trade.status==="Released"&&<div style={{textAlign:"center",color:"var(--primary)",fontWeight:700,fontSize:13,padding:"6px 0"}}>✓ Funds released</div>}
        {trade.status==="Refunded"&&<div style={{textAlign:"center",color:"var(--amber)",fontWeight:700,fontSize:13,padding:"6px 0"}}>↩ Refunded to sender</div>}
        {trade.status==="Disputed"&&<div style={{background:"var(--red-bg)",border:"1px solid var(--red-bdr)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"var(--red)"}}>⚠ Under admin review — funds frozen.</div>}
        {!isSender&&!isReceiver&&<div style={{color:"var(--sub)",fontSize:12,textAlign:"center",padding:"6px 0"}}>You are not a party to this trade.</div>}
      </div>
    </div>
  );
}

// ── CREATE TRADE MODAL ────────────────────────────────────────────────────────
function CreateTradeModal({onClose,onSubmit,walletAddr}){
  const [form,setForm] = useState({receiver:"",token:"USDC",amount:"",pair:"CAD→NGN",deadline:3});
  const [err,setErr]   = useState("");
  const rate = CORRIDOR_RATES[form.pair]||0;
  const fiatAmt = form.amount?(parseFloat(form.amount)*rate).toFixed(0):"—";
  const fee = form.amount?(parseFloat(form.amount)*0.005).toFixed(2):"—";

  function submit(){
    if(!form.receiver||!form.amount||parseFloat(form.amount)<=0){setErr("Fill all fields.");return;}
    onSubmit(form); onClose();
  }
  return(
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{padding:"20px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontWeight:800,fontSize:17,color:"var(--text)"}}>New Escrow Trade</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:20,lineHeight:1}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label className="label">Receiver Wallet</label>
            <input className="input-field" placeholder="0x…" value={form.receiver} onChange={e=>setForm({...form,receiver:e.target.value})}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div>
              <label className="label">Token</label>
              <select className="input-field" value={form.token} onChange={e=>setForm({...form,token:e.target.value})}>
                <option>USDC</option><option>USDT</option>
              </select>
            </div>
            <div>
              <label className="label">Corridor</label>
              <select className="input-field" value={form.pair} onChange={e=>setForm({...form,pair:e.target.value})}>
                {PAIRS.map(p=><option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Amount (USD)</label>
            <input className="input-field" type="number" placeholder="0.00" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/>
          </div>
          <div>
            <label className="label">Deadline (days)</label>
            <select className="input-field" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}>
              {[1,2,3,5,7].map(d=><option key={d} value={d}>{d} day{d>1?"s":""}</option>)}
            </select>
          </div>
          {form.amount&&(
            <div style={{background:"rgba(0,200,83,0.06)",border:"1px solid var(--border-md)",borderRadius:10,padding:"12px 14px",fontSize:12,display:"flex",flexDirection:"column",gap:6}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"var(--muted)"}}>Fiat recipient gets approx.</span>
                <span className="mono" style={{color:"var(--primary)",fontWeight:700}}>{Number(fiatAmt).toLocaleString()} {form.pair.split("→")[1]}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"var(--muted)"}}>Platform fee (0.5%)</span>
                <span className="mono" style={{color:"var(--sub)"}}>−${fee}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"var(--muted)"}}>Live rate</span>
                <span className="mono" style={{color:"var(--amber)"}}>{rate.toLocaleString()}</span>
              </div>
            </div>
          )}
          {err&&<div style={{color:"var(--red)",fontSize:12}}>{err}</div>}
          <div style={{display:"flex",gap:10}}>
            <button onClick={onClose} className="btn-secondary" style={{flex:1}}>Cancel</button>
            <button onClick={submit} className="btn-primary" style={{flex:1}}>Create Trade</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SENTINEL MODAL ───────────────────────────────────────────────────────────
function SentinelModal({trade,onClose,onSubmit}){
  const [img,setImg]     = useState(null);
  const [loading,setLoading] = useState(false);
  const [result,setResult]   = useState(null);

  function handleFile(e){
    const f = e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = ev => setImg(ev.target.result);
    r.readAsDataURL(f);
  }
  async function submit(){
    if(!img) return;
    setLoading(true);
    await new Promise(r=>setTimeout(r,2000));
    const ok = Math.random()>0.2;
    const res = ok
      ?{ok:true,ocr:{bankName:"RBC Royal Bank",amount:trade.amount,referenceId:"NEXUS-"+Date.now()},sha256:"a3f9b2c8…",txHash:"0x"+genId().slice(0,42)}
      :{ok:false,reason:"Amount mismatch",ocr:{amount:trade.amount-50}};
    setResult(res);
    setLoading(false);
    if(ok) setTimeout(()=>{onSubmit(trade,res);onClose();},2000);
  }
  return(
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{padding:"20px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontWeight:800,fontSize:17,color:"var(--text)"}}>⬡ Sentinel AI Verification</div>
            <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>OCR + SHA-256 fraud detection</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:20,lineHeight:1}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>
          <label style={{display:"block",cursor:"pointer"}}>
            <input type="file" accept="image/*" onChange={handleFile} style={{display:"none"}}/>
            <div style={{border:`2px dashed ${img?"var(--primary-dim)":"var(--border)"}`,borderRadius:12,padding:"28px 20px",textAlign:"center",background:img?"var(--glow)":"transparent",transition:"all 0.2s"}}>
              {img
                ?<img src={img} style={{maxHeight:160,maxWidth:"100%",borderRadius:8,display:"block",margin:"0 auto"}} alt="receipt"/>
                :<div>
                  <div style={{fontSize:28,marginBottom:8}}>📄</div>
                  <div style={{color:"var(--muted)",fontSize:14,fontWeight:600}}>Upload payment receipt</div>
                  <div style={{fontSize:11,color:"var(--sub)",marginTop:4}}>PNG · JPG · WEBP — Google Vision OCR</div>
                </div>
              }
            </div>
          </label>
          <div style={{background:"rgba(0,200,83,0.05)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px",fontSize:12,color:"var(--muted)"}}>
            <div style={{fontWeight:700,color:"var(--primary)",marginBottom:6}}>Sentinel checks:</div>
            {["Bank name & amount match","Reference ID format & uniqueness","SHA-256 hash — replay prevention","Known fraud receipt database"].map(c=>(
              <div key={c} style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                <span style={{color:"var(--primary)"}}>✓</span>{c}
              </div>
            ))}
          </div>
          {result&&(
            <div style={{background:result.ok?"rgba(0,200,83,0.08)":"var(--red-bg)",border:`1px solid ${result.ok?"var(--border-md)":"var(--red-bdr)"}`,borderRadius:10,padding:"12px 14px",fontSize:12}}>
              {result.ok
                ?<><div style={{color:"var(--primary)",fontWeight:800,marginBottom:6}}>✓ Verification passed</div>
                   {result.ocr&&<div style={{color:"var(--muted)"}}>Bank: <span style={{color:"var(--text)",fontWeight:600}}>{result.ocr.bankName}</span> · Amount: <span style={{color:"var(--text)",fontWeight:600}}>{fmtUsd(result.ocr.amount)}</span></div>}
                 </>
                :<><div style={{color:"var(--red)",fontWeight:800,marginBottom:4}}>✕ {result.reason}</div>
                   {result.ocr&&<div style={{color:"var(--muted)"}}>Detected: {fmtUsd(result.ocr?.amount)}</div>}
                 </>
              }
            </div>
          )}
          <button onClick={submit} disabled={!img||loading||result?.ok} className="btn-primary" style={{width:"100%",opacity:!img||loading?0.5:1}}>
            {loading?<span>Analysing<span style={{animation:"pulse 1s infinite"}}>…</span></span>:result?.ok?"✓ Verified":"Run Sentinel Verification"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── SHARE MODAL ──────────────────────────────────────────────────────────────
function ShareModal({trade,onClose}){
  return(
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal-box">
        <div style={{padding:"20px 24px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontWeight:800,fontSize:17,color:"var(--text)"}}>🔗 Share Trade</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:20}}>✕</button>
        </div>
        <div style={{padding:"20px 24px",display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"var(--card2)",border:"1px solid var(--border-md)",borderRadius:12,padding:"16px",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:8}}>⬡</div>
            <div style={{fontWeight:800,color:"var(--primary)",fontSize:18,marginBottom:4}}>NEXUS Escrow</div>
            <div className="mono" style={{fontSize:11,color:"var(--muted)",marginBottom:12}}>{trade.id.slice(0,26)}…</div>
            <div style={{display:"flex",gap:12,justifyContent:"center",fontSize:14,fontWeight:600}}>
              <span>{fmtUsd(trade.amount)} {trade.token}</span>
              <span style={{color:"var(--muted)"}}>·</span>
              <span style={{color:"var(--primary)"}}>{trade.currencyPair}</span>
            </div>
          </div>
          <div>
            <label className="label">Nexus Link</label>
            <div style={{display:"flex",gap:8}}>
              <input className="input-field" readOnly value={trade.nexusLink||""} style={{fontFamily:"monospace",fontSize:12}}/>
              <CopyBtn text={trade.nexusLink||""}/>
            </div>
          </div>
          <button onClick={onClose} className="btn-primary" style={{width:"100%"}}>Done</button>
        </div>
      </div>
    </div>
  );
}

// ── ACTIVITY FEED ────────────────────────────────────────────────────────────
function ActivityFeed({trades}){
  const events = trades.flatMap(t=>[
    {ts:t.createdAt,msg:`Trade ${shortAddr(t.id)} created`,type:"info",pair:t.currencyPair},
    t.status!=="Created"?{ts:t.createdAt+600000,msg:`Funds locked: ${fmtUsd(t.amount)} ${t.token}`,type:"success",pair:t.currencyPair}:null,
    (t.status==="Confirmed"||t.status==="Released")?{ts:t.createdAt+3600000,msg:`Oracle confirmed: ${t.fiatReference||"—"}`,type:"success",pair:t.currencyPair}:null,
    t.status==="Released"?{ts:t.createdAt+4000000,msg:"Funds released to receiver",type:"success",pair:t.currencyPair}:null,
    t.status==="Disputed"?{ts:t.createdAt+1800000,msg:"Dispute raised — under review",type:"warn",pair:t.currencyPair}:null,
  ]).filter(Boolean).sort((a,b)=>b.ts-a.ts).slice(0,12);

  return(
    <div className="card" style={{overflow:"hidden"}}>
      <div style={{padding:"14px 18px",borderBottom:"1px solid var(--border)",fontSize:13,fontWeight:700,color:"var(--text)",background:"var(--card2)"}}>Activity Feed</div>
      {events.length===0&&<div style={{padding:"32px",textAlign:"center",color:"var(--sub)",fontSize:13}}>No activity yet.</div>}
      {events.map((e,i)=>(
        <div key={i} style={{padding:"10px 18px",borderBottom:i<events.length-1?"1px solid var(--border)":"",display:"flex",gap:12,alignItems:"flex-start"}}>
          <div style={{width:7,height:7,borderRadius:"50%",marginTop:5,flexShrink:0,background:e.type==="warn"?"var(--amber)":e.type==="error"?"var(--red)":"var(--primary)"}} className={e.type==="success"?"dot-pulse":""}/>
          <div style={{flex:1}}>
            <div style={{fontSize:12,color:"var(--text)"}}>{e.msg}</div>
            <div style={{fontSize:10,color:"var(--sub)",marginTop:2}}>{fmtDate(e.ts)} · {e.pair}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── KYC PANEL ────────────────────────────────────────────────────────────────
function KYCPanel({level,onUpgrade}){
  return(
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {[
        {lv:1,label:"Level 1 — Phone & Email",desc:"Trades up to $1,000",req:["Phone number","Email address"]},
        {lv:2,label:"Level 2 — Gov ID + Liveness",desc:"Trades up to $10,000",req:["Government-issued photo ID","Biometric liveness check"]},
        {lv:3,label:"Level 3 — Enhanced AML",desc:"Trades above $10,000",req:["Source of funds","Business license"]},
      ].map(tier=>{
        const done = level>=tier.lv;
        return(
          <div key={tier.lv} className="card" style={{padding:"16px 20px",borderColor:done?"var(--border-md)":"var(--border)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:14,fontWeight:700,color:done?"var(--primary)":"var(--text)"}}>{tier.label}</span>
              {done
                ?<span className="tag" style={{background:"rgba(0,200,83,0.12)",color:"var(--primary)",border:"1px solid var(--border-md)"}}>✓ Verified</span>
                :<button onClick={()=>onUpgrade(tier.lv)} className="btn-secondary" style={{padding:"5px 14px",fontSize:11}}>Verify Now</button>
              }
            </div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:10}}>{tier.desc}</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {tier.req.map(r=>(
                <span key={r} className="tag" style={{background:done?"rgba(0,200,83,0.08)":"rgba(255,255,255,0.04)",color:done?"var(--primary)":"var(--sub)",border:`1px solid ${done?"var(--border-md)":"var(--border)"}`}}>
                  {done?"✓ ":""}{r}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── COMMUNITY LOUNGE ─────────────────────────────────────────────────────────
function CommunityLounge({wallet,trades}){
  const [msgs,setMsgs]   = useState(MOCK_MSGS);
  const [input,setInput] = useState("");
  const bottomRef        = useRef();
  const myTrades = trades.filter(t=>t.sender.toLowerCase()===wallet?.toLowerCase()||t.receiver.toLowerCase()===wallet?.toLowerCase());
  const myRep    = myTrades.filter(t=>t.status==="Released").length;

  function send(){
    if(!input.trim()) return;
    setMsgs(m=>[...m,{id:Date.now(),user:wallet||"0x0000",handle:"You",text:input.trim(),ts:Date.now(),verified:myRep>=5,trades:myRep}]);
    setInput("");
    setTimeout(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),50);
  }
  return(
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* Profile card */}
      <div className="card" style={{padding:"18px 20px",display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:48,height:48,borderRadius:12,background:"linear-gradient(135deg,var(--forest),var(--primary))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:"#fff",flexShrink:0}}>
          {(wallet||"0x").slice(2,4).toUpperCase()}
        </div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:"var(--text)",fontSize:14,display:"flex",alignItems:"center",gap:8}}>
            You
            {myRep>=5&&<span className="tag" style={{background:"rgba(0,200,83,0.12)",color:"var(--primary)",border:"1px solid var(--border-md)"}}>✓ Verified</span>}
            {myRep>=50&&<span className="tag" style={{background:"var(--amber-bg)",color:"var(--amber)",border:"1px solid var(--amber-bdr)"}}>✦ Merchant</span>}
          </div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:3}}>{myRep} completed trades</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div className="mono" style={{fontSize:28,fontWeight:700,color:"var(--primary)",lineHeight:1}}>{myRep}</div>
          <div style={{fontSize:10,color:"var(--sub)",marginTop:2}}>Rep Score</div>
        </div>
      </div>
      {/* Chat */}
      <div className="card" style={{display:"flex",flexDirection:"column",height:420,overflow:"hidden"}}>
        <div style={{padding:"12px 16px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",gap:8,background:"var(--card2)"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"var(--primary)"}} className="dot-pulse"/>
          <span style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>Community Lounge</span>
          <span style={{fontSize:11,color:"var(--sub)",marginLeft:"auto"}}>{msgs.length} messages</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px",display:"flex",flexDirection:"column",gap:10}}>
          {msgs.map(m=>(
            <div key={m.id} style={{display:"flex",gap:10,alignItems:"flex-start",flexDirection:m.user===wallet?"row-reverse":"row"}}>
              <div style={{width:32,height:32,borderRadius:8,flexShrink:0,background:m.user===wallet?"linear-gradient(135deg,var(--forest),var(--primary))":"rgba(255,255,255,0.06)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"var(--text)"}}>
                {m.handle.slice(0,2).toUpperCase()}
              </div>
              <div style={{maxWidth:"72%"}}>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:4,flexDirection:m.user===wallet?"row-reverse":"row",flexWrap:"wrap"}}>
                  <span style={{fontSize:11,fontWeight:700,color:m.user===wallet?"var(--primary)":"var(--text)"}}>{m.handle}</span>
                  {m.verified&&<span className="tag" style={{background:"rgba(0,200,83,0.12)",color:"var(--primary)",border:"1px solid var(--border)",fontSize:9}}>✓</span>}
                  {m.trades>=50&&<span className="tag" style={{background:"var(--amber-bg)",color:"var(--amber)",border:"1px solid var(--amber-bdr)",fontSize:9}}>✦</span>}
                  <span style={{fontSize:9,color:"var(--sub)"}}>{fmtAgo(m.ts)}</span>
                </div>
                <div style={{background:m.user===wallet?"rgba(0,200,83,0.1)":"rgba(255,255,255,0.04)",border:"1px solid var(--border)",borderRadius:10,padding:"9px 13px",fontSize:13,color:"var(--text)",lineHeight:1.5}}>
                  {m.text}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef}/>
        </div>
        <div style={{padding:"10px 14px",borderTop:"1px solid var(--border)",display:"flex",gap:8,background:"var(--card2)"}}>
          <input className="input-field" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Share rates, ask questions…" style={{flex:1,padding:"9px 12px",fontSize:13}}/>
          <button onClick={send} disabled={!input.trim()} className="btn-primary" style={{padding:"9px 16px",opacity:!input.trim()?0.4:1}}>Send</button>
        </div>
      </div>
    </div>
  );
}

// ── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPanel({trades,onResolveTrade,platformFee,onFeeChange}){
  const [users,setUsers]       = useState(MOCK_USERS);
  const [adminTab,setAdminTab] = useState("disputes");
  const [fee,setFee]           = useState(platformFee||0.5);
  const [feeEdit,setFeeEdit]   = useState(false);
  const disputed = trades.filter(t=>t.status==="Disputed");

  function toggleFreeze(addr){ setUsers(u=>u.map(x=>x.addr===addr?{...x,frozen:!x.frozen}:x)); }
  function saveFee(){ onFeeChange(fee); setFeeEdit(false); }

  const tabs=[
    {id:"disputes",label:`Disputes (${disputed.length})`},
    {id:"users",label:"Users & KYC"},
    {id:"fees",label:"Platform Fees"},
    {id:"system",label:"System Status"},
  ];
  return(
    <div className="card" style={{overflow:"hidden"}}>
      <div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)",background:"var(--card2)",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:16,fontWeight:800,color:"var(--text)"}}>⚙ Admin Panel</span>
        <span className="tag" style={{background:"var(--red-bg)",color:"var(--red)",border:"1px solid var(--red-bdr)"}}>Restricted</span>
      </div>
      <div style={{padding:"14px 20px",borderBottom:"1px solid var(--border)",display:"flex",gap:4,flexWrap:"wrap"}}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>setAdminTab(t.id)} style={{
            background:adminTab===t.id?"var(--primary)":"transparent",
            color:adminTab===t.id?"var(--forest)":"var(--muted)",
            border:`1px solid ${adminTab===t.id?"var(--primary)":"var(--border)"}`,
            borderRadius:8,padding:"6px 14px",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:600,transition:"all 0.18s",
          }}>{t.label}</button>
        ))}
      </div>
      <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>
        {adminTab==="disputes"&&(
          disputed.length===0
            ?<div style={{textAlign:"center",padding:"32px",color:"var(--sub)",fontSize:13}}>No active disputes. ✓</div>
            :disputed.map(t=>(
              <div key={t.id} className="card" style={{padding:"14px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                  <span className="mono" style={{fontSize:11,color:"var(--primary)"}}>{t.id.slice(0,20)}…</span>
                  <span style={{fontWeight:700,color:"var(--text)"}}>{fmtUsd(t.amount)} {t.token}</span>
                </div>
                <div style={{fontSize:12,color:"var(--muted)",marginBottom:12}}>
                  Corridor: <span style={{color:"var(--text)",fontWeight:600}}>{t.currencyPair}</span> · Ref: <span className="mono">{t.fiatReference||"—"}</span>
                </div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={()=>onResolveTrade(t.id,"release")} className="btn-primary" style={{flex:1,padding:"8px"}}>Release Funds</button>
                  <button onClick={()=>onResolveTrade(t.id,"refund")} className="btn-warn" style={{flex:1,padding:"8px"}}>Refund Sender</button>
                </div>
              </div>
            ))
        )}
        {adminTab==="users"&&users.map(u=>(
          <div key={u.addr} className="card" style={{padding:"14px 16px",borderColor:u.frozen?"var(--red-bdr)":u.flagged?"var(--amber-bdr)":"var(--border)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6,flexWrap:"wrap"}}>
              <span style={{fontWeight:700,color:"var(--text)",fontSize:13}}>{u.handle}</span>
              <span className="mono" style={{fontSize:10,color:"var(--sub)"}}>{u.addr}</span>
              <KYCBadge level={u.kyc}/>
              {u.flagged&&!u.frozen&&<span className="tag" style={{background:"var(--amber-bg)",color:"var(--amber)",border:"1px solid var(--amber-bdr)"}}>⚠ Flagged</span>}
              {u.frozen&&<span className="tag" style={{background:"var(--red-bg)",color:"var(--red)",border:"1px solid var(--red-bdr)"}}>🔒 Frozen</span>}
            </div>
            <div style={{fontSize:11,color:"var(--muted)",marginBottom:10,display:"flex",gap:12}}>
              <span>{u.trades} trades</span><span>{fmtUsd(u.volume)} volume</span>
            </div>
            <button onClick={()=>toggleFreeze(u.addr)} className={u.frozen?"btn-secondary":"btn-danger"} style={{padding:"5px 14px",fontSize:11}}>
              {u.frozen?"🔓 Unfreeze":"🔒 Hard-Lock"}
            </button>
          </div>
        ))}
        {adminTab==="fees"&&(
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            <div className="card" style={{padding:"16px"}}>
              <div style={{fontSize:12,color:"var(--muted)",marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em"}}>Current Platform Fee</div>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                {feeEdit?(
                  <>
                    <input type="number" step="0.1" min="0" max="5" value={fee} onChange={e=>setFee(e.target.value)} className="input-field" style={{width:100}}/>
                    <span style={{color:"var(--muted)"}}>%</span>
                    <button onClick={saveFee} className="btn-primary" style={{padding:"7px 14px",fontSize:12}}>Save</button>
                    <button onClick={()=>{setFeeEdit(false);setFee(platformFee);}} className="btn-danger" style={{padding:"7px 14px",fontSize:12}}>Cancel</button>
                  </>
                ):(
                  <>
                    <span className="mono" style={{fontSize:32,fontWeight:700,color:"var(--primary)"}}>{fee}%</span>
                    <button onClick={()=>setFeeEdit(true)} className="btn-secondary" style={{padding:"7px 14px",fontSize:12}}>Edit</button>
                  </>
                )}
              </div>
              <div style={{fontSize:11,color:"var(--sub)",marginTop:8}}>Default: 0.5% · Applied to all new trades</div>
            </div>
            <div className="card" style={{padding:"16px",fontSize:12,color:"var(--muted)"}}>
              <div style={{color:"var(--text)",fontWeight:700,marginBottom:8}}>Revenue (30d est.)</div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                <span>Total volume</span>
                <span className="mono" style={{color:"var(--text)"}}>{fmtUsd(MOCK_TRADES.reduce((s,t)=>s+t.amount,0))}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span>Fees collected</span>
                <span className="mono" style={{color:"var(--primary)"}}>{fmtUsd(MOCK_TRADES.reduce((s,t)=>s+t.fee,0))}</span>
              </div>
            </div>
          </div>
        )}
        {adminTab==="system"&&[
          {label:"Smart Contract",     val:"Not configured",              ok:false},
          {label:"Sentinel AI Oracle", val:"Demo mode",                   ok:false},
          {label:"VoPay / DCPayments", val:"Interac Autodeposit Ready",   ok:true},
          {label:"Stripe Connect",     val:"USD ACH / Card Onramp Ready", ok:true},
          {label:"Flutterwave",        val:"NGN · GHS · KES Payouts",     ok:true},
          {label:"Paystack",           val:"West Africa Rails Ready",     ok:true},
          {label:"KYC Provider",       val:"Stripe Identity / Sumsub",    ok:true},
          {label:"Blockchain",         val:"Polygon (MATIC) · USDC/USDT", ok:true},
        ].map(item=>(
          <div key={item.label} className="card" style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12,borderColor:item.ok?"var(--border)":"var(--amber-bdr)"}}>
            <span style={{color:"var(--muted)",fontWeight:600}}>{item.label}</span>
            <div style={{display:"flex",alignItems:"center",gap:6,color:"var(--text)"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:item.ok?"var(--primary)":"var(--amber)"}}/>
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function NexusApp({contractAddress,sentinelUrl,demoMode=true}){
  const [wallet,setWallet]             = useState(null);
  const [trades,setTrades]             = useState(MOCK_TRADES);
  const [selected,setSelected]         = useState(null);
  const [modal,setModal]               = useState(null);
  const [sentinelTrade,setSentinelTrade] = useState(null);
  const [shareTrade,setShareTrade]     = useState(null);
  const [mainTab,setMainTab]           = useState("dashboard");
  const [listTab,setListTab]           = useState("trades");
  const [filter,setFilter]             = useState("all");
  const [toasts,setToasts]             = useState([]);
  const [loading,setLoading]           = useState(false);
  const [kycLevel,setKycLevel]         = useState(1);
  const [platformFee,setPlatformFee]   = useState(0.5);

  useEffect(()=>{ if(demoMode) setWallet(DEMO_WALLET); },[demoMode]);

  const toast = useCallback((msg,type="success")=>{
    const id = Date.now()+Math.random();
    setToasts(t=>[...t,{id,msg,type}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),5000);
  },[]);

  const myTrades  = useMemo(()=>trades.filter(t=>t.sender.toLowerCase()===wallet?.toLowerCase()||t.receiver.toLowerCase()===wallet?.toLowerCase()),[trades,wallet]);
  const filtered  = useMemo(()=>filter==="all"?myTrades:myTrades.filter(t=>t.status===filter),[myTrades,filter]);
  const locked    = useMemo(()=>myTrades.filter(t=>["Created","Locked","Confirmed"].includes(t.status)),[myTrades]);
  const released  = useMemo(()=>myTrades.filter(t=>t.status==="Released"),[myTrades]);
  const disputes  = useMemo(()=>trades.filter(t=>t.status==="Disputed"),[trades]);

  async function connectWallet(){
    if(!window.ethereum){toast("No wallet detected. Install MetaMask.","error");return;}
    try{
      setLoading(true);
      const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
      setWallet(accounts[0]);
      toast(`Connected: ${shortAddr(accounts[0])}`);
    }catch(e){toast(e.message||"Connection failed","error");}
    finally{setLoading(false);}
  }

  function handleAction(type,trade){
    if(type==="sentinel"){setSentinelTrade(trade);setModal("sentinel");return;}
    if(type==="lock")    { setTrades(t=>t.map(x=>x.id===trade.id?{...x,status:"Locked"}:x)); toast("Funds locked on chain."); setSelected(t=>t?.id===trade.id?{...t,status:"Locked"}:t); }
    if(type==="refund")  { setTrades(t=>t.map(x=>x.id===trade.id?{...x,status:"Refunded"}:x)); toast("Refund processed.","warn"); setSelected(null); }
    if(type==="dispute") { setTrades(t=>t.map(x=>x.id===trade.id?{...x,status:"Disputed"}:x)); toast("Dispute raised — admin notified.","warn"); setSelected(null); }
  }
  function handleSentinelSuccess(trade){
    setTrades(t=>t.map(x=>x.id===trade.id?{...x,status:"Released",oracleConfirmed:true}:x));
    setSelected(null); toast("Sentinel verified — funds released!");
  }
  function handleCreateTrade(form){
    const id = genId();
    const newT = {
      id,sender:wallet,receiver:form.receiver,token:form.token,
      amount:parseFloat(form.amount),fee:parseFloat(form.amount)*0.005,
      deadline:Date.now()/1000+86400*parseInt(form.deadline),
      status:"Created",currencyPair:form.pair,fiatReference:"",
      oracleConfirmed:false,createdAt:Date.now(),
      nexusLink:`https://nexus.app/t/${id.slice(2,8)}`,
      communityRate:CORRIDOR_RATES[form.pair],
    };
    setTrades(t=>[newT,...t]);
    toast(`Trade created: ${fmtUsd(newT.amount)} ${newT.token}`);
  }
  function handleResolveTrade(id,action){
    setTrades(t=>t.map(x=>x.id===id?{...x,status:action==="release"?"Released":"Refunded"}:x));
    toast(`Trade ${action}d by admin.`,action==="release"?"success":"warn");
  }
  function handleKYCUpgrade(lv){ setKycLevel(lv); toast(`KYC Level ${lv} verified! ✓`); }

  const TABS = [
    {id:"dashboard",label:"Dashboard"},
    {id:"community",label:"Community"},
    {id:"kyc",      label:"KYC / AML"},
    {id:"admin",    label:"Admin"},
  ];

  return(
    <>
      {/* ── HEADER ── */}
      <header style={{background:"rgba(5,26,16,0.85)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",gap:16,height:60}}>
          {/* Logo */}
          <div style={{display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <div style={{width:32,height:32,borderRadius:8,background:"linear-gradient(135deg,var(--forest),var(--primary))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:900,color:"#fff",boxShadow:"0 0 16px var(--glow)"}}>⬡</div>
            <div>
              <div style={{fontWeight:800,fontSize:16,color:"var(--text)",letterSpacing:"0.04em",lineHeight:1}}>NEXUS</div>
              <div style={{fontSize:9,color:"var(--muted)",letterSpacing:"0.12em",textTransform:"uppercase"}}>P2P Escrow</div>
            </div>
          </div>
          {/* Nav */}
          <div style={{display:"flex",gap:4,flex:1,justifyContent:"center"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setMainTab(t.id)} style={{
                background:mainTab===t.id?"var(--primary)":"transparent",
                border:"none",color:mainTab===t.id?"var(--forest)":"var(--muted)",
                padding:"6px 14px",fontSize:12,cursor:"pointer",
                fontFamily:"inherit",fontWeight:mainTab===t.id?700:500,
                borderRadius:8,transition:"all 0.18s",
              }}>{t.label}</button>
            ))}
          </div>
          {/* Wallet */}
          <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            {demoMode&&<span className="tag" style={{background:"rgba(255,179,0,0.1)",color:"var(--amber)",border:"1px solid var(--amber-bdr)",fontSize:10}}>Demo</span>}
            <KYCBadge level={kycLevel}/>
            {wallet
              ?<div style={{display:"flex",alignItems:"center",gap:7,background:"rgba(0,200,83,0.08)",border:"1px solid var(--border-md)",borderRadius:8,padding:"6px 12px",fontSize:12}}>
                 <div style={{width:6,height:6,borderRadius:"50%",background:"var(--primary)"}} className="dot-pulse"/>
                 <span className="mono">{shortAddr(wallet)}</span>
               </div>
              :<button onClick={connectWallet} disabled={loading} className="btn-primary" style={{padding:"7px 16px"}}>
                {loading?"Connecting…":"Connect Wallet"}
               </button>
            }
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>

        {/* ── DASHBOARD ── */}
        {mainTab==="dashboard"&&(
          <div className="fade-up">
            {/* Stats row */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:24}}>
              <StatCard label="Active Trades"  value={locked.length}                    sub="Created · Locked · Confirmed" icon="⬡"/>
              <StatCard label="Locked Volume"  value={fmtUsd(locked.reduce((s,t)=>s+t.amount,0))}  sub="USDC / USDT" color="var(--primary)" icon="🔒"/>
              <StatCard label="Total Released" value={fmtUsd(released.reduce((s,t)=>s+t.amount,0))} sub="All time" color="var(--blue)" icon="✓"/>
              <StatCard label="Platform Fee"   value={`${platformFee}%`}                sub="Per trade" color="var(--amber)" icon="💱"/>
              {disputes.length>0&&<StatCard label="Disputes" value={disputes.length} sub="Awaiting admin" color="var(--red)" icon="⚠"/>}
            </div>

            {/* Trades list + detail */}
            <div style={{display:"grid",gridTemplateColumns:selected?"1fr 380px":"1fr",gap:20}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,flexWrap:"wrap"}}>
                  <div className="tab-pill">
                    {["trades","activity"].map(t=>(
                      <button key={t} onClick={()=>setListTab(t)} className={listTab===t?"active":""} style={{textTransform:"capitalize"}}>{t}</button>
                    ))}
                  </div>
                  {listTab==="trades"&&(
                    <select value={filter} onChange={e=>setFilter(e.target.value)} className="input-field" style={{width:"auto",fontSize:11,padding:"7px 12px"}}>
                      <option value="all">All statuses</option>
                      {STATUS.map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  )}
                  <div style={{flex:1}}/>
                  <button onClick={()=>setModal("create")} className="btn-primary" style={{display:"flex",alignItems:"center",gap:6}}>
                    + New Trade
                  </button>
                </div>
                {listTab==="trades"?(
                  <div style={{display:"flex",flexDirection:"column",gap:8}}>
                    {filtered.length===0
                      ?<div style={{textAlign:"center",padding:"48px 20px",color:"var(--sub)",fontSize:13}}>No trades found. Create a new trade to get started.</div>
                      :filtered.map(t=>(
                        <TradeRow key={t.id} trade={t} selected={selected?.id===t.id} onClick={()=>setSelected(t)} walletAddr={wallet}/>
                      ))
                    }
                  </div>
                ):<ActivityFeed trades={myTrades}/>}
              </div>
              {selected&&(
                <div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <span style={{fontSize:12,color:"var(--muted)",fontWeight:600}}>Selected trade</span>
                    <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:18,lineHeight:1}}>✕</button>
                  </div>
                  <TradeDetail trade={selected} walletAddr={wallet} onAction={handleAction} onShare={()=>{setShareTrade(selected);setModal("share");}}/>
                </div>
              )}
            </div>

            {/* Corridors */}
            <div className="card" style={{marginTop:24,padding:"16px 20px"}}>
              <div style={{fontSize:10,color:"var(--muted)",marginBottom:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em"}}>Active Corridors & Live Rates</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                {PAIRS.map(p=>{
                  const cnt = trades.filter(t=>t.currencyPair===p&&["Locked","Confirmed"].includes(t.status)).length;
                  return(
                    <div key={p} style={{background:"rgba(0,200,83,0.05)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 16px",fontSize:12,display:"flex",alignItems:"center",gap:10,transition:"border-color 0.18s"}}>
                      <span style={{fontWeight:700,color:"var(--text)"}}>{p}</span>
                      <span className="mono" style={{color:"var(--primary)",fontWeight:600}}>{CORRIDOR_RATES[p]?.toLocaleString()}</span>
                      {cnt>0&&<span className="tag" style={{background:"rgba(0,200,83,0.12)",color:"var(--primary)",border:"1px solid var(--border-md)"}}>{cnt} active</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System status */}
            <div style={{marginTop:14,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
              {[
                {label:"Smart Contract",   val:contractAddress?shortAddr(contractAddress):"Not configured", ok:!!contractAddress},
                {label:"Sentinel AI",      val:sentinelUrl?"Connected":"Demo mode",                        ok:!!sentinelUrl},
                {label:"Canadian Rails",   val:"VoPay · Interac Autodeposit",                              ok:true},
                {label:"African Rails",    val:"Flutterwave · Paystack",                                   ok:true},
              ].map(item=>(
                <div key={item.label} className="card" style={{padding:"12px 16px",fontSize:12}}>
                  <div style={{color:"var(--muted)",marginBottom:6,fontWeight:600,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em"}}>{item.label}</div>
                  <div style={{display:"flex",alignItems:"center",gap:6,color:"var(--text)"}}>
                    <span style={{width:6,height:6,borderRadius:"50%",background:item.ok?"var(--primary)":"var(--amber)",flexShrink:0}} className={item.ok?"dot-pulse":""}/>
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {mainTab==="community"&&<CommunityLounge wallet={wallet} trades={trades}/>}

        {mainTab==="kyc"&&(
          <div style={{maxWidth:600,margin:"0 auto"}} className="fade-up">
            <div style={{marginBottom:20}}>
              <div style={{fontSize:22,fontWeight:800,color:"var(--text)",marginBottom:6}}>🛡 KYC / AML Verification</div>
              <div style={{fontSize:13,color:"var(--muted)"}}>Complete verification tiers to unlock higher trade limits. Powered by Stripe Identity &amp; Sumsub.</div>
            </div>
            <KYCPanel level={kycLevel} onUpgrade={handleKYCUpgrade}/>
          </div>
        )}

        {mainTab==="admin"&&(
          <div style={{maxWidth:720,margin:"0 auto"}} className="fade-up">
            <AdminPanel trades={trades} onResolveTrade={handleResolveTrade} platformFee={platformFee} onFeeChange={setPlatformFee}/>
          </div>
        )}
      </main>

      {/* ── MODALS ── */}
      {modal==="create"&&<CreateTradeModal onClose={()=>setModal(null)} onSubmit={handleCreateTrade} walletAddr={wallet}/>}
      {modal==="sentinel"&&sentinelTrade&&<SentinelModal trade={sentinelTrade} onClose={()=>setModal(null)} onSubmit={handleSentinelSuccess}/>}
      {modal==="share"&&shareTrade&&<ShareModal trade={shareTrade} onClose={()=>setModal(null)}/>}

      <Toast toasts={toasts} remove={id=>setToasts(t=>t.filter(x=>x.id!==id))}/>
    </>
  );
}

// ── BOOTSTRAP ────────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<NexusApp demoMode={true}/>);
</script>
</body>
</html>
