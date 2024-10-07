"use client"
import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Lấy pathname hiện tại

  useEffect(() => {
    const checkAuth = () => {
      const isAuthCookie = document.cookie.split(';').some((item) => item.trim().startsWith('isAuthenticated=true'));
      if (isAuthCookie) {
        setIsAuthenticated(true);
        // Lấy locale từ pathname hiện tại
        const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
        const locale = localeMatch ? localeMatch[1] : 'en'; // Mặc định là 'en' nếu không tìm thấy
        router.push(`/${locale}/home`);
      }
    };
    checkAuth();
  }, [router, pathname]);

  const login = async (username: string, password: string) => {
    const res = await fetch('http://localhost:3001/users?username=' + username + '&password=' + password);
    const data = await res.json();
    if (data.length > 0) {
      setIsAuthenticated(true);
      // Lưu trạng thái xác thực vào cookies
      document.cookie = "isAuthenticated=true; path=/";
      // Lấy locale từ pathname hiện tại
      const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
      const locale = localeMatch ? localeMatch[1] : 'en'; // Mặc định là 'en' nếu không tìm thấy
      router.push(`/${locale}/home`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Xóa cookie xác thực
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Lấy locale từ pathname hiện tại
    const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
    const locale = localeMatch ? localeMatch[1] : 'en'; // Mặc định là 'en' nếu không tìm thấy
    router.push(`/${locale}/login`);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};