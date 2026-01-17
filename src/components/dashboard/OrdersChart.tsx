import { useState } from "react";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const generateData = () => {
  const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '00:00'];
  return hours.map((hour, index) => ({
    time: hour,
    pedidos: Math.floor(Math.random() * 40) + 10 + (index > 3 ? index * 8 : index * 3),
  }));
};

const todayData = generateData();
const yesterdayData = generateData();

export function OrdersChart() {
  const [activeTab, setActiveTab] = useState<'today' | 'yesterday'>('today');
  const data = activeTab === 'today' ? todayData : yesterdayData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pedidos por Hora</h3>
          <p className="text-sm text-muted-foreground">Volume de pedidos processados hoje, 24 de Maio</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Ao Vivo
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('today')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'today' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Hoje
        </button>
        <button
          onClick={() => setActiveTab('yesterday')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'yesterday' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          Ontem
        </button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(256, 60%, 75%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(214, 60%, 70%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(235, 20%, 45%)', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(235, 20%, 45%)', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(240, 5%, 88%)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'
              }}
              labelStyle={{ color: 'hsl(235, 50%, 14%)', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="pedidos"
              stroke="url(#strokeGradient)"
              strokeWidth={3}
              fill="url(#colorPedidos)"
              dot={{ fill: 'hsl(256, 40%, 65%)', strokeWidth: 0, r: 4 }}
              activeDot={{ fill: 'hsl(256, 40%, 65%)', strokeWidth: 0, r: 6 }}
            />
            <defs>
              <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(256, 60%, 75%)" />
                <stop offset="100%" stopColor="hsl(214, 60%, 70%)" />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
