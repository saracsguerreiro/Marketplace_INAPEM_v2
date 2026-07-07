import { useState } from "react";
import { X, Building2, Store, Eye } from "lucide-react";
import tisLogo from "../../imports/tis_logo.png";

interface WelcomePopupProps {
  onClose: (role: "pme" | "fornecedor" | "visitante" | "login" | "close") => void;
}

export function WelcomePopup({ onClose }: WelcomePopupProps) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");

  const options = [
    { icon: Building2, role: "pme"       as const, title: "Sou uma Empresa",              description: "Solicitar financiamento e comprar produtos" },
    { icon: Store,     role: "fornecedor" as const, title: "Sou um Fornecedor",             description: "Registar empresa e vender no marketplace"   },
    { icon: Eye,       role: "visitante"  as const, title: "Explorar Produtos e Serviços", description: "Explorar o catálogo sem registo"             },
  ];

  return (
    <div className="ds-modal-overlay animate-in fade-in duration-300">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-title"
        className="animate-in slide-in-from-bottom-10 duration-500"
        style={{
          background: "var(--ds-surface-default, #fff)",
          borderRadius: "var(--ds-radius-xl, 1rem)",
          boxShadow: "var(--ds-shadow-modal, 0 20px 60px rgba(0,0,0,0.18))",
          width: "100%",
          maxWidth: "30rem",
          maxHeight: "calc(100dvh - 2.5rem)",
          overflowY: "auto",
          overflowX: "hidden",
          margin: "1.25rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Botão fechar */}
        <button
          onClick={() => onClose("close")}
          aria-label="Fechar"
          className="ds-button ds-button--ghost ds-button--icon-only ds-button--sm"
          style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 1 }}
        >
          <X className="ds-icon ds-icon--sm" />
        </button>

        <div style={{ padding: "2rem 1.75rem 1.75rem" }}>

          {/* Logo */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <img src={tisLogo} alt="TIS" style={{ height: "2.25rem", objectFit: "contain" }} />
          </div>

          {/* Título */}
          <h2 id="welcome-title" style={{ textAlign: "center", marginBottom: "0.375rem", fontSize: "1.125rem", fontWeight: 600, color: "var(--ds-content-default)" }}>
            Bem-vindo ao Marketplace
          </h2>
          <p style={{ textAlign: "center", color: "var(--ds-content-subtle)", marginBottom: "1.5rem", fontSize: "0.8125rem", lineHeight: 1.55 }}>
            Diga-nos o que gostaria de fazer para personalizarmos a sua experiência.
          </p>

          {/* Opções de perfil */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.25rem" }}>
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.role}
                  onClick={() => onClose(option.role)}
                  className="ds-button ds-button--outline"
                  style={{
                    width: "100%",
                    height: "auto",
                    padding: "0.75rem 1rem",
                    justifyContent: "flex-start",
                    gap: "0.75rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    background: "var(--ds-toned-background-default)",
                    borderRadius: "var(--ds-radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon style={{ width: "1.125rem", height: "1.125rem", color: "var(--ds-primary-content-default)" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: "var(--ds-content-default)" }}>{option.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", marginTop: "0.125rem", lineHeight: 1.4 }}>{option.description}</div>
                  </div>
                  <span style={{ color: "var(--ds-primary-content-default)", fontSize: "1.125rem", flexShrink: 0 }}>›</span>
                </button>
              );
            })}
          </div>

          {/* Separador */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
            <div className="ds-divider" style={{ flex: 1 }} />
            <span style={{ fontSize: "0.6875rem", color: "var(--ds-content-subtle)", whiteSpace: "nowrap" }}>ou entre se já tem conta</span>
            <div className="ds-divider" style={{ flex: 1 }} />
          </div>

          {/* Login — email + password + botão na mesma linha */}
          <div style={{ display: "flex", gap: "0.375rem", alignItems: "center" }}>
            <div className="ds-input ds-input--sm" style={{ flex: 1, minWidth: 0 }}>
              <input
                type="email"
                className="ds-input__field"
                placeholder="Email ou NIF"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ds-input ds-input--sm" style={{ flex: 1, minWidth: 0 }}>
              <input
                type="password"
                className="ds-input__field"
                placeholder="Palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              onClick={() => onClose("login")}
              className="ds-button ds-button--brand ds-button--sm"
              style={{ flexShrink: 0 }}
            >
              <span className="ds-button__label">Entrar</span>
            </button>
          </div>

          {/* Link discreto */}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <button
              onClick={() => onClose("visitante")}
              style={{
                fontSize: "0.75rem",
                color: "var(--ds-content-subtle)",
                background: "none",
                border: "none",
                borderBottom: "1px dashed var(--ds-border-default)",
                cursor: "pointer",
                paddingBottom: "1px",
                transition: "color 0.15s, border-color 0.15s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--ds-primary-content-default)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ds-primary-content-default)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--ds-content-subtle)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--ds-border-default)";
              }}
            >
              ✦ Explorar Marketplace sem conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
