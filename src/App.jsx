import { useState } from "react";

const initialClinicas = [
  { id: 1, nombre: "Clínica Dental Sonrisa", direccion: "Calle Mayor 12, Madrid", horario: "09:00 - 10:00", estado: "pendiente", recogidoEn: null },
  { id: 2, nombre: "Centro Dental Salud", direccion: "Av. de la Paz 34, Madrid", horario: "10:30 - 11:30", estado: "pendiente", recogidoEn: null },
  { id: 3, nombre: "Clínica Ortodoncia Plus", direccion: "C/ Fuencarral 78, Madrid", horario: "12:00 - 13:00", estado: "pendiente", recogidoEn: null },
];

const fmt = (ts) => {
  if (!ts) return null;
  const d = new Date(ts);
  const dias = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  return `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]} · ${d.toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}`;
};

const ClockIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);
const PinIcon = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const PlusIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const TrashIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>);
const ToothIcon = () => (<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8 2 5 5 5 8c0 2 .5 3.5 1 5l1 7c.2 1 1 2 2 2s1.5-.8 2-2l1-3 1 3c.5 1.2 1 2 2 2s1.8-1 2-2l1-7c.5-1.5 1-3 1-5 0-3-3-6-6-6z"/></svg>);
const CheckIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>);
const EditIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>);
const GearIcon = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>);
const ArrowLeft = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>);
const SaveIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>);
const CalIcon = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const ListIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);

const USUARIO = "Julien";
const PASSWORD = "123456789";

const EyeIcon = ({ open }) => open
  ? (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>)
  : (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>);

const LoginScreen = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = () => {
    if (user === USUARIO && pass === PASSWORD) {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Georgia', serif", padding: 20 }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        .login-box { animation: fadeIn 0.5s ease both; }
        .login-box.shake { animation: shake 0.4s ease; }
        input:focus { outline: none; border-color: #0ea5e9 !important; box-shadow: 0 0 0 3px rgba(14,165,233,0.2); }
      `}</style>
      <div className={`login-box${shake ? " shake" : ""}`} style={{ background: "#fff", borderRadius: 22, padding: "36px 28px", width: "100%", maxWidth: 340, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #0c4a6e, #0369a1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <ToothIcon />
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: "bold", color: "#0c4a6e" }}>KN Dental</h1>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>Clínicas a recoger</p>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: "bold", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Usuario</label>
          <input value={user} onChange={e => { setUser(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            placeholder="Tu usuario" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid #e0f2fe", fontSize: 14, color: "#0c4a6e", background: "#f8fafc", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: "bold", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Contraseña</label>
          <div style={{ position: "relative" }}>
            <input value={pass} onChange={e => { setPass(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              type={showPass ? "text" : "password"}
              placeholder="Tu contraseña" style={{ width: "100%", padding: "11px 40px 11px 14px", borderRadius: 10, border: "1.5px solid #e0f2fe", fontSize: 14, color: "#0c4a6e", background: "#f8fafc", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" }} />
            <button onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4, display: "flex" }}>
              <EyeIcon open={showPass} />
            </button>
          </div>
        </div>

        {error && <div style={{ marginBottom: 14, padding: "8px 12px", background: "#fee2e2", borderRadius: 8, fontSize: 12, color: "#dc2626", textAlign: "center" }}>{error}</div>}

        <button onClick={handleLogin} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0c4a6e, #0369a1)", color: "#fff", fontSize: 15, fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 16px rgba(3,105,161,0.35)", transition: "opacity 0.2s" }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}>
          Entrar
        </button>
      </div>
    </div>
  );
};

const emptyForm = { nombre: "", direccion: "", horario: "" };

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clinicas, setClinicas] = useState(initialClinicas);
  const [registros, setRegistros] = useState([]); // recogidas activas
  const [historial, setHistorial] = useState([]); // registro permanente de todas las recogidas
  const [vista, setVista] = useState("inicio");
  const [filtro, setFiltro] = useState("pendiente");
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const total = clinicas.length;
  const recogidas = clinicas.filter(c => c.estado === "recogido").length;
  const pendientes = clinicas.filter(c => c.estado === "pendiente").length;
  const progreso = total > 0 ? Math.round((recogidas / total) * 100) : 0;

  const marcarRecogido = (id) => {
    const ahora = Date.now();
    const clinica = clinicas.find(c => c.id === id);
    if (clinica) {
      setRegistros(prev => [{ id: ahora, clinicaId: id, nombre: clinica.nombre, direccion: clinica.direccion, ts: ahora }, ...prev]);
      setHistorial(prev => [{ id: ahora + 1, nombre: clinica.nombre, direccion: clinica.direccion, ts: ahora }, ...prev]);
      setClinicas(prev => prev.map(c => c.id === id ? { ...c, estado: "recogido" } : c));
    }
  };

  // Al eliminar un registro, la clínica vuelve a pendiente
  const devolverPendiente = (rid) => {
    const reg = registros.find(r => r.id === rid);
    if (reg) {
      setClinicas(prev => prev.map(c => c.id === reg.clinicaId ? { ...c, estado: "pendiente" } : c));
    }
    setRegistros(prev => prev.filter(r => r.id !== rid));
  };

  const eliminar = (id) => {
    setClinicas(prev => prev.filter(c => c.id !== id));
    if (editId === id) { setEditId(null); setForm(emptyForm); }
  };

  const agregar = () => {
    if (!form.nombre.trim()) return;
    setClinicas(prev => [...prev, { id: Date.now(), ...form, estado: "pendiente", recogidoEn: null }]);
    setForm(emptyForm);
    setShowAddForm(false);
  };

  const iniciarEdicion = (c) => { setEditId(c.id); setForm({ nombre: c.nombre, direccion: c.direccion, horario: c.horario }); setShowAddForm(false); };
  const guardarEdicion = () => { if (!form.nombre.trim()) return; setClinicas(prev => prev.map(c => c.id === editId ? { ...c, ...form } : c)); setEditId(null); setForm(emptyForm); };

  const inputStyle = { width: "100%", padding: "10px 12px 10px 34px", borderRadius: 9, border: "1.5px solid #e0f2fe", fontSize: 13, background: "#f8fafc", color: "#0c4a6e", boxSizing: "border-box", transition: "border-color 0.2s, box-shadow 0.2s" };

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  // ── VISTA GESTIÓN ──────────────────────────────────────────────
  if (vista === "gestion") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe 50%, #f0fdf4)", fontFamily: "'Georgia', serif", paddingBottom: 60 }}>
        <style>{`
          @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          .gc{animation:fadeUp 0.35s ease both;transition:box-shadow 0.2s,transform 0.2s}
          .gc:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(14,165,233,0.12)!important}
          .btn-del:hover{background:#fee2e2!important;color:#dc2626!important}
          .btn-edit:hover{background:#eff6ff!important;color:#1d4ed8!important}
          input:focus{outline:none;border-color:#0ea5e9!important;box-shadow:0 0 0 3px rgba(14,165,233,0.15)}
        `}</style>
        <div style={{ background: "linear-gradient(135deg, #0c4a6e, #075985 60%, #0369a1)", padding: "28px 20px 22px", textAlign: "center", boxShadow: "0 4px 24px rgba(12,74,110,0.25)", position: "relative" }}>
          <button onClick={() => { setVista("inicio"); setEditId(null); setForm(emptyForm); setShowAddForm(false); }} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
            <ArrowLeft /> Volver
          </button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginBottom: 4 }}>
            <div style={{ color: "#bae6fd" }}><ToothIcon /></div>
            <h1 style={{ color: "#fff", fontSize: 20, margin: 0, fontWeight: "bold" }}>Gestionar Clínicas</h1>
          </div>
          <p style={{ color: "#7dd3fc", margin: 0, fontSize: 12 }}>{total} clínica{total !== 1 ? "s" : ""} registradas</p>
        </div>

        <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
            {clinicas.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8", padding: "32px 20px" }}>No hay clínicas. Añade una abajo.</div>}
            {clinicas.map((c, i) => (
              <div key={c.id} className="gc" style={{ background: editId === c.id ? "#eff6ff" : "#fff", borderRadius: 14, border: editId === c.id ? "1.5px solid #93c5fd" : "1.5px solid #e0f2fe", padding: editId === c.id ? 16 : "12px 14px", boxShadow: "0 3px 12px rgba(14,165,233,0.07)", animationDelay: `${i * 0.05}s` }}>
                {editId === c.id ? (
                  <div style={{ animation: "slideIn 0.25s ease" }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", color: "#1d4ed8", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>✏️ Editando clínica</div>
                    {[{ key: "nombre", placeholder: "Nombre *", icon: "🦷" }, { key: "direccion", placeholder: "Dirección", icon: "📍" }, { key: "horario", placeholder: "Horario (ej: 09:00 - 10:00)", icon: "🕐" }].map(f => (
                      <div key={f.key} style={{ marginBottom: 8, position: "relative" }}>
                        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>{f.icon}</span>
                        <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                      <button onClick={guardarEdicion} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", background: "linear-gradient(135deg, #1d4ed8, #2563eb)", color: "#fff", fontSize: 13, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><SaveIcon /> Guardar</button>
                      <button onClick={() => { setEditId(null); setForm(emptyForm); }} style={{ padding: "9px 14px", borderRadius: 9, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#64748b", fontSize: 13, cursor: "pointer" }}>Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: "bold", color: "#0c4a6e", fontSize: 14, marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.nombre}</div>
                      {c.direccion && <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: 11, marginBottom: 2 }}><PinIcon /><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.direccion}</span></div>}
                      {c.horario && <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#0369a1", fontSize: 11 }}><ClockIcon /><span>{c.horario}</span></div>}
                    </div>
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                      <button className="btn-edit" onClick={() => iniciarEdicion(c)} style={{ padding: "7px 10px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#64748b", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 4, transition: "all 0.18s" }}><EditIcon /> Editar</button>
                      <button className="btn-del" onClick={() => eliminar(c.id)} style={{ padding: "7px 10px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#94a3b8", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 4, transition: "all 0.18s" }}><TrashIcon /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showAddForm ? (
            <div style={{ marginTop: 16, background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 6px 24px rgba(14,165,233,0.12)", border: "1.5px solid #bae6fd", animation: "slideIn 0.3s ease" }}>
              <div style={{ fontSize: 13, fontWeight: "bold", color: "#0c4a6e", marginBottom: 12 }}>🦷 Nueva clínica</div>
              {[{ key: "nombre", placeholder: "Nombre de la clínica *", icon: "🦷" }, { key: "direccion", placeholder: "Dirección", icon: "📍" }, { key: "horario", placeholder: "Horario (ej: 09:00 - 10:00)", icon: "🕐" }].map(f => (
                <div key={f.key} style={{ marginBottom: 8, position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>{f.icon}</span>
                  <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
              <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                <button onClick={agregar} style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #0369a1, #0284c7)", color: "#fff", fontSize: 13, fontWeight: "bold", cursor: "pointer" }}>Añadir clínica</button>
                <button onClick={() => { setShowAddForm(false); setForm(emptyForm); }} style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#64748b", fontSize: 13, cursor: "pointer" }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <button onClick={() => { setShowAddForm(true); setEditId(null); setForm(emptyForm); }} style={{ marginTop: 16, width: "100%", padding: "13px", borderRadius: 13, border: "2px dashed #7dd3fc", background: "rgba(186,230,253,0.2)", color: "#0369a1", fontSize: 14, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <PlusIcon /> Añadir nueva clínica
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── VISTA INICIO ──────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe 50%, #f0fdf4)", fontFamily: "'Georgia', serif", paddingBottom: 60 }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .card { animation: fadeUp 0.4s ease both; transition: box-shadow 0.2s, transform 0.2s; }
        .card:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(14,165,233,0.10) !important; }
        .fbtn { transition: all 0.18s; } .fbtn:hover { opacity: 0.8; }
        .reg-row:hover { background: #f0fdf4 !important; }
        .btn-del-reg:hover { color: #dc2626 !important; }
        .btn-pkg:hover { background: #dcfce7 !important; border-color: #4ade80 !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0c4a6e, #075985 60%, #0369a1)", padding: "28px 20px 0", boxShadow: "0 4px 24px rgba(12,74,110,0.25)", position: "relative" }}>
        {/* Logout button top-left */}
        <button onClick={() => setLoggedIn(false)} title="Salir" style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10, color: "#fff", cursor: "pointer", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: "bold", backdropFilter: "blur(6px)", transition: "background 0.2s" }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Salir
        </button>

        {/* Gear icon top-right */}
        <button onClick={() => setVista("gestion")} title="Gestionar clínicas" style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 10, color: "#fff", cursor: "pointer", padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", transition: "background 0.2s" }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.28)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}>
          <GearIcon />
        </button>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, marginBottom: 4 }}>
            <div style={{ color: "#bae6fd" }}><ToothIcon /></div>
            <h1 style={{ color: "#fff", fontSize: 20, margin: 0, fontWeight: "bold", letterSpacing: "0.03em" }}>KN Dental</h1>
          </div>
          <p style={{ color: "#7dd3fc", margin: "0 0 16px", fontSize: 12 }}>Clínicas a recoger</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
            {[{ label: "Recogidas", val: recogidas, color: "#86efac" }].map(s => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "8px 18px", backdropFilter: "blur(8px)" }}>
                <div style={{ color: s.color, fontSize: 20, fontWeight: "bold" }}>{s.val}</div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Tab buttons — flush to bottom of header */}
        <div style={{ display: "flex", gap: 0, maxWidth: 520, margin: "0 auto" }}>
          {[
            { key: "pendiente", label: "⏳ Pendientes", count: pendientes },
            { key: "recogido",  label: "✅ Recogidas",  count: recogidas },
            { key: "historial", label: "📋 Historial",  count: historial.length },
          ].map(f => (
            <button key={f.key} onClick={() => setFiltro(f.key)} style={{ flex: 1, padding: "12px 4px", border: "none", cursor: "pointer", fontSize: 12, fontWeight: filtro === f.key ? "bold" : "normal", background: filtro === f.key ? "#fff" : "rgba(255,255,255,0.12)", color: filtro === f.key ? "#0369a1" : "rgba(255,255,255,0.8)", borderRadius: filtro === f.key ? "12px 12px 0 0" : "0", transition: "all 0.2s" }}>
              {f.label} ({f.count})
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 16px" }}>

        {/* ── PESTAÑA PENDIENTES ── */}
        {filtro === "pendiente" && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 11 }}>
            {clinicas.length === 0 && <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 20px", fontSize: 14 }}>No hay clínicas registradas</div>}
            {clinicas.map((c, i) => {
              const dim = c.estado === "recogido";
              return (
                <div key={c.id} className="card" style={{ background: dim ? "linear-gradient(135deg, #e2e8f0, #cbd5e1)" : "linear-gradient(135deg, #fff, #f0f9ff)", borderRadius: 15, padding: "14px", boxShadow: "0 4px 14px rgba(14,165,233,0.06)", border: dim ? "1.5px solid #94a3b8" : "1.5px solid #bae6fd", opacity: dim ? 0.6 : 1, animationDelay: `${i * 0.05}s`, transition: "all 0.3s ease" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: "bold", color: dim ? "#64748b" : "#0c4a6e", textDecoration: dim ? "line-through" : "none" }}>{c.nombre}</h3>
                      {c.direccion && <div style={{ display: "flex", alignItems: "center", gap: 4, color: dim ? "#94a3b8" : "#64748b", fontSize: 11, marginBottom: 3 }}><PinIcon /><span>{c.direccion}</span></div>}
                      {c.horario && <div style={{ display: "flex", alignItems: "center", gap: 4, color: dim ? "#94a3b8" : "#0369a1", fontSize: 11, fontWeight: "600" }}><ClockIcon /><span>{c.horario}</span></div>}
                    </div>
                    <button onClick={() => !dim && marcarRecogido(c.id)} disabled={dim} style={{ padding: "8px 14px", borderRadius: 99, border: "none", cursor: dim ? "default" : "pointer", fontSize: 12, fontWeight: "bold", flexShrink: 0, background: dim ? "#94a3b8" : "linear-gradient(135deg, #0369a1, #0284c7)", color: "#fff", display: "flex", alignItems: "center", gap: 5, boxShadow: dim ? "none" : "0 2px 8px rgba(3,105,161,0.3)", transition: "all 0.3s" }}>
                      <CheckIcon /> {dim ? "Recogida" : "Recoger"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── PESTAÑA HISTORIAL ── */}
        {filtro === "historial" && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 2px" }}>
              <ListIcon />
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#0c4a6e" }}>Historial de recogidas</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>{historial.length} entrada{historial.length !== 1 ? "s" : ""}</span>
            </div>
            {historial.length === 0 && (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 20px", fontSize: 14, background: "#fff", borderRadius: 14, border: "1.5px dashed #e2e8f0" }}>
                Aún no hay ninguna recogida registrada.<br/>
                <span style={{ fontSize: 12 }}>Pulsa "Recoger" en la pestaña de Pendientes.</span>
              </div>
            )}
            <div style={{ background: "#fff", borderRadius: 13, border: "1.5px solid #e0f2fe", overflow: "hidden", boxShadow: "0 2px 10px rgba(14,165,233,0.06)" }}>
              {historial.map((r, i) => (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < historial.length - 1 ? "1px solid #f0f9ff" : "none", animation: "fadeUp 0.3s ease both", animationDelay: `${i * 0.03}s` }}>
                  <span style={{ fontSize: 11, color: "#cbd5e1", fontWeight: "bold", width: 20, textAlign: "right", flexShrink: 0 }}>{historial.length - i}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: "600", color: "#0c4a6e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.nombre}</span>
                  <span style={{ fontSize: 11, color: "#0369a1", flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}><CalIcon />{fmt(r.ts)}</span>
                </div>
              ))}
            </div>
            {historial.length > 0 && (
              <div style={{ marginTop: 14, textAlign: "center" }}>
                <button onClick={() => { if (window.confirm("¿Borrar todo el historial?")) setHistorial([]); }} style={{ fontSize: 12, color: "#94a3b8", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
                  🗑 Borrar historial
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── PESTAÑA RECOGIDAS: REGISTRO ── */}
        {filtro === "recogido" && (
          <div style={{ marginTop: 14 }}>

            {/* Cabecera del registro */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 2px" }}>
              <ListIcon />
              <span style={{ fontSize: 13, fontWeight: "bold", color: "#0c4a6e" }}>Registro de recogidas</span>
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>{registros.length} entrada{registros.length !== 1 ? "s" : ""}</span>
            </div>

            {registros.length === 0 && (
              <div style={{ textAlign: "center", color: "#94a3b8", padding: "40px 20px", fontSize: 14, background: "#fff", borderRadius: 14, border: "1.5px dashed #e2e8f0" }}>
                Aún no has recogido ninguna clínica.<br/>
                <span style={{ fontSize: 12 }}>Pulsa "Recoger" en la pestaña de Pendientes.</span>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {registros.map((r, i) => (
                <div key={r.id} className="reg-row" style={{ background: "#fff", borderRadius: 13, padding: "12px 14px", border: "1.5px solid #bbf7d0", boxShadow: "0 2px 10px rgba(34,197,94,0.07)", display: "flex", alignItems: "center", gap: 10, transition: "background 0.15s", animation: "fadeUp 0.3s ease both", animationDelay: `${i * 0.04}s` }}>
                  {/* Número */}
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontSize: 12, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {registros.length - i}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: "bold", color: "#15803d", fontSize: 13, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.nombre}</div>
                    {r.direccion && <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#64748b", fontSize: 11, marginBottom: 2 }}><PinIcon /><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.direccion}</span></div>}
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#dcfce7", borderRadius: 6, padding: "2px 7px" }}>
                      <CalIcon />
                      <span style={{ fontSize: 10, color: "#15803d", fontWeight: "bold" }}>{fmt(r.ts)}</span>
                    </div>
                  </div>
                  <button className="btn-pkg" onClick={() => devolverPendiente(r.id)} title="Devolver a pendiente" style={{ flexShrink: 0, background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 9, cursor: "pointer", color: "#16a34a", padding: "6px 8px", transition: "all 0.18s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    📦
                  </button>
                </div>
              ))}
            </div>

            {registros.length > 0 && (
              <div style={{ marginTop: 14, textAlign: "center" }}>
                <button onClick={() => { if (window.confirm("¿Borrar todo el registro? Las clínicas volverán a pendiente.")) { setRegistros([]); setClinicas(prev => prev.map(c => ({ ...c, estado: "pendiente" }))); } }} style={{ fontSize: 12, color: "#94a3b8", background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
                  📦 Devolver todas a pendiente
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
