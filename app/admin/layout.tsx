"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Layout,
  Users,
  Trophy,
  ShoppingBag,
  Newspaper,
  MessageSquare,
  Settings,
} from "lucide-react";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: Layout },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/tournaments", label: "Tournaments", icon: Trophy },
  { href: "/admin/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/forums", label: "Forums", icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-card">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-muted">
            <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:pl-64 flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}