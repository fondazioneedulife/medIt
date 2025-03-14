import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import translations from "../locales/translations.json";

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

type Language = "en" | "it";

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const storedLanguage = (localStorage.getItem("language") as Language) || "en";
  const [language, setLanguage] = useState<Language>(storedLanguage);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translate = (key: string) => {
    const langTranslations = (translations as Translations)[language];
    return langTranslations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
