"use client"

import { useDictionary } from '@/hooks/useDictionary';

interface DataItem {
  id: number;
  title: string;
  description: string;
}

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const dict = useDictionary(lang);

  return (
    <div className="p-6">
      <h1 className="heading-lg mb-4 font-lexend">{dict.home}</h1>
    </div>
  );
}
