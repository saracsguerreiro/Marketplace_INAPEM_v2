import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { ShoppingCart, LogIn, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import tisLogoWhite from "../../imports/tis_logo_white.png";
import tisLogo from "../../imports/tis_logo.png";
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
    if (userType === "empresa") return [...baseNav, { name: "Dashboard", path: "/empresa/dashboard" }];
    if (userType === "fornecedor") return [...baseNav, { name: "Dashboard", path: "/fornecedor/dashboard" }];
    if (userType === "gestor") return [{ name: "Painel de Gestão", path: "/gestor/dashboard" }];
    return baseNav;
  };

  const navigation = getNavigation();

  return (
    <div className="min-h-screen bg-background">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50" style={{ background: "var(--ds-primary-background-default)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src={tisLogoWhite} alt="TIS" className="h-8 object-contain" />
            </Link>

            {/* Links de navegação — desktop */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.75)",
                      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)"; }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Ações — direita */}
            <div className="flex items-center gap-2">

              {(userType === "fornecedor" || userType === "empresa") && (
                <div style={{ color: "white" }}>
                  <NotificationBell />
                </div>
              )}

              {userType !== "gestor" && (
                <Link to="/carrinho" className="relative p-2 transition-colors" style={{ color: "rgba(255,255,255,0.85)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)"; }}>
                  <ShoppingCart className="ds-icon" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                      style={{ background: "white", color: "var(--ds-primary-background-default)", fontSize: "0.625rem" }}>
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}

              {/* Seletor de língua */}
              <div className="hidden md:flex items-center gap-0.5 rounded p-1" style={{ background: "rgba(255,255,255,0.15)" }}>
                {["PT", "EN"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="px-2.5 py-1 rounded text-xs font-medium transition-colors"
                    style={{
                      background: language === lang ? "white" : "transparent",
                      color: language === lang ? "var(--ds-primary-background-default)" : "rgba(255,255,255,0.8)",
                    }}
                  >{lang}</button>
                ))}
              </div>

              {userType ? (
                <button onClick={logout} className="ds-button ds-button--sm"
                  style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
                  <LogOut className="ds-icon ds-icon--sm" />
                  <span className="ds-button__label hidden sm:inline">Sair</span>
                </button>
              ) : (
                <button onClick={() => setLoginModalOpen(true)} className="ds-button ds-button--sm"
                  style={{ background: "white", color: "var(--ds-primary-background-default)", fontWeight: 600 }}>
                  <LogIn className="ds-icon ds-icon--sm" />
                  <span className="ds-button__label">Entrar</span>
                </button>
              )}

              {/* Menu mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded"
                style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
              >
                {mobileMenuOpen ? <X className="ds-icon" /> : <Menu className="ds-icon" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "rgba(255,255,255,0.15)", background: "var(--ds-primary-background-hover)" }}>
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded text-sm transition-colors"
                    style={{
                      color: isActive ? "white" : "rgba(255,255,255,0.8)",
                      background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: "var(--ds-background-subtle)", borderTop: "1px solid var(--ds-border-default)", marginTop: "5rem" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src={tisLogo} alt="TIS" className="h-8 object-contain" />
              </div>
              <p style={{ color: "var(--ds-content-subtle)", fontSize: "0.875rem" }}>
                Marketplace e soluções de financiamento para PMEs
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>Links Rápidos</h4>
              <div className="space-y-2">
                <Link to="/marketplace" className="ds-link block text-sm" style={{ color: "var(--ds-content-subtle)" }}>
                  Marketplace
                </Link>
                <Link to="/financiamento" className="ds-link block text-sm" style={{ color: "var(--ds-content-subtle)" }}>
                  Financiamento
                </Link>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold" style={{ color: "var(--ds-content-default)" }}>Contato</h4>
              <p className="text-sm" style={{ color: "var(--ds-content-subtle)" }}>suporte@inapem.pt</p>
              <p className="text-sm" style={{ color: "var(--ds-content-subtle)" }}>+351 21 000 0000</p>
            </div>
          </div>
          <hr className="ds-divider mt-8 mb-8" />
          <div className="text-center text-sm" style={{ color: "var(--ds-content-subtle)" }}>
            © 2026 TIS Marketplace. Todos os direitos reservados.
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
