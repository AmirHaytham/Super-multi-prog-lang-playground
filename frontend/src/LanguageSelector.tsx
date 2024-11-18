import React from 'react';

interface LanguageSelectorProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="language-selector mb-4">
      <label htmlFor="language" className="block text-lg font-medium mb-2">
        Select Language
      </label>
      <select
        id="language"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-gray-800 text-gray-100 border border-gray-600 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="ruby">Ruby</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
