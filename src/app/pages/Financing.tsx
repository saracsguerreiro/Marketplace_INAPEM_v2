import { useState } from "react";
import { Calculator, TrendingUp, Clock, CheckCircle } from "lucide-react";

export function Financing() {
  const [amount, setAmount] = useState(10000);
  const [installments, setInstallments] = useState(12);
  const [formStep, setFormStep] = useState(1);

  const interestRate = 0.015;
  const monthlyPayment = (amount * (1 + interestRate * installments)) / installments;
  const totalAmount = monthlyPayment * installments;

  const benefits = [
    "Aprovação em até 24 horas",
    "Taxas competitivas",
    "Sem burocracia",
    "100% digital",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="mb-4">Financiamento Empresarial</h1>
        <p className="text-muted-foreground">
          Obtenha crédito rápido para impulsionar o crescimento da sua empresa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {[
          {
            icon: Clock,
            title: "Aprovação Rápida",
            description: "Resposta em até 24 horas",
          },
          {
            icon: Calculator,
            title: "Taxas Flexíveis",
            description: "A partir de 1,5% ao mês",
          },
          {
            icon: TrendingUp,
            title: "Até €500.000",
            description: "Crédito adaptado ao seu negócio",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="ds-card ds-card--default" style={{ padding: "1.5rem", textAlign: "center" }}>
              <div style={{ width: "4rem", height: "4rem", borderRadius: "9999px", background: "var(--ds-toned-background-default)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Icon style={{ width: "2rem", height: "2rem", color: "var(--ds-primary-content-default)" }} />
              </div>
              <h3 className="mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="mb-6">Simulador de Financiamento</h2>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">Valor Desejado</label>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">€1.000</span>
                <span className="text-xl text-coral">€{amount.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">€500.000</span>
              </div>
            </div>

            <div>
              <label className="block mb-2">Número de Parcelas</label>
              <input
                type="range"
                min="6"
                max="60"
                step="6"
                value={installments}
                onChange={(e) => setInstallments(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">6 meses</span>
                <span className="text-xl text-coral">{installments} meses</span>
                <span className="text-sm text-muted-foreground">60 meses</span>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6 space-y-4">
              <div className="flex justify-between">
                <span>Valor Solicitado:</span>
                <span>€{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de Juros (mensal):</span>
                <span>{(interestRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Parcelas:</span>
                <span>{installments}x</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-xl">
                  <span>Parcela Mensal:</span>
                  <span className="text-coral">€{Math.round(monthlyPayment).toLocaleString()}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                Total a pagar: €{Math.round(totalAmount).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="mb-6">Solicitar Financiamento</h2>

          {formStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Nome da Empresa</label>
                <input
                  type="text"
                  placeholder="Sua Empresa Lda"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block mb-2">NIF</label>
                <input
                  type="text"
                  placeholder="123456789"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="contato@empresa.pt"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block mb-2">Telefone</label>
                <input
                  type="tel"
                  placeholder="+351 21 000 0000"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block mb-2">Faturamento Anual</label>
                <select className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Até €100.000</option>
                  <option>€100.000 - €500.000</option>
                  <option>€500.000 - €1.000.000</option>
                  <option>Acima de €1.000.000</option>
                </select>
              </div>

              <button
                onClick={() => setFormStep(2)}
                className="ds-button ds-button--brand ds-button--lg ds-button--full"
                style={{ marginTop: "1.5rem" }}
              >
                <span className="ds-button__label">Continuar</span>
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div className="text-center py-12">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="mb-4">Solicitação Enviada!</h3>
              <p className="text-muted-foreground mb-8">
                Sua solicitação foi recebida e está em análise. Você receberá uma resposta em até 24 horas.
              </p>
              <div className="bg-secondary rounded-lg p-6 text-left">
                <h4 className="mb-3">Próximos Passos:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-coral flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setFormStep(1)}
                className="ds-button ds-button--outline ds-button--lg ds-button--full"
                style={{ marginTop: "1.5rem" }}
              >
                <span className="ds-button__label">Nova Solicitação</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
