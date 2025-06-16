
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
      <div className="min-h-screen flex flex-col bg-fairy-gradient relative cursor-glow">
        <BackgroundEffects />
        
        <Header />
        
        <main className="flex-1 flex flex-col relative z-10">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 min-h-0">
            {/* Left Panel - Customizer */}
            <motion.div 
              className="order-2 lg:order-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <QRCustomizerEnhanced />
            </motion.div>
            
            {/* Right Panel - Preview */}
            <motion.div 
              className="order-1 lg:order-2 relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div ref={qrRef}>
                <QRPreviewEnhanced />
              </div>
            </motion.div>
          </div>
          
          {/* Download Panel */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <DownloadPanel qrRef={qrRef} />
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </QRProvider>
  );
};

export default Index;
