import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, Check, X, Truck, Printer, MapPin, CheckCheck } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import burger from "@/assets/burger.jpg";
import poke from "@/assets/poke.jpg";

type OrderStatus = "novo" | "preparando" | "para_entrega" | "entregue";

interface Order {
  id: string;
  customer: string;
  items: string;
  value: string;
  time: string;
  timeAgo: string;
  status: OrderStatus;
  image: string;
}

const initialOrders: Order[] = [
  {
    id: "#8942",
    customer: "João Silva",
    items: "1x Pizza Margherita, 1x Coca-Cola 2L",
    value: "R$ 52,00",
    time: "12:45",
    timeAgo: "10 min atrás",
    status: "novo",
    image: pizzaMargherita,
  },
  {
    id: "#8940",
    customer: "Maria Oliveira",
    items: "2x Burger Artesanal, 1x Batata Frita G, 1x Suco Natural",
    value: "R$ 84,50",
    time: "12:30",
    timeAgo: "25 min atrás",
    status: "preparando",
    image: burger,
  },
  {
    id: "#8938",
    customer: "Ricardo Neves",
    items: "1x Poke de Salmão, 1x Água sem gás",
    value: "R$ 38,00",
    time: "12:15",
    timeAgo: "40 min atrás",
    status: "para_entrega",
    image: poke,
  },
];

const statusConfig = {
  novo: { label: "NOVO", class: "order-status-new" },
  preparando: { label: "EM PREPARO", class: "order-status-preparing" },
  para_entrega: { label: "PARA ENTREGA", class: "order-status-ready" },
  entregue: { label: "ENTREGUE", class: "order-status-done" },
};

const filterOptions = [
  { id: "todos", label: "Todos" },
  { id: "novo", label: "Novos" },
  { id: "preparando", label: "Em Preparo" },
  { id: "para_entrega", label: "Saiu para Entrega" },
  { id: "entregue", label: "Entregue" },
];

export default function Pedidos() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = activeFilter === "todos" || order.status === activeFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const getOrderActions = (order: Order) => {
    switch (order.status) {
      case "novo":
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90"
              onClick={() => updateOrderStatus(order.id, "preparando")}
            >
              <Check className="w-4 h-4" />
              Aceitar Pedido
            </Button>
            <Button size="sm" variant="outline" className="text-muted-foreground">
              <X className="w-4 h-4" />
            </Button>
          </div>
        );
      case "preparando":
        return (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="gap-2 bg-foreground text-background hover:bg-foreground/90"
              onClick={() => updateOrderStatus(order.id, "para_entrega")}
            >
              <Truck className="w-4 h-4" />
              Despachar
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Printer className="w-4 h-4" />
              Imprimir
            </Button>
          </div>
        );
      case "para_entrega":
        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2 text-primary border-primary/30">
              <MapPin className="w-4 h-4" />
              Ver no Mapa
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-2 text-success border-success/30"
              onClick={() => updateOrderStatus(order.id, "entregue")}
            >
              <CheckCheck className="w-4 h-4" />
              Confirmar Entrega
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      {/* Header with Search */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Pedidos</h1>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success text-sm font-medium rounded-full">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Loja Aberta
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar pedidos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-card border-border"
            />
          </div>
          <Button size="icon" variant="outline" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2"
      >
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-gradient-primary text-primary-foreground'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card-elevated p-5"
          >
            <div className="flex items-start gap-5">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xl font-bold text-primary">{order.value}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-foreground">{order.customer}</span>
                      <span className="text-muted-foreground text-sm">{order.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={statusConfig[order.status].class}>
                      {statusConfig[order.status].label}
                    </span>
                    <p className="text-sm text-muted-foreground mt-2">
                      {order.time} ({order.timeAgo})
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mt-3">{order.items}</p>

                <div className="mt-4">
                  {getOrderActions(order)}
                </div>
              </div>

              <div className="hidden sm:block w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={order.image}
                  alt="Pedido"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum pedido encontrado.</p>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Vendas Hoje</p>
              <p className="text-lg font-bold text-foreground">R$ 1.240,50</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Pedidos</p>
              <p className="text-lg font-bold text-foreground">24</p>
            </div>
          </div>
          <Button variant="outline" className="gap-2 text-primary">
            <Bell className="w-4 h-4" />
            Suporte AlvoZap
          </Button>
        </div>
      </motion.div>

      {/* Spacer for fixed footer */}
      <div className="h-24" />
    </AppLayout>
  );
}
