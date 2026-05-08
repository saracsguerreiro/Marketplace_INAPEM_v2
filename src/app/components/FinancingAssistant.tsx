import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, ArrowLeft } from "lucide-react";

type Topic = null | "financiamento" | "fornecedor" | "marketplace" | "outro";

interface Message {
  id: number;
  from: "user" | "assistant";
  text: string;
}

// ── Respostas por tema ────────────────────────────────────────────────

function getFinancingResponse(msg: string): string {
  if (/quanto|valor|máximo|maximo|financ/i.test(msg))
    return "💰 O INAPEM oferece financiamento até **1.000.000 Kz**. O valor aprovado depende da análise de crédito, volume de negócios e finalidade.";
  if (/document/i.test(msg))
    return "📋 Documentos necessários:\n\n• Certidão comercial\n• Estatutos sociais\n• Declaração fiscal recente\n• Extratos bancários (3 meses)\n• BI/Passaporte dos sócios";
  if (/tempo|demora|prazo|48/i.test(msg))
    return "⏱️ A análise demora até **48 horas** após entrega completa da documentação. Em casos complexos pode ir até 5 dias úteis.";
  if (/pagamento|pagar|prestação|reembolso/i.test(msg))
    return "💳 O INAPEM paga **directamente ao fornecedor**. A empresa paga ao INAPEM em **prestações mensais** negociadas caso a caso.";
  if (/quem|elegível|candidat|pme/i.test(msg))
    return "🏢 Podem candidatar-se:\n\n• PMEs angolanas\n• Pelo menos 1 ano de actividade\n• Situação fiscal regularizada\n• Conta bancária activa em Angola";
  if (/taxa|juro|custo/i.test(msg))
    return "📊 As taxas são as mais competitivas do mercado angolano. O valor exacto depende do perfil da empresa e montante solicitado.";
  if (/como|solicitar|começar|iniciar|processo/i.test(msg))
    return "🚀 Para solicitar:\n\n1. Registe-se como Empresa\n2. Escolha produtos no Marketplace\n3. Submeta o pedido\n4. Envie a documentação\n5. Aguarde aprovação em 48h";
  if (/contacto|falar|humano/i.test(msg))
    return "📞 Contacto:\n\n• **Email:** suporte@inapem.pt\n• **Telefone:** +351 21 000 0000\n• **Horário:** Seg–Sex, 8h–17h";
  return "Posso ajudar com: valores disponíveis, documentos, prazos, pagamentos ou elegibilidade. O que gostaria de saber?";
}

function getSupplierResponse(msg: string): string {
  if (/comissão|comissao|percentagem|taxa/i.test(msg))
    return "💼 A comissão do marketplace varia entre **5% e 10%** dependendo da categoria do produto. É descontada automaticamente no momento do pagamento.";
  if (/quando|pagamento|receber|recebo/i.test(msg))
    return "💳 O pagamento é processado **até 5 dias úteis** após a confirmação da entrega pelo comprador. É transferido directamente para a conta registada.";
  if (/entreg|envio|logística/i.test(msg))
    return "🚚 A entrega é da responsabilidade do fornecedor. Deve actualizar o estado no dashboard. O comprador é notificado automaticamente em cada etapa.";
  if (/listar|publicar|adicionar|produto/i.test(msg))
    return "🛒 Para listar produtos:\n\n1. Aceda ao seu Dashboard\n2. Clique em \"Novo Produto\"\n3. Preencha nome, categoria, preço e foto\n4. Submeta para aprovação (24–48h)";
  if (/reclamação|devoluç|problema|disputa/i.test(msg))
    return "⚠️ Em caso de reclamação:\n\n1. O comprador abre um ticket\n2. Tem **48h** para responder\n3. Se não houver resolução, o INAPEM medeia\n4. Reembolso automático se aplicável";
  if (/visibilidade|destaque|promover/i.test(msg))
    return "📈 Para aumentar visibilidade:\n\n• Mantenha preços competitivos\n• Adicione fotos de qualidade\n• Responda rapidamente às encomendas\n• Solicite avaliações aos compradores";
  if (/factura|fatura|documento/i.test(msg))
    return "🧾 A factura é gerada automaticamente pela plataforma após cada venda. Pode consultar e descarregar todas as facturas no seu Dashboard.";
  if (/contacto|ajuda|humano/i.test(msg))
    return "📞 Suporte a fornecedores:\n\n• **Email:** fornecedores@inapem.pt\n• **Telefone:** +351 21 000 0001\n• **Horário:** Seg–Sex, 8h–17h";
  return "Posso ajudar com: comissões, pagamentos, entregas, listagem de produtos ou reclamações. O que precisa de saber?";
}

function getMarketplaceResponse(msg: string): string {
  if (/pesquis|encontrar|procur/i.test(msg))
    return "🔍 Use a barra de pesquisa no topo da página Produtos e Serviços. A nossa **pesquisa inteligente** entende frases como \"gerir pessoal\" ou \"transportar mercadoria\".";
  if (/categoria|filtro/i.test(msg))
    return "🗂️ Pode filtrar por categoria (Tecnologia, Equipamentos, Serviços, etc.) e por tipo (Produto ou Serviço). Os filtros estão no topo da página Produtos e Serviços.";
  if (/carrinho|comprar|adicionar/i.test(msg))
    return "🛒 Clique em **Adicionar** em qualquer produto para o colocar no carrinho. No carrinho pode ajustar quantidades e solicitar financiamento.";
  if (/avaliaç|rating|estrela/i.test(msg))
    return "⭐ Cada produto mostra a avaliação média dos compradores. Quanto mais estrelas, maior a satisfação de quem já comprou.";
  if (/recomend/i.test(msg))
    return "✨ A plataforma recomenda produtos com base no que explorou. Quanto mais navegar, mais personalizadas ficam as sugestões.";
  return "Posso ajudar com: como pesquisar, filtrar categorias, adicionar ao carrinho ou perceber as recomendações. O que precisa?";
}

function getOtherResponse(msg: string): string {
  if (/regist|conta|criar/i.test(msg))
    return "📝 Para criar uma conta:\n\n• **Empresa:** clique em \"Entrar\" → registe-se como Empresa\n• **Fornecedor:** clique em \"Entrar\" → registe-se como Fornecedor\n\nO processo demora menos de 5 minutos.";
  if (/inapem|quem|organização/i.test(msg))
    return "🏛️ O **INAPEM** é o Instituto Nacional de Apoio às Micro, Pequenas e Médias Empresas de Angola. A nossa missão é apoiar o crescimento das PMEs angolanas através de financiamento e acesso a fornecedores certificados.";
  if (/contacto|falar|ajuda|humano/i.test(msg))
    return "📞 Contacto geral:\n\n• **Email:** info@inapem.pt\n• **Telefone:** +351 21 000 0000\n• **Horário:** Seg–Sex, 8h–17h";
  if (/segurança|dados|privacidade/i.test(msg))
    return "🔒 A plataforma utiliza encriptação SSL e cumpre as normas de protecção de dados. Os seus dados nunca são partilhados com terceiros sem consentimento.";
  return "Para dúvidas mais específicas pode contactar-nos em **info@inapem.pt**. Posso tentar ajudar com mais alguma questão?";
}

function getResponse(msg: string, topic: Topic): string {
  if (/obrigad|obrigado|obrigada|ótimo|otimo|excelente|perfeito/i.test(msg))
    return "De nada! 😊 Estou sempre disponível. Se tiver mais dúvidas é só perguntar!";
  switch (topic) {
    case "financiamento": return getFinancingResponse(msg);
    case "fornecedor":    return getSupplierResponse(msg);
    case "marketplace":  return getMarketplaceResponse(msg);
    case "outro":        return getOtherResponse(msg);
    default:             return "";
  }
}

// Sugestões rápidas por tema
const quickRepliesByTopic: Record<NonNullable<Topic>, string[]> = {
  financiamento: ["Quanto posso financiar?", "Que documentos preciso?", "Quanto tempo demora?", "Como funciona o pagamento?"],
  fornecedor:    ["Como funciona a comissão?", "Quando recebo o pagamento?", "Como listar produtos?", "E as reclamações?"],
  marketplace:   ["Como pesquisar produtos?", "Como filtrar categorias?", "Como funciona o carrinho?", "O que são recomendações?"],
  outro:         ["O que é o INAPEM?", "Como criar uma conta?", "Contactos", "Segurança dos dados"],
};

const topicLabels: Record<NonNullable<Topic>, string> = {
  financiamento: "💰 Financiamento",
  fornecedor:    "🏪 Fornecedores",
  marketplace:   "🛒 Marketplace",
  outro:         "❓ Outro",
};

// ── Componente ────────────────────────────────────────────────────────

export function FinancingAssistant() {
  const [open, setOpen]       = useState(false);
  const [topic, setTopic]     = useState<Topic>(null);
  const [input, setInput]     = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcome: Message = {
    id: 0,
    from: "assistant",
    text: "Olá! 👋 Sou o **Assistente INAPEM**.\n\nSobre o que gostaria de tirar dúvidas hoje?",
  };

  const [messages, setMessages] = useState<Message[]>([welcome]);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleTopicSelect = (t: NonNullable<Topic>) => {
    setTopic(t);
    const userMsg: Message = { id: Date.now(), from: "user", text: topicLabels[t] };
    const botMsg: Message  = {
      id: Date.now() + 1,
      from: "assistant",
      text: {
        financiamento: "Óptimo! Pode perguntar sobre valores, documentos, prazos, pagamentos ou elegibilidade. Como posso ajudar?",
        fornecedor:    "Perfeito! Pode perguntar sobre comissões, pagamentos, entregas, listagem de produtos ou reclamações. O que precisa?",
        marketplace:   "Claro! Pode perguntar sobre como pesquisar, filtrar, carrinho ou recomendações. Em que posso ajudar?",
        outro:         "Sem problema! Pergunte à vontade sobre o INAPEM, registos, segurança ou qualquer outro assunto.",
      }[t],
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || !topic) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, from: "assistant", text: getResponse(text, topic) };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 800);
  };

  const resetTopic = () => {
    setTopic(null);
    setMessages([welcome]);
    setInput("");
  };

  const formatText = (text: string) =>
    text.split("\n").map((line, i) => {
      const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return <p key={i} className="mb-1 last:mb-0" dangerouslySetInnerHTML={{ __html: html }} />;
    });

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-2xl shadow-2xl border border-border z-50 flex flex-col overflow-hidden" style={{ maxHeight: "70vh" }}>
          {/* Header */}
          <div className="bg-coral text-white px-4 py-3 flex items-center gap-3">
            {topic && (
              <button onClick={resetTopic} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-sm">Assistente INAPEM</div>
              <div className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-300 rounded-full inline-block" />
                {topic ? topicLabels[topic] : "Online"}
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                {msg.from === "assistant" && (
                  <div className="w-7 h-7 bg-coral/10 rounded-full flex items-center justify-center mr-2 mt-1 shrink-0">
                    <Bot className="w-4 h-4 text-coral" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.from === "user"
                    ? "bg-coral text-white rounded-br-sm"
                    : "bg-white border border-border text-foreground rounded-bl-sm shadow-sm"
                }`}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-7 h-7 bg-coral/10 rounded-full flex items-center justify-center mr-2 shrink-0">
                  <Bot className="w-4 h-4 text-coral" />
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-coral/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Selecção de tema (estado inicial) */}
          {!topic && (
            <div className="px-4 py-4 bg-gray-50 border-t border-border grid grid-cols-2 gap-2">
              {(["financiamento", "fornecedor", "marketplace", "outro"] as NonNullable<Topic>[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTopicSelect(t)}
                  className="text-sm bg-white border-2 border-border hover:border-coral hover:text-coral text-foreground px-3 py-2.5 rounded-full transition-all font-medium"
                >
                  {topicLabels[t]}
                </button>
              ))}
            </div>
          )}

          {/* Sugestões rápidas após selecção de tema */}
          {topic && messages.length <= 3 && (
            <div className="px-3 py-2 bg-gray-50 border-t border-border flex gap-2 overflow-x-auto">
              {quickRepliesByTopic[topic].map((r) => (
                <button
                  key={r}
                  onClick={() => sendMessage(r)}
                  className="shrink-0 text-xs bg-white border border-coral text-coral px-3 py-1.5 rounded-full hover:bg-coral hover:text-white transition-colors whitespace-nowrap"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input (só disponível após selecção de tema) */}
          {topic && (
            <div className="p-3 border-t border-border bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Escreva a sua dúvida..."
                className="flex-1 text-sm border border-border rounded-xl px-3 py-2 focus:outline-none focus:border-coral transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="bg-coral text-white w-9 h-9 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Botão Flutuante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 bg-coral text-white rounded-full shadow-xl flex items-center justify-center hover:opacity-90 transition-all z-50 hover:scale-105"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </button>
    </>
  );
}
