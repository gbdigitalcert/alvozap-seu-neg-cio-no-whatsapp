import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Building2, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import logoAlvo from "@/assets/logo-alvo.png";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nomeEstabelecimento: "",
    nomeResponsavel: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, telefone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const { nomeEstabelecimento, nomeResponsavel, email, telefone, password, confirmPassword } = formData;

    if (!nomeEstabelecimento || !nomeResponsavel || !email || !telefone || !password || !confirmPassword) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha fraca",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "A senha e a confirmação devem ser iguais.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const result = await signup({
      nomeEstabelecimento,
      nomeResponsavel,
      email,
      telefone,
      password,
    });
    setIsLoading(false);

    if (result.success) {
      toast({
        title: "Conta criada com sucesso!",
        description: "Bem-vindo ao AlvoZap!",
      });
      navigate("/", { replace: true });
    } else {
      toast({
        title: "Erro ao criar conta",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white max-w-lg"
        >
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <img src={logoAlvo} alt="AlvoZap" className="h-16 w-auto brightness-0 invert" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Comece hoje mesmo</h2>
          <p className="text-lg text-white/80">
            Automatize seu atendimento via WhatsApp e aumente suas vendas com nossa plataforma completa de gestão.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              ✓ Cardápio Digital
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              ✓ IA Atendente
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              ✓ Gestão de Pedidos
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo - Mobile */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <img src={logoAlvo} alt="AlvoZap" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">AlvoZap</h1>
              <p className="text-sm text-muted-foreground">Autoatendimento via WhatsApp</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="card-elevated p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-foreground">Criar sua conta</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Preencha os dados para começar a usar o AlvoZap.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nomeEstabelecimento">Nome do Estabelecimento</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="nomeEstabelecimento"
                    name="nomeEstabelecimento"
                    placeholder="Ex: Pizzaria do João"
                    value={formData.nomeEstabelecimento}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeResponsavel">Nome do Responsável</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="nomeResponsavel"
                    name="nomeResponsavel"
                    placeholder="Seu nome completo"
                    value={formData.nomeResponsavel}
                    onChange={handleChange}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={handlePhoneChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary text-primary-foreground font-semibold h-11 mt-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Criando conta...
                  </>
                ) : (
                  "Criar Conta"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Já tem uma conta?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  Entrar
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
