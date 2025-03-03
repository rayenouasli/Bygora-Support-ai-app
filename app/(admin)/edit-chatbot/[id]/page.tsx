"use client";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/Apolloclient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

function EditChatbot() {
  const params = useParams(); // Use useParams() to access params properly
  const id = params.id; // Extract id from the resolved params

  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      const url = `${BASE_URL}/chatbot/${id}`;
      setUrl(url);
    }
  }, [id]);

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start conversations with your
          chatbot
        </p>
        <div className="flex items-center space-x-2">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50 bg-white md:rounded-lg">
            <Input value={url} readOnly className="cursor-pointer"/>
          </Link>
          <Button
          type="submit"
          size="sm"
          className="px-3"
          onClick={()=>{
            navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
          }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditChatbot;
