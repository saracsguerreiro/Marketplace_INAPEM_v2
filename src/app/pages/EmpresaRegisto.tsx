import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Building2, ArrowRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function EmpresaRegisto() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login("empresa");
    navigate("/pme/fluxo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coral/10 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-coral" />
          </div>
          <h1 className="text-3xl mb-2">
            {isLogin ? "Entrar como Empresa" : "Registar Empresa"}
          </h1>
          <p className="text-muted-foreground">
            {isLogin
              ? "Entre na sua conta para solicitar financiamento"
              : "Crie a sua conta para aceder a financiamento até 1M Kz"}
          </p>
        </div>

        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 px-4 rounded-full transition-all ${
              !isLogin
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Registar
          </button>
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 px-4 rounded-full transition-all ${
              isLogin
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Entrar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company-name" className="block mb-2 text-sm">
                    Nome da Empresa
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    placeholder="Nome da sua empresa"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nif" className="block mb-2 text-sm">
                    NIF
                  </label>
                  <input
                    id="nif"
                    type="text"
                    placeholder="Número de identificação fiscal"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-name" className="block mb-2 text-sm">
                  Nome do Responsável
                </label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Nome completo"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="empresa@email.com"
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
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm">
                Confirmar Senha
              </label>
              <input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
                required
              />
            </div>
          )}

          {!isLogin && (
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 rounded border-border"
                required
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                Aceito os{" "}
                <Link to="/" className="text-coral hover:underline">
                  Termos e Condições
                </Link>{" "}
                e a{" "}
                <Link to="/" className="text-coral hover:underline">
                  Política de Privacidade
                </Link>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-coral text-white py-4 rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            {isLogin ? "Entrar e Solicitar Financiamento" : "Criar Conta e Continuar"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/empresas" className="text-muted-foreground hover:text-foreground">
            ← Voltar para informações
          </Link>
        </div>
      </div>
    </div>
  );
}
