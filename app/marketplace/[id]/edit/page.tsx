"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Upload, Trash2 } from "lucide-react";
import Image from "next/image";

export default function EditListingPage() {
  const params = useParams();
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  // Mock data - replace with actual data fetch
  const listing = {
    id: params.id,
    title: "PlayStation 5 Controller",
    description: "DualSense wireless controller in perfect condition...",
    price: 299999,
    condition: "like_new",
    category: "controllers",
    location: "Dar es Salaam",
    images: ["/images/ps5-controller.jpg"],
  };

  const form = useForm({
    defaultValues: {
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
      category: listing.category,
      condition: listing.condition,
      location: listing.location,
    },
  });

  useEffect(() => {
    setImages(listing.images);
  }, [listing.images]);

  const onSubmit = async (data: any) => {
    // TODO: Implement update with Supabase
    console.log({ ...data, images });
    router.push("/marketplace/my-listings");
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Listing</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Same form fields as create page */}
            {/* ... existing form fields ... */}

            <div className="grid grid-cols-2 gap-4">
              {images.map((url, index) => (
                <div key={index} className="relative aspect-square group">
                  <Image
                    src={url}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}