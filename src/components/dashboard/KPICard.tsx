import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconBgClass?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  iconBgClass = "bg-primary/10"
}: KPICardProps) {
  const changeColors = {
    positive: "text-success bg-success/10",
    negative: "text-destructive bg-destructive/10",
    neutral: "text-secondary bg-secondary/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${iconBgClass}`}>
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${changeColors[changeType]}`}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
