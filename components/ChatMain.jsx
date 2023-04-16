import { AuthContext } from "@/Contexts/Auth";
import React, { useContext, useEffect } from "react";

const ChatMain = ({ Scroll, messages, person, user, data }) => {
  const { newMessageFlag } = useContext(AuthContext);
  const element = document.getElementById("box");
  useEffect(() => {
    element?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [person, newMessageFlag]);
  return (
    <div
      id="box"
      className="py-3  overflow-scroll  w-full gap-4 flex flex-col  mt-auto"
    >
      {messages?.map((item) => (
        <Chats item={item} person={person} user={user} />
      ))}
    </div>
  );
};

export default ChatMain;

const Chats = ({ item, person, user }) => {
  return (
    <div className="w-full flex flex-col px-4 ">
      {item.senderId === user?.email ? (
        <div className="ml-auto bg-[#c2defd] py-1.5 px-2 max-w-[350px] rounded-md flex flex-col">
          <p className="text-gray-500 text-sm italic inline-block">You</p>
          <p className="break-words">{item?.text}</p>
          <p className="flex justify-end text-gray-500 italic text-xs">
            {new Date(item?.updatedAt).toLocaleString()}
          </p>
        </div>
      ) : (
        <div className="m bg-[#c2defd] py-1.5 px-2 max-w-[350px] rounded-md flex flex-col">
          <p className="text-gray-500 text-sm italic mb-0.5 inline-block">
            {person?.name}
          </p>
          <p className="break-words">{item.text}</p>
          <p className="flex justify-end text-gray-500 italic text-xs">
            {new Date(item?.updatedAt).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
