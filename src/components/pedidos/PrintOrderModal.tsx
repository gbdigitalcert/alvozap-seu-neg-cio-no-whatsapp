import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import logoAlvo from "@/assets/logo-alvo.png";

interface Order {
  id: string;
  customer: string;
  items: string;
  value: string;
  time: string;
  timeAgo: string;
  status: string;
  observations?: string;
}

interface PrintOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
}

export function PrintOrderModal({ open, onOpenChange, order }: PrintOrderModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemsList = order.items.split(", ").map((item) => item.trim());

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=300,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Pedido ${order.id}</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Courier New', monospace;
              font-size: 12px;
              width: 80mm;
              padding: 8px;
              background: white;
              color: black;
            }
            .logo {
              text-align: center;
              margin-bottom: 8px;
            }
            .logo img {
              max-width: 120px;
              height: auto;
            }
            .separator {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }
            .order-number {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              margin: 8px 0;
            }
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 4px 0;
            }
            .label {
              font-weight: bold;
            }
            .customer {
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              margin: 8px 0;
            }
            .items-header {
              font-weight: bold;
              margin-top: 8px;
            }
            .item {
              margin: 4px 0;
              padding-left: 8px;
            }
            .total {
              text-align: right;
              font-size: 16px;
              font-weight: bold;
              margin-top: 12px;
              padding-top: 8px;
              border-top: 2px solid #000;
            }
            .observations {
              margin-top: 8px;
              padding: 8px;
              background: #f0f0f0;
              border-radius: 4px;
            }
            .footer {
              text-align: center;
              margin-top: 16px;
              font-size: 10px;
              color: #666;
            }
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="logo">
            <img src="${logoAlvo}" alt="AlvoZap" onerror="this.style.display='none'" />
            <div style="font-size: 18px; font-weight: bold; margin-top: 4px;">AlvoZap</div>
          </div>
          
          <div class="separator"></div>
          
          <div class="order-number">${order.id}</div>
          
          <div class="info-row">
            <span class="label">Data:</span>
            <span>${currentDate}</span>
          </div>
          <div class="info-row">
            <span class="label">Hora:</span>
            <span>${currentTime}</span>
          </div>
          
          <div class="separator"></div>
          
          <div class="customer">${order.customer}</div>
          
          <div class="separator"></div>
          
          <div class="items-header">ITENS:</div>
          ${itemsList.map((item) => `<div class="item">• ${item}</div>`).join("")}
          
          <div class="total">TOTAL: ${order.value}</div>
          
          ${order.observations ? `
            <div class="separator"></div>
            <div class="observations">
              <strong>Obs:</strong> ${order.observations}
            </div>
          ` : ""}
          
          <div class="separator"></div>
          
          <div class="footer">
            Obrigado pela preferência!<br/>
            AlvoZap - Gestão Inteligente
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Preview de Impressão
          </DialogTitle>
        </DialogHeader>

        {/* Print Preview */}
        <div 
          ref={printRef}
          className="bg-white text-black p-4 rounded-lg border font-mono text-sm max-h-[400px] overflow-y-auto"
          style={{ width: "100%" }}
        >
          {/* Logo */}
          <div className="text-center mb-3">
            <img 
              src={logoAlvo} 
              alt="AlvoZap" 
              className="h-10 mx-auto object-contain"
            />
            <p className="font-bold text-lg mt-1">AlvoZap</p>
          </div>

          <div className="border-t border-dashed border-gray-400 my-3" />

          {/* Order Number */}
          <p className="text-center text-2xl font-bold my-2">{order.id}</p>

          {/* Date/Time */}
          <div className="flex justify-between text-xs">
            <span className="font-bold">Data:</span>
            <span>{currentDate}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-bold">Hora:</span>
            <span>{currentTime}</span>
          </div>

          <div className="border-t border-dashed border-gray-400 my-3" />

          {/* Customer */}
          <p className="text-center font-bold text-base">{order.customer}</p>

          <div className="border-t border-dashed border-gray-400 my-3" />

          {/* Items */}
          <p className="font-bold mb-1">ITENS:</p>
          {itemsList.map((item, index) => (
            <p key={index} className="pl-2">• {item}</p>
          ))}

          {/* Total */}
          <div className="border-t-2 border-black mt-3 pt-2">
            <p className="text-right font-bold text-lg">TOTAL: {order.value}</p>
          </div>

          {/* Observations */}
          {order.observations && (
            <>
              <div className="border-t border-dashed border-gray-400 my-3" />
              <div className="bg-gray-100 p-2 rounded text-xs">
                <strong>Obs:</strong> {order.observations}
              </div>
            </>
          )}

          <div className="border-t border-dashed border-gray-400 my-3" />

          {/* Footer */}
          <p className="text-center text-xs text-gray-500">
            Obrigado pela preferência!<br />
            AlvoZap - Gestão Inteligente
          </p>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handlePrint} className="bg-gradient-primary text-primary-foreground">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
