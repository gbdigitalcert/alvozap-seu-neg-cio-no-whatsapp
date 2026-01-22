import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useWhatsApp } from "@/contexts/WhatsAppContext";
import { toast } from "sonner";

interface DisconnectWhatsAppDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisconnectWhatsAppDialog({
  open,
  onOpenChange,
}: DisconnectWhatsAppDialogProps) {
  const { disconnect } = useWhatsApp();

  const handleDisconnect = () => {
    disconnect();
    onOpenChange(false);
    toast.success("WhatsApp desconectado com sucesso");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Desconectar WhatsApp</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja desconectar o WhatsApp? Você precisará escanear o QR Code novamente para reconectar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDisconnect}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Desconectar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
