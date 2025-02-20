"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  TwitterIcon,
  InstagramIcon,
  YoutubeIcon,
  FacebookIcon,
  DiscordIcon,
  MailIcon,
} from "lucide-react";

// Make sure the Button component exists and is properly exported
export function Footer() {
  const socialIcons = [
    { Icon: TwitterIcon, href: "#", label: "Twitter" },
    { Icon: InstagramIcon, href: "#", label: "Instagram" },
    { Icon: YoutubeIcon, href: "#", label: "YouTube" },
    { Icon: FacebookIcon, href: "#", label: "Facebook" },
    { Icon: DiscordIcon, href: "#", label: "Discord" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-background/80 border-t backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,transparent,50%,white)]" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Link href="/" className="flex items-center">
              <Trophy className="h-10 w-10 text-primary" />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TGH
              </span>
            </Link>
            <p className="text-muted-foreground">
              Tanzania Gaming Hub is the premier destination for gamers in Tanzania
              to connect, compete, and celebrate gaming culture.
            </p>
            <div className="flex gap-4">
              {socialIcons.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Tournaments", href: "/tournaments" },
                { name: "Marketplace", href: "/marketplace" },
                { name: "News", href: "/news" },
              ].map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Community</h3>
            <ul className="space-y-3">
              {[
                { name: "Forums", href: "/forums" },
                { name: "Discord Server", href: "#" },
                { name: "Events", href: "/events" },
                { name: "Support", href: "/support" },
              ].map((link) => (
                <motion.li
                  key={link.name}
                  whileHover={{ x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-primary/5 border border-primary/10 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button size="sm" className="shrink-0">
                <MailIcon className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Tanzania Gaming Hub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}