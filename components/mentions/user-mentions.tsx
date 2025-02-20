"use client";

import { useState, useEffect, useRef } from "react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function UserMentions({
  content,
  onSelect,
}: {
  content: string;
  onSelect: (user: User) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const triggerPos = content.lastIndexOf("@");
  
  useEffect(() => {
    if (triggerPos !== -1 && content.slice(triggerPos + 1).length > 0) {
      setQuery(content.slice(triggerPos + 1));
      setIsOpen(true);
      // TODO: Fetch users based on query
      setUsers([
        { id: "1", name: "John Doe", avatar: "/avatars/john.png" },
        { id: "2", name: "Jane Smith", avatar: "/avatars/jane.png" },
      ]);
    } else {
      setIsOpen(false);
    }
  }, [content, triggerPos]);

  if (!isOpen) return null;

  return (
    <Command className="absolute bottom-full mb-1 w-64">
      <CommandGroup heading="Mentions">
        {users.map((user) => (
          <CommandItem
            key={user.id}
            onSelect={() => {
              onSelect(user);
              setIsOpen(false);
            }}
          >
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <span>{user.name}</span>
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
}