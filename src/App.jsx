import { useState, useEffect, useCallback, useMemo } from "react";

const LS_MONTHLY = "https://TU_TIENDA.lemonsqueezy.com/checkout/buy/TU_VARIANT_MENSUAL";
const LS_ANNUAL  = "https://TU_TIENDA.lemonsqueezy.com/checkout/buy/TU_VARIANT_ANUAL";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');`;

const CSS = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --ink:#0f0f0f;--paper:#f7f6f2;--cream:#eeecea;--line:#e0ddd8;
  --green:#1a7a4a;--red:#c0392b;--gold:#b8860b;--muted:#8a8680;--card:#ffffff;
  --font:'Outfit',sans-serif;--mono:'IBM Plex Mono',monospace;
}
html{font-size:16px}
body{background:var(--paper);color:var(--ink);font-family:var(--font);min-height:100vh;-webkit-font-smoothing:antialiased}
.wrap{max-width:720px;margin:0 auto;padding:0 1.25rem 2rem}
.header{display:flex;align-items:center;justify-content:space-between;padding:1.75rem 0 1.5rem;border-bottom:2px solid var(--ink)}
.logo{font-size:1.7rem;font-weight:700;letter-spacing:-0.5px}
.logo em{font-style:normal;font-weight:300;color:var(--muted)}
.badge{font-family:var(--mono);font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;padding:.3rem .65rem;border:1px solid var(--line);border-radius:2px;color:var(--muted)}
.badge.pro{border-color:var(--gold);color:var(--gold);background:rgba(184,134,11,.06)}
.btn-upgrade{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.4rem .85rem;font-family:var(--font);font-size:.8rem;font-weight:600;cursor:pointer}
.nav{display:flex;border-bottom:1px solid var(--line);margin-bottom:1.75rem;overflow-x:auto}
.nav-btn{flex-shrink:0;padding:.9rem .75rem;background:none;border:none;border-bottom:2px solid transparent;font-family:var(--font);font-size:.82rem;font-weight:500;color:var(--muted);cursor:pointer;transition:all .15s;margin-bottom:-1px;white-space:nowrap}
.nav-btn:hover{color:var(--ink)}
.nav-btn.on{color:var(--ink);border-bottom-color:var(--ink)}
.hero{padding:2rem 0 1.75rem;text-align:center;border-bottom:1px solid var(--line);margin-bottom:1.75rem}
.hero-label{font-family:var(--mono);font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.hero-amt{font-weight:700;font-size:clamp(2.5rem,8vw,4rem);letter-spacing:-2px;line-height:1}
.pos{color:var(--green)}.neg{color:var(--red)}
.hero-sub{display:flex;justify-content:center;gap:2rem;margin-top:1.1rem;flex-wrap:wrap}
.stat-label{font-family:var(--mono);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.2rem}
.stat-val{font-weight:600;font-size:1.2rem;letter-spacing:-.5px}
.form-card{background:var(--card);border:1px solid var(--line);border-radius:4px;padding:1.25rem;margin-bottom:1.75rem}
.form-lbl{font-family:var(--mono);font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:.6rem}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.6rem;margin-bottom:.6rem}
.inp{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:3px;padding:.6rem .75rem;font-family:var(--font);font-size:.875rem;color:var(--ink);outline:none;transition:border-color .15s}
.inp:focus{border-color:var(--ink)}
.inp::placeholder{color:var(--muted)}
.inp option{background:var(--paper)}
.seg{display:flex;border:1px solid var(--line);border-radius:3px;overflow:hidden;margin-bottom:.6rem}
.seg button{flex:1;padding:.6rem;border:none;background:none;font-family:var(--font);font-size:.8rem;font-weight:500;color:var(--muted);cursor:pointer;transition:all .15s}
.seg button.exp{background:var(--red);color:#fff}
.seg button.inc{background:var(--green);color:#fff}
.add-btn{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.6rem 1.1rem;font-family:var(--font);font-size:.875rem;font-weight:600;cursor:pointer;width:100%;margin-top:.4rem}
.sec-lbl{font-family:var(--mono);font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem;display:flex;justify-content:space-between;align-items:center}
.tx-list{display:flex;flex-direction:column}
.tx{display:flex;align-items:center;gap:.9rem;padding:.9rem 0;border-bottom:1px solid var(--line)}
.tx:last-child{border-bottom:none}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.tx-body{flex:1;min-width:0}
.tx-name{font-size:.875rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx-meta{font-family:var(--mono);font-size:.68rem;color:var(--muted);margin-top:.1rem}
.tx-amt{font-weight:600;font-size:1rem;flex-shrink:0}
.del-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.9rem;opacity:.35;transition:opacity .15s;flex-shrink:0}
.del-btn:hover{opacity:1;color:var(--red)}
.empty{text-align:center;padding:3rem 0;color:var(--muted);font-family:var(--mono);font-size:.78rem;letter-spacing:1px}

/* SEARCH & FILTERS */
.search-bar{display:flex;gap:.6rem;margin-bottom:1rem;align-items:center}
.search-inp{flex:1;background:var(--card);border:1px solid var(--line);border-radius:3px;padding:.6rem .85rem;font-family:var(--font);font-size:.875rem;color:var(--ink);outline:none;transition:border-color .15s}
.search-inp:focus{border-color:var(--ink)}
.search-inp::placeholder{color:var(--muted)}
.filter-row{display:flex;gap:.5rem;margin-bottom:1.25rem;flex-wrap:wrap}
.filter-btn{background:none;border:1px solid var(--line);border-radius:999px;padding:.3rem .75rem;font-family:var(--font);font-size:.75rem;color:var(--muted);cursor:pointer;transition:all .15s;white-space:nowrap}
.filter-btn:hover{border-color:var(--ink);color:var(--ink)}
.filter-btn.on{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.date-filters{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:1rem}

/* ACCOUNTS */
.accounts-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:.75rem;margin-bottom:1.75rem}
.account-card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:1rem;cursor:pointer;transition:all .15s;position:relative}
.account-card:hover{border-color:var(--ink)}
.account-card.selected{border-color:var(--ink);background:var(--cream)}
.account-card.all{border-style:dashed}
.acc-icon{font-size:1.3rem;margin-bottom:.4rem}
.acc-name{font-size:.8rem;font-weight:600;margin-bottom:.2rem}
.acc-bal{font-family:var(--mono);font-size:.75rem}
.acc-del{position:absolute;top:.5rem;right:.5rem;background:none;border:none;color:var(--muted);cursor:pointer;font-size:.75rem;opacity:.4;transition:opacity .15s}
.acc-del:hover{opacity:1;color:var(--red)}

/* BUDGET */
.bud-list{display:flex;flex-direction:column;gap:.85rem}
.bud{background:var(--card);border:1px solid var(--line);border-radius:4px;padding:1rem 1.1rem}
.bud-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.55rem}
.bud-cat{font-size:.875rem;font-weight:600}
.bud-nums{font-family:var(--mono);font-size:.68rem;color:var(--muted)}
.track{height:4px;background:var(--line);border-radius:2px;overflow:hidden}
.fill{height:100%;border-radius:2px;transition:width .4s ease}
.bud-pct{font-family:var(--mono);font-size:.62rem;color:var(--muted);margin-top:.3rem;text-align:right}

/* GOALS */
.goal-card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:1.1rem;margin-bottom:.85rem}
.goal-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem}
.goal-info{flex:1}
.goal-name{font-size:.9rem;font-weight:600;margin-bottom:.15rem}
.goal-detail{font-family:var(--mono);font-size:.68rem;color:var(--muted)}
.goal-pct{font-family:var(--mono);font-size:.7rem;margin-top:.35rem;text-align:right}
.goal-add-btn{background:none;border:1px solid var(--line);border-radius:3px;padding:.3rem .65rem;font-family:var(--font);font-size:.75rem;font-weight:500;color:var(--ink);cursor:pointer;margin-left:.75rem;white-space:nowrap}
.goal-add-btn:hover{background:var(--cream)}

/* DEBTS */
.debt-card{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:1.1rem;margin-bottom:.85rem}
.debt-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem}
.debt-name{font-size:.9rem;font-weight:600}
.debt-amt{font-family:var(--mono);font-size:.9rem;color:var(--red);font-weight:600}
.debt-meta{font-family:var(--mono);font-size:.68rem;color:var(--muted);margin-bottom:.5rem}
.debt-progress{display:flex;justify-content:space-between;font-family:var(--mono);font-size:.65rem;color:var(--muted);margin-top:.35rem}

/* PAYWALL */
.paywall{border:1.5px dashed var(--line);border-radius:4px;padding:2.5rem 1.5rem;text-align:center;margin-top:1.5rem}
.paywall h2{font-weight:700;font-size:1.45rem;margin-bottom:.4rem}
.paywall p{font-size:.83rem;color:var(--muted);max-width:300px;margin:0 auto 1.25rem;line-height:1.6}
.paywall ul{list-style:none;max-width:220px;margin:0 auto 1.25rem;text-align:left;display:flex;flex-direction:column;gap:.35rem}
.paywall ul li{font-size:.8rem;color:var(--muted)}
.paywall ul li::before{content:'→ '}
.btn-pay{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.7rem 1.4rem;font-family:var(--font);font-size:.875rem;font-weight:600;cursor:pointer}

/* MODAL */
.overlay{position:fixed;inset:0;background:rgba(15,15,15,.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:100;animation:fi .2s ease}
.modal{background:var(--paper);border:1.5px solid var(--ink);border-radius:4px;padding:2rem;max-width:440px;width:93%;animation:su .2s ease;max-height:92vh;overflow-y:auto}
.btoggle{display:flex;border:1px solid var(--line);border-radius:3px;overflow:hidden;margin-bottom:1.1rem}
.btoggle button{flex:1;padding:.52rem;border:none;background:none;font-family:var(--font);font-size:.8rem;font-weight:500;color:var(--muted);cursor:pointer;transition:all .15s}
.btoggle button.on{background:var(--ink);color:var(--paper)}
.plans{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-bottom:1.1rem}
.plan{border:1.5px solid var(--line);border-radius:3px;padding:1rem;cursor:pointer;transition:all .15s}
.plan:hover{border-color:var(--ink)}
.plan.sel{border-color:var(--ink);background:var(--cream)}
.plan-name{font-family:var(--mono);font-size:.6rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.35rem}
.plan-price{font-weight:700;font-size:1.5rem;letter-spacing:-.5px}
.plan-price span{font-size:.72rem;color:var(--muted);font-weight:400}
.plan-save{font-family:var(--mono);font-size:.6rem;color:var(--green);margin-top:.15rem}
.plan-feats{list-style:none;margin-top:.65rem;display:flex;flex-direction:column;gap:.28rem}
.plan-feats li{font-size:.72rem;display:flex;gap:.3rem}
.plan-feats li.y{color:var(--ink)}.plan-feats li.y::before{content:'✓';font-weight:700}
.plan-feats li.n{color:var(--muted)}.plan-feats li.n::before{content:'–'}
.order{background:var(--cream);border:1px solid var(--line);border-radius:3px;padding:.85rem 1rem;margin-bottom:.9rem}
.order-row{display:flex;justify-content:space-between;font-size:.8rem;margin-bottom:.22rem}
.order-row .ol{color:var(--muted)}
.order-div{border:none;border-top:1px solid var(--line);margin:.45rem 0}
.order-total{display:flex;justify-content:space-between;font-weight:700;font-size:1.05rem}
.methods{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.9rem}
.method{font-family:var(--mono);font-size:.65rem;background:var(--cream);border:1px solid var(--line);border-radius:2px;padding:.18rem .45rem;color:var(--muted)}
.btn-main{width:100%;padding:.82rem;background:var(--ink);color:var(--paper);border:none;border-radius:3px;font-family:var(--font);font-size:.9rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem}
.btn-main:hover{opacity:.85}
.btn-main:disabled{opacity:.35;cursor:not-allowed}
.btn-ghost{width:100%;padding:.72rem;background:none;color:var(--ink);border:1px solid var(--line);border-radius:3px;font-family:var(--font);font-size:.875rem;font-weight:500;cursor:pointer;margin-top:.45rem}
.btn-demo{background:none;border:none;color:var(--muted);font-family:var(--mono);font-size:.65rem;cursor:pointer;text-decoration:underline;display:block;margin:.65rem auto 0}
.back-btn{background:none;border:1px solid var(--line);border-radius:3px;padding:.33rem .65rem;font-family:var(--font);font-size:.78rem;cursor:pointer;margin-right:.65rem}
.spin{width:34px;height:34px;border:2px solid var(--line);border-top-color:var(--ink);border-radius:50%;animation:rot .8s linear infinite;margin:0 auto 1rem}
.check-icon{font-size:2.8rem;display:block;margin-bottom:.85rem;animation:po .35s ease}

/* FOOTER */
.footer{border-top:1px solid var(--line);padding:2rem 0 5rem;margin-top:3rem}
.footer-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.75rem}
.footer-logo{font-size:1.1rem;font-weight:700}
.footer-logo em{font-style:normal;font-weight:300;color:var(--muted)}
.footer-links{display:flex;flex-wrap:wrap;gap:.5rem 1.25rem}
.footer-links a{font-family:var(--mono);font-size:.65rem;color:var(--muted);text-decoration:none;letter-spacing:.5px;transition:color .15s}
.footer-links a:hover{color:var(--ink)}
.footer-copy{font-family:var(--mono);font-size:.62rem;color:var(--muted)}
.support-btn{position:fixed;bottom:1.5rem;right:1.5rem;background:var(--ink);color:var(--paper);width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;text-decoration:none;z-index:50;transition:transform .2s}
.support-btn:hover{transform:scale(1.08)}

@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes rot{to{transform:rotate(360deg)}}
@keyframes po{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@media(max-width:480px){
  .plans{grid-template-columns:1fr}
  .hero-sub{gap:1.25rem}
  .g3{grid-template-columns:1fr 1fr}
  .accounts-grid{grid-template-columns:1fr 1fr}
}
`;

const CATS = {
  Comida:"#c0392b", Transporte:"#2980b9", Ocio:"#8e44ad",
  Salud:"#27ae60", Servicios:"#d35400", Ropa:"#16a085", Otro:"#7f8c8d"
};
const BUDGETS = [
  {cat:"Comida",limit:500},{cat:"Transporte",limit:200},
  {cat:"Ocio",limit:150},{cat:"Servicios",limit:300}
];
const DEFAULT_ACCOUNTS = [
  {id:"a1", name:"Efectivo",  icon:"💵", color:"#27ae60"},
  {id:"a2", name:"Banco",     icon:"🏦", color:"#2980b9"},
  {id:"a3", name:"Tarjeta",   icon:"💳", color:"#8e44ad"},
];
const SEED_TXS = [
  {id:1,name:"Salario",    cat:"Otro",      amount:2800,  date:"01 Mar",type:"i",accountId:"a2"},
  {id:2,name:"Mercado",    cat:"Comida",    amount:-95,   date:"03 Mar",type:"e",accountId:"a1"},
  {id:3,name:"Bus",        cat:"Transporte",amount:-30,   date:"05 Mar",type:"e",accountId:"a1"},
  {id:4,name:"Freelance",  cat:"Otro",      amount:350,   date:"08 Mar",type:"i",accountId:"a2"},
  {id:5,name:"Restaurante",cat:"Comida",    amount:-42,   date:"10 Mar",type:"e",accountId:"a3"},
  {id:6,name:"Spotify",    cat:"Ocio",      amount:-9.99, date:"12 Mar",type:"e",accountId:"a3"},
];
const SEED_GOALS = [
  {id:"g1",name:"Fondo emergencia",icon:"🛡️",target:5000,saved:1200,color:"#2980b9"},
  {id:"g2",name:"Vacaciones",      icon:"✈️",target:2000,saved:650, color:"#d35400"},
];
const SEED_DEBTS = [
  {id:"d1",name:"Tarjeta Banco",creditor:"Banco",total:3000,paid:800,  rate:18,monthly:150,color:"#c0392b"},
  {id:"d2",name:"Préstamo auto", creditor:"Familiar",total:5000,paid:2000,rate:0, monthly:250,color:"#8e44ad"},
];

const fmt    = n => "$" + Math.abs(n).toLocaleString("es-EC",{minimumFractionDigits:2,maximumFractionDigits:2});
const catColor = c => CATS[c] ?? "#7f8c8d";
const isConfigured = url => !url.includes("TU_");
const todayISO = () => new Date().toISOString().split("T")[0];
const fmtDate  = iso => new Date(iso+"T12:00:00").toLocaleDateString("es-EC",{day:"2-digit",month:"short"});

const save = (k,v) => { try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} };
const load = (k,d) => { try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):d;}catch(e){return d;} };

// ── EXPORT EXCEL ──────────────────────────────────────────────────
function exportExcel(txs, accounts) {
  const header = ["Fecha","Descripción","Categoría","Cuenta","Tipo","Monto"];
  const rows = txs.map(t => [
    t.date,
    t.name,
    t.cat,
    accounts.find(a=>a.id===t.accountId)?.name ?? "General",
    t.type==="i"?"Ingreso":"Gasto",
    t.type==="i"?t.amount:-Math.abs(t.amount)
  ]);
  const csv = [header,...rows].map(r=>r.map(c=>`"${c}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href=url; a.download="fivvy-movimientos.csv"; a.click();
  URL.revokeObjectURL(url);
}

// ── ADD FORM ──────────────────────────────────────────────────────
function AddForm({ form, setForm, onAdd, accounts }) {
  return (
    <div className="form-card">
      <div className="form-lbl">Agregar movimiento</div>
      <div className="g2">
        <input className="inp" placeholder="Descripción"
          value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
          onKeyDown={e=>e.key==="Enter"&&onAdd()}/>
        <input className="inp" type="number" placeholder="0.00"
          value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}
          onKeyDown={e=>e.key==="Enter"&&onAdd()}/>
      </div>
      <div className="g3">
        <select className="inp" value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}>
          {Object.keys(CATS).map(c=><option key={c}>{c}</option>)}
        </select>
        <input className="inp" type="date" value={form.date}
          onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
        <select className="inp" value={form.accountId} onChange={e=>setForm(f=>({...f,accountId:e.target.value}))}>
          {accounts.map(a=><option key={a.id} value={a.id}>{a.icon} {a.name}</option>)}
        </select>
      </div>
      <div className="seg">
        <button className={form.type==="e"?"exp":""} onClick={()=>setForm(f=>({...f,type:"e"}))}>Gasto</button>
        <button className={form.type==="i"?"inc":""} onClick={()=>setForm(f=>({...f,type:"i"}))}>Ingreso</button>
      </div>
      <button className="add-btn" onClick={onAdd}>+ Agregar</button>
    </div>
  );
}

// ── TX ROW ────────────────────────────────────────────────────────
function TxRow({ t, showDel, onDel, accName }) {
  return (
    <div className="tx">
      <div className="dot" style={{background:catColor(t.cat)}}/>
      <div className="tx-body">
        <div className="tx-name">{t.name}</div>
        <div className="tx-meta">{t.cat} · {t.date}{accName ? ` · ${accName}` : ""}</div>
      </div>
      <div className="tx-amt" style={{color:t.type==="i"?"var(--green)":"var(--red)"}}>
        {t.type==="i"?"+":"-"}{fmt(t.amount)}
      </div>
      {showDel && <button className="del-btn" onClick={()=>onDel(t.id)}>✕</button>}
    </div>
  );
}

// ── UPGRADE MODAL ─────────────────────────────────────────────────
function UpgradeModal({ onClose, onSuccess }) {
  const [billing,setBilling] = useState("monthly");
  const [plan,setPlan]       = useState("pro");
  const [step,setStep]       = useState("pick");
  const price  = billing==="annual"?7.99:9.99;
  const total  = billing==="annual"?(price*12).toFixed(2):price.toFixed(2);
  const period = billing==="annual"?"/año":"/mes";
  const url    = billing==="annual"?LS_ANNUAL:LS_MONTHLY;
  const ok     = isConfigured(url);

  return (
    <div className="overlay" onClick={()=>step!=="waiting"&&onClose()}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        {step==="pick"&&<>
          <div style={{fontWeight:700,fontSize:"1.45rem",marginBottom:".3rem"}}>Hazte Pro</div>
          <div style={{fontSize:".82rem",color:"var(--muted)",marginBottom:"1.25rem",lineHeight:1.5}}>Sin contratos · cancela cuando quieras</div>
          <div className="btoggle">
            <button className={billing==="monthly"?"on":""} onClick={()=>setBilling("monthly")}>Mensual</button>
            <button className={billing==="annual"?"on":""} onClick={()=>setBilling("annual")}>Anual — 20% off</button>
          </div>
          <div className="plans">
            <div className={`plan ${plan==="free"?"sel":""}`} onClick={()=>setPlan("free")}>
              <div className="plan-name">Free</div>
              <div className="plan-price">$0<span>/siempre</span></div>
              <ul className="plan-feats">
                <li className="y">Dashboard</li><li className="y">Movimientos</li>
                <li className="y">Cuentas múltiples</li><li className="y">Filtros y búsqueda</li>
                <li className="y">Exportar Excel</li><li className="n">Metas de ahorro</li>
                <li className="n">Deudas</li><li className="n">Análisis IA</li>
              </ul>
            </div>
            <div className={`plan ${plan==="pro"?"sel":""}`} onClick={()=>setPlan("pro")}>
              <div className="plan-name">Pro ★</div>
              <div className="plan-price" style={{color:"var(--gold)"}}>
                ${price.toFixed(2)}<span>{period}</span>
              </div>
              {billing==="annual"&&<div className="plan-save">Ahorras $23.88/año</div>}
              <ul className="plan-feats">
                <li className="y">Todo Free</li><li className="y">Metas de ahorro</li>
                <li className="y">Deudas y préstamos</li><li className="y">Gastos recurrentes</li>
                <li className="y">Análisis con IA</li><li className="y">Alertas de ahorro</li>
                <li className="y">Plan financiero IA</li>
              </ul>
            </div>
          </div>
          {plan==="free"
            ?<button className="btn-main" onClick={onClose}>Continuar gratis</button>
            :<button className="btn-main" onClick={()=>setStep("confirm")}>Continuar →</button>
          }
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        </>}
        {step==="confirm"&&<>
          <div style={{display:"flex",alignItems:"center",marginBottom:"1.25rem"}}>
            <button className="back-btn" onClick={()=>setStep("pick")}>← Volver</button>
            <div style={{fontWeight:700,fontSize:"1.3rem"}}>Confirmar pago</div>
          </div>
          {!ok&&<div style={{background:"#fff8e1",border:"1px solid #ffe082",borderRadius:"3px",padding:".7rem",marginBottom:".85rem",fontSize:".76rem",lineHeight:1.5}}>
            <strong style={{display:"block",color:"#b8860b"}}>⚠️ Configura el procesador de pagos</strong>
            Reemplaza LS_MONTHLY y LS_ANNUAL con tus URLs reales.
          </div>}
          <div className="order">
            <div className="order-row"><span className="ol">Plan</span><span>Pro {billing==="annual"?"Anual":"Mensual"}</span></div>
            <div className="order-row"><span className="ol">Precio</span><span>${price.toFixed(2)}{period}</span></div>
            {billing==="annual"&&<div className="order-row"><span className="ol">Descuento</span><span style={{color:"var(--green)"}}>-$23.88</span></div>}
            <hr className="order-div"/>
            <div className="order-total"><span>Total hoy</span><span>${total} USD</span></div>
          </div>
          <div className="methods">
            {["💳 Visa","💳 Mastercard","🍎 Apple Pay","🔵 PayPal"].map(m=><span key={m} className="method">{m}</span>)}
          </div>
          <button className="btn-main" onClick={()=>{if(!ok)return;window.open(url+"?embed=1","_blank","width=500,height=700");setStep("waiting");}} disabled={!ok}>
            Pagar ${total} USD
          </button>
          <button className="btn-demo" onClick={()=>setStep("success")}>[demo] simular pago exitoso</button>
        </>}
        {step==="waiting"&&<div style={{textAlign:"center",padding:"1.5rem 0"}}>
          <div className="spin"/>
          <div style={{fontWeight:700,fontSize:"1.3rem",marginBottom:".5rem"}}>Esperando pago...</div>
          <button className="btn-main" style={{maxWidth:"240px",margin:"0 auto"}} onClick={()=>setStep("success")}>Ya pagué — Activar Pro ✓</button>
        </div>}
        {step==="success"&&<div style={{textAlign:"center"}}>
          <span className="check-icon">✓</span>
          <div style={{fontWeight:700,fontSize:"1.5rem",marginBottom:".5rem"}}>¡Bienvenido a Pro!</div>
          <div style={{fontSize:".85rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.6}}>Tu suscripción está activa.</div>
          <button className="btn-main" style={{maxWidth:"200px",margin:"0 auto"}} onClick={onSuccess}>Continuar →</button>
        </div>}
      </div>
    </div>
  );
}

// ── GOAL MODAL ────────────────────────────────────────────────────
function GoalModal({ goal, onClose, onSave }) {
  const [name,  setName]   = useState(goal?.name  ?? "");
  const [target,setTarget] = useState(goal?.target ?? "");
  const [saved, setSaved]  = useState(goal?.saved  ?? "");
  const [icon,  setIcon]   = useState(goal?.icon   ?? "🎯");
  const icons = ["🎯","🛡️","✈️","💻","🏠","🚗","📚","💍","🎓","💊"];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:"1.3rem",marginBottom:"1.25rem"}}>
          {goal ? "Editar meta" : "Nueva meta de ahorro"}
        </div>
        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"1rem"}}>
          {icons.map(ic=>(
            <button key={ic} onClick={()=>setIcon(ic)}
              style={{fontSize:"1.3rem",padding:".3rem .4rem",border:`1.5px solid ${ic===icon?"var(--ink)":"var(--line)"}`,borderRadius:"4px",background:"none",cursor:"pointer"}}>
              {ic}
            </button>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:".6rem",marginBottom:"1.25rem"}}>
          <input className="inp" placeholder="Nombre de la meta" value={name} onChange={e=>setName(e.target.value)}/>
          <input className="inp" type="number" placeholder="Meta total ($)" value={target} onChange={e=>setTarget(e.target.value)}/>
          <input className="inp" type="number" placeholder="Ya ahorrado ($)" value={saved} onChange={e=>setSaved(e.target.value)}/>
        </div>
        <button className="btn-main" onClick={()=>{
          if(!name||!target) return;
          onSave({
            id: goal?.id ?? "g"+Date.now(),
            name, icon,
            target:parseFloat(target),
            saved:parseFloat(saved)||0,
            color: goal?.color ?? ["#2980b9","#d35400","#27ae60","#8e44ad"][Math.floor(Math.random()*4)]
          });
          onClose();
        }}>Guardar meta</button>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

// ── DEBT MODAL ────────────────────────────────────────────────────
function DebtModal({ debt, onClose, onSave }) {
  const [name,    setName]    = useState(debt?.name     ?? "");
  const [creditor,setCreditor]= useState(debt?.creditor ?? "");
  const [total,   setTotal]   = useState(debt?.total    ?? "");
  const [paid,    setPaid]    = useState(debt?.paid     ?? "");
  const [rate,    setRate]    = useState(debt?.rate     ?? "");
  const [monthly, setMonthly] = useState(debt?.monthly  ?? "");

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:"1.3rem",marginBottom:"1.25rem"}}>
          {debt ? "Editar deuda" : "Nueva deuda / préstamo"}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:".6rem",marginBottom:"1.25rem"}}>
          <input className="inp" placeholder="Nombre (ej: Tarjeta Visa)" value={name} onChange={e=>setName(e.target.value)}/>
          <input className="inp" placeholder="Acreedor (ej: Banco, familiar)" value={creditor} onChange={e=>setCreditor(e.target.value)}/>
          <div className="g2">
            <input className="inp" type="number" placeholder="Deuda total ($)" value={total} onChange={e=>setTotal(e.target.value)}/>
            <input className="inp" type="number" placeholder="Ya pagado ($)" value={paid} onChange={e=>setPaid(e.target.value)}/>
          </div>
          <div className="g2">
            <input className="inp" type="number" placeholder="Tasa anual (%)" value={rate} onChange={e=>setRate(e.target.value)}/>
            <input className="inp" type="number" placeholder="Cuota mensual ($)" value={monthly} onChange={e=>setMonthly(e.target.value)}/>
          </div>
        </div>
        <button className="btn-main" onClick={()=>{
          if(!name||!total) return;
          onSave({
            id: debt?.id ?? "d"+Date.now(),
            name, creditor,
            total:parseFloat(total),
            paid:parseFloat(paid)||0,
            rate:parseFloat(rate)||0,
            monthly:parseFloat(monthly)||0,
            color: debt?.color ?? "#c0392b"
          });
          onClose();
        }}>Guardar deuda</button>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

// ── ACCOUNT MODAL ─────────────────────────────────────────────────
function AccountModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("💰");
  const icons = ["💰","🏦","💳","💵","📱","🏧","💼","🐷"];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{fontWeight:700,fontSize:"1.3rem",marginBottom:"1.25rem"}}>Nueva cuenta</div>
        <div style={{display:"flex",gap:".5rem",flexWrap:"wrap",marginBottom:"1rem"}}>
          {icons.map(ic=>(
            <button key={ic} onClick={()=>setIcon(ic)}
              style={{fontSize:"1.3rem",padding:".3rem .4rem",border:`1.5px solid ${ic===icon?"var(--ink)":"var(--line)"}`,borderRadius:"4px",background:"none",cursor:"pointer"}}>
              {ic}
            </button>
          ))}
        </div>
        <input className="inp" placeholder="Nombre de la cuenta" value={name} onChange={e=>setName(e.target.value)} style={{marginBottom:"1.25rem"}}/>
        <button className="btn-main" onClick={()=>{
          if(!name) return;
          onSave({id:"a"+Date.now(),name,icon,color:"#7f8c8d"});
          onClose();
        }}>Crear cuenta</button>
        <button className="btn-ghost" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab,      setTab]      = useState("dashboard");
  const [isPro,    setIsPro]    = useState(()=>load("fivvy_pro",false));
  const [txs,      setTxs]      = useState(()=>load("fivvy_txs",SEED_TXS));
  const [accounts, setAccounts] = useState(()=>load("fivvy_accounts",DEFAULT_ACCOUNTS));
  const [goals,    setGoals]    = useState(()=>load("fivvy_goals",SEED_GOALS));
  const [debts,    setDebts]    = useState(()=>load("fivvy_debts",SEED_DEBTS));
  const [nextId,   setNextId]   = useState(()=>load("fivvy_nextid",7));
  const [modal,    setModal]    = useState(null);
  const [selAcc,   setSelAcc]   = useState("all");
  const [search,   setSearch]   = useState("");
  const [filterCat,setFilterCat]= useState("todas");
  const [filterType,setFilterType]=useState("todos");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo,   setDateTo]   = useState("");
  const [form, setForm] = useState({name:"",amount:"",cat:"Comida",type:"e",date:todayISO(),accountId:accounts[0]?.id??"a1"});

  useEffect(()=>{save("fivvy_txs",txs);},[txs]);
  useEffect(()=>{save("fivvy_pro",isPro);},[isPro]);
  useEffect(()=>{save("fivvy_nextid",nextId);},[nextId]);
  useEffect(()=>{save("fivvy_accounts",accounts);},[accounts]);
  useEffect(()=>{save("fivvy_goals",goals);},[goals]);
  useEffect(()=>{save("fivvy_debts",debts);},[debts]);

  const accName = id => accounts.find(a=>a.id===id)?.name ?? "";

  const filteredTxs = useMemo(()=>{
    let r = [...txs];
    if(selAcc!=="all") r=r.filter(t=>t.accountId===selAcc);
    if(search) r=r.filter(t=>t.name.toLowerCase().includes(search.toLowerCase())||t.cat.toLowerCase().includes(search.toLowerCase()));
    if(filterCat!=="todas") r=r.filter(t=>t.cat===filterCat);
    if(filterType!=="todos") r=r.filter(t=>t.type===filterType);
    return r;
  },[txs,selAcc,search,filterCat,filterType]);

  const income   = filteredTxs.filter(t=>t.type==="i").reduce((s,t)=>s+t.amount,0);
  const expenses = filteredTxs.filter(t=>t.type==="e").reduce((s,t)=>s+Math.abs(t.amount),0);
  const balance  = income - expenses;

  const addTx = useCallback(()=>{
    if(!form.name.trim()||!form.amount) return;
    const amount = form.type==="e"?-Math.abs(parseFloat(form.amount)):Math.abs(parseFloat(form.amount));
    const date   = form.date?fmtDate(form.date):fmtDate(todayISO());
    setTxs(p=>[{id:nextId,name:form.name,cat:form.cat,amount,date,type:form.type,accountId:form.accountId},...p]);
    setNextId(n=>n+1);
    setForm(f=>({...f,name:"",amount:"",date:todayISO()}));
  },[form,nextId]);

  const delTx = useCallback(id=>setTxs(p=>p.filter(t=>t.id!==id)),[]);

  const budgets = BUDGETS.map(b=>({
    ...b,
    spent:txs.filter(t=>t.cat===b.cat&&t.type==="e").reduce((s,t)=>s+Math.abs(t.amount),0)
  }));

  const totalDebt = debts.reduce((s,d)=>s+(d.total-d.paid),0);
  const monthlyDebt = debts.reduce((s,d)=>s+d.monthly,0);

  const Paywall = ({title,desc,features}) => (
    <div className="paywall">
      <h2>{title}</h2>
      <p>{desc}</p>
      <ul>{features.map(f=><li key={f}>{f}</li>)}</ul>
      <button className="btn-pay" onClick={()=>setModal("upgrade")}>Ver planes →</button>
    </div>
  );

  const TABS = [
    {id:"dashboard",   label:"Inicio"},
    {id:"movements",   label:"Movimientos"},
    {id:"accounts",    label:"Cuentas"},
    {id:"budget",      label:"Presupuesto"},
    {id:"goals",       label:"Metas",   pro:true},
    {id:"debts",       label:"Deudas",  pro:true},
  ];

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        {/* HEADER */}
        <header className="header">
          <div className="logo">fivvy<em>.</em></div>
          <div style={{display:"flex",gap:".6rem",alignItems:"center"}}>
            <span className={`badge ${isPro?"pro":""}`}>{isPro?"Pro ★":"Free"}</span>
            {!isPro&&<button className="btn-upgrade" onClick={()=>setModal("upgrade")}>Mejorar</button>}
          </div>
        </header>

        {/* NAV */}
        <nav className="nav">
          {TABS.map(t=>(
            <button key={t.id} className={`nav-btn ${tab===t.id?"on":""}`}
              onClick={()=>{if(t.pro&&!isPro){setModal("upgrade");}else{setTab(t.id);}}}>
              {t.label}{t.pro&&!isPro?" 🔒":""}
            </button>
          ))}
        </nav>

        {/* ── DASHBOARD ── */}
        {tab==="dashboard"&&<>
          {/* Account selector */}
          <div className="accounts-grid" style={{marginBottom:"1rem"}}>
            <div className={`account-card all ${selAcc==="all"?"selected":""}`} onClick={()=>setSelAcc("all")}>
              <div className="acc-icon">📊</div>
              <div className="acc-name">Todas</div>
              <div className="acc-bal" style={{color:"var(--muted)"}}>
                {fmt(txs.reduce((s,t)=>s+(t.type==="i"?t.amount:-Math.abs(t.amount)),0))}
              </div>
            </div>
            {accounts.map(a=>{
              const bal = txs.filter(t=>t.accountId===a.id).reduce((s,t)=>s+(t.type==="i"?t.amount:-Math.abs(t.amount)),0);
              return (
                <div key={a.id} className={`account-card ${selAcc===a.id?"selected":""}`} onClick={()=>setSelAcc(a.id)}>
                  <div className="acc-icon">{a.icon}</div>
                  <div className="acc-name">{a.name}</div>
                  <div className="acc-bal" style={{color:bal>=0?"var(--green)":"var(--red)"}}>{fmt(bal)}</div>
                </div>
              );
            })}
          </div>

          <div className="hero">
            <div className="hero-label">{selAcc==="all"?"Balance total":"Balance · "+accName(selAcc)}</div>
            <div className={`hero-amt ${balance>=0?"pos":"neg"}`}>{fmt(balance)}</div>
            <div className="hero-sub">
              <div><div className="stat-label">Ingresos</div><div className="stat-val pos">{fmt(income)}</div></div>
              <div><div className="stat-label">Gastos</div><div className="stat-val neg">{fmt(expenses)}</div></div>
              <div><div className="stat-label">Ahorro</div><div className="stat-val" style={{color:"var(--gold)"}}>{income>0?Math.round((balance/income)*100):0}%</div></div>
            </div>
          </div>

          <AddForm form={form} setForm={setForm} onAdd={addTx} accounts={accounts}/>

          <div className="sec-lbl">Recientes</div>
          <div className="tx-list">
            {filteredTxs.length===0
              ?<div className="empty">sin movimientos</div>
              :filteredTxs.slice(0,5).map(t=><TxRow key={t.id} t={t} showDel={false} onDel={delTx} accName={accounts.length>1?accName(t.accountId):""}/>)
            }
          </div>
        </>}

        {/* ── MOVIMIENTOS ── */}
        {tab==="movements"&&<>
          <AddForm form={form} setForm={setForm} onAdd={addTx} accounts={accounts}/>

          {/* Search */}
          <div className="search-bar">
            <input className="search-inp" placeholder="🔍 Buscar movimientos..." value={search} onChange={e=>setSearch(e.target.value)}/>
            <button className="filter-btn" onClick={()=>exportExcel(filteredTxs,accounts)} title="Exportar Excel">
              ⬇ Excel
            </button>
          </div>

          {/* Filters */}
          <div className="filter-row">
            {["todos","i","e"].map(f=>(
              <button key={f} className={`filter-btn ${filterType===f?"on":""}`}
                onClick={()=>setFilterType(f)}>
                {f==="todos"?"Todos":f==="i"?"Ingresos":"Gastos"}
              </button>
            ))}
            <div style={{width:"1px",background:"var(--line)",margin:"0 .25rem"}}/>
            {["todas",...Object.keys(CATS)].map(c=>(
              <button key={c} className={`filter-btn ${filterCat===c?"on":""}`}
                onClick={()=>setFilterCat(c)}>
                {c==="todas"?"Todas":c}
              </button>
            ))}
          </div>

          <div className="sec-lbl">
            <span>{filteredTxs.length} registros</span>
            {(search||filterCat!=="todas"||filterType!=="todos")&&
              <button className="filter-btn" onClick={()=>{setSearch("");setFilterCat("todas");setFilterType("todos");}}>
                Limpiar filtros ✕
              </button>
            }
          </div>
          <div className="tx-list">
            {filteredTxs.length===0
              ?<div className="empty">sin resultados</div>
              :filteredTxs.map(t=><TxRow key={t.id} t={t} showDel={true} onDel={delTx} accName={accounts.length>1?accName(t.accountId):""}/>)
            }
          </div>
        </>}

        {/* ── CUENTAS ── */}
        {tab==="accounts"&&<>
          <div className="sec-lbl" style={{marginBottom:"1.25rem"}}>
            Mis cuentas
            <button className="filter-btn" onClick={()=>setModal("addAccount")}>+ Nueva cuenta</button>
          </div>
          <div className="accounts-grid" style={{marginBottom:"2rem"}}>
            {accounts.map(a=>{
              const bal  = txs.filter(t=>t.accountId===a.id).reduce((s,t)=>s+(t.type==="i"?t.amount:-Math.abs(t.amount)),0);
              const inc  = txs.filter(t=>t.accountId===a.id&&t.type==="i").reduce((s,t)=>s+t.amount,0);
              const exp  = txs.filter(t=>t.accountId===a.id&&t.type==="e").reduce((s,t)=>s+Math.abs(t.amount),0);
              return (
                <div key={a.id} className="account-card" style={{cursor:"default"}}>
                  {accounts.length>1&&
                    <button className="acc-del" onClick={()=>setAccounts(p=>p.filter(x=>x.id!==a.id))}>✕</button>
                  }
                  <div className="acc-icon" style={{fontSize:"1.6rem"}}>{a.icon}</div>
                  <div className="acc-name" style={{fontSize:".9rem",marginBottom:".4rem"}}>{a.name}</div>
                  <div style={{fontFamily:"var(--mono)",fontSize:".78rem",color:bal>=0?"var(--green)":"var(--red)",fontWeight:600,marginBottom:".5rem"}}>{fmt(bal)}</div>
                  <div style={{fontFamily:"var(--mono)",fontSize:".65rem",color:"var(--muted)"}}>
                    ↑ {fmt(inc)} &nbsp; ↓ {fmt(exp)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="sec-lbl">Movimientos por cuenta</div>
          <div className="filter-row">
            <button className={`filter-btn ${selAcc==="all"?"on":""}`} onClick={()=>setSelAcc("all")}>Todas</button>
            {accounts.map(a=>(
              <button key={a.id} className={`filter-btn ${selAcc===a.id?"on":""}`} onClick={()=>setSelAcc(a.id)}>
                {a.icon} {a.name}
              </button>
            ))}
          </div>
          <div className="tx-list">
            {(selAcc==="all"?txs:txs.filter(t=>t.accountId===selAcc)).slice(0,10).map(t=>(
              <TxRow key={t.id} t={t} showDel={true} onDel={delTx} accName={accName(t.accountId)}/>
            ))}
          </div>
        </>}

        {/* ── PRESUPUESTO ── */}
        {tab==="budget"&&<>
          <div className="sec-lbl" style={{marginBottom:"1.25rem"}}>Presupuesto · este mes</div>
          <div className="bud-list">
            {budgets.map(b=>{
              const pct=Math.min((b.spent/b.limit)*100,100);
              const color=pct>90?"var(--red)":pct>70?"var(--gold)":catColor(b.cat);
              return(
                <div key={b.cat} className="bud">
                  <div className="bud-head">
                    <div className="bud-cat">{b.cat}</div>
                    <div className="bud-nums">{fmt(b.spent)} / {fmt(b.limit)}</div>
                  </div>
                  <div className="track"><div className="fill" style={{width:`${pct}%`,background:color}}/></div>
                  <div className="bud-pct" style={{color}}>{pct.toFixed(0)}%{pct>90?" · límite alcanzado":""}</div>
                </div>
              );
            })}
          </div>
        </>}

        {/* ── METAS ── */}
        {tab==="goals"&&isPro&&<>
          <div className="sec-lbl" style={{marginBottom:"1.25rem"}}>
            Metas de ahorro
            <button className="filter-btn" onClick={()=>setModal("addGoal")}>+ Nueva meta</button>
          </div>
          {goals.length===0&&<div className="empty">sin metas aún</div>}
          {goals.map(g=>{
            const pct=Math.min((g.saved/g.target)*100,100);
            const remaining=g.target-g.saved;
            return(
              <div key={g.id} className="goal-card">
                <div className="goal-head">
                  <div style={{fontSize:"1.5rem",marginRight:".75rem"}}>{g.icon}</div>
                  <div className="goal-info">
                    <div className="goal-name">{g.name}</div>
                    <div className="goal-detail">{fmt(g.saved)} ahorrado de {fmt(g.target)}</div>
                  </div>
                  <div style={{display:"flex",gap:".4rem"}}>
                    <button className="goal-add-btn" onClick={()=>{
                      const n=parseFloat(prompt("¿Cuánto agregar al ahorro?"));
                      if(!isNaN(n)&&n>0) setGoals(p=>p.map(x=>x.id===g.id?{...x,saved:Math.min(x.saved+n,x.target)}:x));
                    }}>+ Ahorrar</button>
                    <button className="del-btn" style={{opacity:.4}} onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))}>✕</button>
                  </div>
                </div>
                <div className="track"><div className="fill" style={{width:`${pct}%`,background:g.color}}/></div>
                <div className="goal-pct" style={{color:g.color}}>
                  {pct.toFixed(0)}%{pct>=100?" · ✅ Completada":` · Faltan ${fmt(remaining)}`}
                </div>
              </div>
            );
          })}
        </>}

        {/* ── DEUDAS ── */}
        {tab==="debts"&&isPro&&<>
          <div className="sec-lbl" style={{marginBottom:"1.25rem"}}>
            Deudas y préstamos
            <button className="filter-btn" onClick={()=>setModal("addDebt")}>+ Nueva deuda</button>
          </div>

          {/* Resumen */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".75rem",marginBottom:"1.75rem"}}>
            <div className="form-card" style={{marginBottom:0}}>
              <div className="stat-label">Deuda total pendiente</div>
              <div className="stat-val neg" style={{fontSize:"1.5rem"}}>{fmt(totalDebt)}</div>
            </div>
            <div className="form-card" style={{marginBottom:0}}>
              <div className="stat-label">Cuotas mensuales</div>
              <div className="stat-val" style={{fontSize:"1.5rem",color:"var(--gold)"}}>{fmt(monthlyDebt)}</div>
            </div>
          </div>

          {debts.length===0&&<div className="empty">sin deudas registradas</div>}
          {debts.map(d=>{
            const pending=d.total-d.paid;
            const pct=Math.min((d.paid/d.total)*100,100);
            return(
              <div key={d.id} className="debt-card">
                <div className="debt-head">
                  <div>
                    <div className="debt-name">{d.name}</div>
                    <div className="debt-meta">{d.creditor}{d.rate>0?` · ${d.rate}% anual`:""}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                    <div className="debt-amt">{fmt(pending)}</div>
                    <button className="del-btn" style={{opacity:.4}} onClick={()=>setDebts(p=>p.filter(x=>x.id!==d.id))}>✕</button>
                  </div>
                </div>
                <div className="track"><div className="fill" style={{width:`${pct}%`,background:d.color}}/></div>
                <div className="debt-progress">
                  <span>Pagado: {fmt(d.paid)} ({pct.toFixed(0)}%)</span>
                  <span>Cuota: {fmt(d.monthly)}/mes</span>
                </div>
                <button className="goal-add-btn" style={{marginTop:".75rem"}} onClick={()=>{
                  const n=parseFloat(prompt("¿Cuánto pagaste?"));
                  if(!isNaN(n)&&n>0) setDebts(p=>p.map(x=>x.id===d.id?{...x,paid:Math.min(x.paid+n,x.total)}:x));
                }}>Registrar pago</button>
              </div>
            );
          })}
        </>}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-logo">fivvy<em>.</em></div>
            <div className="footer-links">
              <a href="/pricing.html">Precios</a>
              <a href="/support.html">Soporte</a>
              <a href="/terms.html">Términos</a>
              <a href="/privacy.html">Privacidad</a>
              <a href="/refund.html">Reembolsos</a>
            </div>
          </div>
          <div className="footer-copy">© 2026 fivvy · Todos los derechos reservados</div>
        </footer>
      </div>

      {/* Botón soporte */}
      <a href="/support.html" className="support-btn" title="Soporte">💬</a>

      {/* MODALS */}
      {modal==="upgrade"&&<UpgradeModal onClose={()=>setModal(null)} onSuccess={()=>{setIsPro(true);setModal(null);}}/>}
      {modal==="addGoal"&&<GoalModal onClose={()=>setModal(null)} onSave={g=>setGoals(p=>[...p,g])}/>}
      {modal==="addDebt"&&<DebtModal onClose={()=>setModal(null)} onSave={d=>setDebts(p=>[...p,d])}/>}
      {modal==="addAccount"&&<AccountModal onClose={()=>setModal(null)} onSave={a=>setAccounts(p=>[...p,a])}/>}
    </>
  );
}
