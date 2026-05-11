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
    { id: "1", product: "Software ERP",         amount: 450000, installments: "6/12", next: "15 Mai 2026", pct: 50 },
    { id: "2", product: "Equipamento Escritório",amount: 620000, installments: "3/24", next: "20 Mai 2026", pct: 12 },
  ];

  const recentOrders = [
    { id: "1", date: "02 Mai 2026", product: "Consultoria Marketing", amount: 280000, status: "Processando" },
    { id: "2", date: "28 Abr 2026", product: "Licenças Software",     amount: 185000, status: "Entregue"    },
  ];

  return (
    <div className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #6366f1 0%, #1a1a1a 55%, #6b7280 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-gray-500">Visão geral das suas finanças e compras</p>
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
              <div key={s.label}
                className="rounded-2xl p-5 shadow-sm"
                style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.up ? "bg-green-100/80 text-green-600" : "bg-rose-100/80 text-rose-500"}`}>
                    {s.trend}
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-0.5">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Area chart */}
          <div className="rounded-2xl p-6 shadow-sm"
            style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Histórico de Gastos</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={spendingData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="cgBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#818cf8" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 11 }} />
                <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={1.5} fill="url(#cgBlue)" name="Gastos (Kz)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Financiamentos */}
          <div className="rounded-2xl p-6 shadow-sm"
            style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Financiamentos Ativos</h3>
            <div className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.5)" }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{loan.product}</div>
                      <div className="text-xs text-gray-400 mt-0.5">Parcela {loan.installments}</div>
                    </div>
                    <span className="text-xs bg-green-100/80 text-green-600 px-3 py-1 rounded-full font-medium">Em dia</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Próximo pagamento</span>
                    <span className="font-medium text-gray-600">{loan.next}</span>
                  </div>
                  <div className="h-1 bg-white/60 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400/70 rounded-full" style={{ width: `${loan.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl p-6 shadow-sm"
          style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
          <h3 className="text-sm font-semibold text-gray-700 mb-5">Pedidos Recentes</h3>
          <table className="w-full">
            <thead>
              <tr>
                {["Data","Produto","Valor","Estado"].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-t border-white/30">
                  <td className="py-3.5 px-2 text-xs text-gray-400">{o.date}</td>
                  <td className="py-3.5 px-2 text-sm font-medium text-gray-700">{o.product}</td>
                  <td className="py-3.5 px-2 text-sm font-semibold text-gray-800">{o.amount.toLocaleString()} Kz</td>
                  <td className="py-3.5 px-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${o.status === "Entregue" ? "bg-green-100/80 text-green-600" : "bg-amber-100/80 text-amber-600"}`}>
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
