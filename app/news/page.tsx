"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Newspaper, TrendingUp, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock data - replace with Supabase data
const newsArticles = [
  {
    id: 1,
    title: "Major FIFA Tournament Coming to Tanzania",
    excerpt: "EA Sports announces a major FIFA tournament to be held in Dar es Salaam...",
    category: "Tournaments",
    author: "John Doe",
    publishedAt: "2024-03-15T10:00:00",
    image: "/images/news/fifa-tournament.jpg",
    readTime: "5 min read",
    views: 1234,
  },
  // Add more articles
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Gaming News</h1>
            <p className="text-muted-foreground mt-2">
              Stay updated with the latest gaming news in Tanzania
            </p>
          </div>
          <Button asChild>
            <Link href="/news/submit">Submit News</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="mb-6">
              <Input
                placeholder="Search news articles..."
                className="max-w-md"
              />
            </div>

            <Tabs defaultValue="latest" className="space-y-4">
              <TabsList>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-4">
                {newsArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <Link href={`/news/${article.id}`}>
                      <div className="flex gap-4 p-4">
                        <div className="relative w-48 h-32">
                          <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {article.category}
                            </span>
                            <span>•</span>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {article.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {article.views} views
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </TabsContent>

              {/* Other tab contents will have similar structure */}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Popular Categories</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Tournaments
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Game Reviews
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Industry Updates
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Community News
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Trending Articles</h3>
              <div className="space-y-4">
                {newsArticles.slice(0, 3).map((article) => (
                  <Link
                    key={article.id}
                    href={`/news/${article.id}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium group-hover:text-primary line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}