import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useQR } from '../../contexts/QRContext';
import GlassCard from '../GlassCard';

const ColorPickers = () => {
  const { settings, updateSettings } = useQR();
  const [showForegroundPicker, setShowForegroundPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);

  return (
    <GlassCard className="p-6 mb-8 transition-all duration-300">
      <label className="block text-sm font-medium mb-4 text-foreground">
        Colors
      </label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs mb-2 text-secondary">Foreground</label>
          <div
            className="w-full min-h-12 border-2 border-secondary box-border rounded cursor-pointer transition-colors"
            style={{ backgroundColor: settings.foregroundColor }}
            onClick={() => setShowForegroundPicker(!showForegroundPicker)}
          />
          {showForegroundPicker && (
            <div className="mt-2">
              <SketchPicker
                color={settings.foregroundColor}
                onChange={(color) => updateSettings({ foregroundColor: color.hex })}
              />
            </div>
          )}
        </div>
        <div>
          <label className="block text-xs mb-2 text-secondary">Background</label>
          <div
            className="w-full min-h-12 border-2 border-secondary box-border rounded cursor-pointer transition-colors"
            style={{ backgroundColor: settings.backgroundColor }}
            onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
          />
          {showBackgroundPicker && (
            <div className="mt-2">
              <SketchPicker
                color={settings.backgroundColor}
                onChange={(color) => updateSettings({ backgroundColor: color.hex })}
              />
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default ColorPickers;
