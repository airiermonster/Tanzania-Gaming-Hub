"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy, Users, Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data from your backend
const tournaments = [
  {
    id: 1,
    title: "TGH FIFA Championship",
    game: "FIFA 24",
    date: "2024-04-15",
    participants: 32,
    maxParticipants: 64,
    prizePool: "$1,000",
    status: "upcoming",
  },
  // Add more tournament examples
];

export default function TournamentsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tournaments</h1>
            <p className="text-muted-foreground mt-2">
              Find and join gaming tournaments
            </p>
          </div>
          <Button asChild>
            <Link href="/tournaments/create">Create Tournament</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <Input
            placeholder="Search tournaments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tournaments</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tournament List */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="p-6">
              <Link href={`/tournaments/${tournament.id}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{tournament.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {tournament.game}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(tournament.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    {tournament.participants}/{tournament.maxParticipants} Players
                  </div>
                  <div className="flex items-center text-sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    Prize Pool: {tournament.prizePool}
                  </div>
                </div>
                <div className="mt-4">
                  <Button className="w-full">Join Tournament</Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}