import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ShoppingCart, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { WelcomePopup } from "../components/WelcomePopup";

export function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleWelcomeClose = (role: "pme" | "fornecedor" | "visitante" | "login") => {
    setShowWelcome(false);
    if (role === "pme") {
      window.location.href = "/pme/fluxo";
    } else if (role === "fornecedor") {
      window.location.href = "/fornecedor/dashboard";
    }
  };
  const features = [
    {
      icon: ShoppingCart,
      title: "Marketplace Completo",
      description: "Acesso a milhares de produtos e serviços para a sua empresa",
    },
    {
      icon: TrendingUp,
      title: "Financiamento Rápido",
      description: "Obtenha crédito para suas compras em minutos",
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Transações protegidas e fornecedores verificados",
    },
    {
      icon: Zap,
      title: "Processo Ágil",
      description: "Aprovação automática baseada em análise de crédito",
    },
  ];

  const stats = [
    { value: "500+", label: "Empresas Apoiadas" },
    { value: "1.000", label: "Fornecedores" },
    { value: "1M Kz", label: "Crédito Máximo" },
    { value: "98%", label: "Satisfação" },
  ];

  return (
    <div>
      {showWelcome && <WelcomePopup onClose={handleWelcomeClose} />}
      <div>
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-coral/20 border border-coral/30 text-coral-foreground text-xs px-4 py-2 rounded-full mb-6">
              🇦🇴 PLATAFORMA NACIONAL · ANGOLA
            </div>
            <h1 className="text-4xl md:text-5xl mb-6">
              Impulsione o seu negócio<br />com <span className="text-coral">crédito produtivo</span>
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Encontre produtos e serviços de fornecedores certificados. Peça financiamento e pague directamente ao fornecedor — sem intermediários.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pme/fluxo"
                className="bg-coral text-coral-foreground px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-coral/30"
              >
                Pedir Financiamento
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/marketplace"
                className="bg-transparent border-2 border-primary-foreground px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 hover:bg-primary-foreground/10 transition-colors"
              >
                Explorar Marketplace
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl text-coral mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Por que escolher o FinMarket?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combinamos o melhor dos dois mundos: um marketplace robusto com soluções financeiras inteligentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="bg-coral/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-card rounded-lg p-8">
                <div className="bg-coral text-coral-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  1
                </div>
                <h3 className="mb-2">Escolha Produtos</h3>
                <p className="text-muted-foreground">
                  Navegue pelo marketplace e selecione os produtos ou serviços que precisa
                </p>
              </div>
              <div className="bg-card rounded-lg p-8">
                <div className="bg-coral text-coral-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  2
                </div>
                <h3 className="mb-2">Solicite Financiamento</h3>
                <p className="text-muted-foreground">
                  Preencha uma solicitação rápida e receba aprovação em minutos
                </p>
              </div>
              <div className="bg-card rounded-lg p-8">
                <div className="bg-coral text-coral-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  3
                </div>
                <h3 className="mb-2">Receba e Pague</h3>
                <p className="text-muted-foreground">
                  Receba seus produtos e pague em parcelas flexíveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
