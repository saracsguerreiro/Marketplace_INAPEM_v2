import { Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";

const salesData = [
  { id: "jan", month: "Jan", sales: 32000 },
  { id: "fev", month: "Fev", sales: 45000 },
  { id: "mar", month: "Mar", sales: 38000 },
  { id: "abr", month: "Abr", sales: 52000 },
  { id: "mai", month: "Mai", sales: 48000 },
];

export function SupplierDashboard() {
  const stats = [
    { icon: DollarSign, label: "Vendas Este Mês", value: "48.000 Kz", trend: "+12%", trendUp: true, color: "text-green-600", bg: "bg-green-100" },
    { icon: Package,    label: "Produtos Ativos",  value: "24",         trend: "+3",   trendUp: true, color: "text-blue-600",  bg: "bg-blue-100"  },
    { icon: Users,      label: "Clientes Ativos",  value: "156",        trend: "+18",  trendUp: true, color: "text-violet-600",bg: "bg-violet-100"},
    { icon: TrendingUp, label: "Taxa de Conversão",value: "34%",        trend: "+5%",  trendUp: true, color: "text-rose-500",  bg: "bg-rose-100"  },
  ];

  const recentSales = [
    { id: "1", date: "05 Mai 2026", client: "TechStart Lda",      product: "Software ERP",    amount: 450000, payment: "Financiado 12x", status: "Confirmado" },
    { id: "2", date: "04 Mai 2026", client: "Comércio Online SA",  product: "Sistema CRM",     amount: 320000, payment: "Financiado 24x", status: "Processando" },
    { id: "3", date: "02 Mai 2026", client: "Consultoria Pro",     product: "Licenças Premium",amount: 185000, payment: "À vista",        status: "Entregue" },
  ];

  const topProducts = [
    { name: "Software ERP",  sales: 15, revenue: 6750000, pct: 38 },
    { name: "Sistema CRM",   sales: 22, revenue: 7040000, pct: 48 },
    { name: "Consultoria",   sales: 8,  revenue: 2240000, pct: 14 },
  ];

  const barColors = ["bg-indigo-400", "bg-blue-400", "bg-violet-300"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-violet-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Painel do Fornecedor</h1>
          <p className="text-sm text-gray-400">Gerencie os seus produtos e vendas</p>
        </div>

        <InsightsPanel insights={[
          { type: "up",    title: "Vendas em crescimento",  description: "As suas vendas aumentaram 20% esta semana. Software ERP liderou com 8 novas encomendas." },
          { type: "tip",   title: "Produto mais rentável",  description: "Consultoria representa 38% da sua receita com apenas 8 vendas.", action: "Ver produto" },
          { type: "alert", title: "Encomendas pendentes",   description: "Tem 2 encomendas sem resposta há mais de 24h.", action: "Responder agora" },
          { type: "tip",   title: "Oportunidade cross-sell",description: "Clientes de CRM também adquirem ERP. Considere criar um pacote.", action: "Criar pacote" },
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

          {/* Area chart */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Vendas Mensais</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={salesData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2.5} fill="url(#gradGreen)" name="Vendas (Kz)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top produtos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Produtos Mais Vendidos</h3>
            <div className="space-y-5">
              {topProducts.map((product, index) => (
                <div key={product.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 ${barColors[index]} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{product.name}</div>
                        <div className="text-xs text-gray-400">{product.sales} vendas</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">{product.revenue.toLocaleString()} Kz</div>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${barColors[index]} rounded-full`} style={{ width: `${product.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-gray-700">Vendas Recentes</h3>
            <button className="bg-coral text-white text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
              Adicionar Produto
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {["Data","Cliente","Produto","Valor","Pagamento","Estado"].map(h => (
                  <th key={h} className="text-left text-xs text-gray-400 font-medium pb-3 px-2">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-t border-gray-50">
                  <td className="py-3.5 px-2 text-xs text-gray-400">{sale.date}</td>
                  <td className="py-3.5 px-2 text-sm font-medium text-gray-700">{sale.client}</td>
                  <td className="py-3.5 px-2 text-sm text-gray-600">{sale.product}</td>
                  <td className="py-3.5 px-2 text-sm font-semibold text-gray-800">{sale.amount.toLocaleString()} Kz</td>
                  <td className="py-3.5 px-2 text-xs text-gray-400">{sale.payment}</td>
                  <td className="py-3.5 px-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      sale.status === "Entregue"   ? "bg-green-100 text-green-600"  :
                      sale.status === "Confirmado" ? "bg-blue-100 text-blue-600"    :
                                                     "bg-amber-100 text-amber-600"
                    }`}>
                      {sale.status}
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
