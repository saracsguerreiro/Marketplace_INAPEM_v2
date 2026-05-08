import { CreditCard, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";

const spendingData = [
  { id: "jan", month: "Jan", value: 12000 },
  { id: "fev", month: "Fev", value: 15000 },
  { id: "mar", month: "Mar", value: 18000 },
  { id: "abr", month: "Abr", value: 22000 },
  { id: "mai", month: "Mai", value: 25000 },
];

export function CompanyDashboard() {
  const stats = [
    {
      icon: CreditCard,
      label: "Crédito Disponível",
      value: "75.000 Kz",
      trend: "+15%",
      trendUp: true,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: ShoppingBag,
      label: "Compras Este Mês",
      value: "25.000 Kz",
      trend: "+8%",
      trendUp: true,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
    {
      icon: TrendingUp,
      label: "Total Financiado",
      value: "150.000 Kz",
      trend: "+22%",
      trendUp: true,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      icon: Clock,
      label: "Próximo Vencimento",
      value: "15 Mai",
      trend: "5.200 Kz",
      trendUp: false,
      color: "text-rose-500",
      bg: "bg-rose-100",
    },
  ];

  const activeLoans = [
    {
      id: "1",
      product: "Software ERP",
      amount: 450000,
      installments: "6/12",
      nextPayment: "15 Mai 2026",
      status: "Em dia",
    },
    {
      id: "2",
      product: "Equipamento Escritório",
      amount: 620000,
      installments: "3/24",
      nextPayment: "20 Mai 2026",
      status: "Em dia",
    },
  ];

  const recentOrders = [
    { id: "1", date: "02 Mai 2026", product: "Consultoria Marketing", amount: 280000, status: "Processando" },
    { id: "2", date: "28 Abr 2026", product: "Licenças Software", amount: 185000, status: "Entregue" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Bem-vindo de volta</h1>
          <p className="text-sm text-gray-400">Visão geral das suas finanças e compras</p>
        </div>

        <InsightsPanel insights={[
          { type: "up", title: "Tecnologia em alta", description: "Gastou 32% mais em Tecnologia este mês face ao mês anterior.", action: "Ver produtos" },
          { type: "alert", title: "Prestações a vencer", description: "Tem 2 prestações a vencer nos próximos 10 dias — total de 10.400 Kz.", action: "Ver financiamentos" },
          { type: "tip", title: "Oportunidade de poupança", description: "Poupe 18% ao consolidar compras de Equipamentos num único pedido.", action: "Explorar" },
          { type: "up", title: "Crédito bem utilizado", description: "Utilizou 75% do crédito disponível de forma eficiente." },
        ]} />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bg} p-2.5 rounded-full`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${stat.trendUp ? "bg-green-50 text-green-600" : "bg-rose-50 text-rose-500"}`}>
                    {stat.trend}
                  </span>
                </div>
                <div className="text-xl font-bold text-gray-800 mb-0.5">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

          {/* Área chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Histórico de Gastos</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={spendingData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradBlue)" name="Gastos (Kz)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Financiamentos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Financiamentos Ativos</h3>
            <div className="space-y-3">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="bg-slate-50 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{loan.product}</div>
                      <div className="text-xs text-gray-400 mt-0.5">Parcela {loan.installments}</div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">
                      {loan.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Próximo pagamento</span>
                    <span className="font-medium text-gray-600">{loan.nextPayment}</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full" style={{ width: loan.installments === "6/12" ? "50%" : "12.5%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-5">Pedidos Recentes</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 px-2">Data</th>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 px-2">Produto</th>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 px-2">Valor</th>
                <th className="text-left text-xs text-gray-400 font-medium pb-3 px-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-50">
                  <td className="py-3.5 px-2 text-xs text-gray-400">{order.date}</td>
                  <td className="py-3.5 px-2 text-sm font-medium text-gray-700">{order.product}</td>
                  <td className="py-3.5 px-2 text-sm font-semibold text-gray-800">{order.amount.toLocaleString()} Kz</td>
                  <td className="py-3.5 px-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      order.status === "Entregue" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      {order.status}
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
