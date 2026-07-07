import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { ShoppingCart, LogIn, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import inapemLogo from "../../imports/inapem_MARKETPLACE_w.png";
import inapemLogoFooter from "../../imports/inapem-seeklogo-1.png";
import { LoginModal } from "./LoginModal";
import { FinancingAssistant } from "./FinancingAssistant";
import { NotificationBell } from "./NotificationBell";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [language, setLanguage] = useState("PT");
  const { userType, login, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogin = (type: "empresa" | "fornecedor" | "gestor") => {
    login(type);
    if (type === "empresa") navigate("/empresa/dashboard");
    else if (type === "fornecedor") navigate("/fornecedor/dashboard");
    else if (type === "gestor") navigate("/gestor/dashboard");
  };

  const getNavigation = () => {
    const baseNav = [
      { name: "Produtos e Serviços", path: "/marketplace" },
      { name: "Empresas", path: "/empresas" },
      { name: "Fornecedores", path: "/fornecedores" },
    ];

    if (userType === "empresa") {
      return [...baseNav, { name: "Dashboard", path: "/empresa/dashboard" }];
    } else if (userType === "fornecedor") {
      return [...baseNav, { name: "Dashboard", path: "/fornecedor/dashboard" }];
    } else if (userType === "gestor") {
      return [{ name: "Painel de Gestão", path: "/gestor/dashboard" }];
    } else {
      return baseNav;
    }
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-background">
      {/* ── NAVBAR ── */}
      <nav className="bg-white sticky top-0 z-50 px-4 sm:px-6 lg:px-8 py-3 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Pill esquerda: logo + links */}
          <div className="flex items-center bg-[#1a1a1a] text-white rounded-full px-4 py-2 gap-5">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img src={inapemLogo} alt="INAPEM" className="h-7 object-contain" />
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                      isActive ? "bg-white/20 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Direita: ações */}
          <div className="flex items-center gap-3">
            {(userType === "fornecedor" || userType === "empresa") && <NotificationBell />}

            {userType !== "gestor" && (
              <Link to="/carrinho" className="relative p-2 text-[#1a1a1a] hover:text-coral transition-colors">
                <ShoppingCart className="ds-icon" />
                {totalItems > 0 && (
                  <span className="ds-badge ds-badge--brand ds-badge--solid absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Seletor de língua */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setLanguage("PT")}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  language === "PT" ? "bg-[#1a1a1a] text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >PT</button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  language === "EN" ? "bg-[#1a1a1a] text-white" : "text-gray-500 hover:text-gray-800"
                }`}
              >EN</button>
            </div>

            {userType ? (
              <button
                onClick={logout}
                className="ds-button ds-button--ghost ds-button--sm"
              >
                <LogOut className="ds-icon ds-icon--sm" />
                <span className="ds-button__label hidden sm:inline">Sair</span>
              </button>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="ds-button ds-button--brand ds-button--sm"
              >
                <span className="ds-button__label">Entrar</span>
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <LogIn className="ds-icon ds-icon--sm" />
                </span>
              </button>
            )}

            {/* Menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#1a1a1a] text-white"
            >
              <Menu className="ds-icon" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-[#1a1a1a] rounded-2xl p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-secondary text-secondary-foreground mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={inapemLogoFooter} alt="INAPEM" className="h-8" />
              </div>
              <p style={{ color: "var(--ds-content-subtle)" }}>
                Marketplace e soluções de financiamento para PMEs
              </p>
            </div>
            <div>
              <h4 className="mb-4">Links Rápidos</h4>
              <div className="space-y-2">
                <Link to="/marketplace" style={{ color: "var(--ds-content-subtle)", display: "block" }}
                  className="hover:text-foreground transition-colors">
                  Marketplace
                </Link>
                <Link to="/financiamento" style={{ color: "var(--ds-content-subtle)", display: "block" }}
                  className="hover:text-foreground transition-colors">
                  Financiamento
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4">Contato</h4>
              <p style={{ color: "var(--ds-content-subtle)" }}>suporte@inapem.pt</p>
              <p style={{ color: "var(--ds-content-subtle)" }}>+351 21 000 0000</p>
            </div>
          </div>
          <hr className="ds-divider mt-8 mb-8" />
          <div className="text-center" style={{ color: "var(--ds-content-subtle)" }}>
            © 2026 Marketplace INAPEM. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <FinancingAssistant />
    </div>
  );
}
