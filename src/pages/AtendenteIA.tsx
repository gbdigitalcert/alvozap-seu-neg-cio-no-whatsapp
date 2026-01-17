import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Save, MessageSquare, Zap, Info } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const personalityOptions = [
  { id: "amigavel", label: "Amigável" },
  { id: "prestativa", label: "Prestativa" },
  { id: "vendas", label: "Focada em Vendas" },
];

export default function AtendenteIA() {
  const [isActive, setIsActive] = useState(true);
  const [selectedPersonalities, setSelectedPersonalities] = useState(["amigavel", "prestativa"]);
  const [botName, setBotName] = useState("Robô AlvoZap");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Olá! Seja bem-vindo ao nosso restaurante. Eu sou o seu assistente virtual e estou aqui para facilitar o seu pedido. Como posso te ajudar hoje?"
  );
  const [offHoursMessage, setOffHoursMessage] = useState(
    "Olá! Obrigado pelo contato. No momento estamos fechados. Nosso horário de funcionamento é de terça a domingo, das 18:00 às 23:30."
  );

  const togglePersonality = (id: string) => {
    setSelectedPersonalities(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Atendente IA</h1>
          <p className="text-muted-foreground mt-1">
            Personalize a inteligência do seu assistente com o novo tema Lilac.
          </p>
        </div>

        {/* Main Card */}
        <div className="card-elevated p-8 space-y-8">
          {/* Status */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Status do Assistente</h3>
                <p className="text-sm text-muted-foreground">O assistente está respondendo seus clientes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-semibold ${isActive ? 'text-success' : 'text-muted-foreground'}`}>
                {isActive ? 'Ativo' : 'Inativo'}
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>

          {/* Bot Name */}
          <div className="space-y-3">
            <label className="block">
              <span className="font-semibold text-foreground">Nome do Atendente</span>
              <span className="block text-sm text-muted-foreground mt-0.5">
                Como os clientes devem chamar sua IA?
              </span>
            </label>
            <Input
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
              className="bg-background border-border"
            />
          </div>

          {/* Welcome Message */}
          <div className="space-y-3">
            <label className="block">
              <span className="font-semibold text-foreground">Mensagem de Boas-Vindas</span>
              <span className="block text-sm text-muted-foreground mt-0.5">
                Esta é a primeira mensagem enviada quando um novo cliente inicia uma conversa.
              </span>
            </label>
            <Textarea
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              rows={4}
              className="bg-background border-border resize-none"
            />
            <p className="flex items-center gap-1.5 text-xs text-primary">
              <Info className="w-3.5 h-3.5" />
              Dica: Use colchetes como [Nome] para personalizar futuramente.
            </p>
          </div>

          {/* Off Hours Message */}
          <div className="space-y-3">
            <label className="block">
              <span className="font-semibold text-foreground">Mensagem de Fora de Horário</span>
              <span className="block text-sm text-primary mt-0.5">
                Mensagem enviada automaticamente quando o estabelecimento está fechado.
              </span>
            </label>
            <Textarea
              value={offHoursMessage}
              onChange={(e) => setOffHoursMessage(e.target.value)}
              rows={4}
              className="bg-background border-border resize-none"
            />
          </div>

          {/* Personality */}
          <div className="p-5 bg-muted/30 rounded-xl border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Personalidade da IA</h3>
                <p className="text-sm text-muted-foreground">
                  A IA responderá de forma amigável e focada em converter a conversa em um pedido.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {personalityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => togglePersonality(option.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedPersonalities.includes(option.id)
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-background border-border text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="outline" className="text-muted-foreground">
              Descartar Alterações
            </Button>
            <Button className="gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Save className="w-4 h-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card-elevated p-5 flex items-start gap-4"
          >
            <div className="p-2 bg-secondary/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Como funciona?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                A IA utiliza o seu cardápio cadastrado para tirar dúvidas sobre preços e taxas.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card-elevated p-5 flex items-start gap-4"
          >
            <div className="p-2 bg-warning/10 rounded-lg">
              <Zap className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Ativação Instantânea</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Qualquer alteração feita aqui é refletida no seu WhatsApp imediatamente.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          © 2024 AlvoZap - O assistente inteligente Lilac.
        </p>
      </motion.div>
    </AppLayout>
  );
}
