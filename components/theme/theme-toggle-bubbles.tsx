"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggleBubbles() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative z-50"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>

      {isAnimating && (
        <div className="fixed inset-0 pointer-events-none z-40">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute rounded-full 
                  ${
                    theme === "dark"
                      ? "bg-background"
                      : "bg-background dark:bg-background"
                  }
                  animate-bubble-up`}
                style={{
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                  opacity: 0.1,
                  backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}