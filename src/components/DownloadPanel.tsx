import { motion } from 'framer-motion';
import { Image, FileText, Camera } from 'lucide-react';
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
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const img = new window.Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const width = svg.width.baseVal.value || 512;
      const height = svg.height.baseVal.value || 512;
      // Increase canvas height for the label
      const labelFontSize = 32;
      const labelPadding = 24;
      const labelHeight = settings.labelText ? labelFontSize + labelPadding : 0;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height + labelHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw QR code
        ctx.drawImage(img, 0, 0, width, height);
        // Draw label if present
        if (settings.labelText) {
          ctx.font = `bold ${labelFontSize}px Inter, Arial, sans-serif`;
          ctx.fillStyle = settings.labelColor || "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            settings.labelText,
            width / 2,
            height + labelPadding / 2
          );
        }
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, 'qr-code.png');
          URL.revokeObjectURL(url);
        });
      }
    };

    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const downloadSVG = () => {
    if (!qrRef.current || !settings.data) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svg);

    if (settings.labelText) {
      const width = svg.width.baseVal.value || 512;
      const height = svg.height.baseVal.value || 512;
      const labelFontSize = 32;
      const labelPadding = 24;
      const labelHeight = labelFontSize + labelPadding;
      const newHeight = height + labelHeight;

      // Update SVG height and viewBox
      svgString = svgString
        .replace(/height="([^"]*)"/, `height="${newHeight}"`)
        .replace(/viewBox="([^"]+)"/, `viewBox="0 0 ${width} ${newHeight}"`);

      // Insert label before </svg>
      const labelTextSVG = `
        <text
          x="${width / 2}"
          y="${height + labelFontSize}"
          text-anchor="middle"
          font-size="${labelFontSize}"
          font-family="Inter, Arial, sans-serif"
          fill="${settings.labelColor || '#000'}"
          font-weight="bold"
        >${settings.labelText}</text>
      `;
      svgString = svgString.replace('</svg>', `${labelTextSVG}</svg>`);
    }

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    saveAs(blob, 'qr-code.svg');
  };

  const downloadScreenshot = async () => {
    if (!qrRef.current || !settings.data) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const img = new window.Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const width = svg.width.baseVal.value || 512;
      const height = svg.height.baseVal.value || 512;
      const labelFontSize = 32;
      const labelPadding = 24;
      const labelHeight = settings.labelText ? labelFontSize + labelPadding : 0;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height + labelHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        if (settings.labelText) {
          ctx.font = `bold ${labelFontSize}px Inter, Arial, sans-serif`;
          ctx.fillStyle = settings.labelColor || "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(
            settings.labelText,
            width / 2,
            height + labelPadding / 2
          );
        }
        canvas.toBlob((blob) => {
          if (blob) saveAs(blob, 'qr-code-screenshot.png');
          URL.revokeObjectURL(url);
        });
      }
    };

    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  if (!settings.data) {
    return (
      <div className="p-4 text-center bg-accent dark:bg-raisin-black/10">
        <p className="text-[hsl(var(--destructive-foreground))] dark:assent">
          Generate a QR code to enable downloads
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="p-4 bg-accent border border-destructive dark:bg-[hsl(var(--background))] dark:border-[hsl(var(--secondary))] rounded-xl"
    >
      <h3 className="mb-4 text-center text-lg font-semibold text-[hsl(var(--foreground))] dark:text-[hsl(var(--primary))]">
        Download Options
      </h3>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <motion.button
          onClick={downloadPNG}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 24px 0 rgba(0,0,0,0.18)" }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center justify-center gap-2 rounded-xl p-3
            bg-primary text-[hsl(var(--primary-foreground))]
            transition-colors
            dark:bg-[hsl(var(--secondary))] dark:text-[hsl(var(--secondary-foreground))]
          "
        >
          <Image size={16} />
          PNG
        </motion.button>

        <motion.button
          onClick={downloadSVG}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center justify-center gap-2 rounded-xl p-3
            bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]
            transition-colors
            dark:bg-secondary dark:text-[hsl(var(--accent-foreground))]
          "
        >
          <FileText size={16} />
          SVG
        </motion.button>

        <motion.button
          onClick={downloadScreenshot}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            flex items-center justify-center gap-2 rounded-xl p-3
            bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]
            transition-colors
            dark:bg-secondary dark:text-[hsl(var(--destructive-foreground))]
          "
        >
          <Camera size={16} />
          Screenshot
        </motion.button>
      </div>

      {/* Hidden element for screenshot */}
      <div ref={downloadRef} className="hidden">
        <div className="w-96 bg-white p-8">
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

