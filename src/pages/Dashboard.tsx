import { motion } from "framer-motion";
import { MessageSquare, ShoppingCart, Receipt, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { OrdersChart } from "@/components/dashboard/OrdersChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { AIAssistantCard } from "@/components/dashboard/AIAssistantCard";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground">Resumo de Hoje</h1>
            <p className="text-muted-foreground mt-1">
              Acompanhe em tempo real o desempenho do seu restaurante.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-full border border-border">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Sistema Online</span>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Atendimentos Hoje"
            value="142"
            change="+12%"
            changeType="positive"
            icon={MessageSquare}
          />
          <KPICard
            title="Pedidos Novos"
            value="86"
            change="+5%"
            changeType="positive"
            icon={ShoppingCart}
            iconBgClass="bg-secondary/10"
          />
          <KPICard
            title="Ticket Médio"
            value="R$ 54,90"
            change="Estável"
            changeType="neutral"
            icon={Receipt}
            iconBgClass="bg-warning/10"
          />
          <KPICard
            title="Taxa de Conversão"
            value="62.5%"
            change="+2.4%"
            changeType="positive"
            icon={TrendingUp}
            iconBgClass="bg-success/10"
          />
        </div>

        {/* Main Chart */}
        <OrdersChart />

        {/* Bottom Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders />
          <AIAssistantCard />
        </div>
      </div>
    </AppLayout>
  );
}
