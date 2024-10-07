import LanguageSwitcher from "@/components/LanguageSwitcher";
import enFlag from "@/public/images/flags/en.png";
import krFlag from "@/public/images/flags/kr.png";
import viFlag from "@/public/images/flags/vi.png";

const locales = ["vi", "en", "kr"];
const flags = {
  vi: viFlag.src,
  en: enFlag.src,
  kr: krFlag.src,
};

export default function Header() {


  return (
    <div className="p-4 bg-foreground flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher flags={flags} langs={locales} />
      </div>
    </div>
  );
}
