import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface WhatsAppContextType {
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => void;
  disconnect: () => void;
  setConnecting: (value: boolean) => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

const STORAGE_KEY = "alvo_whatsapp_connected";

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "true";
  });
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isConnected));
  }, [isConnected]);

  const connect = () => {
    setIsConnected(true);
    setIsConnecting(false);
  };

  const disconnect = () => {
    setIsConnected(false);
  };

  return (
    <WhatsAppContext.Provider
      value={{
        isConnected,
        isConnecting,
        connect,
        disconnect,
        setConnecting: setIsConnecting,
      }}
    >
      {children}
    </WhatsAppContext.Provider>
  );
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext);
  if (context === undefined) {
    throw new Error("useWhatsApp must be used within a WhatsAppProvider");
  }
  return context;
}
