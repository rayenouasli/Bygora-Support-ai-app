"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GetChatbotByIdResponse, ChatbotCharacteristic } from "@/types/types"; // Import necessary types
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import {
  ADD_CHARACTERISTIC,
  DELETE_CHATBOT,
  UPDATE_CHATBOT,
} from "@/graphql/mutations/mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import { toast } from "sonner";
import Characteristic from "@/components/Characteristic";
import { notFound, redirect, useParams } from "next/navigation";
import { BASE_URL } from "@/graphql/Apolloclient";
import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations/mutations";

function EditChatBot() {
  const params = useParams(); // Get params properly
  const id = params?.id as string; // Ensure `id` is a string

  const [newCharacteristic, setNewCharacteristic] = useState<string>("");
  const [chatbotName, setChatbotName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"], // Refetch the chatbots after deleting
    awaitRefetchQueries: true,
  });

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this chatbot?"
    );
    if (!isConfirmed) return;

    try {
      const promise = deleteChatbot({ variables: { id } });
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Chatbot Successfully deleted!",
        error: "Failed to delete chatbot",
      });
    } catch (error) {
      console.error("Error deleting chatbot:", error);
      toast.error("Failed to delete chatbot");
    }
  };

  useEffect(() => {
    if (id) {
      setUrl(`${BASE_URL}/chatbot/${id}`);
    }
  }, [id]);

  const { loading, error, data } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id },
      skip: !id, // Ensure query is not executed without an ID
    }
  );

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  // Update Chatbot Mutation
  const [updateChatbot] = useMutation(UPDATE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
  });

  // Add Characteristic Mutation
  const [addCharacteristic] = useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const handleUpdateChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const promise = updateChatbot({
        variables: {
          id,
          name: chatbotName,
        },
      });

      toast.promise(promise, {
        loading: "Updating...",
        success: "Chatbot Name Successfully updated!",
        error: "Failed to update chatbot",
      });
    } catch (err) {
      console.error("Failed to update chatbot:", err);
    }
  };

  const handleAddCharacteristic = async (content: string) => {
    try {
      const promise = addCharacteristic({
        variables: {
          chatbotId: Number(id),
          content,
        },
      });

      toast.promise(promise, {
        loading: "Adding...",
        success: "Information added",
        error: "Failed to add Information",
      });
    } catch (err) {
      console.error("Failed to add characteristic:", err);
    }
  };

  if (loading)
    return (
      <div className="mx-auto animate-spin p-10">
        <Avatar seed="PAPAFAM Support Agent" />
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  if (!data?.chatbots) return redirect("/view-chatbots");

  return (
    <div className="px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-[#2991EE]">
        <h2 className="text-white text-sm font-bold">Link to Chat</h2>
        <p className="text-sm italic text-white">
          Share this link with your customers to start conversations with your
          chatbot
        </p>
        <div className="flex items-center space-x-2">
          <Link
            href={url}
            className="w-full cursor-pointer hover:opacity-50 bg-white rounded-md"
          >
            <Input value={url} readOnly className="cursor-pointer" />
          </Link>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => {
              navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <section className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          onClick={() => handleDelete(id)}
          className="absolute top-2 right-2 h-8 w-2"
          variant="destructive"
        >
          X
        </Button>

        <div className="flex space-x-4">
          <Avatar seed={chatbotName} />
          <form
            onSubmit={handleUpdateChatbot}
            className="flex flex-1 space-x-2 items-center"
          >
            <Input
              type="text"
              placeholder={chatbotName}
              required
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              className="w-full border-none bg-transparent text-xl font-bold"
            />
            <Button type="submit" disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10">
          Here's what your AI knows...
        </h2>
        <p>
          Your chatbot is equipped with the following information to assist you
          in your conversations with your customers & users
        </p>

        <div className="bg-gray-200 p-5 md:p-5 rounded-md mt-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCharacteristic(newCharacteristic);
              setNewCharacteristic("");
            }}
            className="flex space-x-2 mb-5"
          >
            <Input
              type="text"
              className="bg-white rounded-md"
              placeholder="Example: If customer asks for prices, provide pricing page: www.example.com/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />
            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>

          <ul className="flex flex-wrap-reverse gap-5 ">
            {data?.chatbots.chatbot_characteristics.map(
              (characteristic: ChatbotCharacteristic) => (
                <Characteristic
                  key={characteristic.id}
                  characteristic={characteristic}
                />
              )
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default EditChatBot;
