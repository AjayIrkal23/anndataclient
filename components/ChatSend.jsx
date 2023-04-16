import { AuthContext } from "@/Contexts/Auth";
import React, { useContext, useState } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const ChatSend = ({ setText, SendText, text, data }) => {
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <div className="flex bg-white border-t border-gray-300 h-[70px] items-center">
      <div className="w-full">
        <input
          type="text"
          className="w-full p-2 outline-none placeholder:text-sm placeholder:italic px-4 text-gray-700"
          value={text}
          defaultValue={data.text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => SendText(e)}
          placeholder="Type Something Here"
        />
      </div>
      <div className="mr-6 relative">
        <FaPlus
          className="text-gray-700 cursor-pointer hover:scale-105 hover:animate-pulse transition-all duration-200 ease-in-out"
          onClick={() => setShow(true)}
        />
        {show && (
          <div className="absolute -top-14 bg-white w-[150px] border border-black/20 shadow-md rounded-md py-2 px-4 right-50 -translate-x-[50%] ">
            <p className="text-sm text-gray-600 italic cursor-pointer hover:underline">
              {user?.type == "Marketing" && "Previous Work Pdf"}
              {user?.type == "Member" && "PichDeck File"}
               {user?.type == "Member" && "PichDeck File"}
            </p>
          </div>
        )}
      </div>
      <div className="mr-6">
        <FaArrowRight className="text-gray-700 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatSend;
