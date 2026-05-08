import { Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";

const salesData = [
  { month: "Jan", sales: 32000 },
  { month: "Fev", sales: 45000 },
  { month: "Mar", sales: 38000 },
  { month: "Abr", sales: 52000 },
  { month: "Mai", sales: 48000 },
];

const card: React.CSSProperties = { background: "rgba(255,255,255,0.45)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" };
const inner: React.CSSProperties = { background: "rgba(255,255,255,0.6)" };

export function SupplierDashboard() {
  const stats = [
    { icon: DollarSign, label: "Vendas Este Mês",  value: "48.000 Kz", trend: "+12%", up: true  },
    { icon: Package,    label: "Produtos Ativos",  value: "24",         trend: "+3",   up: true  },
    { icon: Users,      label: "Clientes Ativos",  value: "156",        trend: "+18",  up: true  },
    { icon: TrendingUp, label: "Taxa Conversão",   value: "34%",        trend: "+5%",  up: true  },
  ];

  const recentSales = [
    { id: "1", date: "05 Mai", client: "TechStart Lda",      product: "Software ERP",     amount: 450000, payment: "Financiado 12x", status: "Confirmado"  },
    { id: "2", date: "04 Mai", client: "Comércio Online SA",  product: "Sistema CRM",      amount: 320000, payment: "Financiado 24x", status: "Processando" },
    { id: "3", date: "02 Mai", client: "Consultoria Pro",     product: "Licenças Premium", amount: 185000, payment: "À vista",        status: "Entregue"    },
  ];

  const topProducts = [
    { name: "Sistema CRM",  sales: 22, revenue: 7040000, pct: 48, color: "bg-indigo-400/70" },
    { name: "Software ERP", sales: 15, revenue: 6750000, pct: 38, color: "bg-violet-400/70" },
    { name: "Consultoria",  sales: 8,  revenue: 2240000, pct: 14, color: "bg-blue-300/70"   },
  ];

  const statusStyle = (s: string) =>
    s === "Entregue"    ? "bg-green-100/80 text-green-600"  :
    s === "Confirmado"  ? "bg-blue-100/80 text-blue-600"    :
                          "bg-amber-100/80 text-amber-600";

  return (
    <div className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #6366f1 0%, #f97316 40%, #6b7280 75%, #1a1a1a 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Painel do Fornecedor</h1>
          <p className="text-sm text-gray-500">Gerencie os seus produtos e vendas</p>
        </div>

        <InsightsPanel insights={[
          { type: "up",    title: "Vendas em crescimento",   description: "Vendas aumentaram 20% esta semana." },
          { type: "tip",   title: "Produto mais rentável",   description: "Consultoria representa 38% da receita.", action: "Ver produto" },
          { type: "alert", title: "Encomendas pendentes",    description: "2 encomendas sem resposta há 24h.", action: "Responder agora" },
          { type: "tip",   title: "Oportunidade cross-sell", description: "CRM e ERP comprados juntos frequentemente.", action: "Criar pacote" },
        ]} />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl p-5 shadow-sm" style={card}>
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
          <div className="rounded-2xl p-6 shadow-sm" style={card}>
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Vendas Mensais</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="sgGreen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "none", background: "rgba(255,255,255,0.9)", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: 11 }} />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={1.5} fill="url(#sgGreen)" name="Vendas (Kz)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Top produtos */}
          <div className="rounded-2xl p-6 shadow-sm" style={card}>
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Produtos Mais Vendidos</h3>
            <div className="space-y-5">
              {topProducts.map((p, i) => (
                <div key={p.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-6 h-6 ${p.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.sales} vendas</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">{(p.revenue / 1000000).toFixed(1)}M Kz</div>
                  </div>
                  <div className="h-1 bg-white/60 rounded-full overflow-hidden">
                    <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl p-6 shadow-sm" style={card}>
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
              {recentSales.map((s) => (
                <tr key={s.id} className="border-t border-white/30">
                  <td className="py-3.5 px-2 text-xs text-gray-400">{s.date}</td>
                  <td className="py-3.5 px-2 text-sm font-medium text-gray-700">{s.client}</td>
                  <td className="py-3.5 px-2 text-sm text-gray-600">{s.product}</td>
                  <td className="py-3.5 px-2 text-sm font-semibold text-gray-800">{s.amount.toLocaleString()} Kz</td>
                  <td className="py-3.5 px-2 text-xs text-gray-400">{s.payment}</td>
                  <td className="py-3.5 px-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyle(s.status)}`}>
                      {s.status}
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
