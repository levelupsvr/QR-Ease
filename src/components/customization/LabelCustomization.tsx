
import { motion } from 'framer-motion';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const LabelCustomization = () => {
  const { settings, updateSettings } = useQR();

  const fontOptions = [
    { value: 'inter', label: 'Inter (Sans)' },
    { value: 'serif', label: 'Serif' },
    { value: 'mono', label: 'Monospace' },
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' },
  ];

  return (
    <GlassCard className="p-6 mb-8">
      <h3 className="text-lg font-semibold text-charcoal-navy dark:text-silver-pink mb-4">
        Label Settings
      </h3>
      
      <div className="space-y-6">
        {/* Label Text Input */}
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Label Text
          </label>
          <input
            type="text"
            value={settings.labelText}
            onChange={(e) => updateSettings({ labelText: e.target.value })}
            placeholder="Add a label below QR code..."
            className="w-full p-4 bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-white border-2 border-cadet-grey focus:border-fairy-tale-pink outline-none transition-colors rounded-lg"
          />
        </div>

        {settings.labelText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-6"
          >
            {/* Font Selection */}
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Font Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {fontOptions.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => updateSettings({ labelFont: font.value as any })}
                    className={`p-3 text-sm font-medium border-2 transition-all rounded-lg ${
                      settings.labelFont === font.value
                        ? 'bg-fairy-tale-pink text-charcoal-navy border-fairy-tale-pink shadow-lg'
                        : 'bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-silver-pink border-cadet-grey hover:border-fairy-tale-pink'
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Text Alignment
              </label>
              <div className="grid grid-cols-3 gap-2">
                {alignmentOptions.map((alignment) => (
                  <button
                    key={alignment.value}
                    onClick={() => updateSettings({ labelAlignment: alignment.value as any })}
                    className={`p-3 text-sm font-medium border-2 transition-all rounded-lg ${
                      settings.labelAlignment === alignment.value
                        ? 'bg-fairy-tale-pink text-charcoal-navy border-fairy-tale-pink shadow-lg'
                        : 'bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-silver-pink border-cadet-grey hover:border-fairy-tale-pink'
                    }`}
                  >
                    {alignment.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Label Color */}
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Label Color
              </label>
              <input
                type="color"
                value={settings.labelColor}
                onChange={(e) => updateSettings({ labelColor: e.target.value })}
                className="w-full h-12 bg-pale-rosewood border-2 border-cadet-grey rounded-lg cursor-pointer"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Font Size: {settings.labelSize}px
              </label>
              <input
                type="range"
                min="12"
                max="32"
                value={settings.labelSize}
                onChange={(e) => updateSettings({ labelSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-pale-rosewood rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
};

export default LabelCustomization;
