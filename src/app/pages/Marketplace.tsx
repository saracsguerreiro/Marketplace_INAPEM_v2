import { Link, useSearchParams, useNavigate } from "react-router";
import { Search, ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus, ArrowLeft, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import {
  TechnologyIcon,
  EquipmentIcon,
  ServicesIcon,
  ConstructionIcon,
  LogisticsIcon,
  AgricultureIcon,
  HealthIcon,
  OthersIcon,
} from "../components/icons/CategoryIcons";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { allProducts } from "../data/products";
import { trackProduct } from "../hooks/useRecommendations";
import { semanticSearch, getSearchIntent } from "../utils/semanticSearch";

export function Marketplace() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const cat = searchParams.get("categoria");
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get("q");
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const itemsPerPage = 8;
  const { addToCart } = useCart();

  const getQuantity = (productId: string) => quantities[productId] || 1;
  const incrementQuantity = (productId: string) => {
    setQuantities((prev) => ({ ...prev, [productId]: (prev[productId] || 1) + 1 }));
  };
  const decrementQuantity = (productId: string) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(1, (prev[productId] || 1) - 1) }));
  };

  const categories = [
    { name: "Todos", icon: null },
    { name: "Tecnologia", icon: TechnologyIcon },
    { name: "Equipamentos", icon: EquipmentIcon },
    { name: "Serviços", icon: ServicesIcon },
    { name: "Construção", icon: ConstructionIcon },
    { name: "Logística", icon: LogisticsIcon },
    { name: "Agronegócio", icon: AgricultureIcon },
    { name: "Saúde", icon: HealthIcon },
    { name: "Outros", icon: OthersIcon },
  ];

  const searchResults = semanticSearch(searchTerm, allProducts);
  const intent = searchTerm.trim() ? getSearchIntent(searchTerm) : null;
  const isSemanticMatch = intent !== null;

  const filteredProducts = searchResults
    .map((r) => r.product)
    .filter((product) => {
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
      const matchesType = selectedType === "Todos" || product.type === selectedType.toLowerCase();
      return matchesCategory && matchesType;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="ds-button ds-button--ghost ds-button--sm mb-6"
        style={{ paddingLeft: 0 }}
      >
        <ArrowLeft className="ds-icon ds-icon--sm" />
        <span className="ds-button__label">Voltar</span>
      </button>

      <div className="mb-8">
        <h1 className="mb-4">Produtos e Serviços</h1>
        <p style={{ color: "var(--ds-content-subtle)" }}>
          Explore mais de 1.200 produtos e serviços para a sua empresa
        </p>
      </div>

      {/* Tabs Produto / Serviço */}
      <div className="mb-8">
        <div className="ds-tabs" style={{ width: "fit-content" }}>
          {["Todos", "Produto", "Serviço"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setSelectedType(tab); setCurrentPage(1); }}
              className={`ds-tab${selectedType === tab ? " ds-tab--active" : ""}`}
              style={{ padding: "0.5rem 1.5rem" }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Campo de Pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 ds-icon" style={{ color: "var(--ds-content-subtle)" }} />
          <div className="ds-input ds-input--lg ds-input--full" style={{ paddingLeft: "3rem" }}>
            <input
              type="text"
              className="ds-input__field"
              placeholder="Pesquisar produtos e serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: 0 }}
            />
          </div>
        </div>
      </div>

      {/* Pesquisa semântica */}
      {isSemanticMatch && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
          style={{ background: "var(--ds-toned-background-default)", border: "1px solid rgba(233,78,27,0.2)" }}>
          <Sparkles className="ds-icon ds-icon--sm flex-shrink-0" style={{ color: "var(--ds-primary-content-default)" }} />
          <span style={{ color: "var(--ds-content-subtle)" }}>
            Pesquisa inteligente: a mostrar resultados relacionados com{" "}
            <span style={{ fontWeight: 600, color: "var(--ds-primary-content-default)" }}>"{intent}"</span>
          </span>
        </div>
      )}

      {/* Filtro de Categorias */}
      <div className="mb-10">
        <h3 style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Filtrar por Categoria
        </h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                className={`ds-button ds-button--sm${isActive ? " ds-button--brand" : " ds-button--outline"}`}
                style={{ gap: "0.375rem" }}
              >
                {Icon && <Icon style={{ width: "1rem", height: "1rem" }} />}
                <span className="ds-button__label">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contagem de resultados */}
      <div className="mb-6">
        <p style={{ color: "var(--ds-content-subtle)" }}>
          {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="ds-card ds-card--interactive" style={{ display: "flex", flexDirection: "column" }}>
            <Link to={`/marketplace/${product.id}`} onClick={() => trackProduct(product.id, product.category)}>
              <div className="ds-card__media" style={{ aspectRatio: "4/3" }}>
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="ds-card__container" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "0.625rem", color: "var(--ds-primary-content-default)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {product.category}
              </div>
              <Link to={`/marketplace/${product.id}`}>
                <h3 style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.4 }}>{product.name}</h3>
              </Link>
              <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <div style={{ width: "0.375rem", height: "0.375rem", borderRadius: "9999px", background: "#16a34a" }} />
                {product.supplier}
              </div>
              <div style={{ fontWeight: 800, color: "var(--ds-primary-content-default)", fontSize: "1.125rem" }}>
                {product.price.toLocaleString()} Kz
              </div>

              {/* Seletor de Quantidade */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <button
                  onClick={() => decrementQuantity(product.id)}
                  className="ds-button ds-button--outline ds-button--sm"
                  style={{ width: "2rem", height: "2rem", padding: 0 }}
                >
                  <Minus className="ds-icon ds-icon--sm" />
                </button>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, width: "2rem", textAlign: "center" }}>
                  {getQuantity(product.id)}
                </span>
                <button
                  onClick={() => incrementQuantity(product.id)}
                  className="ds-button ds-button--outline ds-button--sm"
                  style={{ width: "2rem", height: "2rem", padding: 0 }}
                >
                  <Plus className="ds-icon ds-icon--sm" />
                </button>
              </div>

              <button
                onClick={() => {
                  const qty = getQuantity(product.id);
                  for (let i = 0; i < qty; i++) {
                    addToCart({ id: product.id, name: product.name, price: product.price, supplier: product.supplier, image: product.image });
                  }
                }}
                className="ds-button ds-button--brand ds-button--full ds-button--md"
              >
                <ShoppingCart className="ds-icon ds-icon--sm" />
                <span className="ds-button__label">Adicionar</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="ds-button ds-button--outline ds-button--sm"
            style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
          >
            <ChevronLeft className="ds-icon" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`ds-button ds-button--sm${currentPage === page ? " ds-button--brand" : " ds-button--outline"}`}
              style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="ds-button ds-button--outline ds-button--sm"
            style={{ width: "2.5rem", height: "2.5rem", padding: 0 }}
          >
            <ChevronRight className="ds-icon" />
          </button>
        </div>
      )}
    </div>
  );
}
