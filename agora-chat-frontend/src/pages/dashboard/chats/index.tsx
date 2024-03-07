import { ChatIcon } from "@chakra-ui/icons";

const Chats = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div>
        <h1 className="text-center text-2xl">
          Start Chatting With Chat Demo
        </h1>
        <div className="flex justify-center mt-6">
          <ChatIcon className="text-9xl " />
        </div>
      </div>
    </div>
  );
};

export default Chats;
