import React, { createContext, useState, useContext, ReactNode } from 'react';
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
    // TODO: make function to set languague in start login page and settings
    const [language, setLanguage] = useState<Language>('it'); // Default language is English

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