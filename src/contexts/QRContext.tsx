
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface QRSettings {
  type: 'url' | 'text' | 'email' | 'phone';
  data: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  dotType: 'square' | 'rounded' | 'circle' | 'sharp';
  logo: string | null;
  logoSize: number;
  logoOpacity: number;
  labelText: string;
  labelColor: string;
  labelSize: number;
  labelFont: 'inter' | 'serif' | 'mono';
  labelAlignment: 'left' | 'center' | 'right';
  labelWeight: 'normal' | 'semibold' | 'bold';
  gradientEnabled: boolean;
  gradientColor1: string;
  gradientColor2: string;
  gradientType: 'linear' | 'radial';
  backgroundPattern: 'none' | 'dots' | 'grid' | 'diagonal';
  glowEffect: boolean;
  outlineColor: string;
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
  backgroundColor: '#DCB39A',
  size: 300,
  margin: 4,
  errorCorrectionLevel: 'M',
  dotType: 'square',
  logo: null,
  logoSize: 25,
  logoOpacity: 100,
  labelText: '',
  labelColor: '#2F1B23',
  labelSize: 16,
  labelFont: 'inter',
  labelAlignment: 'center',
  labelWeight: 'normal',
  gradientEnabled: false,
  gradientColor1: '#764A4D',
  gradientColor2: '#C69390',
  gradientType: 'linear',
  backgroundPattern: 'none',
  glowEffect: false,
  outlineColor: '#CEB2B7',
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
