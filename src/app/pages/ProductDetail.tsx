import { useParams, useNavigate } from "react-router";
import { Star, CheckCircle, ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "../components/LoginModal";
import { RecommendedProducts } from "../components/RecommendedProducts";
import { useRecommendations, trackProduct } from "../hooks/useRecommendations";
import { allProducts } from "../data/products";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { userType, login } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const product = allProducts.find((p) => p.id === id) ?? allProducts[0];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/carrinho");
  };

  const handleSolicitarFinanciamento = () => {
    if (!userType) {
      setLoginModalOpen(true);
      return;
    }

    // Adiciona ao carrinho antes de ir para o fluxo
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/pme/fluxo");
  };

  const handleLoginSuccess = (userType: "empresa" | "fornecedor") => {
    login(userType);
    setLoginModalOpen(false);

    // Após login, adiciona ao carrinho e navega para o fluxo
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        supplier: product.supplier,
        image: product.image,
      });
    }
    navigate("/pme/fluxo");
  };

  const similarProducts = useRecommendations(product.id, product.category);

  useEffect(() => {
    trackProduct(product.id, product.category);
  }, [product.id, product.category]);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Coluna esquerda: foto + descrição + características */}
        <div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-6 border-2 border-border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mb-6">
            <h3 className="mb-3">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h3 className="mb-4">Características</h3>
            <ul className="space-y-3">
              {product.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "var(--ds-primary-content-default)", flexShrink: 0, marginTop: "0.125rem" }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna direita: info + ações */}
        <div>
          <div style={{ fontSize: "0.75rem", color: "var(--ds-primary-content-default)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{product.category}</div>
          <h1 className="mb-4">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">
              {product.rating} ({product.reviews} avaliações)
            </span>
          </div>

          <div className="mb-6">
            <div style={{ fontSize: "1.5rem", color: "var(--ds-primary-content-default)", marginBottom: "0.5rem", fontWeight: 800 }}>
              {product.price.toLocaleString()} Kz
            </div>
            <div className="text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              Fornecedor: {product.supplier}
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-6 mb-6">
            <h3 className="mb-3">Financiamento Disponível</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>12x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 12).toLocaleString()} Kz/mês</span>
              </div>
              <div className="flex justify-between">
                <span>24x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 24).toLocaleString()} Kz/mês</span>
              </div>
              <div className="flex justify-between">
                <span>36x de</span>
                <span className="text-foreground font-semibold">{Math.round(product.price / 36).toLocaleString()} Kz/mês</span>
              </div>
            </div>
          </div>

          {/* Seleção de Quantidade */}
          <div className="mb-6">
            <label style={{ display: "block", marginBottom: "0.75rem", fontSize: "0.875rem", fontWeight: 500 }}>Quantidade</label>
            <div className="flex items-center gap-4">
              <button onClick={decrementQuantity} className="ds-button ds-button--outline"
                style={{ width: "3rem", height: "3rem", padding: 0, borderRadius: "9999px" }}>
                <Minus className="ds-icon" />
              </button>
              <span style={{ fontSize: "1.5rem", fontWeight: 600, width: "4rem", textAlign: "center" }}>{quantity}</span>
              <button onClick={incrementQuantity} className="ds-button ds-button--outline"
                style={{ width: "3rem", height: "3rem", padding: 0, borderRadius: "9999px" }}>
                <Plus className="ds-icon" />
              </button>
              <div style={{ color: "var(--ds-content-subtle)" }}>
                Total: <span style={{ color: "var(--ds-primary-content-default)", fontWeight: 700 }}>{(product.price * quantity).toLocaleString()} Kz</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
            <button onClick={handleSolicitarFinanciamento} className="ds-button ds-button--brand ds-button--lg ds-button--full" style={{ borderRadius: "9999px" }}>
              <span className="ds-button__label">Solicitar Financiamento</span>
            </button>
            <button onClick={handleAddToCart} className="ds-button ds-button--outline ds-button--lg ds-button--full" style={{ borderRadius: "9999px" }}>
              <ShoppingCart className="ds-icon" />
              <span className="ds-button__label">Adicionar ao Carrinho</span>
            </button>
          </div>
        </div>
      </div>

      <RecommendedProducts
        products={similarProducts}
        title="Empresas como a sua também compraram..."
        subtitle="Produtos e serviços relacionados com o que está a ver"
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}
