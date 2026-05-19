import {
  createContext,
  useContext,
  useState,
  createElement,
  type ReactNode,
} from 'react';
import es from './es.json';
import en from './en.json';

// 1. Tipo de los idiomas disponibles
type Lang = 'es' | 'en';

// 2. Estructura de los JSON (inferida automáticamente)
type Translation = typeof es;

// 3. Mapa de idiomas
const languages: Record<Lang, Translation> = { es, en };

// 4. Tipado del contexto
interface I18nContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

// 5. Crear contexto
const I18nContext = createContext<I18nContextProps | undefined>(undefined);

// 6. Provider
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>('es');

  const t = (key: string): string => {
    const value = key
      .split('.')
      .reduce<unknown>((obj, k) => (obj as Record<string, unknown>)?.[k], languages[lang]);

    return typeof value === 'string' ? value : key;
  };

  return createElement(
    I18nContext.Provider,
    { value: { lang, setLang, t } },
    children,
  );
};

// 7. Hook para consumir el contexto
export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n debe usarse dentro de un I18nProvider');
  }
  return ctx;
};
