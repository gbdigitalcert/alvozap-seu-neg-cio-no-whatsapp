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
import { RotateCcw } from "lucide-react";

interface UndoDeliveryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  orderNumber: string;
}

export function UndoDeliveryDialog({
  open,
  onOpenChange,
  onConfirm,
  orderNumber,
}: UndoDeliveryDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-warning" />
            </div>
            <AlertDialogTitle>Desfazer Confirmação de Entrega</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-base">
            Tem certeza que deseja desfazer a confirmação de entrega do pedido{" "}
            <span className="font-semibold text-foreground">{orderNumber}</span>?
            <br />
            <br />
            O pedido voltará para o status "Para Entrega".
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-warning text-warning-foreground hover:bg-warning/90"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Desfazer Entrega
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
