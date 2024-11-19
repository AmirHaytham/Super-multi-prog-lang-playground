import React from 'react';
import { motion } from 'framer-motion';
import { X, Settings as SettingsIcon } from 'lucide-react';
import { EditorSettings, ThemeOption, KeybindingOption } from '../types/editor';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onSettingsChange: (settings: Partial<EditorSettings>) => void;
}

const THEME_OPTIONS: ThemeOption[] = [
    { id: 'vs-dark', label: 'Dark', icon: '🌙' },
    { id: 'vs', label: 'Light', icon: '☀️' },  // Changed from 'light' to 'vs'
    { id: 'hc-black', label: 'High Contrast', icon: '🌑' }
  ];

const KEYBINDING_OPTIONS: KeybindingOption[] = [
  { 
    id: 'default', 
    label: 'Default',
    description: 'Standard VS Code keybindings'
  },
  { 
    id: 'vim', 
    label: 'Vim',
    description: 'Modal editing with Vim commands'
  },
  { 
    id: 'emacs', 
    label: 'Emacs',
    description: 'Emacs style keyboard shortcuts'
  }
];

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-[#1e1e1e] rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-gray-400" />
            <h2 className="text-xl font-semibold text-white">Editor Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {THEME_OPTIONS.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => onSettingsChange({ theme: theme.id })}
                  className={`p-3 rounded-lg border ${
                    settings.theme === theme.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  } transition-all`}
                >
                  <div className="text-2xl mb-2">{theme.icon}</div>
                  <div className="text-sm font-medium">{theme.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Control */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Font Size: {settings.fontSize}px
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="12"
                max="24"
                value={settings.fontSize}
                onChange={(e) => onSettingsChange({ fontSize: Number(e.target.value) })}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-400 w-12">{settings.fontSize}px</span>
            </div>
          </div>

          {/* Keybindings */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Keyboard Shortcuts
            </label>
            <div className="space-y-2">
              {KEYBINDING_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => onSettingsChange({ keybinding: option.id })}
                  className={`w-full p-3 rounded-lg border ${
                    settings.keybinding === option.id
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  } transition-all text-left`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-400">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Additional Settings
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.minimap}
                  onChange={(e) => onSettingsChange({ minimap: e.target.checked })}
                  className="rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm">Show Minimap</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.wordWrap === 'on'}
                  onChange={(e) => onSettingsChange({ wordWrap: e.target.checked ? 'on' : 'off' })}
                  className="rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm">Word Wrap</span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SettingsModal; 