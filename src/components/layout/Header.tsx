import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Bot, UtensilsCrossed, ClipboardList, Settings, MessageCircle, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import logoAlvo from "@/assets/logo-alvo.png";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/atendente-ia", label: "Atendente IA", icon: Bot },
  { path: "/cardapio", label: "Cardápio", icon: UtensilsCrossed },
  { path: "/pedidos", label: "Pedidos", icon: ClipboardList },
  { path: "/configuracoes", label: "Configurações", icon: Settings },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoAlvo} alt="AlvoZap" className="h-8 w-auto" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-tight">AlvoZap</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider leading-none">Dashboard</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative"
                >
                  <motion.div
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[1.06rem] left-1/2 -translate-x-1/2 w-[60%] h-[3px] bg-gradient-to-r from-primary to-secondary rounded-t-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              className="bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity gap-2 font-semibold shadow-soft"
            >
              <MessageCircle className="w-4 h-4" />
              Conectar WhatsApp
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 border-2 border-border cursor-pointer hover:border-primary transition-colors">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'default'}`} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {user?.nomeResponsavel ? getInitials(user.nomeResponsavel) : "AZ"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground">{user?.nomeResponsavel}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/configuracoes")} className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Minha Conta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/configuracoes")} className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
