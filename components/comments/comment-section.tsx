"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, Reply } from "lucide-react";

interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  replies?: Comment[];
}

export function CommentSection({ articleId }: { articleId: string | number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    // TODO: Implement with Supabase
    const comment = {
      id: Date.now(),
      content: newComment,
      author: {
        name: "Current User",
        avatar: "/avatars/default.png",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        <div className="space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button onClick={handleSubmitComment}>Post Comment</Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-4">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar} />
                <AvatarFallback>
                  {comment.author.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.author.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2">{comment.content}</p>
                <div className="flex gap-4 mt-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}