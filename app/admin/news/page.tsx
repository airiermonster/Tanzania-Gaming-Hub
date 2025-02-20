"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, MoreVertical, Trash2, Eye, PenSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminNewsPage() {
  const [articles] = useState([
    {
      id: 1,
      title: "New Gaming Tournament Announced",
      category: "Tournaments",
      author: "John Smith",
      publishedAt: "2024-03-15",
      views: 1234,
      status: "published",
    },
    {
      id: 2,
      title: "Latest Gaming Hardware Review",
      category: "Reviews",
      author: "Jane Doe",
      publishedAt: "2024-03-14",
      views: 856,
      status: "draft",
    },
  ]);

  const handleDelete = async (id: number) => {
    // TODO: Implement with backend
    console.log("Delete article:", id);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">News Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage news articles and submissions
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/news/create">
            <PenSquare className="h-4 w-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <Input placeholder="Search articles..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="tournaments">Tournaments</SelectItem>
              <SelectItem value="reviews">Game Reviews</SelectItem>
              <SelectItem value="industry">Industry Updates</SelectItem>
              <SelectItem value="community">Community News</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.author}</TableCell>
                <TableCell>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{article.views}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      article.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/news/${article.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/news/${article.id}/edit`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(article.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}