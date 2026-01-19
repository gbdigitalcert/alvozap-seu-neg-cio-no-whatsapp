import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface MapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  customerName: string;
}

export function MapModal({ open, onOpenChange, address, customerName }: MapModalProps) {
  const [copied, setCopied] = useState(false);

  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const embedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Endereço copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Erro ao copiar endereço");
    }
  };

  const handleOpenGoogleMaps = () => {
    window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Endereço de Entrega
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Customer Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">Cliente</p>
            <p className="font-semibold text-foreground">{customerName}</p>
          </div>

          {/* Address */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Endereço</p>
            <p className="font-medium text-foreground">{address}</p>
          </div>

          {/* Map Embed */}
          <div className="rounded-lg overflow-hidden border border-border h-[250px]">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de entrega"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleCopyAddress}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-success" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Endereço
                </>
              )}
            </Button>
            <Button
              className="flex-1 gap-2 bg-gradient-primary text-primary-foreground hover:opacity-90"
              onClick={handleOpenGoogleMaps}
            >
              <ExternalLink className="w-4 h-4" />
              Abrir no Google Maps
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
