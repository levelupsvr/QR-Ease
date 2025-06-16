
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QRCustomizerEnhanced from '../components/QRCustomizerEnhanced';
import QRPreviewEnhanced from '../components/QRPreviewEnhanced';
import DownloadPanel from '../components/DownloadPanel';
import BackgroundEffects from '../components/BackgroundEffects';
import { QRProvider } from '../contexts/QRContext';

const Index = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  return (
    <QRProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-silver-pink/30 to-tan/30 dark:from-raisin-black to-tuscan-red/20 relative">
        <BackgroundEffects />
        
        <Header />
        
        <main className="flex-1 flex flex-col relative z-10">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 min-h-0">
            {/* Left Panel - Customizer */}
            <div className="order-2 lg:order-1">
              <QRCustomizerEnhanced />
            </div>
            
            {/* Right Panel - Preview */}
            <div className="order-1 lg:order-2 relative">
              <div ref={qrRef}>
                <QRPreviewEnhanced />
              </div>
            </div>
          </div>
          
          {/* Download Panel */}
          <DownloadPanel qrRef={qrRef} />
        </main>
        
        <Footer />
      </div>
    </QRProvider>
  );
};

export default Index;
