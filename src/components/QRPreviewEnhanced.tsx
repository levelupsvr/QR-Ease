import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { useQR } from '../contexts/QRContext';
import GlassCard from './GlassCard';
import QRDesignCustomization from './customization/QRDesignCustomization';

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

        // Create gradient if enabled
        let dotsColor = settings.foregroundColor;
        if (settings.gradientEnabled) {
          if (settings.gradientType === 'linear') {
            dotsColor = `linear-gradient(45deg, ${settings.gradientColor1}, ${settings.gradientColor2})`;
          } else {
            dotsColor = `radial-gradient(circle, ${settings.gradientColor1}, ${settings.gradientColor2})`;
          }
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
            imageSize: settings.logoSize / 100,
            margin: 0,
            crossOrigin: 'anonymous' as const,
          },
          dotsOptions: {
            color: settings.gradientEnabled ? settings.gradientColor1 : settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('rounded' as const) : 
                  settings.dotType === 'circle' ? ('dots' as const) : ('square' as const),
          },
          backgroundOptions: {
            color: settings.backgroundColor,
          },
          cornersSquareOptions: {
            color: settings.gradientEnabled ? settings.gradientColor1 : settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('extra-rounded' as const) : ('square' as const),
          },
          cornersDotOptions: {
            color: settings.gradientEnabled ? settings.gradientColor1 : settings.foregroundColor,
            type: settings.dotType === 'rounded' ? ('dot' as const) : ('square' as const),
          },
        };

        if (settings.logo) {
          qrOptions.imageOptions = {
            ...qrOptions.imageOptions,
            imageSize: settings.logoSize / 100,
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

  const getFontWeight = () => {
    switch (settings.labelWeight) {
      case 'bold': return 'font-bold';
      case 'semibold': return 'font-semibold';
      default: return 'font-normal';
    }
  };

  const getTextAlign = () => {
    switch (settings.labelAlignment) {
      case 'left': return 'text-left';
      case 'right': return 'text-right';
      default: return 'text-center';
    }
  };

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-full flex flex-col p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-muted dark:text-silver-pink mb-2">
          Live Preview
        </h2>
        <p className="text-rosy-brown dark:text-tan">
          Your QR code updates in real-time
        </p>
      </div>

      <GlassCard className="p-8 relative mb-8 flex items-center justify-center min-h-[420px]">
        <motion.div
          className="relative"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {!settings.data ? (
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(216,96,114,0.10)" }}
              className="w-full max-w-[340px] aspect-square bg-silver-pink/10 dark:bg-raisin-black/20 flex items-center justify-center border-2 border-dashed border-tan dark:border-rosy-brown rounded-xl shadow-md transition-all duration-300"
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-destructive dark:text-tan text-center text-lg font-medium px-4"
              >
                Enter data to generate<br />your QR code
              </motion.p>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center">
              <div
                ref={qrRef}
                className="bg-white p-4 shadow-lg rounded-xl"
                style={{
                  backgroundColor: settings.backgroundColor,
                  filter: settings.glowEffect ? `drop-shadow(0 0 20px ${settings.outlineColor})` : 'none'
                }}
              />
              {settings.labelText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 ${getTextAlign()} ${getFontWeight()}`}
                  style={{
                    color: settings.labelColor,
                    fontSize: `${settings.labelSize}px`,
                    fontFamily: settings.labelFont === 'serif' ? 'serif' :
                      settings.labelFont === 'mono' ? 'monospace' : 'Inter'
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

      {/* Design & Effects moved here */}
      <div className="flex-1 overflow-y-auto">
        <QRDesignCustomization />
      </div>
    </motion.div>
  );
};

export default QRPreviewEnhanced;
