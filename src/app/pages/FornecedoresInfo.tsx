import { Link } from "react-router";
import { ArrowRight, CheckCircle, Users, DollarSign, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function FornecedoresInfo() {
  const benefits = [
    {
      icon: Users,
      title: "Novos Clientes",
      description: "Aceda a uma rede de mais de 500 empresas procurando fornecedores",
    },
    {
      icon: DollarSign,
      title: "Pagamento Garantido",
      description: "Receba o pagamento directamente do INAPEM sem risco",
    },
    {
      icon: TrendingUp,
      title: "Aumente as Vendas",
      description: "Ofereça financiamento aos seus clientes e venda mais",
    },
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl mb-4 leading-tight">
              Venda Mais com Pagamento Garantido
            </h1>
            <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed max-w-xl mx-auto">
              Junte-se ao maior marketplace B2B de Angola. Venda os seus produtos e serviços de forma fácil e rápida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/fornecedores/registo"
                className="bg-coral text-white px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-xl"
              >
                Registar Empresa
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/marketplace"
                className="bg-white/10 border-2 border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full inline-flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
              >
                Ver Produtos e Serviços
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* BENEFÍCIOS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Vantagens para <span className="text-coral">Fornecedores</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expanda o seu negócio com a maior rede de empresas de Angola
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white border-2 border-border rounded-2xl p-8 hover:border-coral transition-colors">
                  <div className="bg-coral/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-coral" />
                  </div>
                  <h3 className="text-xl mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-3xl p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">O Marketplace que Está a Crescer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-extrabold mb-2">1.000+</div>
              <div className="text-lg opacity-90">Fornecedores Ativos</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">500+</div>
              <div className="text-lg opacity-90">Empresas Compradoras</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold mb-2">100+</div>
              <div className="text-lg opacity-90">Transações por Mês</div>
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Como <span className="text-coral">Começar</span></h2>
            <p className="text-muted-foreground text-lg">Processo simples em 4 passos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white border-2 border-border rounded-2xl p-6 text-center hover:border-coral transition-colors">
                  <div className="bg-coral text-white w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-coral" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* DEPOIMENTOS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">O Que Dizem os <span className="text-coral">Fornecedores</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "TechSolutions Angola",
                category: "Tecnologia",
                quote: "Desde que aderimos ao INAPEM, as nossas vendas aumentaram 40%. O pagamento garantido dá-nos segurança total.",
              },
              {
                name: "Máquinas Premium",
                category: "Equipamentos",
                quote: "Excelente plataforma! Conseguimos chegar a novos clientes que antes não podiam pagar à vista.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white border-2 border-border rounded-2xl p-8 hover:border-coral transition-colors">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-5 h-5 text-coral fill-coral" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-coral">{testimonial.category}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-gradient-to-r from-coral to-coral/80 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-6">Pronto para Expandir o Seu Negócio?</h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Junte-se a mais de 1.000 fornecedores que já estão a vender mais com pagamento garantido
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/fornecedores/registo"
                className="bg-white text-coral px-8 py-4 rounded-full hover:shadow-2xl transition-shadow inline-flex items-center justify-center gap-2 text-lg"
              >
                Registar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/marketplace"
                className="bg-white/10 border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 text-lg"
              >
                Ver Produtos
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
                q: "Como funciona o pagamento?",
                a: "Quando uma empresa compra com financiamento, o INAPEM paga-lhe directamente. Você recebe o valor total sem risco.",
              },
              {
                q: "Que comissão cobra o INAPEM?",
                a: "As nossas comissões são competitivas e transparentes. Contacte-nos para conhecer as condições específicas.",
              },
              {
                q: "Posso vender para qualquer empresa?",
                a: "Sim, pode vender para todas as empresas registadas no marketplace que tenham crédito aprovado.",
              },
              {
                q: "Como adiciono produtos ao catálogo?",
                a: "Após o registo e certificação, tem acesso ao dashboard onde pode adicionar produtos com fotos, descrições e preços.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white border-2 border-border rounded-xl p-6 hover:border-coral transition-colors group"
              >
                <summary className="cursor-pointer flex items-center justify-between">
                  <span className="text-lg">{faq.q}</span>
                  <CheckCircle className="w-5 h-5 text-coral" />
                </summary>
                <p className="mt-4 text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
