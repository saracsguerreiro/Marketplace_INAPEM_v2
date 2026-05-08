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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-coral" />
            <span className="text-xs text-coral font-semibold uppercase tracking-wide">Gestor INAPEM</span>
          </div>
          <h1 className="mb-1">Painel de Gestão</h1>
          <p className="text-muted-foreground text-sm">Gerencie registos, financiamentos e análises de risco</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <div className="font-semibold text-foreground">Gestor: Admin INAPEM</div>
          <div>Última sessão: hoje, 09:14</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-8 overflow-x-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-1 justify-center ${
              tab === key ? "bg-white text-coral shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {tab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Empresas Pendentes",       value: pendingCompanies.length,   color: "text-orange-500", bg: "bg-orange-50",  icon: Building2   },
              { label: "Fornecedores Pendentes",   value: pendingSuppliers.length,   color: "text-blue-600",   bg: "bg-blue-50",    icon: ShoppingBag },
              { label: "Financiamentos em Análise",value: pendingFinancing.length,   color: "text-purple-600", bg: "bg-purple-50",  icon: FileText    },
              { label: "Aprovações Hoje",          value: 3,                         color: "text-green-600",  bg: "bg-green-50",   icon: CheckCircle },
            ].map(({ label, value, color, bg, icon: Icon }) => (
              <div key={label} className="bg-white border-2 border-border rounded-2xl p-5">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className={`text-3xl font-extrabold ${color} mb-1`}>{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <InsightsPanel insights={[
            { type: "alert",  title: "Pedido de alto valor pendente", description: "FIN-2026-04798 (680.000 Kz) aguarda decisão há 2 dias. Score de risco: 61 — requer atenção prioritária.", action: "Analisar agora" },
            { type: "up",     title: "Taxa de aprovação semanal", description: "83% dos pedidos desta semana foram aprovados, acima da média histórica de 74%." },
            { type: "tip",    title: "Padrão detectado", description: "3 pedidos do sector Construção submetidos esta semana — volume 40% acima do normal para este período." },
            { type: "alert",  title: "Alerta de anomalia", description: "TecnoLuanda Lda declarou volume de negócios 22% acima da média sectorial. Valide os documentos antes de aprovar." },
          ]} />

          {/* Decisões recentes */}
          <div className="bg-white border-2 border-border rounded-2xl p-6">
            <h3 className="mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-coral" /> Decisões Recentes</h3>
            <div className="space-y-3">
              {recentDecisions.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold">{d.company}</p>
                    <p className="text-xs text-muted-foreground">{d.id} · {d.date} · Score: {d.score}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">{d.amount.toLocaleString()} Kz</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      d.decision === "Aprovado" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>{d.decision}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ── EMPRESAS ── */}
      {tab === "empresas" && (
        <div className="bg-white border-2 border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="flex items-center gap-2"><Building2 className="w-4 h-4 text-coral" /> Registos de Empresas Pendentes</h3>
            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">{pendingCompanies.length} pendentes</span>
          </div>
          <div className="divide-y divide-border">
            {pendingCompanies.map((c) => (
              <div key={c.id} className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">NIF: {c.nif} · {c.sector} · {c.docs} documentos · {c.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs flex items-center gap-1 px-3 py-1.5 border border-border rounded-full hover:border-coral transition-colors">
                    <Eye className="w-3 h-3" /> Ver docs
                  </button>
                  <button
                    onClick={() => decide(c.id, "aprovado")}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${decisions[c.id] === "aprovado" ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                  >
                    {decisions[c.id] === "aprovado" ? "✓ Aprovado" : "Aprovar"}
                  </button>
                  <button
                    onClick={() => decide(c.id, "rejeitado")}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${decisions[c.id] === "rejeitado" ? "bg-red-600 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                  >
                    {decisions[c.id] === "rejeitado" ? "✗ Rejeitado" : "Rejeitar"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FORNECEDORES ── */}
      {tab === "fornecedores" && (
        <div className="bg-white border-2 border-border rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-coral" /> Registos de Fornecedores Pendentes</h3>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{pendingSuppliers.length} pendentes</span>
          </div>
          <div className="divide-y divide-border">
            {pendingSuppliers.map((f) => (
              <div key={f.id} className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground">NIF: {f.nif} · {f.category} · {f.products} produtos submetidos · {f.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs flex items-center gap-1 px-3 py-1.5 border border-border rounded-full hover:border-coral transition-colors">
                    <Eye className="w-3 h-3" /> Ver perfil
                  </button>
                  <button
                    onClick={() => decide(f.id, "aprovado")}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${decisions[f.id] === "aprovado" ? "bg-green-600 text-white" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                  >
                    {decisions[f.id] === "aprovado" ? "✓ Aprovado" : "Aprovar"}
                  </button>
                  <button
                    onClick={() => decide(f.id, "rejeitado")}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${decisions[f.id] === "rejeitado" ? "bg-red-600 text-white" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                  >
                    {decisions[f.id] === "rejeitado" ? "✗ Rejeitado" : "Rejeitar"}
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
            const scoreBg   = f.score >= 70 ? "bg-green-50 border-green-200" : f.score >= 50 ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200";
            const scoreLabel = f.score >= 70 ? "Risco Baixo" : f.score >= 50 ? "Risco Médio" : "Risco Elevado";

            return (
              <div key={f.id} className="bg-white border-2 border-border rounded-2xl overflow-hidden">
                {/* Cabeçalho do pedido */}
                <div className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{f.company}</p>
                    <p className="text-xs text-muted-foreground">{f.id} · {f.date} · {f.term}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm">{f.amount.toLocaleString()} Kz</span>
                    <span className={`text-xs font-bold ${scoreColor}`}>{f.score}/100</span>
                    {f.fraudAlerts > 0 && (
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {f.fraudAlerts} alerta
                      </span>
                    )}
                    <button
                      onClick={() => setExpandedFinancing(expanded ? null : f.id)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Análise expandida */}
                {expanded && (
                  <div className="border-t border-border px-5 pb-6 pt-5 space-y-5">
                    {/* Score */}
                    <div className={`border-2 rounded-2xl p-5 flex items-center gap-6 ${scoreBg}`}>
                      <div className="text-center flex-shrink-0">
                        <div className={`text-4xl font-extrabold ${scoreColor}`}>{f.score}</div>
                        <div className="text-xs text-muted-foreground mt-1">de 100</div>
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold mb-1 ${scoreColor}`}>{scoreLabel}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className={`h-2.5 rounded-full ${f.score >= 70 ? "bg-green-500" : f.score >= 50 ? "bg-orange-400" : "bg-red-500"}`} style={{ width: `${f.score}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Score calculado com base nos documentos e dados da empresa</p>
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
                            <div key={i} className="flex justify-between items-start bg-green-50 border border-green-100 rounded-xl px-3 py-2 gap-2">
                              <p className="text-xs leading-relaxed">{r.text}</p>
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
                            <div key={i} className="flex justify-between items-start bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 gap-2">
                              <p className="text-xs leading-relaxed">{r.text}</p>
                              <span className="text-xs font-bold text-orange-500 flex-shrink-0">{r.weight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detecção de fraude */}
                    <div className="border-2 border-border rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">🔍 Detecção de Anomalias e Fraudes</h4>
                        {f.fraudAlerts === 0
                          ? <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Tudo OK</span>
                          : <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">{f.fraudAlerts} alerta(s)</span>
                        }
                      </div>
                      <div className="space-y-2">
                        {f.fraudChecks.map((c, i) => (
                          <div key={i} className={`flex items-start gap-3 rounded-xl px-3 py-2.5 border ${c.ok ? "bg-gray-50 border-gray-100" : "bg-orange-50 border-orange-200"}`}>
                            {c.ok ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />}
                            <div>
                              <p className="text-xs font-semibold">{c.label}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{c.detail}</p>
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
                          className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 border-2 border-red-200 py-3 rounded-xl hover:bg-red-100 transition-colors font-semibold"
                        >
                          <XCircle className="w-4 h-4" /> Rejeitar Pedido
                        </button>
                        <button
                          onClick={() => decide(f.id, "aprovado")}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
                        >
                          <CheckCircle className="w-4 h-4" /> Aprovar Pedido
                        </button>
                      </div>
                    ) : (
                      <div className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold ${decided === "aprovado" ? "bg-green-50 text-green-700 border-2 border-green-200" : "bg-red-50 text-red-600 border-2 border-red-200"}`}>
                        {decided === "aprovado" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
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
              { label: "Total Financiado (Maio)", value: "4.250.000 Kz", trend: "+18% vs. Abril", up: true },
              { label: "Taxa de Aprovação",        value: "83%",          trend: "+9% vs. mês anterior", up: true },
              { label: "Pedidos Rejeitados",       value: "17%",          trend: "-9% vs. mês anterior", up: false },
            ].map(({ label, value, trend, up }) => (
              <div key={label} className="bg-white border-2 border-border rounded-2xl p-5">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="text-2xl font-extrabold mb-1">{value}</p>
                <p className={`text-xs font-medium ${up ? "text-green-600" : "text-red-500"}`}>{trend}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-coral" />
              <h3 className="text-sm font-semibold">Insights do Período</h3>
            </div>
            <div className="space-y-3">
              {[
                { icon: TrendingUp, color: "text-green-600 bg-green-50", text: "O sector de Tecnologia representou 38% dos pedidos aprovados em Maio — o maior volume desde Janeiro." },
                { icon: AlertCircle, color: "text-orange-500 bg-orange-50", text: "Detectadas 3 anomalias de fraude em documentos este mês. Nenhuma resultou em aprovação indevida." },
                { icon: Users, color: "text-blue-600 bg-blue-50", text: "12 novas empresas registadas esta semana — crescimento de 25% face à semana anterior." },
                { icon: Shield, color: "text-purple-600 bg-purple-50", text: "Score médio de risco dos pedidos aprovados: 76/100. Score dos rejeitados: 41/100." },
              ].map(({ icon: Icon, color, text }, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold mb-4">Distribuição por Sector</h3>
            <div className="space-y-3">
              {[
                { sector: "Tecnologia",   pct: 38, kz: "1.615.000 Kz" },
                { sector: "Construção",   pct: 24, kz: "1.020.000 Kz" },
                { sector: "Serviços",     pct: 18, kz: "765.000 Kz"   },
                { sector: "Equipamentos", pct: 12, kz: "510.000 Kz"   },
                { sector: "Outros",       pct: 8,  kz: "340.000 Kz"   },
              ].map(({ sector, pct, kz }) => (
                <div key={sector}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{sector}</span>
                    <span className="text-muted-foreground">{kz} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-coral rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
