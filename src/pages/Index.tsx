
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRCustomizer from '../components/QRCustomizer';
import QRPreview from '../components/QRPreview';
import DownloadPanel from '../components/DownloadPanel';
import type { QRSettings } from '../components/QRCustomizer';

const Index = () => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState<QRSettings>({
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
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-silver-pink to-tan dark:from-raisin-black dark:to-tuscan-red">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
          {/* Left Panel - Customizer */}
          <div className="order-2 lg:order-1">
            <QRCustomizer settings={settings} onSettingsChange={setSettings} />
          </div>
          
          {/* Right Panel - Preview */}
          <div className="order-1 lg:order-2 relative">
            <div ref={qrRef}>
              <QRPreview settings={settings} />
            </div>
          </div>
        </div>
        
        {/* Download Panel */}
        <DownloadPanel settings={settings} qrRef={qrRef} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
