
import { Upload, X, RotateCcw } from 'lucide-react';
import { useRef } from 'react';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const LogoUpload = () => {
  const { settings, updateSettings } = useQR();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <GlassCard className="p-6 mb-8">
      <h3 className="text-lg font-semibold text-charcoal-navy dark:text-silver-pink mb-4">
        Logo Settings
      </h3>
      
      <div className="space-y-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
            Logo Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {settings.logo ? (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img 
                  src={settings.logo} 
                  alt="Logo preview" 
                  className="w-20 h-20 object-cover border-2 border-cadet-grey rounded-lg"
                />
                <button
                  onClick={() => updateSettings({ logo: null })}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal-navy text-white rounded-full flex items-center justify-center hover:bg-fairy-tale-pink transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-fairy-tale-pink text-charcoal-navy hover:bg-pale-rosewood transition-colors rounded-lg font-medium"
              >
                Change Logo
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-6 border-2 border-dashed border-cadet-grey hover:border-fairy-tale-pink bg-pale-rosewood/30 hover:bg-fairy-tale-pink/20 transition-colors rounded-lg flex flex-col items-center gap-3"
            >
              <Upload className="w-8 h-8 text-cadet-grey" />
              <span className="text-charcoal-navy font-medium">Upload Logo</span>
              <span className="text-sm text-cadet-grey">PNG, JPG, SVG up to 5MB</span>
            </button>
          )}
        </div>

        {/* Logo Size Control */}
        {settings.logo && (
          <>
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Logo Size: {settings.logoSize}%
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={settings.logoSize}
                onChange={(e) => updateSettings({ logoSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-pale-rosewood rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Logo Opacity Control */}
            <div>
              <label className="block text-sm font-medium text-charcoal-navy dark:text-silver-pink mb-4">
                Logo Opacity: {settings.logoOpacity}%
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={settings.logoOpacity}
                onChange={(e) => updateSettings({ logoOpacity: parseInt(e.target.value) })}
                className="w-full h-2 bg-pale-rosewood rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
};

export default LogoUpload;
