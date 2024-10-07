
 
const dictionaries = {
  en: () => import('../../public/locales/en/common.json').then((module) => module.default),
  vi: () => import('../../public/locales/vi/common.json').then((module) => module.default),
  kr: () => import('../../public/locales/kr/common.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => dictionaries[locale as keyof typeof dictionaries]()