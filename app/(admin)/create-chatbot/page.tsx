import Avatar from "@/components/Avatar";

function CreateChatbot() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded-md m-10">
        <Avatar seed="create-chatbot" />
        <div>
            <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
            <h2 className="font-light">
                Create a new chatbot to assist you in your conversations with your customers
            </h2>
        </div>
        
    </div>
  )
}

export default CreateChatbot;
