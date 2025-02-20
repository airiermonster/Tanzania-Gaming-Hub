"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, MessageSquare, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { UserMentions } from "@/components/mentions/user-mentions";
import { useNotifications } from "@/hooks/use-notifications";
import Image from "next/image";
import { Select } from "@/components/ui/select";

export default function DiscussionPage() {
  const params = useParams();
  const id = params.id;
  // Add new states
  const [replyContent, setReplyContent] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const notifications = useNotifications();
  // Add sorting function
  const sortedReplies = [...discussion.replies].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "mostLikes":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/community">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Community
          </Link>
        </Button>

        <Card className="p-6 mb-8">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={discussion.authorAvatar} />
              <AvatarFallback>
                {discussion.author.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{discussion.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">
                Posted by {discussion.author} •{" "}
                {new Date(discussion.createdAt).toLocaleDateString()}
              </p>
              <p className="text-base mb-6">{discussion.content}</p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  {discussion.likes} Likes
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {discussion.replies.length} Replies
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Add a Reply</h2>
            <div className="relative">
              <Textarea
                placeholder="Write your reply..."
                className="mb-4 min-h-[100px]"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <UserMentions
                content={replyContent}
                onSelect={(user) => {
                  setReplyContent((prev) => 
                    prev.replace(/@\w*$/, `@${user.name} `)
                  );
                }}
              />
            </div>
            <div className="flex justify-end">
              <Button>Post Reply</Button>
            </div>
          </Card>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Replies ({discussion.replies.length})
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="mostLikes">Most Likes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {sortedReplies.map((reply) => (
            <Card key={reply.id} className="p-6">
              {/* Replace img with next/image for optimization */}
              {reply.image && (
                <div className="mb-4">
                  <Image
                    src={reply.image}
                    alt="Reply image"
                    width={600}
                    height={400}
                    className="rounded-md"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={reply.authorAvatar} />
                  <AvatarFallback>
                    {reply.author.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    {reply.author} •{" "}
                    {new Date(reply.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-base mb-4">{reply.content}</p>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    {reply.likes} Likes
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}