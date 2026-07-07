import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userType: "empresa" | "fornecedor" | "gestor") => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [activeTab, setActiveTab] = useState<"empresa" | "fornecedor" | "gestor">("empresa");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab);
    onClose();
  };

  const tabs = [
    { id: "empresa" as const, label: "Empresa" },
    { id: "fornecedor" as const, label: "Fornecedor" },
    { id: "gestor" as const, label: "Gestor" },
  ];

  return (
    <div className="ds-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ds-modal ds-modal--sm" role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
        <div className="ds-modal__header">
          <div>
            <h2 id="login-modal-title" className="ds-modal__title">Bem-vindo ao INAPEM</h2>
            <p style={{ color: "var(--ds-content-subtle)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
              Entre na sua conta
            </p>
          </div>
          <button className="ds-modal__close" onClick={onClose} aria-label="Fechar modal">
            <X className="ds-icon ds-icon--sm" />
          </button>
        </div>

        <div className="ds-modal__body">
          {/* Tabs */}
          <div className="ds-tabs mb-6" role="tablist" aria-label="Tipo de utilizador">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`ds-tab${activeTab === tab.id ? " ds-tab--active" : ""}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="ds-field">
              <label htmlFor="modal-email" className="ds-field__label">Email</label>
              <div className="ds-input ds-input--md ds-input--full">
                <input
                  id="modal-email"
                  type="email"
                  className="ds-input__field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="ds-field">
              <label htmlFor="modal-password" className="ds-field__label">Palavra-passe</label>
              <div className="ds-input ds-input--md ds-input--full">
                <input
                  id="modal-password"
                  type="password"
                  className="ds-input__field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" style={{ accentColor: "var(--ds-primary-background-default)" }} />
                <span style={{ color: "var(--ds-content-subtle)" }}>Lembrar-me</span>
              </label>
              <button type="button" className="text-sm" style={{ color: "var(--ds-primary-content-default)", background: "none", border: "none", cursor: "pointer" }}>
                Esqueceu a palavra-passe?
              </button>
            </div>

            <button type="submit" className="ds-button ds-button--brand ds-button--lg ds-button--full">
              <span className="ds-button__label">
                Entrar como {activeTab === "empresa" ? "Empresa" : activeTab === "fornecedor" ? "Fornecedor" : "Gestor INAPEM"}
              </span>
            </button>
          </form>

          <div className="mt-5 text-center text-sm" style={{ color: "var(--ds-content-subtle)" }}>
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                window.location.href = activeTab === "empresa" ? "/empresas/registo" : "/fornecedores/registo";
              }}
              style={{ color: "var(--ds-primary-content-default)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}
            >
              Registar-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
