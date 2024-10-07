import { Lexend } from 'next/font/google';
import { AuthProvider } from "../context/AuthContext";
import Header from "@/components/layout/Header";


const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  weight: ['400', '500', '700'],
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className={`min-h-screen flex flex-col ${lexend.className}`}>
        <Header  />
        <main className="flex-grow p-6">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
