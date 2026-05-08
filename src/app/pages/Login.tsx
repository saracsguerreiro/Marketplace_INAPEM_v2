import { Link } from "react-router";
import { LogIn } from "lucide-react";

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coral rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl mb-2">Bem-vindo ao INAPEM</h1>
          <p className="text-muted-foreground">Entre na sua conta</p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:outline-none focus:border-coral transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" />
              <span className="text-sm text-muted-foreground">Lembrar-me</span>
            </label>
            <Link to="/" className="text-sm text-coral hover:underline">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-coral text-white py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Não tem uma conta?{" "}
            <Link to="/pme/fluxo" className="text-coral hover:underline">
              Registar-se
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Voltar ao Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
}
