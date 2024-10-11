"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      {theme === "dark" ? (
        <Button
          variant="outline"
          className="bg-secondary text-secondary-foreground border-2 border-secondary-foreground "
          size="icon"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-5 h-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className=" bg-secondary text-secondary-foreground border-2 border-secondary-foreground"
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-5 h-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
