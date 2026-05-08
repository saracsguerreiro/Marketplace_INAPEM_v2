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
        <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl mb-4">O Seu Carrinho Está Vazio</h1>
        <p className="text-muted-foreground mb-8">
          Adicione produtos e serviços ao carrinho para solicitar financiamento
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          Explorar Produtos e Serviços
          <ArrowRight className="w-5 h-5" />
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
            <div
              key={item.id}
              className="bg-white border-2 border-border rounded-2xl p-6 flex gap-6"
            >
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.supplier}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 hover:bg-red-50 rounded-full text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border-2 border-border hover:border-coral flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {item.price.toLocaleString()} Kz × {item.quantity}
                    </div>
                    <div className="text-xl font-bold text-coral">
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
          <div className="bg-white border-2 border-border rounded-2xl p-6 sticky top-4">
            <h2 className="text-xl mb-6">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? "item" : "itens"})</span>
                <span>{totalPrice.toLocaleString()} Kz</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxa de Serviço</span>
                <span>0 Kz</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 text-xl">
              <span>Total</span>
              <span className="font-bold text-coral">{totalPrice.toLocaleString()} Kz</span>
            </div>

            {/* Simulação de financiamento */}
            <div className="bg-secondary rounded-xl p-4 mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Financiamento disponível</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">12x de</span>
                  <span className="font-semibold">{Math.round(totalPrice / 12).toLocaleString()} Kz/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24x de</span>
                  <span className="font-semibold">{Math.round(totalPrice / 24).toLocaleString()} Kz/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">36x de</span>
                  <span className="font-semibold">{Math.round(totalPrice / 36).toLocaleString()} Kz/mês</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSolicitarFinanciamento}
              className="w-full bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-semibold mb-3"
            >
              Solicitar Financiamento
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              to="/marketplace"
              className="block text-center text-coral hover:underline text-sm"
            >
              Continuar Comprando
            </Link>
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
