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
import { ShoppingBag, Tag, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with actual data from Supabase
const listings = [
  {
    id: 1,
    title: "PlayStation 5 Controller",
    price: 299999,
    condition: "Like New",
    category: "Controllers",
    seller: "John Doe",
    image: "/images/ps5-controller.jpg",
    rating: 4.5,
    location: "Dar es Salaam",
  },
  // Add more listings
];

export default function MarketplacePage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground mt-2">
              Buy and sell gaming gear
            </p>
          </div>
          <Button asChild>
            <Link href="/marketplace/create">List Item</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <Input
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="consoles">Consoles</SelectItem>
              <SelectItem value="games">Games</SelectItem>
              <SelectItem value="controllers">Controllers</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <Link href={`/marketplace/${listing.id}`}>
                <div className="aspect-square relative">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold truncate">{listing.title}</h3>
                  <p className="text-lg font-bold mt-2">
                    TSh {listing.price.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    {listing.condition}
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4" />
                    {listing.rating}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {listing.location}
                  </p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}