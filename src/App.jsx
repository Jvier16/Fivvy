import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────
// 🍋 LEMON SQUEEZY — reemplaza con tus URLs
const LS_MONTHLY = "https://TU_TIENDA.lemonsqueezy.com/checkout/buy/TU_VARIANT_MENSUAL";
const LS_ANNUAL  = "https://TU_TIENDA.lemonsqueezy.com/checkout/buy/TU_VARIANT_ANUAL";
// ─────────────────────────────────────────────────────────────────

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
.wrap{max-width:720px;margin:0 auto;padding:0 1.25rem 4rem}
.header{display:flex;align-items:center;justify-content:space-between;padding:1.75rem 0 1.5rem;border-bottom:2px solid var(--ink)}
.logo{font-family:var(--font);font-size:1.7rem;font-weight:700;letter-spacing:-0.5px}
.logo em{font-style:normal;font-weight:300;color:var(--muted)}
.badge{font-family:var(--mono);font-size:.65rem;letter-spacing:1.5px;text-transform:uppercase;padding:.3rem .65rem;border:1px solid var(--line);border-radius:2px;color:var(--muted)}
.badge.pro{border-color:var(--gold);color:var(--gold);background:rgba(184,134,11,.06)}
.btn-upgrade{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.4rem .85rem;font-family:var(--font);font-size:.8rem;font-weight:600;cursor:pointer}
.nav{display:flex;border-bottom:1px solid var(--line);margin-bottom:1.75rem}
.nav-btn{flex:1;padding:.9rem .5rem;background:none;border:none;border-bottom:2px solid transparent;font-family:var(--font);font-size:.82rem;font-weight:500;color:var(--muted);cursor:pointer;transition:all .15s;margin-bottom:-1px}
.nav-btn:hover{color:var(--ink)}
.nav-btn.on{color:var(--ink);border-bottom-color:var(--ink)}
.hero{padding:2.5rem 0 2rem;text-align:center;border-bottom:1px solid var(--line);margin-bottom:2rem}
.hero-label{font-family:var(--mono);font-size:.7rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.hero-amt{font-family:var(--font);font-weight:700;font-size:clamp(2.8rem,8vw,4.5rem);letter-spacing:-2px;line-height:1}
.pos{color:var(--green)}.neg{color:var(--red)}
.hero-sub{display:flex;justify-content:center;gap:2.5rem;margin-top:1.25rem}
.stat-label{font-family:var(--mono);font-size:.62rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.2rem}
.stat-val{font-family:var(--font);font-weight:600;font-size:1.35rem;letter-spacing:-.5px}
.form-card{background:var(--card);border:1px solid var(--line);border-radius:4px;padding:1.25rem;margin-bottom:2rem}
.form-lbl{font-family:var(--mono);font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.inp{width:100%;background:var(--paper);border:1px solid var(--line);border-radius:3px;padding:.6rem .75rem;font-family:var(--font);font-size:.875rem;color:var(--ink);outline:none;transition:border-color .15s}
.inp:focus{border-color:var(--ink)}
.inp::placeholder{color:var(--muted)}
.inp option{background:var(--paper)}
.seg{display:flex;border:1px solid var(--line);border-radius:3px;overflow:hidden}
.seg button{flex:1;padding:.6rem;border:none;background:none;font-family:var(--font);font-size:.8rem;font-weight:500;color:var(--muted);cursor:pointer;transition:all .15s}
.seg button.exp{background:var(--red);color:#fff}
.seg button.inc{background:var(--green);color:#fff}
.add-btn{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.6rem 1.1rem;font-family:var(--font);font-size:.875rem;font-weight:600;cursor:pointer;white-space:nowrap;width:100%;margin-top:.6rem}
.sec-lbl{font-family:var(--mono);font-size:.68rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);margin-bottom:.75rem}
.tx-list{display:flex;flex-direction:column}
.tx{display:flex;align-items:center;gap:.9rem;padding:.9rem 0;border-bottom:1px solid var(--line)}
.tx:last-child{border-bottom:none}
.dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.tx-body{flex:1;min-width:0}
.tx-name{font-size:.875rem;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.tx-meta{font-family:var(--mono);font-size:.68rem;color:var(--muted);margin-top:.1rem}
.tx-amt{font-family:var(--font);font-weight:600;font-size:1rem;flex-shrink:0}
.del-btn{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.9rem;opacity:.35;transition:opacity .15s;flex-shrink:0}
.del-btn:hover{opacity:1;color:var(--red)}
.empty{text-align:center;padding:3rem 0;color:var(--muted);font-family:var(--mono);font-size:.78rem;letter-spacing:1px}
.bud-list{display:flex;flex-direction:column;gap:.85rem}
.bud{background:var(--card);border:1px solid var(--line);border-radius:4px;padding:1rem 1.1rem}
.bud-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.55rem}
.bud-cat{font-size:.875rem;font-weight:600}
.bud-nums{font-family:var(--mono);font-size:.68rem;color:var(--muted)}
.track{height:4px;background:var(--line);border-radius:2px;overflow:hidden}
.fill{height:100%;border-radius:2px;transition:width .4s ease}
.bud-pct{font-family:var(--mono);font-size:.62rem;color:var(--muted);margin-top:.3rem;text-align:right}
.paywall{border:1.5px dashed var(--line);border-radius:4px;padding:2.5rem 1.5rem;text-align:center;margin-top:1.5rem}
.paywall h2{font-family:var(--font);font-weight:700;font-size:1.45rem;margin-bottom:.4rem}
.paywall p{font-size:.83rem;color:var(--muted);max-width:300px;margin:0 auto 1.25rem;line-height:1.6}
.paywall ul{list-style:none;max-width:220px;margin:0 auto 1.25rem;text-align:left;display:flex;flex-direction:column;gap:.35rem}
.paywall ul li{font-size:.8rem;color:var(--muted)}
.paywall ul li::before{content:'→ '}
.btn-pay{background:var(--ink);color:var(--paper);border:none;border-radius:3px;padding:.7rem 1.4rem;font-family:var(--font);font-size:.875rem;font-weight:600;cursor:pointer}
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
.plan-price{font-family:var(--font);font-weight:700;font-size:1.5rem;letter-spacing:-.5px}
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
.order-total{display:flex;justify-content:space-between;font-family:var(--font);font-weight:700;font-size:1.05rem}
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
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes su{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes rot{to{transform:rotate(360deg)}}
@keyframes po{from{transform:scale(.3);opacity:0}to{transform:scale(1);opacity:1}}
@media(max-width:480px){
  .plans{grid-template-columns:1fr}
  .hero-sub{gap:1.5rem}
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
const SEED = [
  {id:1,name:"Salario",    cat:"Otro",      amount:2800,  date:"01 Mar",type:"i"},
  {id:2,name:"Mercado",    cat:"Comida",    amount:-95,   date:"03 Mar",type:"e"},
  {id:3,name:"Bus",        cat:"Transporte",amount:-30,   date:"05 Mar",type:"e"},
  {id:4,name:"Freelance",  cat:"Otro",      amount:350,   date:"08 Mar",type:"i"},
  {id:5,name:"Restaurante",cat:"Comida",    amount:-42,   date:"10 Mar",type:"e"},
  {id:6,name:"Spotify",    cat:"Ocio",      amount:-9.99, date:"12 Mar",type:"e"},
];

const fmt = n => "$" + Math.abs(n).toLocaleString("es-EC",{minimumFractionDigits:2,maximumFractionDigits:2});
const catColor = c => CATS[c] ?? "#7f8c8d";
const isConfigured = url => !url.includes("TU_");
const todayISO = () => new Date().toISOString().split("T")[0];
const fmtDate = iso => new Date(iso + "T12:00:00").toLocaleDateString("es-EC",{day:"2-digit",month:"short"});

const save = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} };
const load = (key, def)  => { try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; } catch(e) { return def; } };

// ── ADD FORM ──────────────────────────────────────────────────────
function AddForm({ form, setForm, onAdd }) {
  return (
    <div className="form-card">
      <div className="form-lbl">Agregar movimiento</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 100px",gap:".6rem",marginBottom:".6rem"}}>
        <input className="inp" placeholder="Descripción"
          value={form.name}
          onChange={e => setForm(f => ({...f, name: e.target.value}))}
          onKeyDown={e => e.key === "Enter" && onAdd()}
        />
        <input className="inp" type="number" placeholder="0.00"
          value={form.amount}
          onChange={e => setForm(f => ({...f, amount: e.target.value}))}
          onKeyDown={e => e.key === "Enter" && onAdd()}
        />
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:".6rem",marginBottom:".6rem"}}>
        <select className="inp" value={form.cat} onChange={e => setForm(f => ({...f, cat: e.target.value}))}>
          {Object.keys(CATS).map(c => <option key={c}>{c}</option>)}
        </select>
        <input className="inp" type="date"
          value={form.date}
          onChange={e => setForm(f => ({...f, date: e.target.value}))}
        />
      </div>

      <div className="seg" style={{marginBottom:".6rem"}}>
        <button className={form.type === "e" ? "exp" : ""} onClick={() => setForm(f => ({...f, type: "e"}))}>Gasto</button>
        <button className={form.type === "i" ? "inc" : ""} onClick={() => setForm(f => ({...f, type: "i"}))}>Ingreso</button>
      </div>

      <button className="add-btn" onClick={onAdd}>+ Agregar</button>
    </div>
  );
}

// ── TX ROW ────────────────────────────────────────────────────────
function TxRow({ t, showDel, onDel }) {
  return (
    <div className="tx">
      <div className="dot" style={{background: catColor(t.cat)}}/>
      <div className="tx-body">
        <div className="tx-name">{t.name}</div>
        <div className="tx-meta">{t.cat} · {t.date}</div>
      </div>
      <div className="tx-amt" style={{color: t.type === "i" ? "var(--green)" : "var(--red)"}}>
        {t.type === "i" ? "+" : "-"}{fmt(t.amount)}
      </div>
      {showDel && <button className="del-btn" onClick={() => onDel(t.id)}>✕</button>}
    </div>
  );
}

// ── UPGRADE MODAL ─────────────────────────────────────────────────
function UpgradeModal({ onClose, onSuccess }) {
  const [billing, setBilling] = useState("monthly");
  const [plan,    setPlan]    = useState("pro");
  const [step,    setStep]    = useState("pick");

  const price  = billing === "annual" ? 79.99 : 9.99;
  const total  = billing === "annual" ? (price * 12).toFixed(2) : price.toFixed(2);
  const period = billing === "annual" ? "/año" : "/mes";
  const url    = billing === "annual" ? LS_ANNUAL : LS_MONTHLY;
  const ok     = isConfigured(url);

  const openCheckout = () => {
    if (!ok) return;
    window.open(url + "?embed=1", "_blank", "width=500,height=700");
    setStep("waiting");
  };

  return (
    <div className="overlay" onClick={() => step !== "waiting" && onClose()}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {step === "pick" && <>
          <div style={{fontWeight:700,fontSize:"1.45rem",marginBottom:".3rem"}}>Hazte Pro</div>
          <div style={{fontSize:".82rem",color:"var(--muted)",marginBottom:"1.25rem",lineHeight:1.5}}>Sin contratos · cancela cuando quieras</div>
          <div className="btoggle">
            <button className={billing === "monthly" ? "on" : ""} onClick={() => setBilling("monthly")}>Mensual</button>
            <button className={billing === "annual"  ? "on" : ""} onClick={() => setBilling("annual")}>Anual — 33% off</button>
          </div>
          <div className="plans">
            <div className={`plan ${plan === "free" ? "sel" : ""}`} onClick={() => setPlan("free")}>
              <div className="plan-name">Free</div>
              <div className="plan-price">$0<span>/siempre</span></div>
              <ul className="plan-feats">
                <li className="y">Dashboard</li>
                <li className="y">Movimientos</li>
                <li className="y">Presupuestos</li>
                <li className="n">Reportes</li>
                <li className="n">Metas</li>
              </ul>
            </div>
            <div className={`plan ${plan === "pro" ? "sel" : ""}`} onClick={() => setPlan("pro")}>
              <div className="plan-name">Pro ★</div>
              <div className="plan-price" style={{color:"var(--gold)"}}>
                ${price.toFixed(2)}<span>{period}</span>
              </div>
              {billing === "annual" && <div className="plan-save">Ahorras $39.89/año</div>}
              <ul className="plan-feats">
                <li className="y">Todo Free</li>
                <li className="y">Reportes</li>
                <li className="y">Metas ahorro</li>
                <li className="y">Exportar datos</li>
              </ul>
            </div>
          </div>
          {plan === "free"
            ? <button className="btn-main" onClick={onClose}>Continuar gratis</button>
            : <button className="btn-main" onClick={() => setStep("confirm")}>Continuar →</button>
          }
          <button className="btn-ghost" onClick={onClose}>Cancelar</button>
        </>}

        {step === "confirm" && <>
          <div style={{display:"flex",alignItems:"center",marginBottom:"1.25rem"}}>
            <button className="back-btn" onClick={() => setStep("pick")}>← Volver</button>
            <div style={{fontWeight:700,fontSize:"1.3rem"}}>Confirmar pago</div>
          </div>
          {!ok && (
            <div style={{background:"#fff8e1",border:"1px solid #ffe082",borderRadius:"3px",padding:".7rem .9rem",marginBottom:".85rem",fontSize:".76rem",lineHeight:1.5}}>
              <strong style={{display:"block",marginBottom:".15rem",color:"#b8860b"}}>⚠️ Configura Lemon Squeezy</strong>
              Reemplaza LS_MONTHLY y LS_ANNUAL con tus URLs reales.
            </div>
          )}
          <div className="order">
            <div className="order-row"><span className="ol">Plan</span><span>Pro {billing === "annual" ? "Anual" : "Mensual"}</span></div>
            <div className="order-row"><span className="ol">Precio</span><span>${price.toFixed(2)}{period}</span></div>
            {billing === "annual" && <div className="order-row"><span className="ol">Descuento</span><span style={{color:"var(--green)"}}>-$23.88</span></div>}
            <hr className="order-div"/>
            <div className="order-total"><span>Total hoy</span><span>${total} USD</span></div>
          </div>
          <div className="methods">
            {["💳 Visa","💳 Mastercard","🍎 Apple Pay","🔵 PayPal"].map(m => (
              <span key={m} className="method">{m}</span>
            ))}
          </div>
          <button className="btn-main" onClick={openCheckout} disabled={!ok}>
            🍋 Pagar con Lemon Squeezy
          </button>
          <button className="btn-demo" onClick={() => setStep("success")}>[demo] simular pago exitoso</button>
        </>}

        {step === "waiting" && (
          <div style={{textAlign:"center",padding:"1.5rem 0"}}>
            <div className="spin"/>
            <div style={{fontWeight:700,fontSize:"1.3rem",marginBottom:".5rem"}}>Esperando pago...</div>
            <div style={{fontSize:".82rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.6}}>
              Completa el pago en la ventana de Lemon Squeezy.
            </div>
            <button className="btn-main" style={{maxWidth:"240px",margin:"0 auto"}} onClick={() => setStep("success")}>
              Ya pagué — Activar Pro ✓
            </button>
          </div>
        )}

        {step === "success" && (
          <div style={{textAlign:"center"}}>
            <span className="check-icon">✓</span>
            <div style={{fontWeight:700,fontSize:"1.5rem",marginBottom:".5rem"}}>¡Bienvenido a Pro!</div>
            <div style={{fontSize:".85rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.6}}>
              Tu suscripción está activa. Recibirás un email de Lemon Squeezy.
            </div>
            <button className="btn-main" style={{maxWidth:"200px",margin:"0 auto"}} onClick={onSuccess}>
              Continuar →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [tab,    setTab]    = useState("dashboard");
  const [isPro,  setIsPro]  = useState(() => load("fivvy_pro", false));
  const [txs,    setTxs]    = useState(() => load("fivvy_txs", SEED));
  const [nextId, setNextId] = useState(() => load("fivvy_nextid", 7));
  const [modal,  setModal]  = useState(false);
  const [form,   setForm]   = useState({name:"", amount:"", cat:"Comida", type:"e", date: todayISO()});

  useEffect(() => { save("fivvy_txs",    txs);    }, [txs]);
  useEffect(() => { save("fivvy_pro",    isPro);  }, [isPro]);
  useEffect(() => { save("fivvy_nextid", nextId); }, [nextId]);

  const income   = txs.filter(t => t.type === "i").reduce((s,t) => s + t.amount, 0);
  const expenses = txs.filter(t => t.type === "e").reduce((s,t) => s + Math.abs(t.amount), 0);
  const balance  = income - expenses;

  const addTx = useCallback(() => {
    if (!form.name.trim() || !form.amount) return;
    const amount = form.type === "e"
      ? -Math.abs(parseFloat(form.amount))
      :  Math.abs(parseFloat(form.amount));
    const date = form.date ? fmtDate(form.date) : fmtDate(todayISO());
    setTxs(p => [{id:nextId, name:form.name, cat:form.cat, amount, date, type:form.type}, ...p]);
    setNextId(n => n + 1);
    setForm(f => ({...f, name:"", amount:"", date: todayISO()}));
  }, [form, nextId]);

  const delTx = useCallback(id => setTxs(p => p.filter(t => t.id !== id)), []);

  const budgets = BUDGETS.map(b => ({
    ...b,
    spent: txs.filter(t => t.cat === b.cat && t.type === "e").reduce((s,t) => s + Math.abs(t.amount), 0)
  }));

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        <header className="header">
          <div className="logo">fivvy<em>.</em></div>
          <div style={{display:"flex",gap:".6rem",alignItems:"center"}}>
            <span className={`badge ${isPro ? "pro" : ""}`}>{isPro ? "Pro ★" : "Free"}</span>
            {!isPro && <button className="btn-upgrade" onClick={() => setModal(true)}>Mejorar</button>}
          </div>
        </header>

        <nav className="nav">
          {[
            {id:"dashboard", label:"Inicio"},
            {id:"movements", label:"Movimientos"},
            {id:"budget",    label:"Presupuesto"},
          ].map(t => (
            <button key={t.id} className={`nav-btn ${tab === t.id ? "on" : ""}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>

        {/* ── DASHBOARD ── */}
        {tab === "dashboard" && <>
          <div className="hero">
            <div className="hero-label">Balance del mes</div>
            <div className={`hero-amt ${balance >= 0 ? "pos" : "neg"}`}>{fmt(balance)}</div>
            <div className="hero-sub">
              <div>
                <div className="stat-label">Ingresos</div>
                <div className="stat-val pos">{fmt(income)}</div>
              </div>
              <div>
                <div className="stat-label">Gastos</div>
                <div className="stat-val neg">{fmt(expenses)}</div>
              </div>
              <div>
                <div className="stat-label">Ahorro</div>
                <div className="stat-val" style={{color:"var(--gold)"}}>
                  {income > 0 ? Math.round((balance/income)*100) : 0}%
                </div>
              </div>
            </div>
          </div>

          <AddForm form={form} setForm={setForm} onAdd={addTx}/>

          <div className="sec-lbl">Recientes</div>
          <div className="tx-list">
            {txs.length === 0
              ? <div className="empty">sin movimientos aún</div>
              : txs.slice(0,5).map(t => <TxRow key={t.id} t={t} showDel={false} onDel={delTx}/>)
            }
          </div>
        </>}

        {/* ── MOVIMIENTOS ── */}
        {tab === "movements" && <>
          <AddForm form={form} setForm={setForm} onAdd={addTx}/>
          <div className="sec-lbl">{txs.length} registros</div>
          <div className="tx-list">
            {txs.length === 0
              ? <div className="empty">sin movimientos aún</div>
              : txs.map(t => <TxRow key={t.id} t={t} showDel={true} onDel={delTx}/>)
            }
          </div>
        </>}

        {/* ── PRESUPUESTO ── */}
        {tab === "budget" && <>
          <div className="sec-lbl">Presupuesto · este mes</div>
          <div className="bud-list">
            {budgets.map(b => {
              const pct   = Math.min((b.spent/b.limit)*100, 100);
              const color = pct > 90 ? "var(--red)" : pct > 70 ? "var(--gold)" : catColor(b.cat);
              return (
                <div key={b.cat} className="bud">
                  <div className="bud-head">
                    <div className="bud-cat">{b.cat}</div>
                    <div className="bud-nums">{fmt(b.spent)} / {fmt(b.limit)}</div>
                  </div>
                  <div className="track">
                    <div className="fill" style={{width:`${pct}%`, background:color}}/>
                  </div>
                  <div className="bud-pct" style={{color}}>
                    {pct.toFixed(0)}%{pct > 90 ? " · límite alcanzado" : ""}
                  </div>
                </div>
              );
            })}
          </div>
          {!isPro && (
            <div className="paywall">
              <h2>Presupuestos personalizados</h2>
              <p>Crea tus propias categorías y ajusta tus límites.</p>
              <ul>
                <li>Categorías a medida</li>
                <li>Alertas por email</li>
                <li>Historial mensual</li>
              </ul>
              <button className="btn-pay" onClick={() => setModal(true)}>Ver planes →</button>
            </div>
          )}
        </>}

      </div>

      {modal && (
        <UpgradeModal
          onClose={() => setModal(false)}
          onSuccess={() => { setIsPro(true); setModal(false); }}
        />
      )}
    </>
  );
}
