import React from "react";

const ChatHeader = ({ person }) => {
  return (
    <div className="flex bg-white border-b border-black/10 shadow-md   items-center gap-3">
      <div>
        <div className="w-full h-full">
          <img
            src={person?.profilePic}
            className="  w-16 h-16 rounded-full p-2"
            alt=""
          />
        </div>
      </div>
      <div>
        <h3 className="text-lg text-gray-600 font-semibold">{person.name}</h3>
      </div>
    </div>
  );
};

export default ChatHeader;
