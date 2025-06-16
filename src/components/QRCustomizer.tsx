import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { SketchPicker } from 'react-color';
import { Upload, RotateCcw, Copy, Check } from 'lucide-react';

interface QRSettings {
  type: 'url' | 'text' | 'email' | 'phone';
  data: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  dotType: 'square' | 'rounded';
  logo: string | null;
  labelText: string;
  labelColor: string;
  labelSize: number;
}

interface QRCustomizerProps {
  settings: QRSettings;
  onSettingsChange: (settings: QRSettings) => void;
}

const QRCustomizer = ({ settings, onSettingsChange }: QRCustomizerProps) => {
  const [copied, setCopied] = useState(false);
  const [showForegroundPicker, setShowForegroundPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [showLabelColorPicker, setShowLabelColorPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSettings = (updates: Partial<QRSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const resetSettings = () => {
    onSettingsChange({
      type: 'url',
      data: '',
      foregroundColor: 'hsl(var(--foreground))',
      backgroundColor: 'hsl(var(--background))',
      size: 300,
      margin: 4,
      errorCorrectionLevel: 'M',
      dotType: 'square',
      logo: null,
      labelText: '',
      labelColor: 'hsl(var(--foreground))',
      labelSize: 16,
    });
  };

  const copyData = async () => {
    try {
      await navigator.clipboard.writeText(settings.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateSettings({ logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-6 text-[hsl(var(--foreground))]"
    >
      <h2 className="text-2xl font-bold mb-6">Customize QR Code</h2>

      {/* Type */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">QR Type</label>
        <select
          value={settings.type}
          onChange={(e) => updateSettings({ type: e.target.value as QRSettings['type'] })}
          className="w-full p-3 bg-transparent text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
        >
          <option value="url">Website URL</option>
          <option value="text">Plain Text</option>
          <option value="email">Email Address</option>
          <option value="phone">Phone Number</option>
        </select>
      </div>

      {/* Data */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Enter {settings.type}</label>
        <div className="relative">
          <input
            type="text"
            value={settings.data}
            onChange={(e) => updateSettings({ data: e.target.value })}
            className="w-full p-3 pr-10 bg-transparent text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
            placeholder="Enter content..."
          />
          <button
            onClick={copyData}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[hsl(var(--primary))]"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Color pickers */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Colors</label>
        <div className="flex gap-4">
          {[{
            label: 'Foreground',
            color: settings.foregroundColor,
            toggle: showForegroundPicker,
            setToggle: setShowForegroundPicker,
            onChange: (color: string) => updateSettings({ foregroundColor: color })
          }, {
            label: 'Background',
            color: settings.backgroundColor,
            toggle: showBackgroundPicker,
            setToggle: setShowBackgroundPicker,
            onChange: (color: string) => updateSettings({ backgroundColor: color })
          }].map(({ label, color, toggle, setToggle, onChange }) => (
            <div key={label} className="flex-1">
              <label className="text-xs block mb-1">{label}</label>
              <div
                className="w-full h-10 rounded-lg shadow cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() => setToggle(!toggle)}
              />
              {toggle && (
                <div className="relative z-10 mt-2">
                  <div className="fixed inset-0" onClick={() => setToggle(false)} />
                  <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Size & Margin */}
      <div className="mb-6">
        {[
          { label: 'Size', value: settings.size, key: 'size', min: 200, max: 500 },
          { label: 'Margin', value: settings.margin, key: 'margin', min: 0, max: 20 }
        ].map(({ label, value, key, min, max }) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-medium mb-2">{label}: {value}px</label>
            <input
              type="range"
              value={value}
              min={min}
              max={max}
              onChange={(e) => updateSettings({ [key]: parseInt(e.target.value) } as any)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Error Correction */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Error Correction</label>
        <select
          value={settings.errorCorrectionLevel}
          onChange={(e) =>
            updateSettings({ errorCorrectionLevel: e.target.value as QRSettings['errorCorrectionLevel'] })
          }
          className="w-full p-3 bg-transparent text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>

      {/* Dot Style */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Dot Style</label>
        <div className="flex gap-2">
          {['square', 'rounded'].map((type) => (
            <button
              key={type}
              onClick={() => updateSettings({ dotType: type as QRSettings['dotType'] })}
              className={`flex-1 p-2 rounded-full text-sm shadow transition ${
                settings.dotType === type
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-[hsl(var(--foreground))]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Center Logo</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-3 text-sm text-[hsl(var(--primary))] shadow"
        >
          <Upload size={16} className="inline-block mr-2" />
          {settings.logo ? 'Change Logo' : 'Upload Logo'}
        </button>
        {settings.logo && (
          <div className="mt-2 flex items-center justify-between">
            <img src={settings.logo} alt="Logo preview" className="w-12 h-12 object-cover" />
            <button
              onClick={() => updateSettings({ logo: null })}
              className="text-sm text-[hsl(var(--primary))] hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Label Text */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Label Text</label>
        <input
          type="text"
          value={settings.labelText}
          onChange={(e) => updateSettings({ labelText: e.target.value })}
          className="w-full p-3 bg-transparent text-[hsl(var(--foreground))] focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
        />
        {settings.labelText && (
          <>
            <div className="mt-4">
              <label className="block text-sm mb-2">Label Color</label>
              <div
                className="h-10 rounded-lg shadow-sm cursor-pointer"
                style={{ backgroundColor: settings.labelColor }}
                onClick={() => setShowLabelColorPicker(!showLabelColorPicker)}
              />
              {showLabelColorPicker && (
                <div className="relative z-10 mt-2">
                  <div className="fixed inset-0" onClick={() => setShowLabelColorPicker(false)} />
                  <SketchPicker
                    color={settings.labelColor}
                    onChange={(color) => updateSettings({ labelColor: color.hex })}
                  />
                </div>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm mb-1">Font Size: {settings.labelSize}px</label>
              <input
                type="range"
                min={12}
                max={24}
                value={settings.labelSize}
                onChange={(e) => updateSettings({ labelSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>

      {/* Reset */}
      <motion.button
        onClick={resetSettings}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-3 mt-4 bg-[hsl(var(--primary))] text-white flex items-center justify-center gap-2"
      >
        <RotateCcw size={16} />
        Reset All Settings
      </motion.button>
    </motion.div>
  );
};

export default QRCustomizer;
export type { QRSettings };
