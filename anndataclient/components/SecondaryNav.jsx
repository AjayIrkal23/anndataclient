import React, { useContext } from "react";
import SecondNavbar from "./SecondNavbar";
import {
  Chat,
  Connection,
  House,
  Members,
  Mentor,
  Rupees,
  Settings,
} from "@/components/svgs";
import Link from "next/link";
import { AuthContext } from "@/Contexts/Auth";
import { Drawer } from "@mui/material";
const SecondaryNav = ({ settings }) => {
  const { user, mainNav, setMainNav } = useContext(AuthContext);
  return (
    <div
      className={`bg-white basis-1/4 ${
        settings ? "border-none" : "border"
      } rounded-md p-4 max-h-[250px] border-black/20 hidden md:inline-block `}
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
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SecondaryNav;
