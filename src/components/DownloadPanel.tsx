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

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const img = new window.Image();

    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Standardized sizes and padding
      const qrSize = svg.width.baseVal.value || 512;
      const padding = 32;
      const labelFontSize = 32;
      const labelPadding = 24;
      const labelText = settings.labelText || '';
      const labelColor = settings.labelColor || '#222';
      const font = `bold ${labelFontSize}px Inter, Arial, sans-serif`;

      // Prepare label lines (wrap at 30 chars, break on \n)
      let lines: string[] = [];
      if (labelText) {
        labelText.split('\n').forEach(line => {
          if (line.length > 30) {
            line.match(/.{1,30}/g)?.forEach(part => lines.push(part));
          } else {
            lines.push(line);
          }
        });
      }
      const labelLines = lines.length;
      const labelHeight = labelLines ? (labelLines * (labelFontSize + 8) + labelPadding) : 0;

      // Final canvas size: padding around QR, label below
      const canvasWidth = qrSize + padding * 2;
      const canvasHeight = qrSize + padding + labelHeight + padding / 2;

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Fill background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw QR code centered
        ctx.drawImage(img, padding, padding, qrSize, qrSize);

        // Draw label if present
        if (labelLines) {
          ctx.font = font;
          ctx.fillStyle = labelColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          lines.forEach((line, index) => {
            ctx.fillText(
              line,
              canvasWidth / 2,
              padding + qrSize + labelPadding / 2 + index * (labelFontSize + 8)
            );
          });
        }

        canvas.toBlob((blob) => {
          if (blob && typeof saveAs === "function") saveAs(blob, "qr-code.png");
          URL.revokeObjectURL(url);
        });
      } else {
        URL.revokeObjectURL(url);
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

      // Handle multi-line label
      let lines: string[] = [];
      settings.labelText.split('\n').forEach(line => {
        if (line.length > 30) {
          line.match(/.{1,30}/g)?.forEach(part => lines.push(part));
        } else {
          lines.push(line);
        }
      });
      const labelLines = lines.length;
      const labelHeight = labelLines * (labelFontSize + 8) + labelPadding;
      const newHeight = height + labelHeight;

      // Update SVG height and viewBox
      svgString = svgString
        .replace(/height="([^"]*)"/, `height="${newHeight}"`)
        .replace(/viewBox="([^"]+)"/, `viewBox="0 0 ${width} ${newHeight}"`);

      // Insert label lines before </svg>
      const labelColor = settings.labelColor || '#000';
      const fontFamily = 'Inter, Arial, sans-serif';
      let labelTextSVG = '';
      lines.forEach((line, idx) => {
        labelTextSVG += `
          <text
            x="${width / 2}"
            y="${height + labelPadding / 2 + (labelFontSize + 8) * idx + labelFontSize}"
            text-anchor="middle"
            font-size="${labelFontSize}"
            font-family="${fontFamily}"
            fill="${labelColor}"
            font-weight="bold"
            alignment-baseline="middle"
          >${line}</text>
        `;
      });
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
      const qrSize = svg.width.baseVal.value || 512;
      const padding = 32;
      const labelFontSize = 32;
      const labelPadding = 24;
      const labelText = settings.labelText || '';
      const labelColor = settings.labelColor || '#222';
      const font = `bold ${labelFontSize}px Inter, Arial, sans-serif`;

      // Prepare label lines
      let lines: string[] = [];
      if (labelText) {
        labelText.split('\n').forEach(line => {
          if (line.length > 30) {
            line.match(/.{1,30}/g)?.forEach(part => lines.push(part));
          } else {
            lines.push(line);
          }
        });
      }
      const labelLines = lines.length;
      const labelHeight = labelLines ? (labelLines * (labelFontSize + 8) + labelPadding) : 0;

      // Canvas size: padding around QR, label below
      const canvasWidth = qrSize + padding * 2;
      const canvasHeight = qrSize + padding + labelHeight + padding / 2;

      const canvas = document.createElement('canvas');
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw QR code
        ctx.drawImage(img, padding, padding, qrSize, qrSize);

        // Draw label if present
        if (labelLines) {
          ctx.font = font;
          ctx.fillStyle = labelColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          lines.forEach((line, index) => {
            ctx.fillText(
              line,
              canvasWidth / 2,
              padding + qrSize + labelPadding / 2 + index * (labelFontSize + 8)
            );
          });
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

