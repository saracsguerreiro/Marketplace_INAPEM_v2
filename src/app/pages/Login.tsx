import { Link } from "react-router";
import { LogIn } from "lucide-react";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "var(--ds-background-subtle)" }}>
      <div className="ds-card ds-card--elevated w-full" style={{ maxWidth: "28rem" }}>
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
              <LogIn style={{ width: "1.75rem", height: "1.75rem", color: "var(--ds-primary-content-default)" }} />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "0.25rem" }}>Bem-vindo ao INAPEM</h1>
            <p style={{ color: "var(--ds-content-subtle)", fontSize: "0.875rem" }}>Entre na sua conta</p>
          </div>

          <form className="space-y-5">
            <div className="ds-field">
              <label htmlFor="email" className="ds-field__label">Email</label>
              <div className="ds-input ds-input--lg ds-input--full">
                <input
                  id="email"
                  type="email"
                  className="ds-input__field"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="ds-field">
              <label htmlFor="password" className="ds-field__label">Senha</label>
              <div className="ds-input ds-input--lg ds-input--full">
                <input
                  id="password"
                  type="password"
                  className="ds-input__field"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded"
                  style={{ accentColor: "var(--ds-primary-background-default)" }} />
                <span style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>Lembrar-me</span>
              </label>
              <Link to="/" style={{ fontSize: "0.875rem", color: "var(--ds-link-content-default)" }}>
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="ds-button ds-button--brand ds-button--lg ds-button--full">
              <span className="ds-button__label">Entrar</span>
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
            Não tem uma conta?{" "}
            <Link to="/pme/fluxo" style={{ color: "var(--ds-link-content-default)", fontWeight: 500 }}>
              Registar-se
            </Link>
          </div>

          <hr className="ds-divider" style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }} />

          <div style={{ textAlign: "center" }}>
            <Link to="/" style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>
              ← Voltar ao Marketplace
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
