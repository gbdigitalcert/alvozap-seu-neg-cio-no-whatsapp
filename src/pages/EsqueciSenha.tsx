import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logoAlvo from "@/assets/logo-alvo.png";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, informe seu email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img src={logoAlvo} alt="AlvoZap" className="h-12 w-auto" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">AlvoZap</h1>
            <p className="text-sm text-muted-foreground">Autoatendimento via WhatsApp</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card-elevated p-8">
          {!emailSent ? (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-foreground">Recuperar senha</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Informe seu email para receber as instruções de recuperação.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary text-primary-foreground font-semibold h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar instruções"
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Email enviado!</h2>
              <p className="text-sm text-muted-foreground">
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para o login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
