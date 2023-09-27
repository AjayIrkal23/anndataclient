import React, { useContext, useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatSend from "./ChatSend";
import { getConversation, getMessage, newMessage } from "@/services/api";
import { AuthContext } from "@/Contexts/Auth";
import { toast } from "react-toastify";

const ChatComponent = ({
  conversation,
  messages,
  setmessages,
  data,
  Scroll,
}) => {
  const { person, socket, newMessageFlag, user, setnewMessageFlag } =
    useContext(AuthContext);
  const [text, setText] = useState("");

  const [incomingMessage, setincomingMessage] = useState(null);

  console.log(text);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setincomingMessage({
        ...data,
        createdAt: new Date(),
      });
    });
  }, []);

  const SendText = async (e) => {
    const code = e.KeyCode || e.which;
    if (code === 13) {
      let message = {};

      message = {
        senderId: user.email,
        receiverId: person.email,
        conversationId: conversation?.id,
        type: "text",
        text: text,
      };

      socket.current.emit("SendMessage", message);

      await newMessage(message);
      setText("");
      setnewMessageFlag(!newMessageFlag);
    }
  };

  useEffect(() => {
    console.log("hello");
    const getmessageDets = async () => {
      await getMessage(conversation?.id).then((data) => {
        setmessages(data);
      });
    };
    conversation?.id && getmessageDets();
  }, [person, conversation?.id, newMessageFlag]);

  useEffect(() => {
    incomingMessage &&
      conversation?.members?.includes(incomingMessage?.senderId) &&
      setmessages((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader person={person} />

      <ChatMain
        person={person}
        conversation={conversation}
        messages={messages}
        user={user}
        Scroll={Scroll}
      />

      <ChatSend
        setText={setText}
        SendText={SendText}
        text={text}
        person={person}
        data={data}
      />
    </div>
  );
};

export default ChatComponent;
