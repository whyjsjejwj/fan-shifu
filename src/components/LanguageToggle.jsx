import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'zh' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-brand-brown hover:text-brand-red"
            title="Switch Language"
        >
            <Globe size={18} />
            <span className="font-medium">{i18n.language === 'en' ? '中文' : 'EN'}</span>
        </Button>
    );
}
