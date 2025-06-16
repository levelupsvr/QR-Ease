
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useQR } from '../contexts/QRContext';
import QRTypeSelector from './customization/QRTypeSelector';
import DataInput from './customization/DataInput';
import ColorPickers from './customization/ColorPickers';
import SizeControls from './customization/SizeControls';
import LogoUpload from './customization/LogoUpload';
import LabelCustomization from './customization/LabelCustomization';

const QRCustomizerEnhanced = () => {
  const { resetSettings } = useQR();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full overflow-y-auto p-8 cursor-glow"
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-muted dark:text-silver-pink mb-2">
            Customize QR Code
          </h2>
          <p className="text-destructive dark:text-tan">
            Configure your QR code settings with advanced customizations
          </p>
        </div>

        <QRTypeSelector />
        <DataInput />
        <ColorPickers />
        <SizeControls />
        <LogoUpload />
        <LabelCustomization />

        <motion.button
          onClick={resetSettings}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-4 bg-raisin-black text-white hover:bg-tuscan-red hover:text-white flex items-center justify-center gap-3 font-medium transition-all rounded-lg ripple"
        >
          <RotateCcw size={18} />
          Reset All Settings
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QRCustomizerEnhanced;
