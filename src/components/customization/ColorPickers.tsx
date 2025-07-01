import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const ColorPickers = () => {
  const { settings, updateSettings } = useQR();
  const [showForegroundPicker, setShowForegroundPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  return (
    <GlassCard className="p-4 sm:p-6 mb-6 sm:mb-8 transition-all duration-300">
      <label className="block text-sm font-medium mb-3 sm:mb-4 text-foreground">
        Colors
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs mb-2 text-secondary">Foreground</label>
          <div
            className="w-full min-h-12 sm:min-h-14 border-2 border-secondary box-border rounded cursor-pointer transition-colors touch-manipulation"
            style={{ backgroundColor: settings.foregroundColor }}
            onClick={() => setShowForegroundPicker(!showForegroundPicker)}
          />
          {showForegroundPicker && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <div className="scale-90 sm:scale-100 origin-top">
                <SketchPicker
                  color={settings.foregroundColor}
                  onChange={(color) => updateSettings({ foregroundColor: color.hex })}
                  width="240"
                />
              </div>
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs mb-2 text-secondary">Background</label>
          <div
            className="w-full min-h-12 sm:min-h-14 border-2 border-secondary box-border rounded cursor-pointer transition-colors touch-manipulation"
            style={{ backgroundColor: settings.backgroundColor }}
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
          />
          {showBackgroundPicker && (
            <div className="mt-2 flex justify-center sm:justify-start">
              <div className="scale-90 sm:scale-100 origin-top">
                <SketchPicker
                  color={settings.backgroundColor}
                  onChange={(color) => updateSettings({ backgroundColor: color.hex })}
                  width="240"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ColorPickers;
