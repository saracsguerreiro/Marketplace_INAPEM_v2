import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Store, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function FornecedorRegisto() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login("fornecedor");
    navigate("/fornecedor/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "var(--ds-background-subtle)" }}>
      <div className="ds-card ds-card--elevated w-full" style={{ maxWidth: "42rem" }}>
        <div className="ds-card__container" style={{ padding: "2.5rem" }}>

          {/* Cabeçalho */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "4rem",
              height: "4rem",
              background: "var(--ds-toned-background-default)",
              borderRadius: "9999px",
              marginBottom: "1rem",
            }}>
              <Store style={{ width: "2rem", height: "2rem", color: "var(--ds-primary-content-default)" }} />
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              {isLogin ? "Entrar como Fornecedor" : "Registar Fornecedor"}
            </h1>
            <p style={{ color: "var(--ds-content-subtle)", fontSize: "0.875rem" }}>
              {isLogin
                ? "Entre na sua conta para gerir os seus produtos"
                : "Registe a sua empresa e comece a vender no marketplace"}
            </p>
          </div>

          {/* Tabs */}
          <div className="ds-tabs mb-8">
            <button onClick={() => setIsLogin(false)} className={`ds-tab${!isLogin ? " ds-tab--active" : ""}`}>
              Registar
            </button>
            <button onClick={() => setIsLogin(true)} className={`ds-tab${isLogin ? " ds-tab--active" : ""}`}>
              Entrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="ds-field">
                    <label htmlFor="company-name" className="ds-field__label">Nome da Empresa</label>
                    <div className="ds-input ds-input--md ds-input--full">
                      <input id="company-name" type="text" className="ds-input__field" placeholder="Nome da sua empresa" required />
                    </div>
                  </div>
                  <div className="ds-field">
                    <label htmlFor="nif" className="ds-field__label">NIF</label>
                    <div className="ds-input ds-input--md ds-input--full">
                      <input id="nif" type="text" className="ds-input__field" placeholder="Número de identificação fiscal" required />
                    </div>
                  </div>
                </div>

                <div className="ds-field">
                  <label htmlFor="category" className="ds-field__label">Categoria Principal</label>
                  <div className="ds-input ds-input--md ds-input--full" style={{ padding: "0 0.75rem" }}>
                    <select
                      id="category"
                      required
                      style={{ flex: 1, border: "none", outline: "none", background: "transparent", color: "var(--ds-content-default)", fontSize: "0.875rem", minHeight: "40px", width: "100%" }}
                    >
                      <option value="">Selecione uma categoria</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="equipamentos">Equipamentos</option>
                      <option value="servicos">Serviços</option>
                      <option value="construcao">Construção</option>
                      <option value="logistica">Logística</option>
                      <option value="agronegocio">Agronegócio</option>
                      <option value="saude">Saúde</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="ds-field">
                  <label htmlFor="contact-name" className="ds-field__label">Nome do Responsável</label>
                  <div className="ds-input ds-input--md ds-input--full">
                    <input id="contact-name" type="text" className="ds-input__field" placeholder="Nome completo" required />
                  </div>
                </div>
              </>
            )}

            <div className="ds-field">
              <label htmlFor="email" className="ds-field__label">Email</label>
              <div className="ds-input ds-input--md ds-input--full">
                <input id="email" type="email" className="ds-input__field" placeholder="fornecedor@email.com" required />
              </div>
            </div>

            <div className="ds-field">
              <label htmlFor="password" className="ds-field__label">Senha</label>
              <div className="ds-input ds-input--md ds-input--full">
                <input id="password" type="password" className="ds-input__field" placeholder="••••••••" required />
              </div>
            </div>

            {!isLogin && (
              <div className="ds-field">
                <label htmlFor="confirm-password" className="ds-field__label">Confirmar Senha</label>
                <div className="ds-input ds-input--md ds-input--full">
                  <input id="confirm-password" type="password" className="ds-input__field" placeholder="••••••••" required />
                </div>
              </div>
            )}

            {!isLogin && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <input type="checkbox" id="terms" className="mt-1"
                  style={{ accentColor: "var(--ds-primary-background-default)", width: "1rem", height: "1rem" }} required />
                <label htmlFor="terms" style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
                  Aceito os{" "}
                  <Link to="/" style={{ color: "var(--ds-link-content-default)", fontWeight: 500 }}>Termos e Condições</Link>{" "}
                  e a{" "}
                  <Link to="/" style={{ color: "var(--ds-link-content-default)", fontWeight: 500 }}>Política de Privacidade</Link>
                </label>
              </div>
            )}

            <button type="submit" className="ds-button ds-button--brand ds-button--lg ds-button--full" style={{ marginTop: "0.5rem" }}>
              <span className="ds-button__label">
                {isLogin ? "Entrar no Dashboard" : "Criar Conta e Continuar"}
              </span>
              <ArrowRight className="ds-icon ds-icon--sm" />
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <Link to="/fornecedores" style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
              ← Voltar para informações
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
