"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateArticlePage() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/news">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Article</h1>
          <p className="text-muted-foreground mt-2">
            Create a new news article
          </p>
        </div>
      </div>

      <Card className="p-6">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter article title" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tournaments">Tournaments</SelectItem>
                <SelectItem value="reviews">Game Reviews</SelectItem>
                <SelectItem value="industry">Industry Updates</SelectItem>
                <SelectItem value="community">Community News</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your article content..."
              className="min-h-[300px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Brief summary of the article..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
              <Link href="/admin/news">Cancel</Link>
            </Button>
            <Button>Publish</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}