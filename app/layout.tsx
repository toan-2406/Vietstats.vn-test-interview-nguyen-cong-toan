import "./globals.css";
import { Lexend } from 'next/font/google';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['400', '500', '700'],
});

export const metadata = {
  title: "Dashboard",
  description: "Ứng dụng Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={lexend.className}>
      <body>{children}</body>
    </html>
  );
}
