import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, ShoppingBag, CreditCard, CheckCircle, FileText, Clock, ArrowLeft, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface Notification {
  id: string;
  type: "payment" | "order" | "info" | "financing" | "deadline";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const supplierNotifications: Notification[] = [
  { id: "1", type: "payment", title: "Mensalidade a Vencer", message: "A sua mensalidade de Maio (45.000 Kz) vence em 3 dias.", time: "Há 1 hora", read: false },
  { id: "2", type: "order", title: "Nova Compra Recebida", message: "A empresa Construções Lda adquiriu 2x Materiais de Construção no valor de 1.240.000 Kz.", time: "Há 3 horas", read: false },
  { id: "3", type: "order", title: "Nova Compra Recebida", message: "A empresa TechCorp Angola adquiriu 1x Sistema ERP Completo no valor de 450.000 Kz.", time: "Ontem", read: true },
  { id: "4", type: "payment", title: "Pagamento Confirmado", message: "O pagamento da mensalidade de Abril (45.000 Kz) foi confirmado com sucesso.", time: "Há 2 dias", read: true },
  { id: "5", type: "info", title: "Perfil Verificado", message: "O seu perfil de fornecedor foi verificado e aprovado pelo INAPEM.", time: "Há 5 dias", read: true },
];

const companyNotifications: Notification[] = [
  { id: "1", type: "financing", title: "Financiamento em Análise", message: "O seu pedido de financiamento de 850.000 Kz está em análise. Prazo de resposta: 2 dias úteis.", time: "Há 2 horas", read: false },
  { id: "2", type: "deadline", title: "Prestação a Vencer", message: "A prestação nº 3 do seu financiamento (37.500 Kz) vence em 5 dias.", time: "Há 4 horas", read: false },
  { id: "3", type: "order", title: "Encomenda Confirmada", message: "A sua encomenda de Sistema ERP Completo foi confirmada pelo fornecedor TechSolutions Angola.", time: "Ontem", read: true },
  { id: "4", type: "financing", title: "Financiamento Aprovado", message: "O seu pedido de financiamento de 450.000 Kz foi aprovado. Valor disponível para compra.", time: "Há 3 dias", read: true },
  { id: "5", type: "info", title: "Documentos em Falta", message: "Para concluir o seu pedido de financiamento, falta enviar a declaração fiscal actualizada.", time: "Há 4 dias", read: true },
];

const iconMap = {
  payment: CreditCard,
  order: ShoppingBag,
  info: CheckCircle,
  financing: FileText,
  deadline: Clock,
};

const colorMap = {
  payment: "text-orange-500 bg-orange-50",
  order: "text-coral bg-coral/10",
  info: "text-green-600 bg-green-50",
  financing: "text-blue-600 bg-blue-50",
  deadline: "text-red-500 bg-red-50",
};

const labelMap = {
  payment: "Pagamento",
  order: "Compra",
  info: "Informação",
  financing: "Financiamento",
  deadline: "Prazo",
};

export function Notifications() {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const initial = userType === "fornecedor" ? supplierNotifications : companyNotifications;
  const [notifications, setNotifications] = useState<Notification[]>(initial);
  const [filter, setFilter] = useState<"todas" | "não lidas">("todas");

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const remove = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const displayed = filter === "não lidas" ? notifications.filter((n) => !n.read) : notifications;
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-coral" />
          <div>
            <h1 className="text-2xl">Notificações</h1>
            {unread > 0 && (
              <p className="text-sm text-muted-foreground">{unread} não lidas</p>
            )}
          </div>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-sm text-coral hover:underline">
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6">
        {(["todas", "não lidas"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? "ds-button ds-button--brand ds-button--sm" : "ds-button ds-button--outline ds-button--sm"}
            >
            {f === "todas" ? "Todas" : "Não lidas"}
            {f === "não lidas" && unread > 0 && (
              <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {/* Lista */}
      {displayed.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Bell className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p>Nenhuma notificação{filter === "não lidas" ? " não lida" : ""}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map((n) => {
            const Icon = iconMap[n.type];
            const color = colorMap[n.type];
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all hover:border-coral ${
                  !n.read ? "border-coral/30 bg-blue-50/30" : "border-border bg-white"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {n.title}
                      </p>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-muted-foreground">
                        {labelMap[n.type]}
                      </span>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-coral flex-shrink-0" />}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                      className="p-1 rounded-full hover:bg-red-50 text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{n.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{n.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
