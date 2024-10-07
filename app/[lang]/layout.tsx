import { AuthProvider } from "../context/AuthContext";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </AuthProvider>
  );
}
