import { AuthContext } from "@/Contexts/Auth";
import ChatComponent from "@/components/ChatComponent";
import Conversations from "@/components/Conversations";

import SecondaryNav from "@/components/SecondaryNav";
import { getConversation } from "@/services/api";
import { Drawer } from "@mui/material";
import axios from "axios";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Blocks } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const chat = () => {
  const [checked, setChecked] = useState(false);
  const [messages, setmessages] = useState([]);
  const [activeChart, setActiveChart] = useState(false);
  const [text, setText] = useState("");
  const [chatProfile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const {
    user,
    socket,
    person,
    conversation,
    setConversation,
    newMessageFlag,
  } = useContext(AuthContext);
  const data = router.query;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [user]);

  const getData = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((res) => {
        setProfile(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Scroll = useRef();
  useEffect(() => {
    Scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, person]);

  useEffect((item) => {
    getData();
    if (data.active) {
      setActiveChart(true);
    }
  }, []);

  if (!checked)
    return (
      <div className="flex justify-center">
        <Blocks
          height="200"
          width="200"
          color="blue"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <>
      {" "}
      <Head>
        <title>My Chat</title>
      </Head>
      {activeChart && (
        <div className="flex justify-center md:hidden">
          <button
            className="bg-blue-500 italic py-2 rounded-md shadow-md px-6 text-white   "
            onClick={() => setOpen(true)}
          >
            Select Chat
          </button>
        </div>
      )}
      <div className="max-w-7xl mx-auto shadow-md shadow-black/20 my-6 h-[600px] border border-black/10  md:mb-6">
        <div className="md:hidden ">
          <SecondaryNav />
        </div>

        <div className="flex px-1 md:p-0">
          <div className="flex-[0.3] bg-[#ffffff] border-r-2 border-black/10 h-[600px] overflow-scroll  md:inline-block hidden">
            <div className="flex p-3 items-center space-x-4 border-b border-black/[15%]">
              <img
                src={
                  chatProfile?.profilePic ||
                  "https://assets.coffeemug.ai/assets/images/default-user.png"
                }
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <p className="text-lg font-semibold text-gray-800">
                {user?.name}
              </p>
            </div>
            <input
              type="text"
              className="w-full border-b py-2 bg-gray-100/30 placeholder:text-center placeholder:text-sm placeholder:italic outline-none text-sm text-center "
              placeholder="Search by Name Here"
            />
            <Conversations
              items={"items"}
              text={text}
              setConversation={setConversation}
              setActiveChart={setActiveChart}
            />
          </div>
          {activeChart ? (
            <div className="md:flex-[0.7] bg-[#f7f9fa] h-[600px]  w-full">
              <ChatComponent
                conversation={conversation}
                messages={messages}
                data={data}
                Scroll={Scroll}
                setmessages={setmessages}
              />
            </div>
          ) : (
            <div className="md:flex-[0.7] bg-[#f7f9fa] h-[600px] flex-1 ">
              <div className="flex flex-col space-y-3 justify-center items-center h-full">
                <p className="md:text-4xl text-2xl text-gray-800 text-center ">
                  Hey Ajay Irkal - Welcome to Aandata.Guru
                </p>
                <p className="text-sm  text-gray-600 italic text-center">
                  Select the member you wish to contact and start chatting
                </p>
                <button
                  className="bg-blue-500 italic py-2 rounded-md shadow-md px-6 text-white  my-6 md:hidden"
                  onClick={() => setOpen(true)}
                >
                  Select Chat
                </button>
              </div>
            </div>
          )}
        </div>
        <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
          <div className="flex-1 w-[250px] bg-[#ffffff] border-r-2 border-black/10 h-[600px] overflow-scroll md:hidden">
            <div className="flex p-3 items-center space-x-4 border-b border-black/[15%]">
              <img
                src={
                  chatProfile?.profilePic ||
                  "https://assets.coffeemug.ai/assets/images/default-user.png"
                }
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <p className="text-lg font-semibold text-gray-800">
                {user?.name}
              </p>
            </div>
            <input
              type="text"
              className="w-full border-b py-2 bg-gray-100/30 placeholder:text-center placeholder:text-sm placeholder:italic outline-none text-sm text-center "
              placeholder="Search by Name Here"
            />
            <Conversations
              items={"items"}
              text={text}
              setConversation={setConversation}
              setActiveChart={setActiveChart}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default chat;
