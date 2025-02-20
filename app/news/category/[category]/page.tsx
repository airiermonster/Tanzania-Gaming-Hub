"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;

  // Mock data - replace with Supabase fetch
  const articles = [
    // Similar to main news page articles
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold capitalize">{category} News</h1>
            <p className="text-muted-foreground mt-2">
              Latest articles in {category}
            </p>
          </div>
          <Button asChild>
            <Link href="/news/submit">Submit News</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <div className="mb-6">
              <Input
                placeholder={`Search ${category} articles...`}
                className="max-w-md"
              />
            </div>

            <div className="space-y-4">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  {/* Similar card structure to main news page */}
                </Card>
              ))}
            </div>
          </div>

          {/* Similar sidebar to main news page */}
        </div>
      </div>
    </div>
  );
}