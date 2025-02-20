"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, TrendingUp } from "lucide-react";
import Link from "next/link"; // Add this import

// Mock data - replace with actual data from your backend
const discussions = [
  {
    id: 1,
    title: "Best FIFA 24 Tactics",
    author: "John Doe",
    replies: 23,
    views: 156,
    lastActivity: "2024-02-15T10:30:00",
    category: "Gaming Strategy",
  },
  // Add more discussions
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground mt-2">
              Join discussions and connect with other gamers
            </p>
          </div>
          <Button asChild>
            <Link href="/community/create">Create Post</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Main Content */}
          <div className="md:col-span-3">
            <Tabs defaultValue="latest" className="space-y-4">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-4">
                    <Link href={`/community/${discussion.id}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Posted by {discussion.author}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {discussion.replies}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {discussion.views}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending">
                {/* Similar structure for trending posts */}
              </TabsContent>

              <TabsContent value="unanswered">
                {/* Similar structure for unanswered posts */}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Gaming Strategy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Tournament Discussion
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Technical Support
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  General Discussion
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">Trending Topic {i}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}