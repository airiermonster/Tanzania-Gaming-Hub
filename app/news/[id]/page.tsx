"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ArticlePage() {
  const params = useParams();
  const [likes, setLikes] = useState(156);
  const [hasLiked, setHasLiked] = useState(false);

  // Mock data - replace with Supabase fetch
  const article = {
    id: params.id,
    title: "Major FIFA Tournament Coming to Tanzania",
    content: `<div class="prose prose-lg">
      <p>EA Sports has announced a major FIFA tournament to be held in Dar es Salaam, marking a significant milestone for gaming in Tanzania...</p>
      <h2>Tournament Details</h2>
      <p>The tournament will feature...</p>
      <!-- Add more formatted content -->
    </div>`,
    category: "Tournaments",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.png",
      role: "Gaming Journalist",
    },
    publishedAt: "2024-03-15T10:00:00",
    image: "/images/news/fifa-tournament.jpg",
    readTime: "5 min read",
    views: 1234,
    relatedArticles: [
      // Add related articles
    ],
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/news">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Link>
        </Button>

        <article>
          <div className="relative aspect-video w-full mb-8">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar>
              <AvatarImage src={article.author.avatar} />
              <AvatarFallback>
                {article.author.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-sm text-muted-foreground">{article.author.role}</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center gap-4 mb-8 text-sm text-muted-foreground">
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
              {article.category}
            </span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            <span>{article.views} views</span>
          </div>

          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="flex items-center gap-4 border-t pt-6">
            <Button
              variant={hasLiked ? "default" : "outline"}
              onClick={handleLike}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {likes} Likes
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {article.relatedArticles.map((related) => (
              <Card key={related.id} className="overflow-hidden">
                {/* Similar to news card in main page */}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}