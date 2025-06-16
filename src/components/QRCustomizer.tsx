
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
  const [showForegroundPicker, setShowForegroundPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [showLabelColorPicker, setShowLabelColorPicker] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateSettings = (updates: Partial<QRSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateSettings({ logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSettings = () => {
    onSettingsChange({
      type: 'url',
      data: '',
      foregroundColor: '#2F1B23',
      backgroundColor: '#FFFFFF',
      size: 300,
      margin: 4,
      errorCorrectionLevel: 'M',
      dotType: 'square',
      logo: null,
      labelText: '',
      labelColor: '#2F1B23',
      labelSize: 16,
    });
  };

  const copyData = async () => {
    try {
      await navigator.clipboard.writeText(settings.data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-silver-pink dark:bg-raisin-black p-6 h-full overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-raisin-black dark:text-silver-pink mb-6">
        Customize QR Code
      </h2>

      {/* QR Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          QR Type
        </label>
        <select
          value={settings.type}
          onChange={(e) => updateSettings({ type: e.target.value as QRSettings['type'] })}
          className="w-full p-3 bg-white dark:bg-tuscan-red text-raisin-black dark:text-white border-2 border-tan dark:border-rosy-brown focus:border-tuscan-red dark:focus:border-tan outline-none"
        >
          <option value="url">Website URL</option>
          <option value="text">Plain Text</option>
          <option value="email">Email Address</option>
          <option value="phone">Phone Number</option>
        </select>
      </div>

      {/* Data Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          {settings.type === 'url' && 'Enter URL'}
          {settings.type === 'text' && 'Enter Text'}
          {settings.type === 'email' && 'Enter Email'}
          {settings.type === 'phone' && 'Enter Phone Number'}
        </label>
        <div className="relative">
          <input
            type="text"
            value={settings.data}
            onChange={(e) => updateSettings({ data: e.target.value })}
            placeholder={
              settings.type === 'url' ? 'https://example.com' :
              settings.type === 'email' ? 'email@example.com' :
              settings.type === 'phone' ? '+1234567890' : 'Enter text here...'
            }
            className="w-full p-3 pr-12 bg-white dark:bg-tuscan-red text-raisin-black dark:text-white border-2 border-tan dark:border-rosy-brown focus:border-tuscan-red dark:focus:border-tan outline-none"
          />
          <button
            onClick={copyData}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rosy-brown hover:text-tuscan-red"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          Colors
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs text-rosy-brown mb-1">Foreground</label>
            <div className="relative">
              <div
                className="w-full h-10 border-2 border-tan dark:border-rosy-brown cursor-pointer"
                style={{ backgroundColor: settings.foregroundColor }}
                onClick={() => setShowForegroundPicker(!showForegroundPicker)}
              />
              {showForegroundPicker && (
                <div className="absolute top-12 left-0 z-10">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowForegroundPicker(false)}
                  />
                  <SketchPicker
                    color={settings.foregroundColor}
                    onChange={(color) => updateSettings({ foregroundColor: color.hex })}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs text-rosy-brown mb-1">Background</label>
            <div className="relative">
              <div
                className="w-full h-10 border-2 border-tan dark:border-rosy-brown cursor-pointer"
                style={{ backgroundColor: settings.backgroundColor }}
                onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
              />
              {showBackgroundPicker && (
                <div className="absolute top-12 left-0 z-10">
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowBackgroundPicker(false)}
                  />
                  <SketchPicker
                    color={settings.backgroundColor}
                    onChange={(color) => updateSettings({ backgroundColor: color.hex })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Size & Margin */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
            Size: {settings.size}px
          </label>
          <input
            type="range"
            min="200"
            max="500"
            value={settings.size}
            onChange={(e) => updateSettings({ size: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
            Margin: {settings.margin}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={settings.margin}
            onChange={(e) => updateSettings({ margin: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>

      {/* Error Correction */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          Error Correction Level
        </label>
        <select
          value={settings.errorCorrectionLevel}
          onChange={(e) => updateSettings({ errorCorrectionLevel: e.target.value as QRSettings['errorCorrectionLevel'] })}
          className="w-full p-3 bg-white dark:bg-tuscan-red text-raisin-black dark:text-white border-2 border-tan dark:border-rosy-brown focus:border-tuscan-red dark:focus:border-tan outline-none"
        >
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>

      {/* Dot Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          Dot Style
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateSettings({ dotType: 'square' })}
            className={`flex-1 p-3 border-2 ${
              settings.dotType === 'square'
                ? 'bg-tuscan-red text-white border-tuscan-red'
                : 'bg-white dark:bg-transparent text-raisin-black dark:text-silver-pink border-tan dark:border-rosy-brown'
            }`}
          >
            Square
          </button>
          <button
            onClick={() => updateSettings({ dotType: 'rounded' })}
            className={`flex-1 p-3 border-2 ${
              settings.dotType === 'rounded'
                ? 'bg-tuscan-red text-white border-tuscan-red'
                : 'bg-white dark:bg-transparent text-raisin-black dark:text-silver-pink border-tan dark:border-rosy-brown'
            }`}
          >
            Rounded
          </button>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          Center Logo
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-3 bg-white dark:bg-tuscan-red text-raisin-black dark:text-white border-2 border-tan dark:border-rosy-brown hover:bg-tan dark:hover:bg-rosy-brown flex items-center justify-center gap-2"
        >
          <Upload size={16} />
          {settings.logo ? 'Change Logo' : 'Upload Logo'}
        </button>
        {settings.logo && (
          <div className="mt-2 flex items-center justify-between">
            <img src={settings.logo} alt="Logo preview" className="w-12 h-12 object-cover" />
            <button
              onClick={() => updateSettings({ logo: null })}
              className="text-sm text-rosy-brown hover:text-tuscan-red"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Label */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-2">
          Label Text
        </label>
        <input
          type="text"
          value={settings.labelText}
          onChange={(e) => updateSettings({ labelText: e.target.value })}
          placeholder="Add a label below QR code..."
          className="w-full p-3 bg-white dark:bg-tuscan-red text-raisin-black dark:text-white border-2 border-tan dark:border-rosy-brown focus:border-tuscan-red dark:focus:border-tan outline-none mb-3"
        />
        
        {settings.labelText && (
          <>
            <div className="mb-3">
              <label className="block text-xs text-rosy-brown mb-1">Label Color</label>
              <div className="relative">
                <div
                  className="w-full h-8 border-2 border-tan dark:border-rosy-brown cursor-pointer"
                  style={{ backgroundColor: settings.labelColor }}
                  onClick={() => setShowLabelColorPicker(!showLabelColorPicker)}
                />
                {showLabelColorPicker && (
                  <div className="absolute top-10 left-0 z-10">
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowLabelColorPicker(false)}
                    />
                    <SketchPicker
                      color={settings.labelColor}
                      onChange={(color) => updateSettings({ labelColor: color.hex })}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-rosy-brown mb-1">
                Font Size: {settings.labelSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={settings.labelSize}
                onChange={(e) => updateSettings({ labelSize: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>

      {/* Reset Button */}
      <motion.button
        onClick={resetSettings}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full p-3 bg-tuscan-red text-white hover:bg-rosy-brown flex items-center justify-center gap-2"
      >
        <RotateCcw size={16} />
        Reset All Settings
      </motion.button>
    </motion.div>
  );
};

export default QRCustomizer;
export type { QRSettings };
