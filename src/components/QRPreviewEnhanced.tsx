
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQR } from '../contexts/QRContext';
import GlassCard from './GlassCard';

const QRPreviewEnhanced = () => {
  const { settings } = useQR();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!settings.data) return;

    setIsGenerating(true);

    const generateQR = async () => {
      try {
        let formattedData = settings.data;
        if (settings.type === 'email') {
          formattedData = `mailto:${settings.data}`;
        } else if (settings.type === 'phone') {
          formattedData = `tel:${settings.data}`;
        }

        const qrOptions = {
          width: settings.size,
          height: settings.size,
          type: 'svg' as const,
          data: formattedData,
          margin: settings.margin,
          qrOptions: {
            typeNumber: 0 as const,
            mode: 'Byte' as const,
            errorCorrectionLevel: settings.errorCorrectionLevel,
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.4,
            margin: 0,
            crossOrigin: 'anonymous' as const,
          },
          dotsOptions: {
            color: settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('rounded' as const) : ('square' as const),
          },
          backgroundOptions: {
            color: settings.backgroundColor,
          },
          cornersSquareOptions: {
            color: settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('extra-rounded' as const) : ('square' as const),
          },
          cornersDotOptions: {
            color: settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('dot' as const) : ('square' as const),
          },
        };

        if (settings.logo) {
          qrOptions.imageOptions = {
            ...qrOptions.imageOptions,
            imageSize: 0.25,
            margin: 5,
          };
          (qrOptions as any).image = settings.logo;
        }

        if (!qrCode.current) {
          qrCode.current = new QRCodeStyling(qrOptions);
        } else {
          qrCode.current.update(qrOptions);
        }

        if (qrRef.current) {
          qrRef.current.innerHTML = '';
          qrCode.current.append(qrRef.current);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    const timeoutId = setTimeout(generateQR, 300);
    return () => clearTimeout(timeoutId);
  }, [settings]);

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full flex flex-col items-center justify-center p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-raisin-black dark:text-silver-pink mb-2">
          Live Preview
        </h2>
        <p className="text-rosy-brown dark:text-tan">
          Your QR code updates in real-time
        </p>
      </div>

      <GlassCard className="p-8 relative">
        <motion.div
          className="relative"
          animate={isGenerating ? { scale: 0.95, opacity: 0.7 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {!settings.data ? (
            <div className="w-80 h-80 bg-silver-pink/20 dark:bg-raisin-black/20 flex items-center justify-center border-2 border-dashed border-tan dark:border-rosy-brown">
              <p className="text-rosy-brown dark:text-tan text-center">
                Enter data to generate<br />your QR code
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                ref={qrRef}
                className="bg-white p-4 shadow-lg"
                style={{ backgroundColor: settings.backgroundColor }}
              />
              {settings.labelText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center"
                  style={{
                    color: settings.labelColor,
                    fontSize: `${settings.labelSize}px`,
                  }}
                >
                  {settings.labelText}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-raisin-black/50 backdrop-blur-sm"
          >
            <div className="w-8 h-8 border-4 border-tuscan-red border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  );
};

export default QRPreviewEnhanced;
