"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreVertical, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with actual data from Supabase
const myListings = [
  {
    id: 1,
    title: "PlayStation 5 Controller",
    price: 299999,
    status: "active",
    image: "/images/ps5-controller.jpg",
    views: 156,
    createdAt: "2024-02-15T10:30:00",
    category: "Controllers",
  },
  // Add more listings
];

export default function MyListingsPage() {
  const [listings, setListings] = useState(myListings);

  const handleStatusToggle = (id: number) => {
    setListings(listings.map(listing =>
      listing.id === id
        ? { ...listing, status: listing.status === "active" ? "inactive" : "active" }
        : listing
    ));
  };

  const handleDelete = (id: number) => {
    // TODO: Implement actual deletion with Supabase
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Listings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your marketplace listings
            </p>
          </div>
          <Button asChild>
            <Link href="/marketplace/create">Create New Listing</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {listings.map((listing) => (
            <Card key={listing.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{listing.title}</h3>
                      <p className="text-lg font-bold mt-1">
                        TSh {listing.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                          {listing.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {listing.views} views
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Listed on {new Date(listing.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/marketplace/${listing.id}/edit`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusToggle(listing.id)}
                        >
                          {listing.status === "active" ? (
                            <>
                              <EyeOff className="h-4 w-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="h-4 w-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(listing.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No listings found</p>
            <Button asChild className="mt-4">
              <Link href="/marketplace/create">Create Your First Listing</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}