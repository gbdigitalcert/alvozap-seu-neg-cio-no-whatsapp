import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";

export function AIAssistantCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="card-elevated p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-foreground">IA Atendente</h3>
        <span className="badge-success font-semibold text-xs">ATIVO</span>
      </div>

      <div className="bg-gradient-primary rounded-xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-foreground/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-primary-foreground/90">
              A IA respondeu 12 dúvidas sobre o cardápio na última hora, 
              resultando em 4 novos pedidos.
            </p>
          </div>
        </div>
      </div>

      <Link 
        to="/atendente-ia"
        className="flex items-center justify-between text-primary font-medium text-sm hover:text-primary/80 transition-colors group"
      >
        <span>Treinar respostas</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
