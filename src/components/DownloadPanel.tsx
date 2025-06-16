
import { motion } from 'framer-motion';
import { Download, Image, FileText, Camera } from 'lucide-react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useQR } from '../contexts/QRContext';

interface DownloadPanelProps {
  qrRef: React.RefObject<HTMLDivElement>;
}

const DownloadPanel = ({ qrRef }: DownloadPanelProps) => {
  const { settings } = useQR();
  const downloadRef = useRef<HTMLDivElement>(null);

  const downloadPNG = async () => {
    if (!qrRef.current || !settings.data) return;

    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: settings.backgroundColor,
        scale: 2,
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'qr-code.png');
        }
      });
    } catch (error) {
      console.error('Error downloading PNG:', error);
    }
  };

  const downloadSVG = () => {
    if (!qrRef.current || !settings.data) return;

    try {
      const svgElement = qrRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        saveAs(svgBlob, 'qr-code.svg');
      }
    } catch (error) {
      console.error('Error downloading SVG:', error);
    }
  };

  const downloadScreenshot = async () => {
    if (!downloadRef.current || !settings.data) return;

    try {
      const canvas = await html2canvas(downloadRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 400,
        height: settings.labelText ? 480 : 440,
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'qr-code-screenshot.png');
        }
      });
    } catch (error) {
      console.error('Error downloading screenshot:', error);
    }
  };

  if (!settings.data) {
    return (
      <div className="bg-tan dark:bg-rosy-brown p-4 text-center">
        <p className="text-raisin-black dark:text-silver-pink">
          Generate a QR code to enable downloads
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-tan dark:bg-rosy-brown p-4"
    >
      <h3 className="text-lg font-semibold text-raisin-black dark:text-silver-pink mb-4 text-center">
        Download Options
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <motion.button
          onClick={downloadPNG}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-tuscan-red text-white hover:bg-raisin-black transition-colors"
        >
          <Image size={16} />
          PNG
        </motion.button>
        
        <motion.button
          onClick={downloadSVG}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-tuscan-red text-white hover:bg-raisin-black transition-colors"
        >
          <FileText size={16} />
          SVG
        </motion.button>
        
        <motion.button
          onClick={downloadScreenshot}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-tuscan-red text-white hover:bg-raisin-black transition-colors"
        >
          <Camera size={16} />
          Screenshot
        </motion.button>
      </div>

      {/* Hidden element for screenshot generation */}
      <div ref={downloadRef} className="hidden">
        <div className="bg-white p-8 w-96">
          {qrRef.current && (
            <div dangerouslySetInnerHTML={{ __html: qrRef.current.innerHTML }} />
          )}
          {settings.labelText && (
            <div
              className="mt-4 text-center font-medium"
              style={{
                color: settings.labelColor,
                fontSize: `${settings.labelSize}px`,
              }}
            >
              {settings.labelText}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadPanel;
