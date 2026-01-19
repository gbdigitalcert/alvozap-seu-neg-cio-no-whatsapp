import { useState } from "react";
import { Bell, ShoppingBag, CheckCircle, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "novo_pedido" | "entregue" | "estoque_baixo" | "cancelado";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "novo_pedido",
    title: "Novo Pedido!",
    description: "Maria pediu 2x Burger Artesanal",
    time: "há 2 min",
    read: false,
  },
  {
    id: "2",
    type: "entregue",
    title: "Pedido Entregue",
    description: "Pedido #8940 foi entregue com sucesso",
    time: "há 15 min",
    read: false,
  },
  {
    id: "3",
    type: "estoque_baixo",
    title: "Estoque Baixo",
    description: "Pizza Calabresa está com estoque baixo",
    time: "há 1 hora",
    read: false,
  },
  {
    id: "4",
    type: "novo_pedido",
    title: "Novo Pedido!",
    description: "João Silva fez um pedido de R$ 52,00",
    time: "há 2 horas",
    read: true,
  },
  {
    id: "5",
    type: "cancelado",
    title: "Pedido Cancelado",
    description: "Cliente cancelou pedido #8935",
    time: "há 3 horas",
    read: true,
  },
];

const notificationIcons = {
  novo_pedido: { icon: ShoppingBag, class: "text-primary bg-primary/10" },
  entregue: { icon: CheckCircle, class: "text-success bg-success/10" },
  estoque_baixo: { icon: AlertTriangle, class: "text-warning bg-warning/10" },
  cancelado: { icon: X, class: "text-destructive bg-destructive/10" },
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="outline" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-popover border-border" 
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notificações</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary/80"
              onClick={markAllAsRead}
            >
              Marcar todas como lidas
            </Button>
          )}
        </div>

        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notification) => {
                const { icon: Icon, class: iconClass } =
                  notificationIcons[notification.type];

                return (
                  <button
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-start gap-3 ${
                      !notification.read ? "bg-primary/5" : ""
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm text-foreground">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="p-3 border-t border-border">
          <Button
            variant="ghost"
            className="w-full text-sm text-primary hover:text-primary/80"
            onClick={() => setIsOpen(false)}
          >
            Ver todas as notificações
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
