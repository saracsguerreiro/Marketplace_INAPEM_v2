import { Link } from "react-router";
import { ArrowRight, CheckCircle, Users, DollarSign, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function FornecedoresInfo() {
  const benefits = [
    { icon: Users, title: "Novos Clientes", description: "Aceda a uma rede de mais de 500 empresas procurando fornecedores" },
    { icon: DollarSign, title: "Pagamento Garantido", description: "Receba o pagamento directamente do INAPEM sem risco" },
    { icon: TrendingUp, title: "Aumente as Vendas", description: "Ofereça financiamento aos seus clientes e venda mais" },
  ];

  const steps = [
    { number: "1", title: "Registo", description: "Crie a sua conta de fornecedor" },
    { number: "2", title: "Certificação", description: "Validamos a sua empresa" },
    { number: "3", title: "Catálogo", description: "Adicione os seus produtos" },
    { number: "4", title: "Vendas", description: "Comece a vender com pagamento garantido" },
  ];

  return (
    <div>
      {/* BANNER HERO */}
      <section className="relative text-white overflow-hidden min-h-[450px] flex items-center">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1740914994657-f1cdffdc418e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBidXNpbmVzcyUyMGxvZ2lzdGljcyUyMHdhcmVob3VzZSUyMHdvcmtlcnxlbnwxfHx8fDE3Nzc5OTQ3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Fornecedores"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl mb-4 leading-tight">Venda Mais com Pagamento Garantido</h1>
            <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed max-w-xl mx-auto">
              Junte-se ao maior marketplace B2B de Angola. Venda os seus produtos e serviços de forma fácil e rápida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fornecedores/registo" className="ds-button ds-button--brand ds-button--lg">
                <span className="ds-button__label">Registar Empresa</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </Link>
              <Link to="/marketplace" className="ds-button ds-button--lg"
                style={{ borderRadius: "var(--ds-button-radius-default)", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)", color: "white" }}>
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
            <h2 className="text-3xl mb-4">Vantagens para <span style={{ color: "var(--ds-primary-content-default)" }}>Fornecedores</span></h2>
            <p style={{ color: "var(--ds-content-subtle)" }} className="text-lg max-w-2xl mx-auto">
              Expanda o seu negócio com a maior rede de empresas de Angola
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

        {/* ESTATÍSTICAS */}
        <section className="rounded-3xl p-12 mb-20 text-white"
          style={{ background: "linear-gradient(135deg, #1a1a1a, #333)" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">O Marketplace que Está a Crescer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: "1.000+", label: "Fornecedores Ativos" },
              { value: "500+", label: "Empresas Compradoras" },
              { value: "100+", label: "Transações por Mês" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-5xl font-extrabold mb-2" style={{ color: "var(--ds-primary-background-default)" }}>{value}</div>
                <div className="text-lg opacity-90">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Como <span style={{ color: "var(--ds-primary-content-default)" }}>Começar</span></h2>
            <p style={{ color: "var(--ds-content-subtle)" }} className="text-lg">Processo simples em 4 passos</p>
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

        {/* DEPOIMENTOS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">O Que Dizem os <span style={{ color: "var(--ds-primary-content-default)" }}>Fornecedores</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "TechSolutions Angola", category: "Tecnologia", quote: "Desde que aderimos ao INAPEM, as nossas vendas aumentaram 40%. O pagamento garantido dá-nos segurança total." },
              { name: "Máquinas Premium", category: "Equipamentos", quote: "Excelente plataforma! Conseguimos chegar a novos clientes que antes não podiam pagar à vista." },
            ].map((testimonial, index) => (
              <div key={index} className="ds-card ds-card--outlined" style={{ padding: "2rem" }}>
                <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} style={{ width: "1.25rem", height: "1.25rem", color: "var(--ds-primary-content-default)" }} />
                  ))}
                </div>
                <p style={{ color: "var(--ds-content-subtle)", marginBottom: "1.5rem", lineHeight: 1.6, fontStyle: "italic" }}>"{testimonial.quote}"</p>
                <div>
                  <div style={{ fontWeight: 600 }}>{testimonial.name}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--ds-primary-content-default)" }}>{testimonial.category}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-3xl p-12 text-center text-white relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--ds-primary-background-default), var(--ds-primary-background-hover))" }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6">Pronto para Expandir o Seu Negócio?</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Junte-se a mais de 1.000 fornecedores que já estão a vender mais com pagamento garantido
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fornecedores/registo" className="ds-button ds-button--lg"
                style={{ borderRadius: "var(--ds-button-radius-default)", background: "white", color: "var(--ds-primary-content-default)", boxShadow: "var(--ds-shadow-xl)" }}>
                <span className="ds-button__label">Registar Agora</span>
                <ArrowRight className="ds-icon ds-icon--sm" />
              </Link>
              <Link to="/marketplace" className="ds-button ds-button--lg"
                style={{ borderRadius: "var(--ds-button-radius-default)", background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)", color: "white" }}>
                <span className="ds-button__label">Ver Produtos</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Perguntas <span style={{ color: "var(--ds-primary-content-default)" }}>Frequentes</span></h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "Como funciona o pagamento?", a: "Quando uma empresa compra com financiamento, o INAPEM paga-lhe directamente. Você recebe o valor total sem risco." },
              { q: "Que comissão cobra o INAPEM?", a: "As nossas comissões são competitivas e transparentes. Contacte-nos para conhecer as condições específicas." },
              { q: "Posso vender para qualquer empresa?", a: "Sim, pode vender para todas as empresas registadas no marketplace que tenham crédito aprovado." },
              { q: "Como adiciono produtos ao catálogo?", a: "Após o registo e certificação, tem acesso ao dashboard onde pode adicionar produtos com fotos, descrições e preços." },
            ].map((faq, index) => (
              <details key={index} className="ds-card ds-card--outlined" style={{ padding: "1.5rem" }}>
                <summary style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="text-lg">{faq.q}</span>
                  <CheckCircle style={{ width: "1.25rem", height: "1.25rem", color: "var(--ds-primary-content-default)", flexShrink: 0 }} />
                </summary>
                <p style={{ marginTop: "1rem", color: "var(--ds-content-subtle)", lineHeight: 1.6 }}>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
