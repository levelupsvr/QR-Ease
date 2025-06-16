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

    // Find the SVG element inside the QR container
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    // Serialize SVG to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    // Create an image from the SVG string
    const img = new window.Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Create a canvas with the same size as the SVG
      const width = svg.width.baseVal.value || 512;
      const height = svg.height.baseVal.value || 512;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'qr-code.png');
          }
          URL.revokeObjectURL(url);
        });
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;
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
    if (!qrRef.current || !settings.data) return;

    const svg = qrRef.current.querySelector('svg');
    if (svg) {
      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svg);

      // Ensure xmlns is present
      if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
        svgString = svgString.replace(
          '<svg',
          '<svg xmlns="http://www.w3.org/2000/svg"'
        );
      }

      const img = new window.Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        const width = svg.width.baseVal.value || 400;
        const height = svg.height.baseVal.value || 400;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Fill white background
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, 'qr-code.png');
            }
            URL.revokeObjectURL(url);
          });
        }
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        alert('Failed to load SVG image for download.');
      };
      img.src = url;
      return;
    }

    // Fallback for non-SVG QR codes
    if (!downloadRef.current) return;

    try {
      const canvas = await html2canvas(downloadRef.current, {
        backgroundColor: '#F2E9E4',
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
      <div className="bg-pale-rosewood dark:bg-rosy-brown p-4 text-center">
        <p className="text-charcoal-navy dark:text-silver-pink">
          Generate a QR code to enable downloads
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-pale-rosewood dark:bg-rosy-brown p-4"
    >
      <h3 className="text-lg font-semibold text-charcoal-navy dark:text-silver-pink mb-4 text-center">
        Download Options
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <motion.button
          onClick={downloadPNG}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-charcoal-navy text-white hover:bg-fairy-tale-pink hover:text-charcoal-navy transition-colors rounded-lg ripple"
        >
          <Image size={16} />
          PNG
        </motion.button>
        
        <motion.button
          onClick={downloadSVG}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-charcoal-navy text-white hover:bg-fairy-tale-pink hover:text-charcoal-navy transition-colors rounded-lg ripple"
        >
          <FileText size={16} />
          SVG
        </motion.button>
        
        <motion.button
          onClick={downloadScreenshot}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 p-3 bg-charcoal-navy text-white hover:bg-fairy-tale-pink hover:text-charcoal-navy transition-colors rounded-lg ripple"
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
