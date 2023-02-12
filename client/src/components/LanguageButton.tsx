import React, { useContext, useState } from 'react';
import { LanguageContext } from '../utils/LanguageContext';

const LANGUAGES = [
  {
    language: 'hu',
    icon: '🇭🇺'
  },
  {
    language: 'en',
    icon: '🇺🇸'
  }
]

const LanguageButton = () => {
  const { language } = useContext(LanguageContext)
  const icon = LANGUAGES.find(lang => lang.language === language)?.icon

  const [selectedLanguage, setSelectedLanguage] = useState(icon);
  const [hoverLanguage, setHoverLanguage] = useState<string | undefined>()

  function handleSelection() {
    if (!hoverLanguage) return 

    const lang = LANGUAGES.find(lang => lang.icon === hoverLanguage)?.language;
    if (lang)
      localStorage.setItem('language', lang);

    setSelectedLanguage(hoverLanguage);
  }

  function handleHover() {
    let index = selectedLanguage === LANGUAGES[0].icon ? 1 : 0
    setHoverLanguage(LANGUAGES[index].icon)
  }

  return (
    <div 
      className={`select-none px-4 hover:shadow-lg flex items-center text-sm cursor-pointer bg-white text-white font-bold rounded-lg transition-all ease-in-out`}
      onClick={handleSelection}
      onMouseEnter={handleHover}
      onMouseLeave={() => setHoverLanguage(undefined)}
    >
      {hoverLanguage ?? selectedLanguage}
    </div>
  )
}

export default LanguageButton;
