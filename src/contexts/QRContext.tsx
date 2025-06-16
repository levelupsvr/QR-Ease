
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QRSettings {
  type: 'url' | 'text' | 'email' | 'phone';
  data: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  dotType: 'square' | 'rounded';
  logo: string | null;
  labelText: string;
  labelColor: string;
  labelSize: number;
}

interface QRContextType {
  settings: QRSettings;
  updateSettings: (updates: Partial<QRSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: QRSettings = {
  type: 'url',
  data: '',
  foregroundColor: '#2F1B23',
  backgroundColor: '#FFFFFF',
  size: 300,
  margin: 4,
  errorCorrectionLevel: 'M',
  dotType: 'square',
  logo: null,
  labelText: '',
  labelColor: '#2F1B23',
  labelSize: 16,
};

const QRContext = createContext<QRContextType | undefined>(undefined);

export const QRProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<QRSettings>(defaultSettings);

  const updateSettings = (updates: Partial<QRSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <QRContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </QRContext.Provider>
  );
};

export const useQR = () => {
  const context = useContext(QRContext);
  if (context === undefined) {
    throw new Error('useQR must be used within a QRProvider');
  }
  return context;
};
