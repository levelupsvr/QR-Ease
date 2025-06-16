
import { Copy, Check } from 'lucide-react';
import { useQR } from '../../contexts/QRContext';
import { useClipboard } from '../../hooks/useClipboard';
import GlassCard from '../GlassCard';

const DataInput = () => {
  const { settings, updateSettings } = useQR();
  const { copied, copyToClipboard } = useClipboard();

  const getPlaceholder = () => {
    switch (settings.type) {
      case 'url': return 'https://example.com';
      case 'email': return 'email@example.com';
      case 'phone': return '+1234567890';
      default: return 'Enter text here...';
    }
  };

  const getLabel = () => {
    switch (settings.type) {
      case 'url': return 'Enter URL';
      case 'email': return 'Enter Email';
      case 'phone': return 'Enter Phone Number';
      default: return 'Enter Text';
    }
  };

  return (
    <GlassCard className="p-6 mb-8">
      <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
        {getLabel()}
      </label>
      <div className="relative">
        <input
          type="text"
          value={settings.data}
          onChange={(e) => updateSettings({ data: e.target.value })}
          placeholder={getPlaceholder()}
          className="w-full p-4 pr-12 bg-white/50 dark:bg-raisin-black/50 text-charcoal-navy dark:text-white border-2 border-cadet-grey focus:border-fairy-tale-pink outline-none transition-colors rounded-lg"
        />
        <button
          onClick={() => copyToClipboard(settings.data)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cadet-grey hover:text-fairy-tale-pink transition-colors"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>
    </GlassCard>
  );
};

export default DataInput;
