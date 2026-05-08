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
    // "visitante", "close" e "login" ficam na home
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

      {/* HERO BANNER — split layout */}
      <section className="bg-white overflow-hidden relative flex items-center py-10">

        {/* Imagem direita */}
        <div className="hidden lg:block absolute top-4 right-4 w-[52%] h-[calc(100%-2rem)]">
          <img
            src={bannerImage}
            alt="Business Growth"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />

          {/* Badges flutuantes */}
          <div className="absolute top-12 left-8 bg-white/85 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <span className="w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white text-xs">✦</span>
            <span className="text-sm font-medium text-[#1a1a1a]">Fornecedores Certificados</span>
          </div>

          <div className="absolute top-32 right-10 bg-white/85 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
            <span className="w-7 h-7 bg-coral rounded-full flex items-center justify-center text-white text-xs">$</span>
            <span className="text-sm font-medium text-[#1a1a1a]">Financiamento PME</span>
          </div>

          <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2.5 flex items-center gap-2 shadow-lg">
            <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">✓</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">Pagamento Facilitado</span>
          </div>

          <div className="absolute bottom-20 right-8 bg-white/75 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
            <span className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">↗</span>
            <span className="text-sm font-medium text-[#1a1a1a]">+1.200 Produtos</span>
          </div>
        </div>

        {/* Coluna esquerda — texto */}
        <div className="relative z-10 w-full lg:w-[48%] px-6 sm:px-10 lg:px-16 py-10 flex flex-col justify-between min-h-[420px]">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white text-xs px-4 py-1.5 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-coral rounded-full"></span>
              Marketplace Oficial INAPEM
            </span>

            <h1 className="text-3xl md:text-4xl leading-[1.15] text-[#1a1a1a] mb-5">
              Impulsione o seu negócio com{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-coral">Financiamento</span>
                <span className="absolute inset-x-0 bottom-0.5 h-2.5 bg-coral/15 rounded-full -z-0"></span>
              </span>{" "}
              Inteligente
            </h1>

            <p className="text-[#666] text-sm md:text-base leading-relaxed max-w-sm">
              Encontre produtos e serviços de fornecedores certificados. Peça financiamento e pague directamente ao fornecedor — sem intermediários.
            </p>
          </div>

          {/* Botão CTA — totalmente arredondado */}
          <div className="mt-10">
            <button
              onClick={handlePedirFinanciamento}
              className="inline-flex items-center gap-4 bg-coral text-white rounded-full pl-7 pr-3 py-3 text-sm font-medium hover:opacity-90 transition-opacity group"
            >
              Pedir Financiamento
              <span className="w-9 h-9 bg-white text-coral rounded-full flex items-center justify-center flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>

      </section>

      {/* CAMPO DE PESQUISA GRANDE */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl mb-3">O que procura para a sua empresa?</h2>
            <p className="text-muted-foreground">Pesquise em mais de 1.200 produtos e serviços</p>
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
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
              <input
                name="q"
                type="text"
                placeholder="Ex: gerir pessoal, transportar mercadoria, equipamento médico..."
                className="w-full pl-16 pr-6 py-5 text-base border-2 border-border rounded-2xl focus:outline-none focus:border-coral transition-colors shadow-lg"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-coral text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Pesquisar
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CATEGORIAS */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl mb-3">Explore por <span className="text-coral">Categoria</span></h2>
            <p className="text-muted-foreground text-lg">Encontre exatamente o que a sua empresa precisa</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/marketplace?categoria=${encodeURIComponent(cat.name)}`}
                  className="group p-6 border-2 border-border bg-white rounded-3xl text-center transition-all hover:scale-105 hover:shadow-xl hover:border-coral"
                >
                  <div className="mb-4 flex items-center justify-center text-coral">
                    <Icon className="w-12 h-12" />
                  </div>
                  <div className="text-sm mb-1 font-bold">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.count}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* PRODUTOS EM DESTAQUE */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Produtos em <span className="text-coral">Destaque</span></h2>
              <p className="text-muted-foreground">Os mais procurados pelas empresas angolanas</p>
            </div>
            <Link to="/marketplace" className="text-coral hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/marketplace/${product.id}`}
                className="bg-white border-2 border-border rounded-2xl overflow-hidden hover:border-coral hover:shadow-xl transition-all group"
              >
                <div className="h-44 bg-gray-100 relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.certified && (
                    <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Certificado
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-3 right-3 bg-coral text-white text-[10px] px-2 py-1 rounded-full">
                      NOVO
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-[10px] text-coral mb-2 uppercase tracking-wide">{product.category}</div>
                  <h3 className="text-sm mb-1 group-hover:text-coral transition-colors">{product.name}</h3>
                  <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                    {product.vendor}
                  </div>
                  <div className="flex items-center gap-1 mb-3 text-xs text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-yellow-500" : ""}`} />
                    ))}
                    <span className="text-muted-foreground ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-extrabold text-coral">{product.price.toLocaleString()} Kz</div>
                    <button className="w-9 h-9 bg-coral/10 hover:bg-coral hover:text-white text-coral rounded-xl flex items-center justify-center transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* BANNERS PROMOCIONAIS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="relative text-white overflow-hidden rounded-2xl min-h-[280px] flex items-center">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcCUyMGFncmVlbWVudHxlbnwxfHx8fDE3Nzc5OTUyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Financiamento"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            <div className="relative z-10 pl-8 pr-4 py-8">
              <h3 className="text-2xl mb-3">Financiamento até 1M Kz</h3>
              <p className="text-sm opacity-90 mb-6 max-w-xs leading-relaxed">
                Aprovação rápida e taxas competitivas para impulsionar o seu negócio
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xl"
              >
                Solicitar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative text-white overflow-hidden rounded-2xl min-h-[280px] flex items-center">
            <div className="absolute inset-0">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBidXNpbmVzcyUyMGxvZ2lzdGljcyUyMHdhcmVob3VzZSUyMHdvcmtlcnxlbnwxfHx8fDE3Nzc5OTQ3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fornecedor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            <div className="relative z-10 pl-8 pr-4 py-8">
              <h3 className="text-2xl mb-3">É Fornecedor?</h3>
              <p className="text-sm opacity-90 mb-6 max-w-xs leading-relaxed">
                Junte-se ao marketplace e venda para centenas de empresas
              </p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-xl"
              >
                Registar Empresa
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* DESTAQUES VISUAIS */}
        <section className="mb-16">
          <h2 className="mb-8">Escolhas <span className="text-coral">Populares</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden h-56 cursor-pointer group"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-[10px] text-coral-foreground mb-2 uppercase tracking-wide">{item.category}</div>
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <div className="font-bold">{item.price.toLocaleString()} Kz</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ÚLTIMAS NOVIDADES */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Últimas <span className="text-coral">Novidades</span></h2>
              <p className="text-muted-foreground">Fique a par do que acontece no marketplace</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-border rounded-2xl overflow-hidden hover:border-coral hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="h-36 bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] text-coral mb-2 uppercase tracking-wide">{item.tag}</div>
                  <h3 className="text-sm mb-3 leading-tight">{item.title}</h3>
                  <div className="text-xs text-muted-foreground">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECOMENDADOS */}
        {recommended.length > 0 && (
          <div className="mb-16">
            <RecommendedProducts
              products={recommended}
              title="Recomendados para si"
              subtitle="Com base nos produtos que explorou recentemente"
            />
          </div>
        )}

        {/* CTA FINAL */}
        <section className="bg-gradient-to-r from-coral to-coral/80 rounded-3xl p-12 mb-16 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl mb-4">Pronto para Crescer?</h2>
            <p className="text-lg opacity-90 mb-8">
              Junte-se a centenas de empresas que já transformaram os seus negócios com financiamento inteligente
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePedirFinanciamento}
                className="bg-white text-coral px-8 py-4 rounded-xl hover:shadow-2xl transition-shadow inline-flex items-center justify-center gap-2"
              >
                Pedir Financiamento
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/empresas"
                className="bg-white/10 border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >Saber Mais</Link>
            </div>
          </div>
        </section>

        {/* BIG NUMBERS */}
        <section className="py-16 bg-secondary mb-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex justify-center mb-4">
                  <CompaniesIcon className="w-12 h-12 text-coral" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-coral mb-2">500+</div>
                <div className="text-muted-foreground">Empresas Apoiadas</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <SuppliersIcon className="w-12 h-12 text-coral" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-coral mb-2">1.000</div>
                <div className="text-muted-foreground">Fornecedores</div>
              </div>
              <div>
                <div className="flex justify-center mb-4">
                  <CreditIcon className="w-12 h-12 text-coral" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-coral mb-2">100+ </div>
                <div className="text-muted-foreground">Créditos Aprovados</div>
              </div>
            </div>
          </div>
        </section>

        {/* PARCEIROS */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-sm text-muted-foreground mb-6">Parceiros Financeiros</h3>
            <div className="flex flex-wrap gap-8 items-center justify-center">
              {["BDA", "BCI", "BAI", "Atlantico", "Fundo I00NAPEM"].map((partner) => (
                <div
                  key={partner}
                  className="px-6 py-3 border-2 border-border rounded-xl text-sm text-muted-foreground bg-white"
                >
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
