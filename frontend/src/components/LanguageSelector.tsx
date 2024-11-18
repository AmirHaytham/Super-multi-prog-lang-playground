import { Code2, ChevronDown } from 'lucide-react';
import { Language } from '../types';

const languages: Language[] = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚡' },
  { id: 'ruby', name: 'Ruby', icon: '💎' },
  { id: 'go', name: 'Go', icon: '🔵' },
];

type Props = {
  selected: string;
  onSelect: (language: string) => void;
};

export default function LanguageSelector({ selected, onSelect }: Props) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors">
        <Code2 className="w-4 h-4" />
        <span>{languages.find(l => l.id === selected)?.name || 'Select Language'}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      
      <div className="absolute hidden group-hover:block w-48 mt-2 bg-gray-800 rounded-lg shadow-xl z-10">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2"
          >
            <span>{lang.icon}</span>
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}