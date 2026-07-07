import { useState } from "react";
import {
  Users, Building2, ShoppingBag, TrendingUp, CheckCircle, XCircle,
  AlertCircle, Clock, Eye, ChevronDown, ChevronUp, Sparkles, FileText,
  BarChart2, Shield,
} from "lucide-react";
import { InsightsPanel } from "../components/InsightsPanel";

// ── Dados mock ──────────────────────────────────────────────────────

const pendingCompanies = [
  { id: "E001", name: "TecnoLuanda Lda", nif: "5417823001", sector: "Tecnologia", date: "05 Mai 2026", docs: 5 },
  { id: "E002", name: "Construções Futuro SA", nif: "6320914502", sector: "Construção", date: "04 Mai 2026", docs: 4 },
  { id: "E003", name: "AgriSul Angola", nif: "7128630043", sector: "Agronegócio", date: "03 Mai 2026", docs: 5 },
];

const pendingSuppliers = [
  { id: "F001", name: "MedEquip Angola", nif: "4812730091", category: "Saúde", date: "05 Mai 2026", products: 12 },
  { id: "F002", name: "Digital Boost Angola", nif: "5923041872", category: "Serviços", date: "04 Mai 2026", products: 5 },
];

const pendingFinancing = [
  {
    id: "FIN-2026-04821",
    company: "TecnoLuanda Lda",
    nif: "5417823001",
    amount: 250000,
    term: "12 meses",
    date: "05 Mai 2026",
    score: 74,
    fraudAlerts: 1,
    riskFactorsPositive: [
      { text: "Situação fiscal regularizada", weight: "+18 pts" },
      { text: "Empresa com mais de 5 anos de actividade", weight: "+15 pts" },
      { text: "Capital social adequado ao montante", weight: "+12 pts" },
      { text: "Documentos com alta confiança (96%)", weight: "+10 pts" },
    ],
    riskFactorsNegative: [
      { text: "Montante representa 68% da receita anual", weight: "-8 pts" },
      { text: "Sector com risco moderado", weight: "-5 pts" },
    ],
    fraudChecks: [
      { label: "Consistência do NIF", ok: true, detail: "NIF válido e activo na AGT" },
      { label: "Autenticidade da certidão", ok: true, detail: "Sem sinais de adulteração" },
      { label: "Correspondência nome/NIF", ok: true, detail: "Nome corresponde ao NIF registado" },
      { label: "Histórico de incidentes", ok: true, detail: "Sem registo de incumprimentos" },
      { label: "Coerência dos valores declarados", ok: false, detail: "Volume de negócios 22% acima da média sectorial" },
      { label: "Padrão de pedido atípico", ok: true, detail: "Montante e prazo dentro do padrão normal" },
    ],
  },
  {
    id: "FIN-2026-04798",
    company: "Construções Futuro SA",
    nif: "6320914502",
    amount: 680000,
    term: "24 meses",
    date: "03 Mai 2026",
    score: 61,
    fraudAlerts: 0,
    riskFactorsPositive: [
      { text: "Capital social elevado", weight: "+20 pts" },
      { text: "Situação fiscal regularizada", weight: "+18 pts" },
    ],
    riskFactorsNegative: [
      { text: "Empresa com menos de 3 anos", weight: "-15 pts" },
      { text: "Montante representa 87% da receita", weight: "-12 pts" },
    ],
    fraudChecks: [
      { label: "Consistência do NIF", ok: true, detail: "NIF válido e activo na AGT" },
      { label: "Autenticidade da certidão", ok: true, detail: "Sem sinais de adulteração" },
      { label: "Correspondência nome/NIF", ok: true, detail: "Nome corresponde ao NIF registado" },
      { label: "Histórico de incidentes", ok: true, detail: "Sem registo de incumprimentos" },
      { label: "Coerência dos valores declarados", ok: true, detail: "Valores dentro do esperado para o sector" },
      { label: "Padrão de pedido atípico", ok: true, detail: "Montante e prazo normais" },
    ],
  },
];

const recentDecisions = [
  { id: "FIN-2026-04710", company: "LogiTrans Angola", amount: 450000, decision: "Aprovado", date: "02 Mai 2026", score: 82 },
  { id: "FIN-2026-04695", company: "HealthCare Lda", amount: 320000, decision: "Aprovado", date: "01 Mai 2026", score: 78 },
  { id: "FIN-2026-04672", company: "StartBuild SA", amount: 900000, decision: "Rejeitado", date: "30 Abr 2026", score: 38 },
];

type Tab = "overview" | "empresas" | "fornecedores" | "financiamentos" | "relatorios";

// ── Componente principal ────────────────────────────────────────────

export function ManagerDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [expandedFinancing, setExpandedFinancing] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, "aprovado" | "rejeitado">>({});

  const decide = (id: string, decision: "aprovado" | "rejeitado") => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: "overview",       label: "Visão Geral",    icon: BarChart2   },
    { key: "empresas",       label: "Empresas",       icon: Building2   },
    { key: "fornecedores",   label: "Fornecedores",   icon: ShoppingBag },
    { key: "financiamentos", label: "Financiamentos", icon: FileText    },
    { key: "relatorios",     label: "Relatórios",     icon: TrendingUp  },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ds-background-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="ds-icon ds-icon--sm" style={{ color: "var(--ds-primary-content-default)" }} />
              <span className="ds-badge ds-badge--brand ds-badge--subtle">Gestor INAPEM</span>
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--ds-content-default)" }}>Painel de Gestão</h1>
            <p className="text-sm" style={{ color: "var(--ds-content-subtle)" }}>Gerencie registos, financiamentos e análises de risco</p>
          </div>
          <div className="text-right text-xs" style={{ color: "var(--ds-content-subtle)" }}>
            <div className="font-semibold" style={{ color: "var(--ds-content-default)" }}>Admin INAPEM</div>
            <div>Última sessão: hoje, 09:14</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="ds-tabs mb-8 overflow-x-auto shadow-sm">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`ds-tab whitespace-nowrap flex items-center gap-2 justify-center${tab === key ? " ds-tab--active" : ""}`}
            >
              <Icon className="ds-icon ds-icon--sm" />
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {tab === "overview" && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Empresas Pendentes",        value: pendingCompanies.length, color: "text-orange-500", icon: Building2   },
                { label: "Fornecedores Pendentes",    value: pendingSuppliers.length, color: "text-coral",       icon: ShoppingBag },
                { label: "Financiamentos em Análise", value: pendingFinancing.length, color: "text-coral",       icon: FileText    },
                { label: "Aprovações Hoje",           value: 3,                       color: "text-green-600",   icon: CheckCircle },
              ].map(({ label, value, color, icon: Icon }) => (
                <div key={label} className="ds-card ds-card--elevated">
                  <div className="ds-card__container">
                    <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "9999px", background: "var(--ds-background-subtle)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                      <Icon className={`ds-icon ds-icon--sm ${color}`} />
                    </div>
                    <div className={`text-3xl font-extrabold ${color} mb-1`}>{value}</div>
                    <div className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>

            <InsightsPanel insights={[
              { type: "alert", title: "Pedido de alto valor pendente",  description: "FIN-2026-04798 (680.000 Kz) aguarda decisão há 2 dias. Score de risco: 61 — requer atenção prioritária.", action: "Analisar agora" },
              { type: "up",    title: "Taxa de aprovação semanal",      description: "83% dos pedidos desta semana foram aprovados, acima da média histórica de 74%." },
              { type: "tip",   title: "Padrão detectado",               description: "3 pedidos do sector Construção submetidos esta semana — volume 40% acima do normal para este período." },
              { type: "alert", title: "Alerta de anomalia",             description: "TecnoLuanda Lda declarou volume de negócios 22% acima da média sectorial. Valide os documentos antes de aprovar." },
            ]} />

            <div className="ds-card ds-card--elevated">
              <div className="ds-card__container">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--ds-content-default)" }}>
                  <Clock className="ds-icon ds-icon--sm" style={{ color: "var(--ds-primary-content-default)" }} /> Decisões Recentes
                </h3>
                <div className="space-y-1">
                  {recentDecisions.map((d) => (
                    <div key={d.id} className="flex items-center justify-between py-3" style={{ borderTop: "1px solid var(--ds-border-default)" }}>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>{d.company}</p>
                        <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{d.id} · {d.date} · Score: {d.score}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm" style={{ color: "var(--ds-content-default)" }}>{d.amount.toLocaleString()} Kz</span>
                        <span className={`ds-badge ${d.decision === "Aprovado" ? "ds-badge--success ds-badge--subtle" : "ds-badge--error ds-badge--subtle"}`}>
                          {d.decision}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── EMPRESAS ── */}
        {tab === "empresas" && (
          <div className="ds-card ds-card--elevated" style={{ overflow: "hidden" }}>
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid var(--ds-border-default)" }}>
              <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>
                <Building2 className="ds-icon ds-icon--sm text-coral" /> Registos de Empresas Pendentes
              </h3>
              <span className="ds-badge ds-badge--warning ds-badge--subtle">{pendingCompanies.length} pendentes</span>
            </div>
            <div>
              {pendingCompanies.map((c) => (
                <div key={c.id} className="p-5 flex items-center gap-4" style={{ borderTop: "1px solid var(--ds-border-default)" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "var(--ds-background-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Building2 className="ds-icon ds-icon--sm" style={{ color: "var(--ds-content-subtle)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "var(--ds-content-default)" }}>{c.name}</p>
                    <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>NIF: {c.nif} · {c.sector} · {c.docs} documentos · {c.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="ds-button ds-button--outline ds-button--sm">
                      <Eye className="ds-icon ds-icon--sm" /> <span className="ds-button__label">Ver docs</span>
                    </button>
                    <button
                      onClick={() => decide(c.id, "aprovado")}
                      className={`ds-button ds-button--sm ${decisions[c.id] === "aprovado" ? "ds-button--success" : "ds-button--outline"}`}
                    >
                      <span className="ds-button__label">{decisions[c.id] === "aprovado" ? "✓ Aprovado" : "Aprovar"}</span>
                    </button>
                    <button
                      onClick={() => decide(c.id, "rejeitado")}
                      className={`ds-button ds-button--sm ${decisions[c.id] === "rejeitado" ? "ds-button--danger" : "ds-button--outline"}`}
                    >
                      <span className="ds-button__label">{decisions[c.id] === "rejeitado" ? "✗ Rejeitado" : "Rejeitar"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FORNECEDORES ── */}
        {tab === "fornecedores" && (
          <div className="ds-card ds-card--elevated" style={{ overflow: "hidden" }}>
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: "1px solid var(--ds-border-default)" }}>
              <h3 className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>
                <ShoppingBag className="ds-icon ds-icon--sm text-coral" /> Registos de Fornecedores Pendentes
              </h3>
              <span className="ds-badge ds-badge--info ds-badge--subtle">{pendingSuppliers.length} pendentes</span>
            </div>
            <div>
              {pendingSuppliers.map((f) => (
                <div key={f.id} className="p-5 flex items-center gap-4" style={{ borderTop: "1px solid var(--ds-border-default)" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "var(--ds-background-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <ShoppingBag className="ds-icon ds-icon--sm" style={{ color: "var(--ds-content-subtle)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm" style={{ color: "var(--ds-content-default)" }}>{f.name}</p>
                    <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>NIF: {f.nif} · {f.category} · {f.products} produtos submetidos · {f.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="ds-button ds-button--outline ds-button--sm">
                      <Eye className="ds-icon ds-icon--sm" /> <span className="ds-button__label">Ver perfil</span>
                    </button>
                    <button
                      onClick={() => decide(f.id, "aprovado")}
                      className={`ds-button ds-button--sm ${decisions[f.id] === "aprovado" ? "ds-button--success" : "ds-button--outline"}`}
                    >
                      <span className="ds-button__label">{decisions[f.id] === "aprovado" ? "✓ Aprovado" : "Aprovar"}</span>
                    </button>
                    <button
                      onClick={() => decide(f.id, "rejeitado")}
                      className={`ds-button ds-button--sm ${decisions[f.id] === "rejeitado" ? "ds-button--danger" : "ds-button--outline"}`}
                    >
                      <span className="ds-button__label">{decisions[f.id] === "rejeitado" ? "✗ Rejeitado" : "Rejeitar"}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FINANCIAMENTOS ── */}
        {tab === "financiamentos" && (
          <div className="space-y-4">
            {pendingFinancing.map((f) => {
              const expanded = expandedFinancing === f.id;
              const decided = decisions[f.id];
              const scoreColor = f.score >= 70 ? "text-green-600" : f.score >= 50 ? "text-orange-500" : "text-red-500";
              const scoreLabel = f.score >= 70 ? "Risco Baixo" : f.score >= 50 ? "Risco Médio" : "Risco Elevado";

              return (
                <div key={f.id} className="ds-card ds-card--elevated" style={{ overflow: "hidden" }}>
                  <div className="p-5 flex items-center gap-4">
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "9999px", background: "var(--ds-background-subtle)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FileText className="ds-icon ds-icon--sm" style={{ color: "var(--ds-primary-content-default)" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "var(--ds-content-default)" }}>{f.company}</p>
                      <p className="text-xs" style={{ color: "var(--ds-content-subtle)" }}>{f.id} · {f.date} · {f.term}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm" style={{ color: "var(--ds-content-default)" }}>{f.amount.toLocaleString()} Kz</span>
                      <span className={`text-xs font-bold ${scoreColor}`}>{f.score}/100</span>
                      {f.fraudAlerts > 0 && (
                        <span className="ds-badge ds-badge--warning ds-badge--subtle">
                          <AlertCircle className="ds-icon ds-icon--sm" /> {f.fraudAlerts} alerta
                        </span>
                      )}
                      <button
                        onClick={() => setExpandedFinancing(expanded ? null : f.id)}
                        className="ds-button ds-button--ghost ds-button--icon-only ds-button--sm"
                      >
                        {expanded ? <ChevronUp className="ds-icon ds-icon--sm" /> : <ChevronDown className="ds-icon ds-icon--sm" />}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="px-5 pb-6 pt-5 space-y-5" style={{ borderTop: "1px solid var(--ds-border-default)" }}>
                      {/* Score */}
                      <div className="rounded-xl p-5 flex items-center gap-6" style={{ background: "var(--ds-background-subtle)" }}>
                        <div className="text-center flex-shrink-0">
                          <div className={`text-4xl font-extrabold ${scoreColor}`}>{f.score}</div>
                          <div className="text-xs mt-1" style={{ color: "var(--ds-content-subtle)" }}>de 100</div>
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold mb-1 ${scoreColor}`}>{scoreLabel}</div>
                          <div className="w-full rounded-full h-2" style={{ background: "var(--ds-border-default)" }}>
                            <div className={`h-2 rounded-full ${f.score >= 70 ? "bg-green-500" : f.score >= 50 ? "bg-orange-400" : "bg-red-500"}`} style={{ width: `${f.score}%` }} />
                          </div>
                          <p className="text-xs mt-1" style={{ color: "var(--ds-content-subtle)" }}>Score calculado com base nos documentos e dados da empresa</p>
                        </div>
                      </div>

                      {/* Factores */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Factores Positivos
                          </h4>
                          <div className="space-y-1.5">
                            {f.riskFactorsPositive.map((r, i) => (
                              <div key={i} className="flex justify-between items-start rounded-xl px-3 py-2 gap-2" style={{ background: "var(--ds-background-subtle)" }}>
                                <p className="text-xs leading-relaxed" style={{ color: "var(--ds-content-subtle)" }}>{r.text}</p>
                                <span className="text-xs font-bold text-green-600 flex-shrink-0">{r.weight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Factores de Risco
                          </h4>
                          <div className="space-y-1.5">
                            {f.riskFactorsNegative.map((r, i) => (
                              <div key={i} className="flex justify-between items-start rounded-xl px-3 py-2 gap-2" style={{ background: "var(--ds-background-subtle)" }}>
                                <p className="text-xs leading-relaxed" style={{ color: "var(--ds-content-subtle)" }}>{r.text}</p>
                                <span className="text-xs font-bold text-orange-500 flex-shrink-0">{r.weight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Detecção de fraude */}
                      <div className="rounded-xl p-4" style={{ background: "var(--ds-background-subtle)" }}>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--ds-content-default)" }}>🔍 Detecção de Anomalias e Fraudes</h4>
                          {f.fraudAlerts === 0
                            ? <span className="ds-badge ds-badge--success ds-badge--subtle">Tudo OK</span>
                            : <span className="ds-badge ds-badge--warning ds-badge--subtle">{f.fraudAlerts} alerta(s)</span>
                          }
                        </div>
                        <div className="space-y-2">
                          {f.fraudChecks.map((c, i) => (
                            <div key={i} className={`flex items-start gap-3 rounded-xl px-3 py-2.5`} style={{ background: c.ok ? "var(--ds-surface-default)" : "#fff7ed" }}>
                              {c.ok ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />}
                              <div>
                                <p className="text-xs font-semibold" style={{ color: "var(--ds-content-default)" }}>{c.label}</p>
                                <p className="text-xs mt-0.5" style={{ color: "var(--ds-content-subtle)" }}>{c.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Decisão do gestor */}
                      {!decided ? (
                        <div className="flex gap-3">
                          <button
                            onClick={() => decide(f.id, "rejeitado")}
                            className="ds-button ds-button--danger ds-button--lg" style={{ flex: 1 }}
                          >
                            <XCircle className="ds-icon ds-icon--sm" /> <span className="ds-button__label">Rejeitar Pedido</span>
                          </button>
                          <button
                            onClick={() => decide(f.id, "aprovado")}
                            className="ds-button ds-button--success ds-button--lg" style={{ flex: 1 }}
                          >
                            <CheckCircle className="ds-icon ds-icon--sm" /> <span className="ds-button__label">Aprovar Pedido</span>
                          </button>
                        </div>
                      ) : (
                        <div className={`flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm ${decided === "aprovado" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {decided === "aprovado" ? <CheckCircle className="ds-icon ds-icon--sm" /> : <XCircle className="ds-icon ds-icon--sm" />}
                          Pedido {decided === "aprovado" ? "Aprovado" : "Rejeitado"} — notificação enviada à empresa
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── RELATÓRIOS ── */}
        {tab === "relatorios" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Total Financiado (Maio)", value: "4.250.000 Kz", trend: "+18% vs. Abril",        up: true  },
                { label: "Taxa de Aprovação",        value: "83%",          trend: "+9% vs. mês anterior",  up: true  },
                { label: "Pedidos Rejeitados",       value: "17%",          trend: "-9% vs. mês anterior",  up: false },
              ].map(({ label, value, trend, up }) => (
                <div key={label} className="ds-card ds-card--elevated">
                  <div className="ds-card__container">
                    <p className="text-xs mb-1" style={{ color: "var(--ds-content-subtle)" }}>{label}</p>
                    <p className="text-2xl font-extrabold mb-1" style={{ color: "var(--ds-content-default)" }}>{value}</p>
                    <p className={`text-xs font-medium ${up ? "text-green-600" : "text-red-500"}`}>{trend}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ds-card ds-card--elevated">
              <div className="ds-card__container">
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="ds-icon ds-icon--sm text-coral" />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>Insights do Período</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: TrendingUp,  color: "text-green-600",  text: "O sector de Tecnologia representou 38% dos pedidos aprovados em Maio — o maior volume desde Janeiro." },
                    { icon: AlertCircle, color: "text-orange-500", text: "Detectadas 3 anomalias de fraude em documentos este mês. Nenhuma resultou em aprovação indevida." },
                    { icon: Users,       color: "text-coral",      text: "12 novas empresas registadas esta semana — crescimento de 25% face à semana anterior." },
                    { icon: Shield,      color: "text-coral",      text: "Score médio de risco dos pedidos aprovados: 76/100. Score dos rejeitados: 41/100." },
                  ].map(({ icon: Icon, color, text }, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ background: "var(--ds-background-subtle)" }}>
                      <div style={{ width: "2rem", height: "2rem", borderRadius: "9999px", background: "var(--ds-surface-default)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon className={`ds-icon ds-icon--sm ${color}`} />
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: "var(--ds-content-subtle)" }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ds-card ds-card--elevated">
              <div className="ds-card__container">
                <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--ds-content-default)" }}>Distribuição por Sector</h3>
                <div className="space-y-3">
                  {[
                    { sector: "Tecnologia",   pct: 38, kz: "1.615.000 Kz", color: "bg-indigo-400/70" },
                    { sector: "Construção",   pct: 24, kz: "1.020.000 Kz", color: "bg-violet-400/70" },
                    { sector: "Serviços",     pct: 18, kz: "765.000 Kz",   color: "bg-blue-300/70"   },
                    { sector: "Equipamentos", pct: 12, kz: "510.000 Kz",   color: "bg-pink-300/70"   },
                    { sector: "Outros",       pct: 8,  kz: "340.000 Kz",   color: "bg-purple-300/70" },
                  ].map(({ sector, pct, kz, color }) => (
                    <div key={sector}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium" style={{ color: "var(--ds-content-default)" }}>{sector}</span>
                        <span style={{ color: "var(--ds-content-subtle)" }}>{kz} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--ds-border-default)" }}>
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
