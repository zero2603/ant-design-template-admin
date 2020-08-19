/**
 * App Language Provider
 * Add more locales here
 */
import { addLocaleData } from 'react-intl';
import enLang from './entries/en_US';

const AppLocale = {
    en: enLang,
};

addLocaleData(AppLocale.en.data);

export default AppLocale;
