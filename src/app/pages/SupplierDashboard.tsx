import { useState, useRef } from "react";
import { Package, DollarSign, Users, TrendingUp, Plus, Trash2, X, ChevronDown, ChevronUp, CheckCircle2, Briefcase, Upload, Sparkles, ImageIcon, RefreshCw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { InsightsPanel } from "../components/InsightsPanel";
import { Product } from "../data/products";

// Extended type with sold quantity
interface SupplierItem extends Product {
  sold: number;
}

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

const INITIAL_ITEMS: SupplierItem[] = [
  // ── PRODUTOS ──
  {
    id: "s1",
    type: "produto",
    name: "Sistema ERP Completo",
    category: "Tecnologia",
    price: 450000,
    supplier: SUPPLIER_NAME,
    rating: 4.9,
    reviews: 127,
    sold: 45,
    image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?w=400&q=80",
    description: "Sistema ERP completo para gestão empresarial, incluindo módulos de contabilidade, RH, vendas, compras e inventário.",
    features: ["Módulo de Contabilidade Integrada", "Gestão de Recursos Humanos", "Controle de Vendas e CRM", "Gestão de Inventário", "Relatórios em Tempo Real", "Suporte Técnico 24/7"],
  },
  {
    id: "s2",
    type: "produto",
    name: "Computadores Dell Workstation",
    category: "Tecnologia",
    price: 185000,
    supplier: SUPPLIER_NAME,
    rating: 4.8,
    reviews: 112,
    sold: 38,
    image: "https://images.unsplash.com/photo-1554246247-6993b606e8b9?w=400&q=80",
    description: "Estações de trabalho Dell de alta performance para escritórios e empresas. Equipamentos novos com garantia oficial.",
    features: ["Processadores Intel Core i7/i9", "16GB a 32GB de RAM", "SSD de alta velocidade", "Windows 11 Pro incluído", "Garantia Dell de 3 anos"],
  },
  {
    id: "s3",
    type: "produto",
    name: "Equipamento Médico Hospitalar",
    category: "Saúde",
    price: 420000,
    supplier: SUPPLIER_NAME,
    rating: 4.7,
    reviews: 41,
    sold: 12,
    image: "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?w=400&q=80",
    description: "Equipamento médico hospitalar certificado para clínicas, hospitais e centros de saúde. Todos cumprem normas internacionais.",
    features: ["Certificação internacional", "Manutenção preventiva incluída", "Formação para profissionais de saúde", "Garantia de 2 anos", "Suporte técnico especializado"],
  },
  {
    id: "s4",
    type: "produto",
    name: "Materiais de Construção Premium",
    category: "Construção",
    price: 620000,
    supplier: SUPPLIER_NAME,
    rating: 4.6,
    reviews: 73,
    sold: 29,
    image: "https://images.unsplash.com/photo-1773649967822-d3f31c88a16e?w=400&q=80",
    description: "Pack completo de materiais de construção para obras residenciais e comerciais. Cimento, ferro e blocos de primeira qualidade.",
    features: ["Materiais certificados", "Entrega na obra incluída", "Orçamento personalizado", "Assistência técnica", "Fornecimento contínuo garantido"],
  },
  // ── SERVIÇOS ──
  {
    id: "s5",
    type: "serviço",
    name: "Consultoria Empresarial",
    category: "Serviços",
    price: 280000,
    supplier: SUPPLIER_NAME,
    rating: 4.7,
    reviews: 54,
    sold: 22,
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&q=80",
    description: "Serviço de consultoria especializada para empresas angolanas. Diagnóstico, plano de acção e acompanhamento mensal.",
    features: ["Diagnóstico empresarial completo", "Plano de acção personalizado", "Acompanhamento mensal", "Relatórios de progresso", "Acesso a especialistas sectoriais"],
  },
  {
    id: "s6",
    type: "serviço",
    name: "Software CRM Cloud",
    category: "Tecnologia",
    price: 320000,
    supplier: SUPPLIER_NAME,
    rating: 4.6,
    reviews: 93,
    sold: 34,
    image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?w=400&q=80",
    description: "Plataforma CRM em cloud para gestão de clientes, vendas e oportunidades de negócio. Aceda de qualquer dispositivo.",
    features: ["Gestão de clientes e contactos", "Pipeline de vendas visual", "Automação de tarefas", "Integração com email e WhatsApp", "Acesso mobile iOS e Android"],
  },
  {
    id: "s7",
    type: "serviço",
    name: "Serviços de Marketing Digital",
    category: "Serviços",
    price: 180000,
    supplier: SUPPLIER_NAME,
    rating: 4.9,
    reviews: 145,
    sold: 61,
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=400&q=80",
    description: "Serviço completo de marketing digital: redes sociais, publicidade online, SEO e criação de conteúdo para o mercado angolano.",
    features: ["Gestão de redes sociais", "Publicidade no Facebook e Instagram", "Google Ads e SEO", "Relatórios mensais de desempenho", "Designer gráfico dedicado"],
  },
  {
    id: "s8",
    type: "serviço",
    name: "Frota de Transporte e Logística",
    category: "Logística",
    price: 950000,
    supplier: SUPPLIER_NAME,
    rating: 4.9,
    reviews: 68,
    sold: 17,
    image: "https://images.unsplash.com/photo-1776988038414-29a4a1869275?w=400&q=80",
    description: "Solução completa de logística e transporte para distribuição de mercadoria em todo o território angolano.",
    features: ["Frota de camiões e vans", "Cobertura nacional", "Rastreamento GPS em tempo real", "Motoristas certificados", "Seguro de carga incluído"],
  },
];

const emptyForm = {
  name: "",
  category: "Tecnologia",
  type: "produto" as Product["type"],
  price: "",
  description: "",
  features: "",
  image: "",
};

type ActiveTab = "overview" | "products" | "services";

function ItemList({
  items,
  expandedId,
  onToggleExpand,
  onRemove,
  onAdd,
  label,
}: {
  items: SupplierItem[];
  expandedId: string | null;
  onToggleExpand: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  label: string;
}) {
  const isService = label === "serviço";

  if (items.length === 0) {
    return (
      <div className="rounded-2xl p-12 text-center shadow-sm" style={card}>
        {isService
          ? <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          : <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        }
        <p className="text-gray-500 font-medium">
          Ainda não tem {isService ? "serviços" : "produtos"} publicados
        </p>
        <p className="text-sm text-gray-400 mb-5">
          Adicione o seu primeiro {isService ? "serviço" : "produto"} ao marketplace
        </p>
        <button
          onClick={onAdd}
          className="bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors"
        >
          Adicionar {isService ? "Serviço" : "Produto"}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl shadow-sm overflow-hidden" style={card}>
      {/* Header */}
      <div className="grid grid-cols-[64px_1fr_120px_140px_100px_120px_48px] gap-4 items-center px-5 py-3 border-b border-gray-100 bg-gray-50/60">
        <div />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Nome</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Categoria</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Preço</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Vendido</span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Detalhes</span>
        <div />
      </div>

      {items.map((p, idx) => {
        const isExpanded = expandedId === p.id;
        return (
          <div key={p.id} className={idx !== 0 ? "border-t border-gray-100" : ""}>
            {/* Row */}
            <div className="grid grid-cols-[64px_1fr_120px_140px_100px_120px_48px] gap-4 items-center px-5 py-4">
              {/* Photo */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>

              {/* Name only */}
              <p className="text-sm font-semibold text-gray-800 truncate">{p.name}</p>

              {/* Category */}
              <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 w-fit">
                {p.category}
              </span>

              {/* Price */}
              <div className="text-sm font-bold text-gray-800">{p.price.toLocaleString()} Kz</div>

              {/* Sold */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-indigo-600">{p.sold}</span>
                <span className="text-xs text-gray-400">{isService ? "contratos" : "unid."}</span>
              </div>

              {/* Expand */}
              <button
                onClick={() => onToggleExpand(p.id)}
                className="flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors w-fit"
              >
                {isExpanded
                  ? <><ChevronUp className="w-3.5 h-3.5" /> Fechar</>
                  : <><ChevronDown className="w-3.5 h-3.5" /> Ver mais</>
                }
              </button>

              {/* Remove icon */}
              <button
                onClick={() => onRemove(p.id)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                title="Remover"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded section */}
            {isExpanded && (
              <div className="px-5 pb-5 bg-gray-50/50 border-t border-gray-100">
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Descrição</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                  </div>
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
                <div className="mt-5 pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => onRemove(p.id)}
                    className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-4 py-2 rounded-full transition-colors border border-rose-200"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover {isService ? "serviço" : "produto"}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [items, setItems] = useState<SupplierItem[]>(INITIAL_ITEMS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productItems  = items.filter((i) => i.type === "produto");
  const serviceItems  = items.filter((i) => i.type === "serviço");

  const stats = [
    { icon: DollarSign, label: "Vendas Este Mês",   value: "48.000 Kz",            trend: "+12%", up: true },
    { icon: Package,    label: "Produtos Ativos",   value: String(productItems.length), trend: "+3",   up: true },
    { icon: Briefcase,  label: "Serviços Ativos",   value: String(serviceItems.length), trend: "+1",   up: true },
    { icon: TrendingUp, label: "Taxa Conversão",    value: "34%",                  trend: "+5%",  up: true },
  ];

  const recentSales = [
    { id: "1", date: "05 Mai", client: "TechStart Lda",     product: "Software ERP",     amount: 450000, payment: "Financiado 12x", status: "Confirmado"  },
    { id: "2", date: "04 Mai", client: "Comércio Online SA", product: "Sistema CRM",      amount: 320000, payment: "Financiado 24x", status: "Processando" },
    { id: "3", date: "02 Mai", client: "Consultoria Pro",    product: "Licenças Premium", amount: 185000, payment: "À vista",        status: "Entregue"    },
  ];

  const topProducts = [
    { name: "Sistema CRM",  sales: 22, revenue: 7040000, pct: 48, color: "bg-indigo-400/70" },
    { name: "Software ERP", sales: 15, revenue: 6750000, pct: 38, color: "bg-violet-400/70" },
    { name: "Consultoria",  sales: 8,  revenue: 2240000, pct: 14, color: "bg-blue-300/70"   },
  ];

  const statusStyle = (s: string) =>
    s === "Entregue"   ? "bg-green-100/80 text-green-600" :
    s === "Confirmado" ? "bg-blue-100/80 text-blue-600"   :
                         "bg-amber-100/80 text-amber-600";

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }

  function handleGenerateAI() {
    const prompt = [
      form.name,
      form.description,
      form.category,
      form.type === "serviço" ? "professional service business" : "product professional photo",
      "clean background, high quality, business marketplace",
    ].filter(Boolean).join(", ");

    setAiGenerating(true);
    setForm((f) => ({ ...f, image: "" }));

    const seed = Math.floor(Math.random() * 999999);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=600&height=400&seed=${seed}&nologo=true&enhance=true`;

    // Only show image after it finishes loading
    const img = new Image();
    img.onload = () => {
      setForm((f) => ({ ...f, image: url }));
      setAiGenerating(false);
    };
    img.onerror = () => {
      setAiGenerating(false);
    };
    img.src = url;
  }

  function handleAdd() {
    if (!form.name.trim() || !form.price) return;
    const newItem: SupplierItem = {
      id: Date.now().toString(),
      name: form.name.trim(),
      category: form.category,
      type: form.type,
      price: Number(form.price),
      supplier: SUPPLIER_NAME,
      rating: 0,
      reviews: 0,
      sold: 0,
      image: form.image || "https://images.unsplash.com/photo-1554246247-6993b606e8b9?w=400&q=80",
      description: form.description.trim(),
      features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
    };
    setItems((prev) => [newItem, ...prev]);
    setForm(emptyForm);
    setShowModal(false);
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
    setExpandedId(null);
  }

  function openAddModal(type: Product["type"]) {
    setForm({ ...emptyForm, type });
    setShowModal(true);
  }

  const isServiceTab = activeTab === "services";
  const currentLabel = isServiceTab ? "serviço" : "produto";

  return (
    <div className="min-h-screen" style={{ background: "#f9fafb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Painel do Fornecedor</h1>
          <p className="text-sm text-gray-500">Gerencie os seus produtos, serviços e vendas</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-2xl p-1 shadow-sm w-fit">
          {(["overview", "products", "services"] as ActiveTab[]).map((tab) => {
            const isActive = activeTab === tab;
            const label     = tab === "overview" ? "Visão Geral" : tab === "products" ? "Os Meus Produtos" : "Os Meus Serviços";
            const Icon      = tab === "services" ? Briefcase : Package;
            const count     = tab === "products" ? productItems.length : tab === "services" ? serviceItems.length : null;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive ? "bg-indigo-500 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab !== "overview" && <Icon className="w-4 h-4" />}
                {label}
                {count !== null && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── TAB: VISÃO GERAL ── */}
        {activeTab === "overview" && (
          <>
            <InsightsPanel insights={[
              { type: "up",    title: "Vendas em crescimento",   description: "Vendas aumentaram 20% esta semana." },
              { type: "tip",   title: "Produto mais rentável",   description: "Consultoria representa 38% da receita.", action: "Ver produto" },
              { type: "alert", title: "Encomendas pendentes",    description: "2 encomendas sem resposta há 24h.",       action: "Responder agora" },
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
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("products")}
                    className="bg-indigo-500 text-white text-xs px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    Gerir Produtos
                  </button>
                  <button
                    onClick={() => setActiveTab("services")}
                    className="bg-violet-500 text-white text-xs px-4 py-2 rounded-full hover:bg-violet-600 transition-colors"
                  >
                    Gerir Serviços
                  </button>
                </div>
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
                <p className="text-sm text-gray-500">
                  {productItems.length} produto{productItems.length !== 1 ? "s" : ""} publicado{productItems.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => openAddModal("produto")}
                className="flex items-center gap-2 bg-indigo-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-indigo-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Adicionar Produto
              </button>
            </div>
            <ItemList
              items={productItems}
              expandedId={expandedId}
              onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
              onRemove={(id) => setConfirmDelete(id)}
              onAdd={() => openAddModal("produto")}
              label="produto"
            />
          </div>
        )}

        {/* ── TAB: OS MEUS SERVIÇOS ── */}
        {activeTab === "services" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-800">Os Meus Serviços</h2>
                <p className="text-sm text-gray-500">
                  {serviceItems.length} serviço{serviceItems.length !== 1 ? "s" : ""} publicado{serviceItems.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => openAddModal("serviço")}
                className="flex items-center gap-2 bg-violet-500 text-white text-sm px-5 py-2.5 rounded-full hover:bg-violet-600 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" /> Adicionar Serviço
              </button>
            </div>
            <ItemList
              items={serviceItems}
              expandedId={expandedId}
              onToggleExpand={(id) => setExpandedId(expandedId === id ? null : id)}
              onRemove={(id) => setConfirmDelete(id)}
              onAdd={() => openAddModal("serviço")}
              label="serviço"
            />
          </div>
        )}
      </div>

      {/* ── MODAL: ADICIONAR ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-800">
                Novo {form.type === "serviço" ? "Serviço" : "Produto"}
              </h2>
              <button onClick={() => { setShowModal(false); setForm(emptyForm); setAiGenerating(false); }} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">

              {/* Nome */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Nome {form.type === "serviço" ? "do serviço" : "do produto"} *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={form.type === "serviço" ? "Ex: Consultoria Empresarial" : "Ex: Sistema ERP Completo"}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </div>

              {/* Tipo + Categoria */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Tipo</label>
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

              {/* Preço */}
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

              {/* Descrição */}
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

              {/* Características */}
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

              {/* ── Foto ── */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Foto</label>

                {/* Preview */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
                  {aiGenerating ? (
                    <div className="flex flex-col items-center gap-2 text-indigo-500">
                      <RefreshCw className="w-7 h-7 animate-spin" />
                      <span className="text-xs font-medium text-indigo-600">A gerar imagem com IA...</span>
                      <span className="text-xs text-gray-400">pode demorar alguns segundos</span>
                    </div>
                  ) : form.image ? (
                    <>
                      <img
                        src={form.image}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center text-gray-500 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-300">
                      <ImageIcon className="w-10 h-10" />
                      <span className="text-xs">Sem imagem</span>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 text-xs font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Fazer upload
                  </button>
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={aiGenerating || !form.name.trim() || !form.description.trim()}
                    title={!form.name.trim() || !form.description.trim() ? "Preencha o nome e descrição primeiro" : "Gerar imagem com IA"}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-medium py-2.5 rounded-xl hover:bg-indigo-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {aiGenerating
                      ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> A gerar...</>
                      : <><Sparkles className="w-3.5 h-3.5" /> Gerar com IA</>
                    }
                  </button>
                </div>
                {(!form.name.trim() || !form.description.trim()) && (
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Preencha o nome e descrição para activar a geração por IA
                  </p>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-100">
              <button
                onClick={() => { setShowModal(false); setForm(emptyForm); setAiGenerating(false); }}
                className="flex-1 border border-gray-200 text-gray-600 text-sm py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                disabled={!form.name.trim() || !form.price}
                className={`flex-1 text-white text-sm py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  form.type === "serviço" ? "bg-violet-500 hover:bg-violet-600" : "bg-indigo-500 hover:bg-indigo-600"
                }`}
              >
                Adicionar {form.type === "serviço" ? "Serviço" : "Produto"}
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
            <h3 className="text-base font-semibold text-gray-800 text-center mb-2">
              Remover {currentLabel}?
            </h3>
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
