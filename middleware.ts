import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["vi", "en", "kr"];
const publicPaths = ["/login", "/register"]; // Các tuyến đường không yêu cầu xác thực

function getLocale(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;
  // Mặc định chọn ngôn ngữ dựa trên Accept-Language hoặc mặc định là 'en'
  const acceptLang = request.headers.get('accept-language');
  const preferredLocale = acceptLang?.split(',')[0].split('-')[0];
  return locales.includes(preferredLocale || 'en') ? preferredLocale : 'en';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Nếu đã có locale trong URL, không cần thêm locale
  if (pathnameHasLocale) {
    const isPublicPath = publicPaths.some((path) => pathname.includes(path));
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

    if (!isAuthenticated && !isPublicPath) {
      // Nếu không xác thực và cố truy cập trang bảo vệ, chuyển hướng đến trang login
      const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
      const locale = localeMatch ? localeMatch[1] : 'en';
      request.nextUrl.pathname = `/${locale}/login`;
      return NextResponse.redirect(request.nextUrl);
    }

    const localeMatch = pathname.match(/^\/(vi|en|kr)\//);
    if (isAuthenticated && publicPaths.includes(pathname.replace(`/${localeMatch?.[1]}/`, ''))) {
      // Nếu đã xác thực và cố truy cập trang login hoặc public khác, chuyển hướng đến trang home
      const locale = pathnameHasLocale ? pathname.split('/')[1] : 'en';
      request.nextUrl.pathname = `/${locale}/home`;
      return NextResponse.redirect(request.nextUrl);
    }

    return NextResponse.next();
  }

  // Nếu chưa có locale trong URL, thêm locale và xử lý tiếp
  const locale = getLocale(request);
  if (locale) {
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next).*)',],
};