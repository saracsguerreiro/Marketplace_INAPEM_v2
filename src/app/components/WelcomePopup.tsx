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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9000] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-12 max-w-[540px] w-full relative shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
        <button
          onClick={() => onClose("close")}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center mb-7">
          <img src={inapemLogo} alt="INAPEM" className="h-12 object-contain" />
        </div>

        <h2 className="text-center mb-2">Bem-vindo ao Marketplace INAPEM</h2>
        <p className="text-center text-muted-foreground mb-8 text-sm leading-relaxed">
          Diga-nos o que gostaria de fazer para personalizarmos a sua experiência.
        </p>

        <div className="space-y-3 mb-7">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.role}
                onClick={() => onClose(option.role)}
                className="w-full flex items-center gap-4 p-4 border-2 border-border rounded-full hover:border-coral hover:bg-coral/5 transition-all group"
              >
                <div className="w-11 h-11 bg-gray-bg rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-coral/10 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-sm mb-1">{option.title}</h4>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
                <span className="text-coral text-2xl">›</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-5">
          <div className="flex-1 h-px bg-border"></div>
          <span>ou entre se já tem conta</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email ou NIF"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-coral transition-colors"
          />
          <input
            type="password"
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 px-4 py-2.5 border-2 border-border rounded-lg text-sm outline-none focus:border-coral transition-colors"
          />
          <button
            onClick={() => onClose("login")}
            className="px-5 bg-primary text-primary-foreground rounded-full text-sm hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => onClose("visitante")}
            className="text-xs text-muted-foreground border-b border-dashed border-border hover:text-coral hover:border-coral transition-colors"
          >
            ✦ Explorar Marketplace — entrar directamente na plataforma
          </button>
        </div>
      </div>
    </div>
  );
}
