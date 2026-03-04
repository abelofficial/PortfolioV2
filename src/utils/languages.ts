const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸', language: 'en' },
  { code: 'sv_SE', label: 'Svenska', flag: '🇸🇪', language: 'sv' },
];

export const getCodeFromLanguage = (language: string): string | undefined => {
  return languages.find((l) => l.language === language)?.code;
};

export const getLanguageFromCode = (code: string): string | undefined => {
  return languages.find((l) => l.code === code)?.language;
};

export default languages;
