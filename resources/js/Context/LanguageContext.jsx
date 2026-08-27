import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/Lib/translations';

const LanguageContext = createContext({
    lang: 'EN',
    setLanguage: () => {},
    t: translations.EN,
});

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('kyy_lang');
            if (saved === 'ID' || saved === 'EN') return saved;
        }
        return 'EN';
    });

    const setLanguage = (newLang) => {
        if (newLang === 'ID' || newLang === 'EN') {
            setLang(newLang);
            if (typeof window !== 'undefined') {
                localStorage.setItem('kyy_lang', newLang);
            }
        }
    };

    const t = translations[lang] || translations.EN;

    return (
        <LanguageContext.Provider value={{ lang, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
