import { useState } from "react";
import { Pizza, Utensils, Wine, IceCream, Plus, Coffee, Salad, Fish, Beef, Cake, Cookie, Soup } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const iconOptions = [
  { id: "pizza", name: "Pizza", icon: Pizza },
  { id: "utensils", name: "Talheres", icon: Utensils },
  { id: "wine", name: "Bebidas", icon: Wine },
  { id: "ice-cream", name: "Sorvete", icon: IceCream },
  { id: "coffee", name: "Café", icon: Coffee },
  { id: "salad", name: "Salada", icon: Salad },
  { id: "fish", name: "Peixe", icon: Fish },
  { id: "beef", name: "Carne", icon: Beef },
  { id: "cake", name: "Bolo", icon: Cake },
  { id: "cookie", name: "Cookie", icon: Cookie },
  { id: "soup", name: "Sopa", icon: Soup },
  { id: "plus", name: "Outros", icon: Plus },
];

interface NovaCategoriaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (category: { name: string; iconId: string }) => void;
}

export function NovaCategoriaModal({ open, onOpenChange, onSave }: NovaCategoriaModalProps) {
  const [name, setName] = useState("");
  const [iconId, setIconId] = useState("pizza");

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ name: name.trim(), iconId });
    setName("");
    setIconId("pizza");
    onOpenChange(false);
  };

  const handleClose = () => {
    setName("");
    setIconId("pizza");
    onOpenChange(false);
  };

  const SelectedIcon = iconOptions.find(i => i.id === iconId)?.icon || Pizza;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Nova Categoria</DialogTitle>
          <DialogDescription>
            Adicione uma nova categoria ao seu cardápio.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome da Categoria</Label>
            <Input
              id="category-name"
              placeholder="Ex: Pizzas, Bebidas, Sobremesas..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Ícone</Label>
            <Select value={iconId} onValueChange={setIconId}>
              <SelectTrigger className="bg-background">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <SelectedIcon className="w-4 h-4" />
                    {iconOptions.find(i => i.id === iconId)?.name}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-card">
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <SelectItem key={option.id} value={option.id}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {option.name}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            className="bg-gradient-primary text-primary-foreground hover:opacity-90"
            onClick={handleSave}
            disabled={!name.trim()}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { iconOptions };
