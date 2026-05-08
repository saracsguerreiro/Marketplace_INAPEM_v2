import { Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
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
    {
      icon: DollarSign,
      label: "Vendas Este Mês",
      value: "48.000 Kz",
      trend: "+12%",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      icon: Package,
      label: "Produtos Ativos",
      value: "24",
      trend: "+3",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Users,
      label: "Clientes Ativos",
      value: "156",
      trend: "+18",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: TrendingUp,
      label: "Taxa de Conversão",
      value: "34%",
      trend: "+5%",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  const recentSales = [
    {
      id: "1",
      date: "05 Mai 2026",
      client: "TechStart Lda",
      product: "Software ERP",
      amount: 450000,
      payment: "Financiado 12x",
      status: "Confirmado",
    },
    {
      id: "2",
      date: "04 Mai 2026",
      client: "Comércio Online SA",
      product: "Sistema CRM",
      amount: 320000,
      payment: "Financiado 24x",
      status: "Processando",
    },
    {
      id: "3",
      date: "02 Mai 2026",
      client: "Consultoria Pro",
      product: "Licenças Premium",
      amount: 185000,
      payment: "À vista",
      status: "Entregue",
    },
  ];

  const topProducts = [
    { name: "Software ERP", sales: 15, revenue: 6750000 },
    { name: "Sistema CRM", sales: 22, revenue: 7040000 },
    { name: "Consultoria", sales: 8, revenue: 2240000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-2">Dashboard - Fornecedor</h1>
        <p className="text-muted-foreground">Gerencie seus produtos e vendas</p>
      </div>

      <InsightsPanel insights={[
        {
          type: "up",
          title: "Vendas em crescimento",
          description: "As suas vendas aumentaram 20% esta semana face à semana anterior. Software ERP liderou com 8 novas encomendas.",
        },
        {
          type: "tip",
          title: "Produto mais rentável",
          description: "Consultoria representa 38% da sua receita total com apenas 8 vendas. Considere aumentar o preço ou criar pacotes premium.",
          action: "Ver produto",
        },
        {
          type: "alert",
          title: "Encomendas pendentes",
          description: "Tem 2 encomendas sem resposta há mais de 24h. Responder rapidamente melhora a sua avaliação no marketplace.",
          action: "Responder agora",
        },
        {
          type: "tip",
          title: "Oportunidade de cross-sell",
          description: "Clientes que compram Sistema CRM também costumam adquirir Software ERP. Considere criar um pacote combinado.",
          action: "Criar pacote",
        },
      ]} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm text-green-600">{stat.trend}</span>
              </div>
              <div className="text-2xl mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="mb-6">Vendas Mensais</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#030213" name="Vendas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="mb-6">Produtos Mais Vendidos</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-coral text-coral-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.sales} vendas
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.revenue.toLocaleString()} Kz</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2>Vendas Recentes</h2>
          <button className="bg-coral text-coral-foreground px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
            Adicionar Produto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Data</th>
                <th className="text-left py-3 px-4">Cliente</th>
                <th className="text-left py-3 px-4">Produto</th>
                <th className="text-left py-3 px-4">Valor</th>
                <th className="text-left py-3 px-4">Pagamento</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="border-b border-border">
                  <td className="py-4 px-4 text-muted-foreground">{sale.date}</td>
                  <td className="py-4 px-4">{sale.client}</td>
                  <td className="py-4 px-4">{sale.product}</td>
                  <td className="py-4 px-4">{sale.amount.toLocaleString()} Kz</td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{sale.payment}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        sale.status === "Entregue"
                          ? "bg-green-100 text-green-700"
                          : sale.status === "Confirmado"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
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
