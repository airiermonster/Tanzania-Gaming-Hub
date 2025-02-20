"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trophy, Users, ShoppingBag, Newspaper, Menu, X } from "lucide-react"; // Add missing icons
import { useState, useEffect } from "react";
import { ThemeToggleBubbles } from "@/components/theme/theme-toggle-bubbles";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tournaments", href: "/tournaments", icon: Trophy },
  { name: "Community", href: "/community", icon: Users },
  { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { name: "News", href: "/news", icon: Newspaper },
];

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center group">
              <Trophy className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TGH
              </span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors hover:text-primary group ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform" />
              </Link>
            ))}
            <ThemeToggleBubbles />
            <Button asChild variant="default" size="sm">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative z-50"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 bg-background/80 backdrop-blur-md md:hidden"
          >
            <div className="p-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center py-2 text-base font-medium transition-colors ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggleBubbles />
              </div>
              <Button asChild className="w-full mt-4">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}