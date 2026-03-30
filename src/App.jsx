import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 🍋 LEMON SQUEEZY CONFIG
// Reemplaza estas URLs con las de tu cuenta en lemonsqueezy.com
// Cómo obtenerlas: Dashboard → Tu Producto → "Share" → "Checkout URL"
// ─────────────────────────────────────────────────────────────────────────────
const LS_CONFIG = {
  monthly: {
    checkoutUrl: "https://fivvy.lemonsqueezy.com/checkout/buy/e7428f00-c313-4a01-9740-9a6dcd493540",
    price: "$9.99",
    period: "/mes",
    label: "Mensual",
  },
  annual: {
    checkoutUrl: "https://fivvy.lemonsqueezy.com/checkout/buy/1e50049c-8a5e-47f5-aa64-f805bfdf3ce2",
    price: "$79.99",
    period: "/año",
    label: "Anual — ahorra 33%",
  },
};
// ─────────────────────────────────────────────────────────────────────────────

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');`;

const style = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0a0a0f; --surface: #12121a; --surface2: #1a1a26;
    --border: rgba(255,255,255,0.07); --accent: #c8ff00;
    --text: #f0f0f5; --muted: #6b6b80; --danger: #ff4d6d;
    --success: #00e5a0; --gold: #ffd166;
  }
  body { background: var(--bg); color: var(--text); font-family: 'Sora', sans-serif; min-height: 100vh; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  .nav { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; background: rgba(10,10,15,0.9); backdrop-filter: blur(16px); }
  .logo { font-family: 'DM Serif Display', serif; font-size: 1.5rem; color: var(--accent); }
  .logo span { color: var(--text); }
  .nav-right { display: flex; gap: 0.75rem; align-items: center; }
  .plan-badge { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 1px; padding: 0.3rem 0.7rem; border-radius: 999px; border: 1px solid var(--border); color: var(--muted); text-transform: uppercase; }
  .plan-badge.premium { border-color: var(--gold); color: var(--gold); }

  .tabs { display: flex; gap: 0.25rem; padding: 1.5rem 2rem 0; border-bottom: 1px solid var(--border); overflow-x: auto; }
  .tab { padding: 0.6rem 1.25rem; border-radius: 8px 8px 0 0; background: none; border: 1px solid transparent; border-bottom: none; color: var(--muted); cursor: pointer; font-family: 'Sora', sans-serif; font-size: 0.875rem; font-weight: 500; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; white-space: nowrap; }
  .tab:hover { color: var(--text); }
  .tab.active { background: var(--surface); border-color: var(--border); color: var(--accent); }

  .main { flex: 1; padding: 2rem; max-width: 1100px; margin: 0 auto; width: 100%; }

  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
  .kpi { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; position: relative; overflow: hidden; transition: border-color 0.2s; }
  .kpi:hover { border-color: rgba(200,255,0,0.2); }
  .kpi-label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; font-family: 'DM Mono', monospace; }
  .kpi-value { font-family: 'DM Serif Display', serif; font-size: 2rem; }
  .kpi-sub { font-size: 0.75rem; color: var(--muted); margin-top: 0.3rem; }
  .kpi-glow { position: absolute; top: -30px; right: -30px; width: 80px; height: 80px; border-radius: 50%; filter: blur(30px); opacity: 0.15; }

  .section-title { font-family: 'DM Serif Display', serif; font-size: 1.25rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; }
  .section-title .muted { font-family: 'Sora', sans-serif; font-size: 0.75rem; color: var(--muted); font-weight: 400; }

  .tx-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .tx { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 1rem; transition: all 0.15s; }
  .tx:hover { border-color: rgba(255,255,255,0.12); transform: translateX(2px); }
  .tx-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
  .tx-info { flex: 1; }
  .tx-name { font-size: 0.9rem; font-weight: 500; }
  .tx-cat { font-size: 0.72rem; color: var(--muted); font-family: 'DM Mono', monospace; margin-top: 0.1rem; }
  .tx-amount { font-family: 'DM Mono', monospace; font-size: 0.95rem; font-weight: 500; }
  .tx-date { font-size: 0.7rem; color: var(--muted); font-family: 'DM Mono', monospace; }

  .add-form { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr auto; gap: 0.75rem; align-items: end; }
  .field { display: flex; flex-direction: column; gap: 0.4rem; }
  .field label { font-size: 0.72rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.8px; font-family: 'DM Mono', monospace; }
  .field input, .field select { background: var(--surface2); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 0.6rem 0.85rem; font-family: 'Sora', sans-serif; font-size: 0.875rem; outline: none; transition: border-color 0.2s; }
  .field input:focus, .field select:focus { border-color: var(--accent); }
  .field select option { background: var(--surface); }

  .btn { padding: 0.65rem 1.25rem; border-radius: 8px; border: none; cursor: pointer; font-family: 'Sora', sans-serif; font-size: 0.875rem; font-weight: 600; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; }
  .btn-accent { background: var(--accent); color: #0a0a0f; }
  .btn-accent:hover { background: #d4ff1a; transform: translateY(-1px); }
  .btn-ghost { background: var(--surface2); color: var(--text); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.2); }
  .btn-danger { background: rgba(255,77,109,0.12); color: var(--danger); border: 1px solid rgba(255,77,109,0.2); padding: 0.3rem 0.6rem; font-size: 0.75rem; border-radius: 6px; }
  .btn-premium { background: linear-gradient(135deg, var(--gold), #f4a261); color: #0a0a0f; }
  .btn-premium:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,209,102,0.4); }

  .budget-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
  .budget-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 1.25rem; }
  .budget-header { display: flex; justify-content: space-between; margin-bottom: 0.75rem; align-items: flex-start; }
  .budget-cat { font-size: 0.85rem; font-weight: 600; }
  .budget-amounts { font-family: 'DM Mono', monospace; font-size: 0.75rem; color: var(--muted); }
  .progress-track { background: var(--surface2); border-radius: 999px; height: 6px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 999px; transition: width 0.5s ease; }
  .budget-pct { font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--muted); margin-top: 0.4rem; text-align: right; }

  .locked-section { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 3rem 2rem; text-align: center; position: relative; overflow: hidden; }
  .locked-section::before { content:''; position:absolute; inset:0; background: linear-gradient(135deg, rgba(124,58,237,0.05), rgba(255,209,102,0.05)); }
  .locked-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .locked-title { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-bottom: 0.5rem; }
  .locked-desc { color: var(--muted); font-size: 0.875rem; max-width: 360px; margin: 0 auto 1.5rem; line-height: 1.6; }
  .features-list { list-style: none; text-align: left; max-width: 280px; margin: 0 auto 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .features-list li { font-size: 0.85rem; display: flex; gap: 0.5rem; align-items: center; }
  .features-list li::before { content:'✓'; color: var(--gold); font-weight: 700; }

  /* ── MODAL ── */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.78); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 1000; animation: fadeIn 0.2s ease; }
  .modal { background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 2rem; max-width: 520px; width: 94%; animation: slideUp 0.25s ease; max-height: 92vh; overflow-y: auto; }

  /* ── PRICING TOGGLE ── */
  .pricing-toggle { display: flex; background: var(--surface2); border-radius: 10px; padding: 4px; margin-bottom: 1.5rem; }
  .pricing-toggle button { flex:1; padding: 0.5rem; border: none; border-radius: 7px; background: none; color: var(--muted); cursor: pointer; font-family: 'Sora', sans-serif; font-size: 0.82rem; font-weight: 500; transition: all 0.2s; }
  .pricing-toggle button.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

  /* ── PLAN CARDS ── */
  .plan-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
  .plan-card { background: var(--surface2); border: 2px solid var(--border); border-radius: 14px; padding: 1.25rem; cursor: pointer; transition: all 0.2s; }
  .plan-card:hover { border-color: rgba(255,255,255,0.15); }
  .plan-card.sel-free { border-color: var(--accent); background: rgba(200,255,0,0.04); }
  .plan-card.sel-premium { border-color: var(--gold); background: rgba(255,209,102,0.05); }
  .plan-name-badge { font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 0.5rem; }
  .plan-price-big { font-family: 'DM Serif Display', serif; font-size: 1.75rem; margin-bottom: 0.2rem; }
  .plan-price-big .per { font-family: 'Sora', sans-serif; font-size: 0.78rem; color: var(--muted); font-weight: 400; }
  .save-badge { display: inline-block; background: rgba(200,255,0,0.12); color: var(--accent); font-size: 0.65rem; font-family: 'DM Mono', monospace; padding: 0.15rem 0.5rem; border-radius: 4px; margin-top: 0.2rem; }
  .plan-feats { list-style: none; margin-top: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; }
  .plan-feats li { font-size: 0.75rem; display: flex; gap: 0.4rem; }

  /* ── LS CHECKOUT BLOCK ── */
  .ls-block { background: var(--surface2); border: 1px solid var(--border); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.25rem; }
  .ls-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
  .ls-title { font-size: 0.85rem; font-weight: 600; }
  .ls-logo { display: flex; align-items: center; gap: 0.4rem; font-family: 'DM Mono', monospace; font-size: 0.7rem; color: var(--muted); }
  .ls-logo-icon { font-size: 1rem; }

  .order-row { display: flex; justify-content: space-between; font-size: 0.83rem; margin-bottom: 0.4rem; }
  .order-row .ol { color: var(--muted); }
  .order-divider { border: none; border-top: 1px solid var(--border); margin: 0.6rem 0; }
  .order-total { display: flex; justify-content: space-between; font-family: 'DM Mono', monospace; font-size: 1rem; font-weight: 600; }

  .ls-methods { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
  .ls-method { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 0.4rem 0.75rem; font-size: 0.75rem; color: var(--muted); font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 0.3rem; }

  .btn-ls { width: 100%; justify-content: center; padding: 0.9rem; font-size: 1rem; border-radius: 10px; background: #ffd166; color: #0a0a0f; border: none; font-weight: 700; cursor: pointer; font-family: 'Sora', sans-serif; transition: all 0.2s; display: flex; align-items: center; gap: 0.5rem; }
  .btn-ls:hover { background: #ffe085; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(255,209,102,0.35); }

  .ls-note { text-align: center; font-size: 0.7rem; color: var(--muted); margin-top: 0.75rem; font-family: 'DM Mono', monospace; line-height: 1.5; }

  .ls-config-warning { background: rgba(255,77,109,0.08); border: 1px solid rgba(255,77,109,0.25); border-radius: 10px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; font-size: 0.82rem; }
  .ls-config-warning strong { color: var(--danger); display: block; margin-bottom: 0.35rem; }
  .ls-config-warning code { font-family: 'DM Mono', monospace; font-size: 0.78rem; background: rgba(255,255,255,0.06); padding: 0.15rem 0.4rem; border-radius: 4px; }

  /* ── WAITING MODAL ── */
  .waiting-block { text-align: center; padding: 1.5rem 0; }
  .ls-spinner { width: 44px; height: 44px; border: 3px solid var(--border); border-top-color: var(--gold); border-radius: 50%; animation: spin 0.9s linear infinite; margin: 0 auto 1.25rem; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── SUCCESS ── */
  .success-icon { font-size: 3.5rem; display: block; margin-bottom: 1rem; animation: popIn 0.4s ease; }
  @keyframes popIn { from { transform: scale(0.5); opacity:0; } to { transform:scale(1); opacity:1; } }

  .chart-wrap { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; margin-bottom: 1.5rem; }
  .bar-chart { display: flex; align-items: flex-end; gap: 0.5rem; height: 120px; }
  .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; gap:0.4rem; height:100%; justify-content:flex-end; }
  .bar { width:100%; border-radius:6px 6px 0 0; min-height:4px; }
  .bar-label { font-size:0.65rem; color:var(--muted); font-family:'DM Mono',monospace; }
  .alert { background: rgba(255,209,102,0.07); border: 1px solid rgba(255,209,102,0.2); border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.82rem; color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }

  @keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
  @keyframes slideUp { from{transform:translateY(16px);opacity:0;}to{transform:translateY(0);opacity:1;} }

  @media(max-width:620px){
    .nav{padding:1rem;} .main{padding:1rem;}
    .form-grid{grid-template-columns:1fr 1fr;}
    .kpi-grid{grid-template-columns:1fr 1fr;}
    .plan-compare{grid-template-columns:1fr;}
  }
`;

const CATEGORIES = [
  { name:"Comida",          icon:"🍔", color:"#f4845f" },
  { name:"Transporte",      icon:"🚌", color:"#4cc9f0" },
  { name:"Entretenimiento", icon:"🎮", color:"#7c3aed" },
  { name:"Salud",           icon:"💊", color:"#00e5a0" },
  { name:"Ropa",            icon:"👕", color:"#c8ff00" },
  { name:"Servicios",       icon:"💡", color:"#ffd166" },
  { name:"Ingresos",        icon:"💰", color:"#00e5a0" },
  { name:"Otro",            icon:"📦", color:"#6b6b80" },
];
const BUDGETS = [
  { cat:"Comida",          limit:500, color:"#f4845f" },
  { cat:"Transporte",      limit:200, color:"#4cc9f0" },
  { cat:"Entretenimiento", limit:150, color:"#7c3aed" },
  { cat:"Servicios",       limit:300, color:"#ffd166" },
];
const SEED = [
  { id:1,  name:"Salario",      cat:"Ingresos",        amount:3200,  date:"2026-03-01", type:"income"  },
  { id:2,  name:"Supermercado", cat:"Comida",           amount:-120,  date:"2026-03-05", type:"expense" },
  { id:3,  name:"Netflix",      cat:"Entretenimiento",  amount:-15,   date:"2026-03-06", type:"expense" },
  { id:4,  name:"Bus mensual",  cat:"Transporte",       amount:-45,   date:"2026-03-07", type:"expense" },
  { id:5,  name:"Restaurante",  cat:"Comida",           amount:-38,   date:"2026-03-10", type:"expense" },
  { id:6,  name:"Freelance",    cat:"Ingresos",        amount:450,   date:"2026-03-12", type:"income"  },
  { id:7,  name:"Farmacia",     cat:"Salud",            amount:-22,   date:"2026-03-14", type:"expense" },
  { id:8,  name:"Ropa H&M",     cat:"Ropa",             amount:-65,   date:"2026-03-18", type:"expense" },
  { id:9,  name:"Spotify",      cat:"Entretenimiento",  amount:-9.99, date:"2026-03-20", type:"expense" },
  { id:10, name:"Electricidad", cat:"Servicios",        amount:-80,   date:"2026-03-22", type:"expense" },
];

const fmtAbs = n => "$" + Math.abs(n).toLocaleString("es-EC",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt    = n => (n<0?"-":"+")+fmtAbs(n);
const catOf  = (cat, f) => CATEGORIES.find(c=>c.name===cat)?.[f] ?? (f==="icon"?"📦":"#6b6b80");

const isConfigured = (url) => !url.includes("TU_");

// ── LEMON SQUEEZY CHECKOUT MODAL ─────────────────────────────────────────────
function LSModal({ onClose, onSuccess }) {
  const [billing, setBilling] = useState("monthly");
  const [plan,    setPlan]    = useState("premium");
  const [step,    setStep]    = useState("plans"); // plans | checkout | waiting | success

  const cfg = LS_CONFIG[billing];
  const configured = isConfigured(cfg.checkoutUrl);

  // When returning from LS checkout (URL has ?success=true or similar),
  // detect it via postMessage or URL param. Here we simulate via button.
  useEffect(() => {
    const handler = (e) => {
      // Lemon Squeezy emits this event after successful payment in overlay mode
      if (e.data?.event === "Lemon Squeezy checkout.success") {
        setStep("success");
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleOpenCheckout = () => {
    if (!configured) return;
    // Append embed params for overlay checkout
    const url = cfg.checkoutUrl +
      "?embed=1" +
      "&media=0" +
      "&logo=1" +
      "&checkout[custom][user_id]=demo_user";
    // Open Lemon Squeezy overlay
    window.LemonSqueezy?.Url?.Open(url);
    // Fallback: open in new tab if LS SDK not loaded
    if (!window.LemonSqueezy) {
      window.open(url, "_blank", "width=480,height=700");
    }
    setStep("waiting");
  };

  return (
    <div className="modal-overlay" onClick={() => step !== "waiting" && onClose()}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {/* ── PLANS ── */}
        {step === "plans" && <>
          <div style={{fontFamily:"DM Serif Display,serif", fontSize:"1.4rem", marginBottom:"0.4rem"}}>Elige tu plan</div>
          <div style={{fontSize:"0.85rem", color:"var(--muted)", marginBottom:"1.5rem", lineHeight:1.6}}>Sin contratos · Cancela cuando quieras · Pago seguro vía Lemon Squeezy</div>

          <div className="pricing-toggle">
            <button className={billing==="monthly"?"active":""} onClick={()=>setBilling("monthly")}>Mensual</button>
            <button className={billing==="annual" ?"active":""} onClick={()=>setBilling("annual")}>Anual — ahorra 20%</button>
          </div>

          <div className="plan-compare">
            <div className={`plan-card ${plan==="free"?"sel-free":""}`} onClick={()=>setPlan("free")}>
              <div className="plan-name-badge">Free</div>
              <div className="plan-price-big">$0 <span className="per">/siempre</span></div>
              <ul className="plan-feats">
                <li><span style={{color:"var(--success)"}}>✓</span> Dashboard básico</li>
                <li><span style={{color:"var(--success)"}}>✓</span> Movimientos ilimitados</li>
                <li><span style={{color:"var(--success)"}}>✓</span> Presupuestos fijos</li>
                <li><span style={{color:"var(--muted)"}}>✗ Reportes avanzados</span></li>
                <li><span style={{color:"var(--muted)"}}>✗ Metas de ahorro</span></li>
              </ul>
            </div>
            <div className={`plan-card ${plan==="premium"?"sel-premium":""}`} onClick={()=>setPlan("premium")}>
              <div className="plan-name-badge">Premium ⭐</div>
              <div className="plan-price-big" style={{color:"var(--gold)"}}>
                {cfg.price} <span className="per">{cfg.period}</span>
              </div>
              {billing==="annual" && <div className="save-badge">Ahorras $23.88/año</div>}
              <ul className="plan-feats">
                <li><span style={{color:"var(--gold)"}}>✓</span> Todo lo de Free</li>
                <li><span style={{color:"var(--gold)"}}>✓</span> Reportes avanzados</li>
                <li><span style={{color:"var(--gold)"}}>✓</span> Metas de ahorro</li>
                <li><span style={{color:"var(--gold)"}}>✓</span> Exportar PDF / Excel</li>
                <li><span style={{color:"var(--gold)"}}>✓</span> Insights con IA</li>
              </ul>
            </div>
          </div>

          <div style={{display:"flex", gap:"0.75rem"}}>
            <button className="btn btn-ghost" style={{flex:1, justifyContent:"center"}} onClick={onClose}>Cancelar</button>
            {plan==="free"
              ? <button className="btn btn-accent" style={{flex:1, justifyContent:"center"}} onClick={onClose}>Continuar gratis</button>
              : <button className="btn btn-premium" style={{flex:1, justifyContent:"center"}} onClick={()=>setStep("checkout")}>Continuar →</button>
            }
          </div>
        </>}

        {/* ── CHECKOUT ── */}
        {step === "checkout" && <>
          <div style={{display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.25rem"}}>
            <button className="btn btn-ghost" style={{padding:"0.4rem 0.75rem",fontSize:"0.8rem"}} onClick={()=>setStep("plans")}>← Volver</button>
            <div style={{fontFamily:"DM Serif Display,serif", fontSize:"1.3rem"}}>Resumen de compra</div>
          </div>

          {/* Config warning si aún no pegaron las URLs */}
          {!configured && (
            <div className="ls-config-warning">
              <strong>⚠️ Configura tus URLs de Lemon Squeezy</strong>
              Edita el archivo y reemplaza las URLs en <code>LS_CONFIG</code> con las de tu cuenta.<br/>
              <span style={{color:"var(--muted)",marginTop:"0.4rem",display:"block"}}>
                Cómo: lemonsqueezy.com → Tu producto → Share → Checkout URL
              </span>
            </div>
          )}

          <div className="ls-block">
            <div className="ls-header">
              <div className="ls-title">flujo. Premium</div>
              <div className="ls-logo"><span className="ls-logo-icon">🍋</span> Lemon Squeezy</div>
            </div>

            <div className="order-row"><span className="ol">Plan</span><span>Premium {billing==="annual"?"Anual":"Mensual"}</span></div>
            <div className="order-row"><span className="ol">Precio</span><span>{cfg.price}{cfg.period}</span></div>
            {billing==="annual" && <div className="order-row"><span className="ol">Ahorro vs mensual</span><span style={{color:"var(--success)"}}>-$23.88</span></div>}
            <hr className="order-divider" />
            <div className="order-total"><span style={{color:"var(--muted)"}}>Total hoy</span><span style={{color:"var(--accent)"}}>{cfg.price} USD</span></div>
          </div>

          <div style={{marginBottom:"1rem"}}>
            <div style={{fontSize:"0.72rem",color:"var(--muted)",fontFamily:"DM Mono,monospace",marginBottom:"0.6rem",textTransform:"uppercase",letterSpacing:"0.8px"}}>Métodos de pago aceptados</div>
            <div className="ls-methods">
              {["💳 Tarjeta Visa","💳 Mastercard","💳 Amex","🍎 Apple Pay","🔵 PayPal"].map(m=>(
                <div key={m} className="ls-method">{m}</div>
              ))}
            </div>
          </div>

          <button
            className="btn-ls"
            onClick={handleOpenCheckout}
            disabled={!configured}
            style={!configured?{opacity:0.5,cursor:"not-allowed"}:{}}
          >
            🍋 Pagar con Lemon Squeezy
          </button>
          <div className="ls-note">
            Serás redirigido al checkout seguro de Lemon Squeezy.<br/>
            🔒 Pagos cifrados · Cancela en cualquier momento desde tu cuenta
          </div>

          {/* Demo button for testing without real LS account */}
          <div style={{textAlign:"center",marginTop:"1rem"}}>
            <button className="btn btn-ghost" style={{fontSize:"0.75rem",margin:"0 auto",opacity:0.6}} onClick={()=>setStep("success")}>
              [Demo] Simular pago exitoso →
            </button>
          </div>
        </>}

        {/* ── WAITING ── */}
        {step === "waiting" && (
          <div className="waiting-block">
            <div className="ls-spinner" />
            <div style={{fontFamily:"DM Serif Display,serif",fontSize:"1.3rem",marginBottom:"0.5rem"}}>Esperando confirmación...</div>
            <div style={{fontSize:"0.82rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.6}}>
              Completa el pago en la ventana de Lemon Squeezy.<br/>Esta pantalla se actualizará automáticamente.
            </div>
            <button className="btn btn-ghost" style={{margin:"0 auto",fontSize:"0.8rem"}} onClick={()=>setStep("success")}>
              Ya pagué — Activar Premium ✓
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {step === "success" && (
          <div style={{textAlign:"center"}}>
            <span className="success-icon">🎉</span>
            <div style={{fontFamily:"DM Serif Display,serif",fontSize:"1.6rem",marginBottom:"0.5rem"}}>¡Bienvenido a Premium!</div>
            <div style={{fontSize:"0.85rem",color:"var(--muted)",marginBottom:"1.5rem",lineHeight:1.6}}>
              Tu suscripción está activa. Recibirás un email de confirmación de Lemon Squeezy con tu recibo y datos de facturación.
            </div>
            <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:"12px",padding:"1rem",marginBottom:"1.5rem",fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>
              💡 Para gestionar tu suscripción (cancelar, actualizar tarjeta) visita el link en el email de confirmación.
            </div>
            <button className="btn btn-premium" style={{margin:"0 auto"}} onClick={onSuccess}>
              Ir a mis reportes →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab,       setTab]       = useState("dashboard");
  const [isPremium, setIsPremium] = useState(false);
  const [txs,       setTxs]       = useState(SEED);
  const [form,      setForm]      = useState({name:"",amount:"",cat:"Comida",type:"expense"});
  const [showPay,   setShowPay]   = useState(false);
  const [nextId,    setNextId]    = useState(11);

  // Load Lemon Squeezy JS embed (needed for overlay checkout)
  useEffect(() => {
    if (document.getElementById("ls-sdk")) return;
    const s = document.createElement("script");
    s.id  = "ls-sdk";
    s.src = "https://app.lemonsqueezy.com/js/lemon.js";
    s.defer = true;
    document.body.appendChild(s);
  }, []);

  const income   = txs.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const expenses = txs.filter(t=>t.type==="expense").reduce((s,t)=>s+Math.abs(t.amount),0);
  const balance  = income - expenses;
  const savRate  = income>0?((balance/income)*100).toFixed(0):0;

  const addTx = () => {
    if (!form.name||!form.amount) return;
    const amount = form.type==="expense"?-Math.abs(parseFloat(form.amount)):Math.abs(parseFloat(form.amount));
    const today  = new Date().toISOString().split("T")[0];
    setTxs(p=>[{id:nextId,name:form.name,cat:form.cat,amount,date:today,type:form.type},...p]);
    setNextId(n=>n+1);
    setForm({name:"",amount:"",cat:"Comida",type:"expense"});
  };

  const chartData = [
    {m:"Oct",v:380},{m:"Nov",v:450},{m:"Dic",v:620},{m:"Ene",v:390},{m:"Feb",v:410},{m:"Mar",v:expenses}
  ];
  const maxV = Math.max(...chartData.map(d=>d.v));

  const budgetProgress = BUDGETS.map(b=>({
    ...b,
    spent: txs.filter(t=>t.cat===b.cat&&t.type==="expense").reduce((s,t)=>s+Math.abs(t.amount),0)
  }));

  const TABS = [
    {id:"dashboard",   label:"Dashboard",   premium:false},
    {id:"transactions",label:"Movimientos", premium:false},
    {id:"budget",      label:"Presupuesto", premium:false},
    {id:"reports",     label:"Reportes",    premium:true },
    {id:"goals",       label:"Metas",       premium:true },
  ];

  const Locked = ({icon,title,desc,features}) => (
    <div className="locked-section">
      <div className="locked-icon">{icon}</div>
      <div className="locked-title">{title}</div>
      <div className="locked-desc">{desc}</div>
      <ul className="features-list">{features.map(f=><li key={f}>{f}</li>)}</ul>
      <button className="btn btn-premium" onClick={()=>setShowPay(true)}>⭐ Activar Premium — desde $9.99/mes</button>
    </div>
  );

  return (
    <>
      <style>{style}</style>
      <div className="app">

        <nav className="nav">
          <div className="logo">flujo<span>.</span></div>
          <div className="nav-right">
            <span className={`plan-badge ${isPremium?"premium":""}`}>{isPremium?"⭐ Premium":"Free"}</span>
            {!isPremium && <button className="btn btn-premium" onClick={()=>setShowPay(true)}>Mejorar plan</button>}
          </div>
        </nav>

        <div className="tabs">
          {TABS.map(t=>(
            <button key={t.id} className={`tab ${tab===t.id?"active":""}`}
              onClick={()=>{ if(t.premium&&!isPremium){setShowPay(true);}else{setTab(t.id);} }}>
              {t.label}{t.premium&&!isPremium&&<span style={{fontSize:"0.65rem"}}>🔒</span>}
            </button>
          ))}
        </div>

        <main className="main">

          {/* DASHBOARD */}
          {tab==="dashboard" && <>
            <div className="kpi-grid">
              {[
                {label:"Balance Total", value:fmtAbs(balance), sub:"Este mes",                                cls:balance>=0?"kpi-positive":"kpi-negative",glow:"#00e5a0"},
                {label:"Ingresos",      value:fmtAbs(income),  sub:`${txs.filter(t=>t.type==="income").length} transacciones`,  cls:"kpi-positive",glow:"#00e5a0"},
                {label:"Gastos",        value:fmtAbs(expenses),sub:`${txs.filter(t=>t.type==="expense").length} transacciones`, cls:"kpi-negative",glow:"#ff4d6d"},
                {label:"Tasa ahorro",   value:`${savRate}%`,   sub:savRate>=20?"🟢 Saludable":"🔴 Mejorar",  cls:"kpi-accent",  glow:"#c8ff00"},
              ].map((k,i)=>(
                <div key={i} className="kpi">
                  <div className="kpi-glow" style={{background:k.glow}}/>
                  <div className="kpi-label">{k.label}</div>
                  <div className={`kpi-value ${k.cls}`}>{k.value}</div>
                  <div className="kpi-sub">{k.sub}</div>
                </div>
              ))}
            </div>

            {expenses>income*0.8 && <div className="alert">⚠️ Tus gastos superan el 80% de tus ingresos este mes.</div>}

            <div className="chart-wrap">
              <div className="section-title" style={{marginBottom:"1.25rem"}}>Gastos mensuales <span className="muted">Últimos 6 meses</span></div>
              <div className="bar-chart">
                {chartData.map((d,i)=>(
                  <div key={i} className="bar-col">
                    <div className="bar" style={{height:`${(d.v/maxV)*100}%`,background:i===chartData.length-1?"var(--accent)":"var(--surface2)",border:i===chartData.length-1?"none":"1px solid var(--border)"}}/>
                    <div className="bar-label">{d.m}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="section-title">Últimos movimientos</div>
            <div className="tx-list">
              {txs.slice(0,5).map(t=>(
                <div key={t.id} className="tx">
                  <div className="tx-icon" style={{background:catOf(t.cat,"color")+"22"}}>{catOf(t.cat,"icon")}</div>
                  <div className="tx-info"><div className="tx-name">{t.name}</div><div className="tx-cat">{t.cat}</div></div>
                  <div>
                    <div className="tx-amount" style={{color:t.type==="income"?"var(--success)":"var(--danger)"}}>{fmt(t.amount)}</div>
                    <div className="tx-date">{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {/* TRANSACTIONS */}
          {tab==="transactions" && <>
            <div className="add-form">
              <div className="section-title" style={{marginBottom:"1rem"}}>Agregar movimiento</div>
              <div className="form-grid">
                <div className="field"><label>Descripción</label><input placeholder="Ej: Supermercado" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
                <div className="field"><label>Monto ($)</label><input type="number" placeholder="0.00" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))}/></div>
                <div className="field"><label>Categoría</label><select value={form.cat} onChange={e=>setForm(f=>({...f,cat:e.target.value}))}>{CATEGORIES.map(c=><option key={c.name}>{c.name}</option>)}</select></div>
                <div className="field"><label>Tipo</label><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="expense">Gasto</option><option value="income">Ingreso</option></select></div>
                <div style={{display:"flex",alignItems:"flex-end"}}><button className="btn btn-accent" onClick={addTx}>+ Agregar</button></div>
              </div>
            </div>
            <div className="section-title">Todos los movimientos <span className="muted">{txs.length} total</span></div>
            <div className="tx-list">
              {txs.map(t=>(
                <div key={t.id} className="tx">
                  <div className="tx-icon" style={{background:catOf(t.cat,"color")+"22"}}>{catOf(t.cat,"icon")}</div>
                  <div className="tx-info"><div className="tx-name">{t.name}</div><div className="tx-cat">{t.cat} · {t.date}</div></div>
                  <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
                    <div className="tx-amount" style={{color:t.type==="income"?"var(--success)":"var(--danger)"}}>{fmt(t.amount)}</div>
                    <button className="btn btn-danger" onClick={()=>setTxs(p=>p.filter(x=>x.id!==t.id))}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </>}

          {/* BUDGET */}
          {tab==="budget" && <>
            <div className="section-title" style={{marginBottom:"1.25rem"}}>Presupuesto mensual <span className="muted">Marzo 2026</span></div>
            <div className="budget-grid">
              {budgetProgress.map(b=>{
                const pct=Math.min((b.spent/b.limit)*100,100);
                const color=pct>90?"var(--danger)":pct>70?"var(--gold)":b.color;
                return(
                  <div key={b.cat} className="budget-card">
                    <div className="budget-header">
                      <div><div style={{fontSize:"1.1rem",marginBottom:"0.2rem"}}>{catOf(b.cat,"icon")}</div><div className="budget-cat">{b.cat}</div></div>
                      <div className="budget-amounts">{fmtAbs(b.spent)} / {fmtAbs(b.limit)}</div>
                    </div>
                    <div className="progress-track"><div className="progress-fill" style={{width:`${pct}%`,background:color}}/></div>
                    <div className="budget-pct" style={{color}}>{pct.toFixed(0)}% usado{pct>90?" · ⚠️":""}</div>
                  </div>
                );
              })}
            </div>
            {!isPremium&&<div style={{marginTop:"1.5rem"}}><Locked icon="📊" title="Presupuestos personalizados" desc="Crea y edita tus propias categorías." features={["Categorías a medida","Alertas inteligentes","Límites dinámicos"]}/></div>}
          </>}

          {/* REPORTS */}
          {tab==="reports"&&!isPremium&&<Locked icon="📈" title="Reportes avanzados" desc="Tendencias, comparativas y exportación de datos." features={["Gráficas por categoría","Comparativa mes a mes","Exportar PDF y Excel","Insights con IA"]}/>}
          {tab==="reports"&&isPremium&&<>
            <div className="section-title" style={{marginBottom:"1.25rem"}}>Reportes avanzados</div>
            <div className="kpi-grid">
              {CATEGORIES.filter(c=>c.name!=="Ingresos").map(c=>{
                const total=txs.filter(t=>t.cat===c.name&&t.type==="expense").reduce((s,t)=>s+Math.abs(t.amount),0);
                return total>0?(
                  <div key={c.name} className="kpi">
                    <div className="kpi-glow" style={{background:c.color}}/>
                    <div className="kpi-label">{c.icon} {c.name}</div>
                    <div className="kpi-value" style={{color:c.color}}>{fmtAbs(total)}</div>
                    <div className="kpi-sub">{((total/expenses)*100).toFixed(1)}% del total</div>
                  </div>
                ):null;
              })}
            </div>
            <div className="chart-wrap" style={{marginTop:"1.5rem"}}>
              <div className="section-title" style={{marginBottom:"1rem"}}>Distribución por categoría</div>
              <div className="bar-chart" style={{height:"160px"}}>
                {CATEGORIES.filter(c=>c.name!=="Ingresos").map(c=>{
                  const total=txs.filter(t=>t.cat===c.name&&t.type==="expense").reduce((s,t)=>s+Math.abs(t.amount),0);
                  return total>0?(
                    <div key={c.name} className="bar-col">
                      <div className="bar" style={{height:`${(total/expenses)*100}%`,background:c.color}}/>
                      <div className="bar-label">{c.icon}</div>
                      <div className="bar-label">{c.name.slice(0,4)}</div>
                    </div>
                  ):null;
                })}
              </div>
            </div>
          </>}

          {/* GOALS */}
          {tab==="goals"&&!isPremium&&<Locked icon="🎯" title="Metas de ahorro" desc="Define objetivos y rastrea tu progreso." features={["Metas con fecha límite","Progreso visual","Proyecciones de ahorro","Alertas de desvío"]}/>}
          {tab==="goals"&&isPremium&&<>
            <div className="section-title" style={{marginBottom:"1.25rem"}}>Metas de ahorro</div>
            {[
              {name:"Fondo de emergencia",target:5000,saved:1200,icon:"🛡️",color:"#4cc9f0"},
              {name:"Vacaciones 2026",    target:2000,saved:650, icon:"✈️",color:"#f4845f"},
              {name:"Laptop nueva",       target:1500,saved:900, icon:"💻",color:"#c8ff00"},
            ].map(g=>{
              const pct=Math.min((g.saved/g.target)*100,100);
              return(
                <div key={g.name} className="budget-card" style={{marginBottom:"1rem"}}>
                  <div className="budget-header">
                    <div><div style={{fontSize:"1.3rem",marginBottom:"0.3rem"}}>{g.icon}</div><div className="budget-cat">{g.name}</div></div>
                    <div>
                      <div className="budget-amounts">{fmtAbs(g.saved)} / {fmtAbs(g.target)}</div>
                      <div style={{fontSize:"0.7rem",color:"var(--muted)",textAlign:"right",fontFamily:"DM Mono",marginTop:"0.2rem"}}>{pct<100?`Faltan ${fmtAbs(g.target-g.saved)}`:"✅ Completada"}</div>
                    </div>
                  </div>
                  <div className="progress-track"><div className="progress-fill" style={{width:`${pct}%`,background:g.color}}/></div>
                  <div className="budget-pct" style={{color:g.color}}>{pct.toFixed(0)}% alcanzado</div>
                </div>
              );
            })}
          </>}

        </main>

        {showPay&&(
          <LSModal
            onClose={()=>setShowPay(false)}
            onSuccess={()=>{ setIsPremium(true); setShowPay(false); setTab("reports"); }}
          />
        )}
      </div>
    </>
  );
}
