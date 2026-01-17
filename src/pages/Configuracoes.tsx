import { motion } from "framer-motion";
import { Store, Clock, CreditCard, Bell, Users, Shield, MessageSquare } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const settingsSections = [
  {
    title: "Informações do Estabelecimento",
    icon: Store,
    settings: [
      { id: "name", label: "Nome do Restaurante", type: "input", value: "Pizzaria do Chef" },
      { id: "phone", label: "Telefone/WhatsApp", type: "input", value: "+55 11 99999-9999" },
      { id: "address", label: "Endereço", type: "input", value: "Rua das Pizzas, 123 - São Paulo, SP" },
    ],
  },
  {
    title: "Horário de Funcionamento",
    icon: Clock,
    settings: [
      { id: "weekdays", label: "Segunda a Sexta", type: "input", value: "18:00 - 23:30" },
      { id: "weekends", label: "Sábados e Domingos", type: "input", value: "17:00 - 00:00" },
      { id: "closed", label: "Dias Fechados", type: "input", value: "Segunda-feira" },
    ],
  },
  {
    title: "Pagamentos",
    icon: CreditCard,
    settings: [
      { id: "pix", label: "Aceitar PIX", type: "toggle", value: true },
      { id: "card", label: "Aceitar Cartão na Entrega", type: "toggle", value: true },
      { id: "cash", label: "Aceitar Dinheiro", type: "toggle", value: true },
    ],
  },
  {
    title: "Notificações",
    icon: Bell,
    settings: [
      { id: "new_order", label: "Novos Pedidos", type: "toggle", value: true },
      { id: "chat", label: "Novas Mensagens", type: "toggle", value: true },
      { id: "daily_report", label: "Relatório Diário", type: "toggle", value: false },
    ],
  },
];

export default function Configuracoes() {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações do seu estabelecimento e do sistema.
          </p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="card-elevated p-6"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                </div>

                <div className="space-y-5">
                  {section.settings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between">
                      <label className="text-sm font-medium text-foreground">{setting.label}</label>
                      {setting.type === "input" ? (
                        <Input
                          defaultValue={setting.value as string}
                          className="max-w-sm bg-background border-border"
                        />
                      ) : (
                        <Switch
                          defaultChecked={setting.value as boolean}
                          className="data-[state=checked]:bg-primary"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-elevated p-6 border-destructive/30"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">Zona de Perigo</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Desconectar WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Remove a conexão com seu número de WhatsApp</p>
                </div>
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                  Desconectar
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
