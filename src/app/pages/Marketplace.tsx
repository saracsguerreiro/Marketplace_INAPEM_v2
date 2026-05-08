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

  // Lê parâmetros da URL ao carregar
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
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const decrementQuantity = (productId: string) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1),
    }));
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

  // Pesquisa semântica sobre todos os produtos
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
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="mb-8">
        <h1 className="mb-4">Produtos e Serviços</h1>
        <p className="text-muted-foreground">
          Explore mais de 1.200 produtos e serviços para a sua empresa
        </p>
      </div>

      {/* Tabs Produto / Serviço */}
      <div className="mb-8">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-full w-fit">
          {["Todos", "Produto", "Serviço"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setSelectedType(tab); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedType === tab
                  ? "bg-white text-coral shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Filtro de Pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar produtos e serviços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-full focus:outline-none focus:border-coral transition-colors text-base"
          />
        </div>
      </div>

      {/* Indicador de pesquisa semântica */}
      {isSemanticMatch && (
        <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-coral/5 border border-coral/20 rounded-xl text-sm">
          <Sparkles className="w-4 h-4 text-coral flex-shrink-0" />
          <span className="text-muted-foreground">
            Pesquisa inteligente: a mostrar resultados relacionados com{" "}
            <span className="font-semibold text-coral">"{intent}"</span>
          </span>
        </div>
      )}

      {/* Filtro de Categorias */}
      <div className="mb-10">
        <h3 className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Filtrar por Categoria</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
                  selectedCategory === cat.name
                    ? "border-coral bg-coral text-white"
                    : "border-border bg-white hover:border-coral"
                }`}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white border-2 border-border rounded-2xl overflow-hidden hover:border-coral hover:shadow-xl transition-all group"
          >
            <Link to={`/marketplace/${product.id}`} onClick={() => trackProduct(product.id, product.category)}>
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="text-xs text-coral mb-2 uppercase tracking-wide">{product.category}</div>
              <Link to={`/marketplace/${product.id}`}>
                <h3 className="text-sm mb-2 line-clamp-2 group-hover:text-coral transition-colors">{product.name}</h3>
              </Link>
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                {product.supplier}
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="font-extrabold text-coral text-lg">{product.price.toLocaleString()} Kz</div>
              </div>

              {/* Seletor de Quantidade */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <button
                  onClick={() => decrementQuantity(product.id)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-semibold w-8 text-center">{getQuantity(product.id)}</span>
                <button
                  onClick={() => incrementQuantity(product.id)}
                  className="w-8 h-8 rounded-full border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  const qty = getQuantity(product.id);
                  for (let i = 0; i < qty; i++) {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      supplier: product.supplier,
                      image: product.image,
                    });
                  }
                }}
                className="w-full bg-coral text-white py-2 px-3 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 text-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Adicionar
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
            className="p-2 rounded-full border-2 border-border hover:border-coral disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                currentPage === page
                  ? "border-coral bg-coral text-white"
                  : "border-border hover:border-coral"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border-2 border-border hover:border-coral disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
