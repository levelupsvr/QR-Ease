
import { motion } from 'framer-motion';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const QRDesignCustomization = () => {
  const { settings, updateSettings } = useQR();

  const shapeOptions = [
    { value: 'square', label: 'Square' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'circle', label: 'Circle' },
    { value: 'sharp', label: 'Sharp' },
  ];

  const patternOptions = [
    { value: 'none', label: 'None' },
    { value: 'dots', label: 'Dots' },
    { value: 'grid', label: 'Grid' },
    { value: 'diagonal', label: 'Diagonal' },
  ];

  return (
    <GlassCard className="p-6 mb-8">
      <h3 className="text-lg font-semibold text-charcoal-navy dark:text-silver-pink mb-4">
        Design & Effects
      </h3>
      
      <div className="space-y-6">
        {/* QR Shape */}
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            QR Code Shape
          </label>
          <div className="grid grid-cols-2 gap-2">
            {shapeOptions.map((shape) => (
              <button
                key={shape.value}
                onClick={() => updateSettings({ dotType: shape.value as any })}
                className={`p-3 text-sm font-medium border-2 transition-all rounded-lg ${
                  settings.dotType === shape.value
                    ? 'bg-fairy-tale-pink text-charcoal-navy border-fairy-tale-pink shadow-lg'
                    : 'bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-silver-pink border-cadet-grey hover:border-fairy-tale-pink'
                }`}
              >
                {shape.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gradient Toggle */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-charcoal-navy dark:text-silver-pink">
              Gradient Fill
            </label>
            <button
              onClick={() => updateSettings({ gradientEnabled: !settings.gradientEnabled })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.gradientEnabled ? 'bg-fairy-tale-pink' : 'bg-cadet-grey'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.gradientEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Gradient Controls */}
        {settings.gradientEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-cadet-grey mb-2">Color 1</label>
                <input
                  type="color"
                  value={settings.gradientColor1}
                  onChange={(e) => updateSettings({ gradientColor1: e.target.value })}
                  className="w-full h-10 bg-pale-rosewood border-2 border-cadet-grey rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-cadet-grey mb-2">Color 2</label>
                <input
                  type="color"
                  value={settings.gradientColor2}
                  onChange={(e) => updateSettings({ gradientColor2: e.target.value })}
                  className="w-full h-10 bg-pale-rosewood border-2 border-cadet-grey rounded-lg cursor-pointer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSettings({ gradientType: 'linear' })}
                className={`p-2 text-sm border-2 transition-all rounded-lg ${
                  settings.gradientType === 'linear'
                    ? 'bg-fairy-tale-pink border-fairy-tale-pink'
                    : 'border-cadet-grey hover:border-fairy-tale-pink'
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => updateSettings({ gradientType: 'radial' })}
                className={`p-2 text-sm border-2 transition-all rounded-lg ${
                  settings.gradientType === 'radial'
                    ? 'bg-fairy-tale-pink border-fairy-tale-pink'
                    : 'border-cadet-grey hover:border-fairy-tale-pink'
                }`}
              >
                Radial
              </button>
            </div>
          </motion.div>
        )}

        {/* Background Pattern */}
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Background Pattern
          </label>
          <div className="grid grid-cols-2 gap-2">
            {patternOptions.map((pattern) => (
              <button
                key={pattern.value}
                onClick={() => updateSettings({ backgroundPattern: pattern.value as any })}
                className={`p-3 text-sm font-medium border-2 transition-all rounded-lg ${
                  settings.backgroundPattern === pattern.value
                    ? 'bg-fairy-tale-pink text-charcoal-navy border-fairy-tale-pink shadow-lg'
                    : 'bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-silver-pink border-cadet-grey hover:border-fairy-tale-pink'
                }`}
              >
                {pattern.label}
              </button>
            ))}
          </div>
        </div>

        {/* Glow Effect */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-charcoal-navy dark:text-silver-pink">
              Glow Effect
            </label>
            <button
              onClick={() => updateSettings({ glowEffect: !settings.glowEffect })}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings.glowEffect ? 'bg-fairy-tale-pink' : 'bg-cadet-grey'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                  settings.glowEffect ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Outline Color */}
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Outline Color
          </label>
          <input
            type="color"
            value={settings.outlineColor}
            onChange={(e) => updateSettings({ outlineColor: e.target.value })}
            className="w-full h-12 bg-pale-rosewood border-2 border-cadet-grey rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default QRDesignCustomization;
