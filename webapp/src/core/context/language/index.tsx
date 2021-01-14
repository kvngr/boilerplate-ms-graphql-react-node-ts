import { useLocalStorage } from '@hooks';
import { LanguageType } from '@types';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createIntl, createIntlCache, IntlProvider, IntlShape, MessageDescriptor } from 'react-intl';

import { locales } from './i18n';
interface ContextValue {
    language: LanguageType;
    changeLanguage: (language: LanguageType) => void;
    translate: (descriptor: MessageDescriptor, values?: {}) => string;
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
    const [intl, setIntl] = useState<IntlShape>(initialIntl);

    const [storedLanguage, setStoredLanguage] = useLocalStorage<LanguageType>('language', language);

    const changeLanguage = useCallback(
        (language: LanguageType) => {
            const newIntl = createIntl({ locale: language, messages: locales[language] }, cache);
            setIntl(newIntl);
            setStoredLanguage(language);
            setLanguage(language);
        },
        [setStoredLanguage],
    );

    const translate = useCallback(
        (descriptor: MessageDescriptor, values?: {}) => {
            return intl.formatMessage(descriptor, values);
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
            <IntlProvider locale={language} messages={locales[language]} defaultLocale={language}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext);
