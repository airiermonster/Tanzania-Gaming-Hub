"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TournamentPage() {
  const params = useParams();
  const id = params.id;

  // Mock tournament data - replace with actual data fetch
  const tournament = {
    id: id,
    title: "TGH FIFA Championship",
    game: "FIFA 24",
    date: "2024-04-15",
    time: "14:00",
    participants: 32,
    maxParticipants: 64,
    prizePool: "$1,000",
    status: "upcoming",
    description:
      "Join the biggest FIFA tournament in Tanzania! Compete against the best players and win amazing prizes.",
    rules: [
      "Standard FIFA 24 rules apply",
      "Best of 3 matches per round",
      "No custom teams allowed",
      "Players must be on time",
    ],
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/tournaments">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tournaments
            </Link>
          </Button>

          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{tournament.title}</h1>
              <p className="text-muted-foreground mt-2">{tournament.game}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button>Register Now</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <p className="text-muted-foreground">{tournament.description}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Rules</h2>
              <ul className="list-disc list-inside space-y-2">
                {tournament.rules.map((rule, index) => (
                  <li key={index} className="text-muted-foreground">
                    {rule}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Tournament Info</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {new Date(tournament.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-muted-foreground">{tournament.time}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Participants</p>
                    <p className="text-muted-foreground">
                      {tournament.participants}/{tournament.maxParticipants}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-medium">Prize Pool</p>
                    <p className="text-muted-foreground">{tournament.prizePool}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}