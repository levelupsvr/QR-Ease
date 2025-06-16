
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const QRTypeSelector = () => {
  const { settings, updateSettings } = useQR();

  return (
    <GlassCard className="p-6 mb-8">
      <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-4">
        QR Code Type
      </label>
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: 'url', label: 'Website URL' },
          { value: 'text', label: 'Plain Text' },
          { value: 'email', label: 'Email Address' },
          { value: 'phone', label: 'Phone Number' },
        ].map((type) => (
          <button
            key={type.value}
            onClick={() => updateSettings({ type: type.value as any })}
            className={`p-3 text-sm font-medium border-2 transition-all ${
              settings.type === type.value
                ? 'bg-tuscan-red text-white border-tuscan-red shadow-lg'
                : 'bg-white/50 dark:bg-raisin-black/50 text-raisin-black dark:text-silver-pink border-tan dark:border-rosy-brown hover:border-tuscan-red'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </GlassCard>
  );
};

export default QRTypeSelector;
