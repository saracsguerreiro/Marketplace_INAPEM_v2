import { useState } from "react";
import { Package, DollarSign, Users, TrendingUp, Plus, Trash2, X, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";
import { allProducts, Product } from "../data/products";

const salesData = [
  { month: "Jan", sales: 32000 },
  { month: "Fev", sales: 45000 },
  { month: "Mar", sales: 38000 },
  { month: "Abr", sales: 52000 },
  { month: "Mai", sales: 48000 },
];

const card: React.CSSProperties = { background: "#ffffff" };

const SUPPLIER_NAME = "TechSolutions Angola";

const CATEGORIES = ["Tecnologia", "Equipamentos", "Serviços", "Construção", "Logística", "Saúde", "Agronegócio", "Outros"];

const emptyForm = {
  name: "",
  category: "Tecnologia",
  type: "produto" as Product["type"],
  price: "",
  description: "",
  features: "",
};

export function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "products">("overview");
  const [products, setProducts] = useState<Product[]>(
    allProducts.filter((p) => p.supplier === SUPPLIER_NAME)
  );
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const stats = [
    { icon: DollarSign, label: "Vendas Este Mês",  value: "48.000 Kz", trend: "+12%", up: true  },
    { icon: Package,    label: "Produtos Ativos",  value: String(products.length), trend: "+3", up: true  },
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

  function handleAddProduct() {
    if (!form.name.trim() || !form.price) return;
    const newProduct: Product = {
      id: Date.now().toString(),
      name: form.name.trim(),
      category: form.category,
      type: form.type,
      price: Number(form.price),
      supplier: SUPPLIER_NAME,
      rating: 0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1554246247-6993b606e8b9?w=400&q=80",
      description: form.description.trim(),
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
    };
    setProducts((prev) => [newProduct, ...prev]);
    setForm(emptyForm);
    setShowModal(false);
  }

  function handleRemove(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
  }

  return (
    <div className="min-h-screen" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Painel do Fornecedor</h1>
          <p className="text-sm text-gray-500">Gerencie os seus produtos e vendas</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-2xl p-1 shadow-sm w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "overview"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "products"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Package className="w-4 h-4" />
            Os Meus Produtos
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              activeTab === "products" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
            }`}>
              {products.length}
            </span>
          </button>
        </div>

        {/* ── TAB: VISÃO GERAL ── */}
        {activeTab === "overview" && (
          <>
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
                <button
                  onClick={() => setActiveTab("products")}
                  className="bg-indigo-500 text-white text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  Gerir Produtos
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
                    <tr key={s.id} className="border-t border-gray-100">
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
          </>
        )}

        {/* ── TAB: OS MEUS PRODUTOS ── */}
        {activeTab === "products" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Os Meus Produtos</h2>
                <p className="text-sm text-gray-500">{products.length} produto{products.length !== 1 ? "s" : ""} publicado{products.length !== 1 ? "s" : ""}</p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Adicionar Produto
              </button>
            </div>

            {products.length === 0 ? (
              <div className="rounded-2xl p-12 text-center shadow-sm" style={card}>
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Ainda não tem produtos publicados</p>
                <p className="text-sm text-gray-400 mb-5">Adicione o seu primeiro produto ao marketplace</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors"
                >
                  Adicionar Produto
                </button>
              </div>
            ) : (
              <div className="rounded-2xl shadow-sm overflow-hidden" style={card}>
                {/* List header */}
                <div className="grid grid-cols-[64px_1fr_110px_110px_130px_120px_48px] gap-4 items-center px-5 py-3 border-b border-gray-100 bg-gray-50/60">
                  <div />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Produto</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Tipo</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Categoria</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Preço</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Detalhes</span>
                  <div />
                </div>

                {products.map((p, idx) => {
                  const isExpanded = expandedId === p.id;
                  return (
                    <div key={p.id} className={idx !== 0 ? "border-t border-gray-100" : ""}>
                      {/* Main row */}
                      <div className="grid grid-cols-[64px_1fr_110px_110px_130px_120px_48px] gap-4 items-center px-5 py-4">
                        {/* Photo */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Name + description */}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 leading-snug truncate mb-1">{p.name}</p>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{p.description}</p>
                        </div>

                        {/* Type */}
                        <div>
                          <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${
                            p.type === "produto"
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-violet-100 text-violet-600"
                          }`}>
                            {p.type === "produto" ? "Produto" : "Serviço"}
                          </span>
                        </div>

                        {/* Category */}
                        <div>
                          <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                            {p.category}
                          </span>
                        </div>

                        {/* Price */}
                        <div>
                          <div className="text-base font-bold text-gray-800">{p.price.toLocaleString()} Kz</div>
                          {p.reviews > 0 && (
                            <div className="text-xs text-gray-400 mt-0.5">{p.reviews} avaliações</div>
                          )}
                        </div>

                        {/* Expand toggle */}
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : p.id)}
                          className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors w-fit"
                        >
                          {isExpanded ? (
                            <><ChevronUp className="w-3.5 h-3.5" /> Fechar</>
                          ) : (
                            <><ChevronDown className="w-3.5 h-3.5" /> Ver mais</>
                          )}
                        </button>

                        {/* Remove */}
                        <button
                          onClick={() => setConfirmDelete(p.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Remover produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="px-5 pb-5 bg-gray-50/50 border-t border-gray-100">
                          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Description full */}
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Descrição completa</p>
                              <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                            </div>
                            {/* Features */}
                            {p.features.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Características</p>
                                <ul className="space-y-1.5">
                                  {p.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                      <CheckCircle2 className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          {/* Remove inside expanded */}
                          <div className="mt-5 pt-4 border-t border-gray-200 flex justify-end">
                            <button
                              onClick={() => setConfirmDelete(p.id)}
                              className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-full transition-colors border border-rose-200"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remover produto
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── MODAL: ADICIONAR PRODUTO ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">Novo Produto</h2>
              <button onClick={() => { setShowModal(false); setForm(emptyForm); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Nome do produto *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ex: Sistema ERP Completo"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tipo *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as Product["type"] })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                  >
                    <option value="produto">Produto</option>
                    <option value="serviço">Serviço</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Categoria *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Preço (Kz) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Ex: 450000"
                  min={0}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Descrição</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Descreva o produto ou serviço..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Características <span className="text-gray-400">(uma por linha)</span>
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  placeholder={"Garantia de 2 anos\nSuporte técnico incluído\nInstalação gratuita"}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); }}
                className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddProduct}
                disabled={!form.name.trim() || !form.price}
                className="flex-1 bg-indigo-500 text-white text-sm py-2.5 rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Adicionar Produto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: CONFIRMAR REMOÇÃO ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-base font-semibold text-gray-800 text-center mb-2">Remover produto?</h3>
            <p className="text-sm text-gray-500 text-center mb-6">Esta acção não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleRemove(confirmDelete)}
                className="flex-1 bg-rose-500 text-white text-sm py-2.5 rounded-xl hover:bg-rose-600 transition-colors"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
