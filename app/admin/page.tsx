"use client";

import { Card } from "@/components/ui/card";
import {
  Users,
  Trophy,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  Activity,
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: "2,345",
    icon: Users,
    change: "+12%",
    trend: "up",
  },
  {
    name: "Active Tournaments",
    value: "15",
    icon: Trophy,
    change: "+5%",
    trend: "up",
  },
  {
    name: "Marketplace Listings",
    value: "432",
    icon: ShoppingBag,
    change: "+18%",
    trend: "up",
  },
  {
    name: "Forum Posts",
    value: "1,293",
    icon: MessageSquare,
    change: "+8%",
    trend: "up",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to the Tanzania Gaming Hub admin panel
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <Activity className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1">vs last month</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Placeholder for future charts and detailed statistics */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">Activity feed coming soon...</p>
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">System Status</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">System metrics coming soon...</p>
          </div>
        </Card>
      </div>
    </div>
  );
}