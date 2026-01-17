import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const orders = [
  { id: "#8421", name: "Roberto Silva", initials: "RS", value: "R$ 64,50", time: "12:45", status: "Pago" },
  { id: "#8420", name: "Mariana Costa", initials: "MC", value: "R$ 42,00", time: "12:30", status: "Preparando" },
  { id: "#8419", name: "João Pedro", initials: "JP", value: "R$ 89,00", time: "12:15", status: "Pago" },
];

export function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-foreground">Últimos Pedidos</h3>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Ver todos
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-center gap-4"
          >
            <Avatar className="w-10 h-10 bg-primary/10 border border-border">
              <AvatarFallback className="text-primary text-sm font-semibold bg-primary/10">
                {order.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{order.name}</p>
              <p className="text-xs text-muted-foreground">Pedido {order.id} • {order.time}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-foreground">{order.value}</p>
              <span className={`text-xs font-medium ${
                order.status === 'Pago' ? 'text-success' : 'text-warning'
              }`}>
                {order.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
