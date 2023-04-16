import { AuthContext } from "@/Contexts/Auth";
import React, { useContext, useEffect, useState } from "react";

import { getConversationAll, GetUser, getConversation } from "@/services/api";
import axios from "axios";

const Conversations = ({ text, setActiveChart, setConversation }) => {
  const { user, socket, setActiveUsers, setperson, newMessageFlag, person } =
    useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const [message, setMessage] = useState({});

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };

  const getData = async (senderId, type, message) => {
    console.log(senderId, type);
    let { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
      {
        email: senderId,
        type: type,
      },
      { headers: headers }
    );
    return { ...data, message };
  };

  useEffect(() => {
    const get = async () => {
      await getConversation({
        senderId: user?.email,
        receiverId: person?.email,
      }).then((res) => {
        setConversation(res);
      });
    };
    get();
  }, [person, person.email]);

  const getUser = async (item) => {
    setperson(item);
    setActiveChart(true);
  };

  const getUsers = async (data) => {
    console.log(data);
    let arr = [];
    for (let i = 0; i < data.length; i++) {
      console.log();
      arr.push(
        await getData(
          data[i].members[0] != user.email
            ? data[i].members[0]
            : data[i].members[1],
          data[i].Setype != user?.type ? data[i].Setype : data[i].ReType,
          data[i].messages
        )
      );
    }
    setUsers(arr);
  };

  const getUserAll = async () => {
    let data = await getConversationAll({
      senderId: user.email,
      receiverId: user.email,
    });
    getUsers(data);
  };

  useEffect(() => {
    getUserAll();
  }, [newMessageFlag]);

  useEffect(() => {}, [text]);
  console.log(users);

  return (
    <div className="flex flex-col gap-0.5 ">
      {users?.map((item) => (
        <div
          className="p-2 bg-gray-200   cursor-pointer border-t border-b hover:scale-105 transition-all duration-200 ease-in-out"
          onClick={() => getUser(item)}
        >
          <div className="flex gap-4 items-center">
            <div>
              <img
                src={item?.profilePic}
                alt=""
                className="w-12 h-12  rounded-full"
              />
            </div>
            <div>
              <h2 className="text-gray-700 font-semibold">{item?.name}</h2>
              <p className="text-gray-500 italic text-xs">{item.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversations;
