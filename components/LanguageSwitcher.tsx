"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";

interface LanguageSwitcherProps {
  flags: {
    [key: string]: string;
  };
  langs: string[];
  size?: number;
}

export default function LanguageSwitcher({ flags, langs, size = 20 }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Tìm locale hiện tại từ pathname
  const currentLocale = langs.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Hàm để chuyển đổi ngôn ngữ
  const switchLanguage = (locale: string) => {
    if (!currentLocale) {
      // Nếu hiện tại chưa có locale, thêm locale vào đầu pathname
      router.push(`/${locale}${pathname}`);
      return;
    }

    // Loại bỏ locale hiện tại khỏi pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);

    // Lấy query params nếu có
    const query = searchParams.toString();
    const finalPath = query ? `${newPath}?${query}` : newPath;

    router.push(finalPath);
    setIsOpen(false);
  };

  return (
    <div className="flex space-x-2">
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {currentLocale && (
              <Image
                src={flags[currentLocale]}
                alt={`Cờ ${currentLocale}`}
                width={size}
                height={size}
                className="mr-2"
              />
            )}
            {currentLocale?.toUpperCase()}
            <svg
              className={`-mr-1 ml-2 h-5 w-5 transform ${isOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {langs.map((locale) => (
                <a
                  key={locale}
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    switchLanguage(locale);
                  }}
                >
                  <Image
                    src={flags[locale]}
                    alt={`Cờ ${locale}`}
                    width={size}
                    height={size}
                    className="mr-2"
                  />
                  {locale.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
