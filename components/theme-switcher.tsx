"use client";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const ICON_SIZE = 16;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline" size={"sm"}>
          {theme === "light" ? (
            <Sun
              key="light"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : theme === "dark" ? (
            <Moon
              key="dark"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          ) : (
            <Laptop
              key="system"
              size={ICON_SIZE}
              className={"text-muted-foreground"}
            />
          )}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-content" align="end">
        <div
          className="flex gap-2 cursor-pointer p-2 hover:bg-accent"
          onClick={() => setTheme("light")}
        >
          <Sun size={ICON_SIZE} className="text-muted-foreground" />
          Light
        </div>
        <div
          className="flex gap-2 cursor-pointer p-2 hover:bg-accent"
          onClick={() => setTheme("dark")}
        >
          <Moon size={ICON_SIZE} className="text-muted-foreground" />
          Dark
        </div>
        <div
          className="flex gap-2 cursor-pointer p-2 hover:bg-accent"
          onClick={() => setTheme("system")}
        >
          <Laptop size={ICON_SIZE} className="text-muted-foreground" />
          System
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export { ThemeSwitcher };
