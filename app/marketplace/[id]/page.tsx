"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ListingPage() {
  const params = useParams();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock data - replace with actual data fetch
  const listing = {
    id: params.id,
    title: "PlayStation 5 Controller",
    description: "DualSense wireless controller in perfect condition...",
    price: 299999,
    condition: "Like New",
    category: "Controllers",
    seller: {
      name: "John Doe",
      avatar: "/avatars/john.png",
      rating: 4.8,
      joinedDate: "2023-01-01",
    },
    images: [
      "/images/ps5-controller-1.jpg",
      "/images/ps5-controller-2.jpg",
      "/images/ps5-controller-3.jpg",
    ],
    location: "Dar es Salaam",
    createdAt: "2024-02-15T10:30:00",
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Carousel */}
          <Card className="p-4">
            <Carousel>
              <CarouselContent>
                {listing.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative">
                      <Image
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Card>

          {/* Listing Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{listing.title}</h1>
              <p className="text-2xl font-bold mt-2">
                TSh {listing.price.toLocaleString()}
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">{listing.category}</Badge>
                <Badge variant="secondary">{listing.condition}</Badge>
              </div>
            </div>

            <Card className="p-4">
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground">{listing.description}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={listing.seller.avatar} />
                    <AvatarFallback>
                      {listing.seller.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{listing.seller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since{" "}
                      {new Date(listing.seller.joinedDate).getFullYear()}
                    </p>
                  </div>
                </div>
                <Button>Contact Seller</Button>
              </div>
            </Card>

            <div className="flex gap-4">
              <Button className="flex-1">Buy Now</Button>
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`h-4 w-4 mr-2 ${
                    isWishlisted ? "fill-primary" : ""
                  }`}
                />
                Wishlist
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}