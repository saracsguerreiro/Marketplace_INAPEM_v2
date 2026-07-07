import { Link, useNavigate } from "react-router";
import { ArrowRight, CheckCircle, TrendingUp, Clock, Shield } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LoginModal } from "../components/LoginModal";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function EmpresasInfo() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { userType, login } = useAuth();
  const navigate = useNavigate();

  const handleSolicitarFinanciamento = () => {
    if (!userType) {
      setLoginModalOpen(true);
      return;
    }
    navigate("/pme/fluxo");
  };

  const handleLoginSuccess = (userType: "empresa" | "fornecedor") => {
    login(userType);
    setLoginModalOpen(false);
    navigate("/pme/fluxo");
  };
  const benefits = [
    {
      icon: TrendingUp,
      title: "Crescimento Acelerado",
      description: "Financiamento até 1M Kz para impulsionar o seu negócio",
    },
    {
      icon: Clock,
      title: "Aprovação Rápida",
      description: "Processo simplificado com resposta em até 48 horas",
    },
    {
      icon: Shield,
      title: "Taxas Competitivas",
      description: "As melhores condições do mercado angolano",
    },
  ];

  const steps = [
    { number: "1", title: "Registo", description: "Crie a sua conta gratuitamente" },
    { number: "2", title: "Documentação", description: "Envie os documentos necessários" },
    { number: "3", title: "Análise", description: "Avaliamos o seu pedido em 48h" },
    { number: "4", title: "Aprovação", description: "Receba o financiamento aprovado" },
  ];

  return (
    <div>
      {/* BANNER HERO */}
      <section className="relative text-white overflow-hidden min-h-[450px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcCUyMGFncmVlbWVudHxlbnwxfHx8fDE3Nzc5OTUyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Empresas"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl mb-4 leading-tight">
              Financiamento Inteligente para a Sua Empresa
            </h1>
            <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed max-w-xl mx-auto">
              Aceda a crédito rápido e sem burocracia. Compre produtos e serviços essenciais
              para o seu negócio e pague directamente ao fornecedor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleSolicitarFinanciamento}
                className="ds-button ds-button--brand ds-button--lg"
                style={{ borderRadius: "9999px" }}
              >
                <span className="ds-button__label">Solicitar Financiamento</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </button>
              <Link
                to="/marketplace"
                className="ds-button ds-button--lg"
                style={{ borderRadius: "9999px", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)", color: "white" }}
              >
                <span className="ds-button__label">Ver Produtos e Serviços</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* BENEFÍCIOS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Por que Escolher o <span className="text-coral">INAPEM</span>?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Facilitamos o acesso ao crédito para pequenas e médias empresas em Angola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="ds-card ds-card--interactive" style={{ padding: "2rem" }}>
                  <div style={{ width: "4rem", height: "4rem", background: "var(--ds-toned-background-default)", borderRadius: "var(--ds-radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                    <Icon style={{ width: "2rem", height: "2rem", color: "var(--ds-primary-content-default)" }} />
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p style={{ color: "var(--ds-content-subtle)", lineHeight: 1.6 }}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Como <span className="text-coral">Funciona</span></h2>
            <p className="text-muted-foreground text-lg">Processo simples em 4 passos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="ds-card ds-card--interactive" style={{ padding: "1.5rem", textAlign: "center" }}>
                  <div style={{ width: "3rem", height: "3rem", background: "var(--ds-primary-background-default)", color: "white", borderRadius: "9999px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 700, margin: "0 auto 1rem" }}>
                    {step.number}
                  </div>
                  <h3 className="text-lg mb-2">{step.title}</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--ds-content-subtle)" }}>{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight style={{ width: "1.5rem", height: "1.5rem", color: "var(--ds-primary-content-default)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--ds-primary-background-default), var(--ds-primary-background-hover))" }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6">Pronto para Fazer Crescer o Seu Negócio?</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Junte-se a mais de 500 empresas que já transformaram os seus negócios com
              financiamento rápido e sem complicações
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/empresas/registo"
                className="ds-button ds-button--lg"
                style={{ borderRadius: "9999px", background: "white", color: "var(--ds-primary-content-default)", boxShadow: "var(--ds-shadow-xl)" }}
              >
                <span className="ds-button__label">Começar Agora</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </Link>
              <Link
                to="/marketplace"
                className="ds-button ds-button--lg"
                style={{ borderRadius: "9999px", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)", color: "white" }}
              >
                <span className="ds-button__label">Explorar Produtos</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Perguntas <span className="text-coral">Frequentes</span></h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Qual o valor máximo de financiamento?",
                a: "Oferecemos financiamento até 1 milhão de Kwanzas, dependendo da análise de crédito da sua empresa.",
              },
              {
                q: "Quanto tempo demora a aprovação?",
                a: "O processo de análise demora até 48 horas após o envio completo da documentação.",
              },
              {
                q: "Que documentos são necessários?",
                a: "Necessita de documentos da empresa (certidão, estatutos), documentos fiscais recentes e identificação dos sócios.",
              },
              {
                q: "Como funciona o pagamento?",
                a: "O pagamento é feito directamente ao fornecedor. Você paga ao INAPEM em prestações mensais com taxas competitivas.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="ds-card ds-card--interactive" style={{ padding: "1.5rem" }}
              >
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-lg">{faq.q}</span>
                  <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "var(--ds-primary-content-default)" }} />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </div>
  );
}
