import React, { useContext, useState } from "react";
import SecondNavbar from "./SecondNavbar";
import {
  Chat,
  Connection,
  House,
  Members,
  Mentor,
  Rupees,
  Settings,
  Test,
} from "@/components/svgs";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "@/Contexts/Auth";
import { Drawer, Modal } from "@mui/material";
import PTest from "./PTest";
import { toast } from "react-toastify";

const SecondaryNav = ({ settings }) => {
  const { user, mainNav, setMainNav } = useContext(AuthContext);
  const [test, setTest] = useState(false);
  const [start, setStart] = useState(false);

  return (
    <div
      className={`bg-white basis-1/4 ${
        settings ? "border-none" : "border"
      } rounded-md p-4 max-h-[280px] w-[280px] border-black/20 hidden md:inline-block `}
    >
      <div className="flex flex-col space-y-8  ">
        <Link href="/user/home">
          <SecondNavbar jsx={<House />} title="Home" text="/user/home" />
        </Link>
        <Link href="/user/chat">
          <SecondNavbar jsx={<Chat />} title="My Chats" text="/user/chat" />
        </Link>
        <Link href="/user/connections">
          <SecondNavbar
            jsx={<Connection />}
            title="My Connections"
            text="/user/connections"
          />
        </Link>
        <Link
          href={{
            pathname: "/user/settings",
          }}
        >
          <SecondNavbar
            jsx={<Settings />}
            title="Settings"
            text="/user/settings"
          />
        </Link>
        <Link
          href={{
            pathname: "/user/test",
          }}
        >
          <SecondNavbar
            jsx={<Test />}
            text="/user/test"
            title="Psychometric Test"
            setTest={setTest}
          />
        </Link>
      </div>
      <Drawer anchor="left" open={mainNav} onClose={() => setMainNav(!mainNav)}>
        <div
          className={`w-[250px] md:hidden 
             
            `}
        >
          <div>
            <Link href="/">
              <h1 className="text-2xl font-semibold lg:ml-28 transition-all duration-300 ease-in-out text-center my-6 mb-12">
                Annadata.<span className="text-green-500">Guru</span>
              </h1>
            </Link>
          </div>
          <div className="flex flex-col space-y-8  p-2">
            <Link href="/user/home">
              <SecondNavbar jsx={<House />} title="Home" text="/user/home" />
            </Link>
            <Link href="/user/chat">
              <SecondNavbar jsx={<Chat />} title="My Chats" text="/user/chat" />
            </Link>
            <Link href="/user/connections">
              <SecondNavbar
                jsx={<Connection />}
                title="My Connections"
                text="/user/connections"
              />
            </Link>
            <Link
              href={{
                pathname: "/user/settings",
              }}
            >
              <SecondNavbar
                jsx={<Settings />}
                title="Settings"
                text="/user/settings"
              />
            </Link>
            <Link
              href={{
                pathname: "/user/test",
              }}
            >
              <SecondNavbar
                jsx={<Test />}
                text="/user/test"
                title="Psychometric Test"
                setTest={setTest}
              />
            </Link>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SecondaryNav;
