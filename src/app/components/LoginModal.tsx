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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl mb-2">Bem-vindo ao INAPEM</h2>
          <p className="text-muted-foreground">Entre na sua conta</p>
        </div>

        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
          {(["empresa", "fornecedor", "gestor"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-2 rounded-full text-sm transition-all ${
                activeTab === tab
                  ? "bg-white shadow text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "empresa" ? "Empresa" : tab === "fornecedor" ? "Fornecedor" : "Gestor"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-muted-foreground">Lembrar-me</span>
            </label>
            <button type="button" className="text-coral hover:underline">
              Esqueceu a senha?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-coral text-white py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Entrar como {activeTab === "empresa" ? "Empresa" : activeTab === "fornecedor" ? "Fornecedor" : "Gestor INAPEM"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => {
                onClose();
                window.location.href = activeTab === "empresa" ? "/empresas/registo" : "/fornecedores/registo";
              }}
              className="text-coral hover:underline"
            >
              Registar-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
