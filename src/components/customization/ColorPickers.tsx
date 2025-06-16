
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const ColorPickers = () => {
  const { settings, updateSettings } = useQR();
  const [showForegroundPicker, setShowForegroundPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  return (
    <GlassCard className="p-6 mb-8">
      <label className="block text-sm font-medium text-raisin-black dark:text-silver-pink mb-4">
        Colors
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-rosy-brown dark:text-tan mb-2">Foreground</label>
          <div className="relative">
            <div
              className="w-full h-12 border-2 border-tan dark:border-rosy-brown cursor-pointer hover:border-tuscan-red transition-colors"
              style={{ backgroundColor: settings.foregroundColor }}
              onClick={() => setShowForegroundPicker(!showForegroundPicker)}
            />
            {showForegroundPicker && (
              <div className="absolute top-14 left-0 z-20">
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
        <div>
          <label className="block text-xs text-rosy-brown dark:text-tan mb-2">Background</label>
          <div className="relative">
            <div
              className="w-full h-12 border-2 border-tan dark:border-rosy-brown cursor-pointer hover:border-tuscan-red transition-colors"
              style={{ backgroundColor: settings.backgroundColor }}
              onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
            />
            {showBackgroundPicker && (
              <div className="absolute top-14 left-0 z-20">
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
    </GlassCard>
  );
};

export default ColorPickers;
