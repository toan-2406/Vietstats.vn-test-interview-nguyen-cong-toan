import { useState, useEffect } from 'react';
import { getDictionary } from '../app/[lang]/dictionaries';

export function useDictionary(lang: string) {
  const [dict, setDict] = useState<any>({});

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setDict(dictionary);
    };

    fetchDictionary();
  }, [lang]);

  return dict;
}
