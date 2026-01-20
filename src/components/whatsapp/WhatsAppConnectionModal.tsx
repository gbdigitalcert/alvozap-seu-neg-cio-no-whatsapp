import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/contexts/WhatsAppContext";
import { CheckCircle2, Loader2, QrCode, Smartphone } from "lucide-react";

interface WhatsAppConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhatsAppConnectionModal({
  open,
  onOpenChange,
}: WhatsAppConnectionModalProps) {
  const { isConnected, isConnecting, connect, setConnecting } = useWhatsApp();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (open && !isConnected) {
      setConnecting(true);
    }
  }, [open, isConnected, setConnecting]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        onOpenChange(false);
        setShowSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, onOpenChange]);

  const handleSimulateConnection = () => {
    connect();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setConnecting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-success" />
            Conectar WhatsApp
          </DialogTitle>
          <DialogDescription>
            Escaneie o QR Code abaixo com seu WhatsApp para conectar
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          {showSuccess || isConnected ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 rounded-2xl bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-24 h-24 text-success" />
              </div>
              <div className="flex items-center gap-2 text-success font-medium">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Conectado!
              </div>
            </div>
          ) : (
            <>
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 rounded-2xl bg-muted/50 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
                <QrCode className="w-16 h-16 text-muted-foreground" />
                <p className="text-xs text-muted-foreground text-center px-4">
                  QR Code será exibido aqui
                </p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 mt-4 text-muted-foreground">
                {isConnecting && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Aguardando conexão...</span>
                  </>
                )}
              </div>

              {/* Instructions */}
              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Como conectar:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Abra o WhatsApp no seu celular</li>
                  <li>Toque em Menu ou Configurações</li>
                  <li>Toque em Dispositivos conectados</li>
                  <li>Escaneie o código QR</li>
                </ol>
              </div>

              {/* Simulate button (for demo) */}
              <Button
                onClick={handleSimulateConnection}
                className="mt-6 bg-success hover:bg-success/90 text-success-foreground"
              >
                Simular Conexão
              </Button>
            </>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
