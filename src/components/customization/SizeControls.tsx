
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const SizeControls = () => {
  const { settings, updateSettings } = useQR();

  return (
    <GlassCard className="p-6 mb-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Size: {settings.size}px
          </label>
          <input
            type="range"
            min="200"
            max="500"
            value={settings.size}
            onChange={(e) => updateSettings({ size: parseInt(e.target.value) })}
            className="w-full h-2 bg-pale-rosewood dark:bg-rosy-brown rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Margin: {settings.margin}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={settings.margin}
            onChange={(e) => updateSettings({ margin: parseInt(e.target.value) })}
            className="w-full h-2 bg-pale-rosewood dark:bg-rosy-brown rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default SizeControls;
