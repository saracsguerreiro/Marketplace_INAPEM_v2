import { useState, useRef, useEffect } from "react";
import { Bell, ShoppingBag, CreditCard, CheckCircle, X, FileText, Clock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

interface Notification {
  id: string;
  type: "payment" | "order" | "info" | "financing" | "deadline";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const supplierNotifications: Notification[] = [
  {
    id: "1",
    type: "payment",
    title: "Mensalidade a Vencer",
    message: "A sua mensalidade de Maio (45.000 Kz) vence em 3 dias.",
    time: "Há 1 hora",
    read: false,
  },
  {
    id: "2",
    type: "order",
    title: "Nova Compra Recebida",
    message: "A empresa Construções Lda adquiriu 2x Materiais de Construção no valor de 1.240.000 Kz.",
    time: "Há 3 horas",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Nova Compra Recebida",
    message: "A empresa TechCorp Angola adquiriu 1x Sistema ERP Completo no valor de 450.000 Kz.",
    time: "Ontem",
    read: true,
  },
  {
    id: "4",
    type: "payment",
    title: "Pagamento Confirmado",
    message: "O pagamento da mensalidade de Abril (45.000 Kz) foi confirmado com sucesso.",
    time: "Há 2 dias",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Perfil Verificado",
    message: "O seu perfil de fornecedor foi verificado e aprovado pelo INAPEM.",
    time: "Há 5 dias",
    read: true,
  },
];

const companyNotifications: Notification[] = [
  {
    id: "1",
    type: "financing",
    title: "Financiamento em Análise",
    message: "O seu pedido de financiamento de 850.000 Kz está em análise. Prazo de resposta: 2 dias úteis.",
    time: "Há 2 horas",
    read: false,
  },
  {
    id: "2",
    type: "deadline",
    title: "Prestação a Vencer",
    message: "A prestação nº 3 do seu financiamento (37.500 Kz) vence em 5 dias.",
    time: "Há 4 horas",
    read: false,
  },
  {
    id: "3",
    type: "order",
    title: "Encomenda Confirmada",
    message: "A sua encomenda de Sistema ERP Completo foi confirmada pelo fornecedor TechSolutions Angola.",
    time: "Ontem",
    read: true,
  },
  {
    id: "4",
    type: "financing",
    title: "Financiamento Aprovado",
    message: "O seu pedido de financiamento de 450.000 Kz foi aprovado. Valor disponível para compra.",
    time: "Há 3 dias",
    read: true,
  },
  {
    id: "5",
    type: "info",
    title: "Documentos em Falta",
    message: "Para concluir o seu pedido de financiamento, falta enviar a declaração fiscal actualizada.",
    time: "Há 4 dias",
    read: true,
  },
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

export function NotificationBell() {
  const { userType } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(
    userType === "fornecedor" ? supplierNotifications : companyNotifications
  );
  const ref = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors relative"
        aria-label="Notificações"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-coral text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div>
              <h4 className="font-semibold text-foreground">Notificações</h4>
              {unread > 0 && (
                <p className="text-xs text-muted-foreground">{unread} não lidas</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-coral hover:underline"
                >
                  Marcar todas como lidas
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Lista */}
          <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              const colorClass = colorMap[notification.type];
              return (
                <div
                  key={notification.id}
                  onClick={() => markRead(notification.id)}
                  className={`flex gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    !notification.read ? "bg-blue-50/40" : ""
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-coral flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-1.5">{notification.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-border text-center">
            <button
              onClick={() => { setOpen(false); navigate("/notificacoes"); }}
              className="text-xs text-coral hover:underline"
            >
              Ver todas as notificações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
