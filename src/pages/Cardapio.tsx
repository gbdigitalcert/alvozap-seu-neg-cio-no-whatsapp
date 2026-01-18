import { useState } from "react";
import { motion } from "framer-motion";
import { Pizza, Utensils, Wine, IceCream, Plus, ListFilter, Pencil, Coffee, Salad, Fish, Beef, Cake, Cookie, Soup } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { NovaCategoriaModal, iconOptions } from "@/components/cardapio/NovaCategoriaModal";
import { NovoProdutoModal } from "@/components/cardapio/NovoProdutoModal";
import { EditarProdutoModal } from "@/components/cardapio/EditarProdutoModal";
import { useToast } from "@/hooks/use-toast";

import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaCalabresa from "@/assets/pizza-calabresa.jpg";
import pizzaQuatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import burger from "@/assets/burger.jpg";

// Icon mapping for dynamic rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  pizza: Pizza,
  utensils: Utensils,
  wine: Wine,
  "ice-cream": IceCream,
  coffee: Coffee,
  salad: Salad,
  fish: Fish,
  beef: Beef,
  cake: Cake,
  cookie: Cookie,
  soup: Soup,
  plus: Plus,
};

interface Category {
  id: string;
  name: string;
  iconId: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: string;
  image: string;
  available: boolean;
  categoryId: string;
}

const initialCategories: Category[] = [
  { id: "pizzas", name: "Pizzas", iconId: "pizza" },
  { id: "hamburgueres", name: "Hamburgueres", iconId: "utensils" },
  { id: "bebidas", name: "Bebidas", iconId: "wine" },
  { id: "sobremesas", name: "Sobremesas", iconId: "ice-cream" },
  { id: "adicionais", name: "Adicionais", iconId: "plus" },
];

const initialProducts: Product[] = [
  { id: 1, name: "Pizza Margherita", description: "Molho de tomate, mussarela e manjericão fresco", price: "R$ 45,00", image: pizzaMargherita, available: true, categoryId: "pizzas" },
  { id: 2, name: "Pizza Calabresa", description: "Calabresa fatiada, cebola e mussarela", price: "R$ 42,00", image: pizzaCalabresa, available: true, categoryId: "pizzas" },
  { id: 3, name: "Pizza Quatro Queijos", description: "Mussarela, provolone, gorgonzola e parmesão", price: "R$ 50,00", image: pizzaQuatroQueijos, available: false, categoryId: "pizzas" },
  { id: 4, name: "Pizza Portuguesa", description: "Presunto, ovos, cebola, ervilha e mussarela", price: "R$ 48,00", image: pizzaMargherita, available: true, categoryId: "pizzas" },
  { id: 5, name: "Burger Artesanal", description: "Pão brioche, 150g de carne, queijo cheddar, alface e tomate", price: "R$ 35,00", image: burger, available: true, categoryId: "hamburgueres" },
  { id: 6, name: "Burger Duplo", description: "Pão brioche, 2x 150g de carne, queijo cheddar duplo, bacon", price: "R$ 45,00", image: burger, available: true, categoryId: "hamburgueres" },
];

export default function Cardapio() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeCategory, setActiveCategory] = useState("pizzas");
  
  // Modal states
  const [novaCategoriaOpen, setNovaCategoriaOpen] = useState(false);
  const [novoProdutoOpen, setNovoProdutoOpen] = useState(false);
  const [editarProdutoOpen, setEditarProdutoOpen] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<Product | null>(null);
  
  const { toast } = useToast();

  const currentProducts = products.filter(p => p.categoryId === activeCategory);

  const toggleAvailability = (id: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    ));
  };

  const handleAddCategory = (data: { name: string; iconId: string }) => {
    const newCategory: Category = {
      id: data.name.toLowerCase().replace(/\s+/g, "-"),
      name: data.name,
      iconId: data.iconId,
    };
    setCategories(prev => [...prev, newCategory]);
    setActiveCategory(newCategory.id);
    toast({
      title: "Categoria criada!",
      description: `A categoria "${data.name}" foi adicionada ao cardápio.`,
    });
  };

  const handleAddProduct = (data: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...data,
      id: Date.now(),
      categoryId: data.categoryId || activeCategory,
    };
    setProducts(prev => [...prev, newProduct]);
    toast({
      title: "Produto adicionado!",
      description: `"${data.name}" foi adicionado ao cardápio.`,
    });
  };

  const handleEditProduct = (product: Product) => {
    setProdutoParaEditar(product);
    setEditarProdutoOpen(true);
  };

  const handleSaveEditedProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setProdutoParaEditar(null);
    toast({
      title: "Produto atualizado!",
      description: `"${updatedProduct.name}" foi atualizado com sucesso.`,
    });
  };

  const getIconComponent = (iconId: string) => {
    return iconMap[iconId] || Plus;
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
                const Icon = getIconComponent(category.iconId);
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

            <Button 
              className="w-full mt-6 bg-gradient-primary text-primary-foreground hover:opacity-90"
              onClick={() => setNovaCategoriaOpen(true)}
            >
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
              <h1 className="text-2xl font-bold text-foreground capitalize">
                {categories.find(c => c.id === activeCategory)?.name || activeCategory}
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie os itens disponíveis no seu cardápio via WhatsApp.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <ListFilter className="w-4 h-4" />
                Ordenar
              </Button>
              <Button 
                className="gap-2 bg-foreground text-background hover:bg-foreground/90"
                onClick={() => setNovoProdutoOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Novo Produto
              </Button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card-elevated overflow-hidden ${!product.available ? 'opacity-75' : ''}`}
              >
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover ${!product.available ? 'grayscale' : ''}`}
                  />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-foreground/80 hover:bg-foreground rounded-full transition-colors"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Pencil className="w-4 h-4 text-background" />
                  </button>
                  {!product.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                      <span className="px-4 py-2 bg-muted text-muted-foreground text-sm font-semibold rounded-full">
                        ESGOTADO
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{product.description}</p>
                  )}
                  <p className="text-primary font-bold mt-2">{product.price}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      product.available ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {product.available ? 'Disponível' : 'Indisponível'}
                    </span>
                    <Switch
                      checked={product.available}
                      onCheckedChange={() => toggleAvailability(product.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {currentProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum produto nesta categoria ainda.
                </p>
                <Button 
                  className="mt-4 gap-2 bg-gradient-primary text-primary-foreground"
                  onClick={() => setNovoProdutoOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Primeiro Produto
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <NovaCategoriaModal
        open={novaCategoriaOpen}
        onOpenChange={setNovaCategoriaOpen}
        onSave={handleAddCategory}
      />

      <NovoProdutoModal
        open={novoProdutoOpen}
        onOpenChange={setNovoProdutoOpen}
        categories={categories}
        defaultCategoryId={activeCategory}
        onSave={handleAddProduct}
      />

      <EditarProdutoModal
        open={editarProdutoOpen}
        onOpenChange={setEditarProdutoOpen}
        categories={categories}
        product={produtoParaEditar}
        onSave={handleSaveEditedProduct}
      />
    </AppLayout>
  );
}
