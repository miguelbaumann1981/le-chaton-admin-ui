import { useI18n } from '../../../../i18n';
import type { Language } from '../../products/types/language.type';

interface Props {
  language: Language;
  onLanguage: (lang: Language | string) => void;
}

export const LanguagesProductForm = ({ language, onLanguage }: Props) => {
  const { t } = useI18n();

  return (
    <div className='flex flex-col gap-2 w-full md:w-1/2'>
      <label className='text-sm'>{t('products.language')}</label>
      <div className='flex gap-10'>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='language'
            className='radio radio-sm radio-primary'
            value='es'
            checked={language === 'es'}
            disabled={language !== 'es'}
            onChange={(e) => onLanguage(e.target.value)}
          />
          <img
            src='/images/spain-flag.png'
            alt='Spain flag icon'
            className={`h-5 w-5 ${language !== 'es' ? 'opacity-50' : ''}`}
          />
        </div>
        <div className='flex items-center gap-3'>
          <input
            type='radio'
            name='language'
            className='radio radio-sm radio-primary'
            value='en'
            checked={language === 'en'}
            disabled={language !== 'en'}
            onChange={(e) => onLanguage(e.target.value)}
          />
          <img
            src='/images/uk-flag.png'
            alt='UK flag icon'
            className={`h-5 w-5 ${language !== 'en' ? 'opacity-50' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};
