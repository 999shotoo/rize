"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlobeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const languages = [
  "English",
  "Hindi",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Gujarati",
  "Bengali",
  "Kannada",
  "Bhojpuri",
  "Malayalam",
  "Urdu",
  "Haryanvi",
  "Rajasthani",
  "Odia",
  "Assamese",
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english");
  const router = useRouter();
  useEffect(() => {
    const savedLanguage = Cookies.get("lang") || "english";
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    Cookies.set("lang", value, { expires: 365 });
    router.refresh();
  };

  return (
    <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
      <SelectTrigger className="w-[110px] h-8 text-xs">
        <GlobeIcon className="mr-2 h-4 w-4" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {languages.map((lang) => (
          <SelectItem
            key={lang.toLowerCase()}
            value={lang.toLowerCase()}
            className="text-xs"
          >
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
