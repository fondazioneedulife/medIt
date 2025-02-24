import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import translations from '../locales/translations.json';

// Define a type for the translations
type Translations = {
    [key: string]: {
        [key: string]: string;
    };
};

// Define a type for the supported languages
type Language = 'en' | 'it';

// Define a type for the language context properties
interface LanguageContextProps {
    language: Language;
    setLanguage: (language: Language) => void;
    translate: (key: string) => string;
}

// Create the language context
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Create the language context provider
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Retrieve the language from localStorage or default to 'en'
    const storedLanguage = (localStorage.getItem('language') as Language) || 'en';
    const [language, setLanguage] = useState<Language>(storedLanguage);

    useEffect(() => {
        localStorage.setItem('language', language);
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

// Hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};