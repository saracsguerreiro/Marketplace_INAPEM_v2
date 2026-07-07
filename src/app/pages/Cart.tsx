import { Link, useNavigate } from "react-router";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LoginModal } from "../components/LoginModal";
import { useState } from "react";

export function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { userType, login } = useAuth();
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSolicitarFinanciamento = () => {
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

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag style={{ width: "6rem", height: "6rem", margin: "0 auto 1.5rem", color: "var(--ds-content-subtle)" }} />
        <h1 className="text-3xl mb-4">O Seu Carrinho Está Vazio</h1>
        <p style={{ color: "var(--ds-content-subtle)", marginBottom: "2rem" }}>
          Adicione produtos e serviços ao carrinho para solicitar financiamento
        </p>
        <Link
          to="/marketplace"
          className="ds-button ds-button--brand ds-button--lg"
          style={{ borderRadius: "9999px", display: "inline-flex" }}
        >
          <span className="ds-button__label">Explorar Produtos e Serviços</span>
          <ArrowRight className="ds-icon ds-icon--sm" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="mb-8">Carrinho de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Produtos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="ds-card ds-card--outlined" style={{ display: "flex", flexDirection: "row", gap: "1.5rem", padding: "1.5rem" }}>
              <div style={{ width: "8rem", height: "8rem", flexShrink: 0, borderRadius: "var(--ds-radius-lg)", overflow: "hidden", background: "var(--ds-neutral-background-default)" }}>
                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                  <div>
                    <h3 style={{ marginBottom: "0.25rem" }}>{item.name}</h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>{item.supplier}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ds-button ds-button--ghost ds-button--sm"
                    style={{ width: "2.25rem", height: "2.25rem", padding: 0, borderRadius: "9999px", color: "var(--ds-feedback-error-content-default)" }}
                  >
                    <Trash2 className="ds-icon ds-icon--sm" />
                  </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="ds-button ds-button--outline ds-button--sm"
                      style={{ width: "2rem", height: "2rem", padding: 0, borderRadius: "9999px" }}
                    >
                      <Minus className="ds-icon ds-icon--sm" />
                    </button>
                    <span style={{ width: "3rem", textAlign: "center", fontWeight: 500 }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="ds-button ds-button--outline ds-button--sm"
                      style={{ width: "2rem", height: "2rem", padding: 0, borderRadius: "9999px" }}
                    >
                      <Plus className="ds-icon ds-icon--sm" />
                    </button>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
                      {item.price.toLocaleString()} Kz × {item.quantity}
                    </div>
                    <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ds-primary-content-default)" }}>
                      {(item.price * item.quantity).toLocaleString()} Kz
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="ds-card ds-card--elevated" style={{ position: "sticky", top: "1rem" }}>
            <div className="ds-card__container" style={{ padding: "1.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>Resumo do Pedido</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--ds-border-default)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ds-content-subtle)" }}>
                  <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                  <span>{totalPrice.toLocaleString()} Kz</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ds-content-subtle)" }}>
                  <span>Taxa de Serviço</span>
                  <span>0 Kz</span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", fontSize: "1.25rem" }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 700, color: "var(--ds-primary-content-default)" }}>{totalPrice.toLocaleString()} Kz</span>
              </div>

              {/* Simulação de financiamento */}
              <div style={{ background: "var(--ds-background-subtle)", borderRadius: "var(--ds-radius-lg)", padding: "1rem", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.6875rem", color: "var(--ds-content-subtle)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                  Financiamento disponível
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                  {[12, 24, 36].map((months) => (
                    <div key={months} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "var(--ds-content-subtle)" }}>{months}x de</span>
                      <span style={{ fontWeight: 600 }}>{Math.round(totalPrice / months).toLocaleString()} Kz/mês</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSolicitarFinanciamento}
                className="ds-button ds-button--brand ds-button--lg ds-button--full"
                style={{ borderRadius: "9999px", marginBottom: "0.75rem" }}
              >
                <span className="ds-button__label">Solicitar Financiamento</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </button>

              <Link
                to="/marketplace"
                style={{ display: "block", textAlign: "center", color: "var(--ds-link-content-default)", fontSize: "0.875rem" }}
              >
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}
