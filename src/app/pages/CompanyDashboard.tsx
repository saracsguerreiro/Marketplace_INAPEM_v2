import { CreditCard, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";

const spendingData = [
  { month: "Jan", value: 12000 },
  { month: "Fev", value: 15000 },
  { month: "Mar", value: 18000 },
  { month: "Abr", value: 22000 },
  { month: "Mai", value: 25000 },
];

export function CompanyDashboard() {
  const stats = [
    { icon: CreditCard, label: "Crédito Disponível",  value: "75.000 Kz",  trend: "+15%", up: true  },
    { icon: ShoppingBag,label: "Compras Este Mês",    value: "25.000 Kz",  trend: "+8%",  up: true  },
    { icon: TrendingUp, label: "Total Financiado",    value: "150.000 Kz", trend: "+22%", up: true  },
    { icon: Clock,      label: "Próximo Vencimento",  value: "15 Mai",     trend: "5.200 Kz", up: false },
  ];

  const activeLoans = [
    { id: "1", product: "Software ERP",          amount: 450000, installments: "6/12", next: "15 Mai 2026", pct: 50 },
    { id: "2", product: "Equipamento Escritório", amount: 620000, installments: "3/24", next: "20 Mai 2026", pct: 12 },
  ];

  const recentOrders = [
    { id: "1", date: "02 Mai 2026", product: "Consultoria Marketing", amount: 280000, status: "Processando" },
    { id: "2", date: "28 Abr 2026", product: "Licenças Software",     amount: 185000, status: "Entregue"    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--ds-background-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <span className="ds-badge ds-badge--brand ds-badge--subtle mb-2" style={{ display: "inline-flex" }}>Dashboard</span>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ds-content-default)", marginBottom: "0.25rem" }}>Bem-vindo de volta</h1>
          <p style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>Visão geral das suas finanças e compras</p>
        </div>

        <InsightsPanel insights={[
          { type: "up",    title: "Tecnologia em alta",        description: "Gastou 32% mais em Tecnologia este mês.", action: "Ver produtos" },
          { type: "alert", title: "Prestações a vencer",       description: "2 prestações nos próximos 10 dias — 10.400 Kz.", action: "Ver financiamentos" },
          { type: "tip",   title: "Oportunidade de poupança",  description: "Poupe 18% ao consolidar compras num único pedido.", action: "Explorar" },
          { type: "up",    title: "Crédito bem utilizado",     description: "75% do crédito utilizado de forma eficiente." },
        ]} />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="ds-card ds-card--elevated" style={{ padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "9999px", background: "var(--ds-toned-background-default)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon style={{ width: "1rem", height: "1rem", color: "var(--ds-primary-content-default)" }} />
                  </div>
                  <span className={`ds-badge ds-badge--subtle ${s.up ? "ds-badge--success" : "ds-badge--error"}`}>
                    {s.trend}
                  </span>
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ds-content-default)", marginBottom: "0.25rem" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)" }}>{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Area chart */}
          <div className="ds-card ds-card--elevated" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ds-content-default)", marginBottom: "1.25rem" }}>Histórico de Gastos</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={spendingData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="cgBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#E94E1B" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#E94E1B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 11 }} />
                <Area type="monotone" dataKey="value" stroke="#E94E1B" strokeWidth={1.5} fill="url(#cgBrand)" name="Gastos (Kz)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Financiamentos */}
          <div className="ds-card ds-card--elevated" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ds-content-default)", marginBottom: "1.25rem" }}>Financiamentos Ativos</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {activeLoans.map((loan) => (
                <div key={loan.id} style={{ borderRadius: "var(--ds-radius-lg)", padding: "1rem", background: "var(--ds-background-subtle)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ds-content-default)" }}>{loan.product}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", marginTop: "0.125rem" }}>Parcela {loan.installments}</div>
                    </div>
                    <span className="ds-badge ds-badge--success ds-badge--subtle">Em dia</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--ds-content-subtle)", marginBottom: "0.5rem" }}>
                    <span>Próximo pagamento</span>
                    <span style={{ fontWeight: 500, color: "var(--ds-content-default)" }}>{loan.next}</span>
                  </div>
                  <div style={{ height: "0.25rem", background: "var(--ds-border-subtle)", borderRadius: "9999px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "var(--ds-primary-background-default)", borderRadius: "9999px", width: `${loan.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="ds-card ds-card--elevated" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--ds-content-default)", marginBottom: "1.25rem" }}>Pedidos Recentes</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Data","Produto","Valor","Estado"].map(h => (
                  <th key={h} style={{ textAlign: "left", fontSize: "0.75rem", color: "var(--ds-content-subtle)", fontWeight: 500, paddingBottom: "0.75rem", paddingLeft: "0.5rem", paddingRight: "0.5rem" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} style={{ borderTop: "1px solid var(--ds-border-subtle)" }}>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.75rem", color: "var(--ds-content-subtle)" }}>{o.date}</td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.875rem", fontWeight: 500, color: "var(--ds-content-default)" }}>{o.product}</td>
                  <td style={{ padding: "0.875rem 0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--ds-content-default)" }}>{o.amount.toLocaleString()} Kz</td>
                  <td style={{ padding: "0.875rem 0.5rem" }}>
                    <span className={`ds-badge ds-badge--subtle ${o.status === "Entregue" ? "ds-badge--success" : "ds-badge--warning"}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
