import { useState } from "react";
import { motion } from "framer-motion";
import { Pizza, Utensils, Wine, IceCream, Plus, ListFilter, Pencil } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaCalabresa from "@/assets/pizza-calabresa.jpg";
import pizzaQuatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import burger from "@/assets/burger.jpg";

const categories = [
  { id: "pizzas", name: "Pizzas", icon: Pizza },
  { id: "hamburgueres", name: "Hamburgueres", icon: Utensils },
  { id: "bebidas", name: "Bebidas", icon: Wine },
  { id: "sobremesas", name: "Sobremesas", icon: IceCream },
  { id: "adicionais", name: "Adicionais", icon: Plus },
];

const products = {
  pizzas: [
    { id: 1, name: "Pizza Margherita", price: "R$ 45,00", image: pizzaMargherita, available: true },
    { id: 2, name: "Pizza Calabresa", price: "R$ 42,00", image: pizzaCalabresa, available: true },
    { id: 3, name: "Pizza Quatro Queijos", price: "R$ 50,00", image: pizzaQuatroQueijos, available: false },
    { id: 4, name: "Pizza Portuguesa", price: "R$ 48,00", image: pizzaMargherita, available: true },
  ],
  hamburgueres: [
    { id: 5, name: "Burger Artesanal", price: "R$ 35,00", image: burger, available: true },
    { id: 6, name: "Burger Duplo", price: "R$ 45,00", image: burger, available: true },
  ],
  bebidas: [],
  sobremesas: [],
  adicionais: [],
};

export default function Cardapio() {
  const [activeCategory, setActiveCategory] = useState("pizzas");
  const [productAvailability, setProductAvailability] = useState<Record<number, boolean>>(
    Object.values(products).flat().reduce((acc, p) => ({ ...acc, [p.id]: p.available }), {})
  );

  const currentProducts = products[activeCategory as keyof typeof products] || [];

  const toggleAvailability = (id: number) => {
    setProductAvailability(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppLayout>
      <div className="flex gap-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-56 flex-shrink-0"
        >
          <div className="sticky top-24">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-4">
              Categorias
            </h3>
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full sidebar-category ${isActive ? 'sidebar-category-active' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                );
              })}
            </nav>

            <Button className="w-full mt-6 bg-gradient-primary text-primary-foreground hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground capitalize">{activeCategory}</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie os itens disponíveis no seu cardápio via WhatsApp.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <ListFilter className="w-4 h-4" />
                Ordenar
              </Button>
              <Button className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Plus className="w-4 h-4" />
                Novo Produto
              </Button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentProducts.map((product, index) => {
              const isAvailable = productAvailability[product.id];
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card-elevated overflow-hidden ${!isAvailable ? 'opacity-75' : ''}`}
                >
                  <div className="relative aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover ${!isAvailable ? 'grayscale' : ''}`}
                    />
                    <button className="absolute top-3 right-3 p-2 bg-foreground/80 hover:bg-foreground rounded-full transition-colors">
                      <Pencil className="w-4 h-4 text-background" />
                    </button>
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                        <span className="px-4 py-2 bg-muted text-muted-foreground text-sm font-semibold rounded-full">
                          ESGOTADO
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-primary font-bold mt-1">{product.price}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className={`text-xs font-semibold uppercase tracking-wide ${
                        isAvailable ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {isAvailable ? 'Disponível' : 'Indisponível'}
                      </span>
                      <Switch
                        checked={isAvailable}
                        onCheckedChange={() => toggleAvailability(product.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {currentProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum produto nesta categoria ainda.
                </p>
                <Button className="mt-4 gap-2 bg-gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4" />
                  Adicionar Primeiro Produto
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
