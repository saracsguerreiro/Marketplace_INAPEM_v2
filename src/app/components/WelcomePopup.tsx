import { useState } from "react";
import { X, Building2, Store, Eye } from "lucide-react";
import inapemLogo from "../../imports/inapem-seeklogo-1.png";

interface WelcomePopupProps {
  onClose: (role: "pme" | "fornecedor" | "visitante" | "login" | "close") => void;
}

export function WelcomePopup({ onClose }: WelcomePopupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = [
    {
      icon: Building2,
      role: "pme" as const,
      title: "Sou uma Empresa",
      description: "Quero solicitar financiamento para comprar produtos e serviços",
    },
    {
      icon: Store,
      role: "fornecedor" as const,
      title: "Sou um Fornecedor",
      description: "Quero registar a minha empresa e vender no marketplace",
    },
    {
      icon: Eye,
      role: "visitante" as const,
      title: "Procurar Produtos e Serviços",
      description: "Quero explorar o catálogo do marketplace",
    },
  ];

  return (
    <div className="ds-modal-overlay animate-in fade-in duration-300">
      <div className="ds-modal ds-modal--sm animate-in slide-in-from-bottom-10 duration-500"
        role="dialog" aria-modal="true" aria-labelledby="welcome-title">

        <div className="ds-modal__header" style={{ padding: "2rem 2rem 0" }}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img src={inapemLogo} alt="INAPEM" style={{ height: "3rem", objectFit: "contain" }} />
          </div>
          <button
            className="ds-modal__close"
            onClick={() => onClose("close")}
            aria-label="Fechar"
            style={{ position: "absolute", top: "1rem", right: "1rem" }}
          >
            <X className="ds-icon ds-icon--sm" />
          </button>
        </div>

        <div className="ds-modal__body" style={{ padding: "1.5rem 2rem 2rem" }}>
          <h2 id="welcome-title" style={{ textAlign: "center", marginBottom: "0.5rem", fontSize: "1.25rem", fontWeight: 600 }}>
            Bem-vindo ao Marketplace INAPEM
          </h2>
          <p style={{ textAlign: "center", color: "var(--ds-content-subtle)", marginBottom: "1.5rem", fontSize: "0.875rem", lineHeight: 1.6 }}>
            Diga-nos o que gostaria de fazer para personalizarmos a sua experiência.
          </p>

          {/* Opções de perfil */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
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
                    padding: "0.875rem 1rem",
                    borderRadius: "var(--ds-radius-lg)",
                    justifyContent: "flex-start",
                    gap: "0.875rem",
                    textAlign: "left",
                  }}
                >
                  <div style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    background: "var(--ds-toned-background-default)",
                    borderRadius: "var(--ds-radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon style={{ width: "1.25rem", height: "1.25rem", color: "var(--ds-primary-content-default)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: "0.875rem", color: "var(--ds-content-default)" }}>{option.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", marginTop: "0.125rem" }}>{option.description}</div>
                  </div>
                  <span style={{ color: "var(--ds-primary-content-default)", fontSize: "1.25rem" }}>›</span>
                </button>
              );
            })}
          </div>

          {/* Separador */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="ds-divider" style={{ flex: 1 }} />
            <span style={{ fontSize: "0.75rem", color: "var(--ds-content-subtle)", whiteSpace: "nowrap" }}>ou entre se já tem conta</span>
            <div className="ds-divider" style={{ flex: 1 }} />
          </div>

          {/* Login rápido */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div className="ds-input ds-input--md" style={{ flex: 1 }}>
              <input
                type="email"
                className="ds-input__field"
                placeholder="Email ou NIF"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="ds-input ds-input--md" style={{ flex: 1 }}>
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
              className="ds-button ds-button--brand"
              style={{ borderRadius: "var(--ds-field-radius)" }}
            >
              <span className="ds-button__label">Entrar</span>
            </button>
          </div>

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
              ✦ Explorar Marketplace — entrar directamente na plataforma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
