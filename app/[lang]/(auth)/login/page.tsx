"use client"
import { useDictionary } from '@/hooks/useDictionary';
import bgLogin from '@/public/images/bg_login.jpg';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import viFlag from '@/public/images/flags/vi.png';
import enFlag from '@/public/images/flags/en.png';
import krFlag from '@/public/images/flags/kr.png';

const locales = ["vi", "en", "kr"];
const flags = {
  vi: viFlag.src,
  en: enFlag.src,
  kr: krFlag.src,
};

export default function LoginPage({ params: { lang } }: { params: { lang: string } }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState('');
  const dict = useDictionary(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
      const locale = localeMatch ? localeMatch[1] : 'en';
      router.push(`/${locale}`);
    } else {
      setError(dict.invalid_credentials || 'Thông tin đăng nhập không hợp lệ');
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen font-sans">
      <Image
        src={bgLogin}
        alt="Nền đăng nhập"
        layout="fill"
        objectFit="fill"
        quality={100}
      />
      <div className="relative z-10 flex items-center justify-center w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">{dict.login || 'Đăng Nhập'}</h2>
          <div className="flex justify-center mb-4">
            <LanguageSwitcher flags={flags} langs={locales} />
          </div>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <div className="mb-6">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder={dict.username || 'Tên đăng nhập'}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              placeholder={dict.password || 'Mật khẩu'}
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition duration-300">
            {dict.login || 'Đăng Nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}