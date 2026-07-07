import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { RecommendedProducts } from "../components/RecommendedProducts";
import { useRecommendations } from "../hooks/useRecommendations";
import bannerImage from "../../imports/Firefly_improve_your_business_2.jpg";
import { Search, Star, ArrowRight, CheckCircle, ShoppingCart } from "lucide-react";
import { WelcomePopup } from "../components/WelcomePopup";
import { LoginModal } from "../components/LoginModal";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../contexts/AuthContext";
import {
  StoreIcon,
  TechnologyIcon,
  EquipmentIcon,
  ServicesIcon,
  ConstructionIcon,
  LogisticsIcon,
  AgricultureIcon,
  HealthIcon,
  OthersIcon,
  CompaniesIcon,
  SuppliersIcon,
  CreditIcon,
} from "../components/icons/CategoryIcons";

export function NewHome() {
  const [showWelcome, setShowWelcome] = useState(true);
  const recommended = useRecommendations();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { userType, login } = useAuth();
  const navigate = useNavigate();

  const handleWelcomeClose = (role: "pme" | "fornecedor" | "visitante" | "login" | "close") => {
    setShowWelcome(false);
    if (role === "pme") {
      navigate("/empresas");
    } else if (role === "fornecedor") {
      navigate("/fornecedores");
    }
  };

  const handlePedirFinanciamento = () => {
    if (!userType) {
      setLoginModalOpen(true);
      return;
    }
    navigate("/pme/fluxo");
  };

  const handleLoginSuccess = (userType: "empresa" | "fornecedor") => {
    login(userType);
    setLoginModalOpen(false);
    navigate("/pme/fluxo");
  };

  const categories = [
    { name: "Tecnologia", icon: TechnologyIcon, count: "340" },
    { name: "Equipamentos", icon: EquipmentIcon, count: "280" },
    { name: "Serviços", icon: ServicesIcon, count: "195" },
    { name: "Construção", icon: ConstructionIcon, count: "160" },
    { name: "Logística", icon: LogisticsIcon, count: "125" },
    { name: "Agronegócio", icon: AgricultureIcon, count: "98" },
    { name: "Saúde", icon: HealthIcon, count: "75" },
    { name: "Outros", icon: OthersIcon, count: "127" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Sistema ERP Completo",
      vendor: "TechSolutions Angola",
      price: 450000,
      image: "https://images.unsplash.com/photo-1753715613457-63127ec40824?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBvZmZpY2UlMjBzb2Z0d2FyZSUyMHRlY2hub2xvZ3klMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzc3OTk0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      category: "Tecnologia",
      certified: true,
      isNew: true,
    },
    {
      id: 2,
      name: "Equipamento Industrial",
      vendor: "Máquinas Premium",
      price: 850000,
      image: "https://images.unsplash.com/photo-1761519609252-3b868e540398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwbWFjaGluZXJ5JTIwZmFjdG9yeXxlbnwxfHx8fDE3Nzc5OTQzNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      category: "Equipamentos",
      certified: true,
      isNew: false,
    },
    {
      id: 3,
      name: "Consultoria Empresarial",
      vendor: "Consulting Pro",
      price: 280000,
      image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbnN1bHRpbmclMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc3Nzk5NDM2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      category: "Serviços",
      certified: true,
      isNew: false,
    },
    {
      id: 4,
      name: "Materiais de Construção",
      vendor: "Build Master",
      price: 620000,
      image: "https://images.unsplash.com/photo-1773649967822-d3f31c88a16e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYXRlcmlhbHMlMjBidWlsZGluZyUyMHN1cHBsaWVzfGVufDF8fHx8MTc3Nzk5NDM2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      category: "Construção",
      certified: true,
      isNew: true,
    },
  ];

  const highlights = [
    {
      title: "Computadores Dell",
      category: "Tecnologia",
      price: 185000,
      image: "https://images.unsplash.com/photo-1554246247-6993b606e8b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxsJTIwY29tcHV0ZXIlMjBsYXB0b3AlMjB3b3Jrc3RhdGlvbnxlbnwxfHx8fDE3Nzc5OTQzNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Frota de Transporte",
      category: "Logística",
      price: 950000,
      image: "https://images.unsplash.com/photo-1776988038414-29a4a1869275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkZWxpdmVyeSUyMHRydWNrJTIwZmxlZXQlMjB0cmFuc3BvcnQlMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzc3OTk0Mzc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Equipamento Médico",
      category: "Saúde",
      price: 420000,
      image: "https://images.unsplash.com/photo-1710074213379-2a9c2653046a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtZWRpY2FsJTIwZXF1aXBtZW50JTIwaG9zcGl0YWwlMjBoZWFsdGhjYXJlfGVufDF8fHx8MTc3Nzk5NDM3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const news = [
    {
      title: "Novas Condições de Financiamento para 2026",
      tag: "Financiamento",
      date: "3 dias atrás",
      image: "https://images.unsplash.com/photo-1758519288905-38b7b00c1023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZpbmFuY2luZyUyMGxvYW4lMjBoYW5kc2hha2V8ZW58MXx8fHwxNzc3OTk0NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "100 Novos Fornecedores Certificados",
      tag: "Marketplace",
      date: "1 semana atrás",
      image: "https://images.unsplash.com/photo-1753146754214-80127311a583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtYXJrZXRwbGFjZSUyMHZlbmRvcnMlMjBidXNpbmVzcyUyMHN1cHBsaWVyc3xlbnwxfHx8fDE3Nzc5OTQ0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Guia: Como Escolher Equipamento Industrial",
      tag: "Educação",
      date: "2 semanas atrás",
      image: "https://images.unsplash.com/photo-1737874960921-d1205a4f55da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZXF1aXBtZW50JTIwZ3VpZGUlMjBlZHVjYXRpb258ZW58MXx8fHwxNzc3OTk0NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div>
      {showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}

      {/* ── HERO BANNER ── */}
      <section className="bg-white overflow-hidden relative flex items-center py-10">
        <div className="hidden lg:block absolute top-4 right-4 w-[52%] h-[calc(100%-2rem)]">
          <img src={bannerImage} alt="Business Growth" className="w-full h-full object-cover rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />

          {/* Badges flutuantes */}
          <div className="absolute top-12 left-8 bg-white/85 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <span className="w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">✦</span>
            <span className="text-sm font-medium text-[#1a1a1a]">Fornecedores Certificados</span>
          </div>
          <div className="absolute top-32 right-10 bg-white/85 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <span className="w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">$</span>
            <span className="text-sm font-medium text-[#1a1a1a]">Financiamento PME</span>
          </div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg">
            <span className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">✓</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">Pagamento Facilitado</span>
          </div>
          <div className="absolute bottom-20 right-8 bg-white/75 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
            <span className="w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">↗</span>
            <span className="text-sm font-medium text-[#1a1a1a]">+1.200 Produtos</span>
          </div>
        </div>

        {/* Coluna de texto */}
        <div className="relative z-10 w-full lg:w-[48%] px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-between min-h-[420px]">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-xs px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--ds-primary-background-default)" }}></span>
              Marketplace Oficial INAPEM
            </span>

            <h1 className="text-3xl md:text-4xl leading-[1.15] text-[#1a1a1a] mb-5">
              Impulsione o seu negócio com{" "}
              <span className="relative inline-block">
                <span className="relative z-10" style={{ color: "var(--ds-primary-content-default)" }}>Financiamento</span>
                <span className="absolute inset-x-0 bottom-0.5 h-2.5 rounded-full -z-0"
                  style={{ background: "var(--ds-toned-background-default)" }}></span>
              </span>{" "}
              Inteligente
            </h1>

            <p className="text-sm md:text-base leading-relaxed max-w-sm" style={{ color: "var(--ds-content-subtle)" }}>
              Encontre produtos e serviços de fornecedores certificados. Peça financiamento e pague directamente ao fornecedor — sem intermediários.
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={handlePedirFinanciamento}
              className="ds-button ds-button--brand ds-button--lg"
              style={{ borderRadius: "9999px", paddingLeft: "1.75rem", paddingRight: "0.75rem" }}
            >
              <span className="ds-button__label">Pedir Financiamento</span>
              <span className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0"
                style={{ color: "var(--ds-primary-content-default)" }}>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── PESQUISA ── */}
      <section className="py-12" style={{ background: "linear-gradient(to bottom, var(--ds-background-subtle), var(--ds-surface-default))" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl mb-3">O que procura para a sua empresa?</h2>
            <p style={{ color: "var(--ds-content-subtle)" }}>Pesquise em mais de 1.200 produtos e serviços</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
              if (q) navigate(`/marketplace?q=${encodeURIComponent(q)}`);
              else navigate("/marketplace");
            }}
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6" style={{ color: "var(--ds-content-subtle)" }} />
              <div className="ds-input ds-input--full" style={{
                borderRadius: "9999px",
                height: "3.75rem",
                paddingLeft: "3.5rem",
                boxShadow: "var(--ds-shadow-lg)",
                border: "2px solid var(--ds-border-default)",
              }}>
                <input
                  name="q"
                  type="text"
                  className="ds-input__field"
                  placeholder="Ex: gerir pessoal, transportar mercadoria, equipamento médico..."
                  style={{ paddingLeft: 0, fontSize: "1rem" }}
                />
                <button type="submit" className="ds-button ds-button--brand ds-button--md" style={{ margin: "0.25rem", borderRadius: "9999px" }}>
                  <span className="ds-button__label">Pesquisar</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── CATEGORIAS ── */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-3">
              Explore por <span style={{ color: "var(--ds-primary-content-default)" }}>Categoria</span>
            </h2>
            <p style={{ color: "var(--ds-content-subtle)" }} className="text-lg">Encontre exatamente o que a sua empresa precisa</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/marketplace?categoria=${encodeURIComponent(cat.name)}`}
                  className="ds-card ds-card--interactive"
                  style={{ textAlign: "center", padding: "1.5rem" }}
                >
                  <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center", color: "var(--ds-primary-content-default)" }}>
                    <Icon className="w-12 h-12" />
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, marginBottom: "0.25rem" }}>{cat.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)" }}>{cat.count}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── PRODUTOS EM DESTAQUE ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">
                Produtos em <span style={{ color: "var(--ds-primary-content-default)" }}>Destaque</span>
              </h2>
              <p style={{ color: "var(--ds-content-subtle)" }}>Os mais procurados pelas empresas angolanas</p>
            </div>
            <Link to="/marketplace" className="flex items-center gap-1"
              style={{ color: "var(--ds-link-content-default)" }}>
              Ver todos <ArrowRight className="ds-icon ds-icon--sm" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product.id}`}
                className="ds-card ds-card--interactive"
              >
                <div className="ds-card__media relative overflow-hidden" style={{ height: "11rem" }}>
                  <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  {product.certified && (
                    <div className="absolute top-3 left-3">
                      <span className="ds-badge ds-badge--success ds-badge--subtle" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <CheckCircle style={{ width: "0.75rem", height: "0.75rem" }} />
                        Certificado
                      </span>
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 right-3">
                      <span className="ds-badge ds-badge--brand ds-badge--solid">NOVO</span>
                    </div>
                  )}
                </div>
                <div className="ds-card__container">
                  <div style={{ fontSize: "0.625rem", color: "var(--ds-primary-content-default)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.category}
                  </div>
                  <h3 style={{ fontSize: "0.875rem", margin: 0 }}>{product.name}</h3>
                  <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "#16a34a" }}></div>
                    {product.vendor}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", color: "#eab308" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} style={{ width: "0.75rem", height: "0.75rem", fill: i < Math.floor(product.rating) ? "#eab308" : "none" }} />
                    ))}
                    <span style={{ color: "var(--ds-content-subtle)", marginLeft: "0.25rem" }}>{product.rating}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontWeight: 800, color: "var(--ds-primary-content-default)" }}>{product.price.toLocaleString()} Kz</div>
                    <button
                      className="ds-button ds-button--toned ds-button--sm"
                      style={{ width: "2.25rem", height: "2.25rem", padding: 0, borderRadius: "9999px" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      <ShoppingCart className="ds-icon ds-icon--sm" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── BANNERS PROMOCIONAIS ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {[
            {
              src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcCUyMGFncmVlbWVudHxlbnwxfHx8fDE3Nzc5OTUyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
              alt: "Financiamento",
              title: "Financiamento até 1M Kz",
              desc: "Aprovação rápida e taxas competitivas para impulsionar o seu negócio",
              cta: "Solicitar",
            },
            {
              src: "https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBidXNpbmVzcyUyMGxvZ2lzdGljcyUyMHdhcmVob3VzZSUyMHdvcmtlcnxlbnwxfHx8fDE3Nzc5OTQ3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
              alt: "Fornecedor",
              title: "É Fornecedor?",
              desc: "Junte-se ao marketplace e venda para centenas de empresas",
              cta: "Registar Empresa",
            },
          ].map((banner, i) => (
            <div key={i} className="relative text-white overflow-hidden rounded-2xl min-h-[280px] flex items-center">
              <div className="absolute inset-0">
                <ImageWithFallback src={banner.src} alt={banner.alt} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              <div className="relative z-10 pl-8 pr-4 py-8">
                <h3 className="text-2xl mb-3">{banner.title}</h3>
                <p className="text-sm opacity-90 mb-6 max-w-xs leading-relaxed">{banner.desc}</p>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="ds-button ds-button--brand ds-button--lg"
                  style={{ borderRadius: "9999px" }}
                >
                  <span className="ds-button__label">{banner.cta}</span>
                  <ArrowRight className="ds-icon ds-icon--sm" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* ── DESTAQUES VISUAIS ── */}
        <section className="mb-16">
          <h2 className="mb-8">Escolhas <span style={{ color: "var(--ds-primary-content-default)" }}>Populares</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden h-56 cursor-pointer group">
                <ImageWithFallback src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                    <span className="ds-badge ds-badge--brand ds-badge--solid">{item.category}</span>
                  </div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <div style={{ fontWeight: 700 }}>{item.price.toLocaleString()} Kz</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ÚLTIMAS NOVIDADES ── */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Últimas <span style={{ color: "var(--ds-primary-content-default)" }}>Novidades</span></h2>
              <p style={{ color: "var(--ds-content-subtle)" }}>Fique a par do que acontece no marketplace</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div key={index} className="ds-card ds-card--interactive">
                <div className="ds-card__media" style={{ height: "9rem" }}>
                  <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="ds-card__container">
                  <span className="ds-badge ds-badge--brand ds-badge--subtle">{item.tag}</span>
                  <h3 style={{ fontSize: "0.875rem", lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", margin: 0 }}>{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── RECOMENDADOS ── */}
        {recommended.length > 0 && (
          <div className="mb-16">
            <RecommendedProducts
              products={recommended}
              title="Recomendados para si"
              subtitle="Com base nos produtos que explorou recentemente"
            />
          </div>
        )}

        {/* ── CTA FINAL ── */}
        <section className="rounded-3xl p-12 mb-16 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--ds-primary-background-default), var(--ds-primary-background-hover))" }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl mb-4">Pronto para Crescer?</h2>
            <p className="text-lg opacity-90 mb-8">
              Junte-se a centenas de empresas que já transformaram os seus negócios com financiamento inteligente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePedirFinanciamento}
                className="ds-button ds-button--lg"
                style={{
                  background: "white",
                  color: "var(--ds-primary-content-default)",
                  borderRadius: "9999px",
                  boxShadow: "var(--ds-shadow-xl)",
                }}
              >
                <span className="ds-button__label">Pedir Financiamento</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </button>
              <Link
                to="/empresas"
                className="ds-button ds-button--lg"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "white",
                  borderRadius: "9999px",
                  backdropFilter: "blur(4px)",
                }}
              >
                <span className="ds-button__label">Saber Mais</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── BIG NUMBERS ── */}
        <section className="py-16 mb-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
          style={{ background: "var(--ds-background-subtle)" }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              {[
                { Icon: CompaniesIcon, value: "500+", label: "Empresas Apoiadas" },
                { Icon: SuppliersIcon, value: "1.000", label: "Fornecedores" },
                { Icon: CreditIcon, value: "100+", label: "Créditos Aprovados" },
              ].map(({ Icon, value, label }) => (
                <div key={label}>
                  <div className="flex justify-center mb-4">
                    <Icon className="w-12 h-12" style={{ color: "var(--ds-primary-content-default)" }} />
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: "var(--ds-primary-content-default)" }}>
                    {value}
                  </div>
                  <div style={{ color: "var(--ds-content-subtle)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARCEIROS ── */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)", marginBottom: "1.5rem" }}>Parceiros Financeiros</h3>
            <div className="flex flex-wrap gap-8 items-center justify-center">
              {["BDA", "BCI", "BAI", "Atlantico", "Fundo INAPEM"].map((partner) => (
                <div key={partner} className="ds-card ds-card--outlined" style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}
