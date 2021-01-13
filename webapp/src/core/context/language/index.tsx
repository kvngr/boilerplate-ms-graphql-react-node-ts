import { getItem, setItem } from '@utils';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createIntl, createIntlCache, IntlProvider } from 'react-intl';

import { locales } from './i18n';

export type LanguageType = keyof typeof locales;

interface ContextValue {
    language: LanguageType;
    changeLanguage: (language: LanguageType) => void;
    translate: (id: string, values?: {}) => string;
}

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageContext = createContext<ContextValue>({
    language: 'fr',
    changeLanguage: () => {},
    translate: () => '',
});

const cache = createIntlCache();
const initialIntl = createIntl({ locale: 'fr', messages: locales['fr'] }, cache);

export const LanguageProvider = ({ children, ...props }: LanguageProviderProps) => {
    const [language, setLanguage] = useState<LanguageType>('fr');
    const [intl, setIntl] = useState(initialIntl);

    const storedLanguage = getItem<LanguageType>('language');

    const changeLanguage = useCallback((language: LanguageType) => {
        const newIntl = createIntl({ locale: language, messages: locales[language] }, cache);
        setIntl(newIntl);
        setItem<LanguageType>('language', language);
        setLanguage(language);
    }, []);

    const translate = useCallback(
        (id: string, values?: {}) => {
            return intl.formatMessage({ id }, values);
        },
        [intl],
    );

    useEffect(() => {
        if (storedLanguage) {
            const currentIntl = createIntl({ locale: storedLanguage, messages: locales[storedLanguage] }, cache);
            setLanguage(storedLanguage);
            setIntl(currentIntl);
        } else {
            setIntl(initialIntl);
        }
    }, [storedLanguage]);

    const value = useMemo(() => ({ changeLanguage, translate, language }), [language, changeLanguage, translate]);

    return (
        <LanguageContext.Provider value={value} {...props}>
            <IntlProvider locale={language} messages={locales[language]}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext);
