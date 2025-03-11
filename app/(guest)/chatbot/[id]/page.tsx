"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Avatar from "@/components/Avatar";
import { useQuery } from "@apollo/client";
import { useEffect, useState, use } from "react";
import Messages from "@/components/Messages";
import { Message } from "@/types/types";

function ChatbotPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrapping params correctly

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [chatId, setChatId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="w-full flex bg-gray-100">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form>
            <DialogHeader>
              <DialogTitle>Lets help you out!</DialogTitle>
              <DialogDescription>
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>
            <div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input 
            id="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="John Doe"
            className="col-span-3" />
           </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatbotPage;
