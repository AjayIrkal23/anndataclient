import { AuthContext } from "@/Contexts/Auth";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [Shadow, setShadow] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, userLogout, mainNav, setMainNav } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const HandleS = () => {
      if (window.scrollY >= 10) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener("scroll", HandleS);
  }, []);
  return (
    <div
      className={`${
        Shadow && "bg-[whitesmoke] shadow-md"
      } py-5 md:px-12 px-4  sticky top-0 transition-all duration-200 ease-in-out`}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="text-2xl font-semibold lg:ml-28 transition-all duration-300 ease-in-out">
              Annadata.<span className="text-green-500">Guru</span>
            </h1>
          </Link>
        </div>
        {Object.keys(user).length > 0 && router.pathname.includes("/user") ? (
          <div className={`md:hidden `}>
            {mainNav ? (
              <div onClick={() => setMainNav(!mainNav)}>
                <XMarkIcon className="w-8 h-8 text-blue-500" />
              </div>
            ) : (
              <div onClick={() => setMainNav(!mainNav)}>
                {" "}
                <Bars3Icon className="w-8 h-8 text-blue-500" />
              </div>
            )}
          </div>
        ) : (
          <div className={`md:hidden `}>
            {open ? (
              <div onClick={() => setOpen(!open)}>
                <XMarkIcon className="w-8 h-8 text-blue-500" />
              </div>
            ) : (
              <div onClick={() => setOpen(!open)}>
                {" "}
                <Bars3Icon className="w-8 h-8 text-blue-500" />
              </div>
            )}
          </div>
        )}

        <div className="hidden md:inline-block">
          <ul className="flex gap-16 items-center tracking-wider  font-sans text-sm">
            <li className="">
              <div className="flex flex-col">
                <Link href="/investorList">
                  <h3
                    className={`navItems ${
                      router.pathname == "/investorList" && "text-[#fd7e14]"
                    } `}
                  >
                    Investor List
                  </h3>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <Link href="/startupList">
                  <h3
                    className={`navItems ${
                      router.pathname == "/startupList" && "text-[#fd7e14]"
                    } `}
                  >
                    Members
                  </h3>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col">
                <Link href="/banks">
                  <h3
                    className={`navItems ${
                      router.pathname == "/banks" && "text-[#fd7e14]"
                    } `}
                  >
                    Banks
                  </h3>
                </Link>
              </div>
            </li>
            <li className="">
              <div className="flex flex-col hover:text-[#fd7e14]">
                <Link href="/">
                  <h3
                    className={`navItems ${
                      router.pathname == "/" && "text-[#fd7e14]"
                    } `}
                  >
                    About Us
                  </h3>
                </Link>
              </div>
            </li>
            {Object.keys(user).length > 0 ? (
              <div>
                {router.pathname != "/" ? (
                  <div
                    className=""
                    onClick={() => {
                      toast.success("Logout Successful");
                      userLogout();
                    }}
                  >
                    <li className="text-red-600 font-semibold px-6 py-2 border border-red-600 rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-red-600 hover:text-white ">
                      Logout
                    </li>
                  </div>
                ) : (
                  <div
                    className=""
                    onClick={() => {
                      router.push("/user/home");
                    }}
                  >
                    <li className="text-blue-500 font-semibold px-6 py-2 border border-blue-500 rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-blue-500 hover:text-white ">
                      DashBoard
                    </li>
                  </div>
                )}
              </div>
            ) : (
              <Link href="login">
                <li className="text-[#fd7e14] font-semibold px-6 py-2 border border-[#fd7e14] rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-[#fd7e14] hover:text-white ">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
        <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
          <div
            className={`w-[250px] md:hidden ${
              Object.keys(user).length > 0 &&
              router.pathname == "/user/home" &&
              "hidden"
            }`}
          >
            <div>
              <Link href="/">
                <h1 className="text-2xl font-semibold lg:ml-28 transition-all duration-300 ease-in-out text-center my-6">
                  Annadata.<span className="text-green-500">Guru</span>
                </h1>
              </Link>
            </div>
            <ul className="flex  flex-col items-center tracking-wider  font-sans text-sm my-8 gap-0.5">
              <li
                className={`navItems  w-full bg-gray-200 py-3 text-center border ${
                  router.pathname == "/investorList" &&
                  "!bg-[#fd7e14] !text-white"
                } `}
              >
                <div className="flex flex-col">
                  <Link href="/investorList">
                    <h3
                      className={`navItems 
                       `}
                    >
                      Investor List
                    </h3>
                  </Link>
                </div>
              </li>
              <li
                className={`navItems  w-full bg-gray-200 py-3 text-center border ${
                  router.pathname == "/startupList" &&
                  "!bg-[#fd7e14] !text-white"
                } `}
              >
                <div className="flex flex-col">
                  <Link href="/startupList">
                    <h3 className={`navItems  `}>Members</h3>
                  </Link>
                </div>
              </li>
              <li
                className={`navItems  w-full bg-gray-200 py-3 text-center border ${
                  router.pathname == "/banks" && "!bg-[#fd7e14] !text-white"
                } `}
              >
                <div className="flex flex-col">
                  <Link href="/banks">
                    <h3
                      className={`navItems 
                         `}
                    >
                      Banks
                    </h3>
                  </Link>
                </div>
              </li>
              <li
                className={`navItems  w-full bg-gray-200 py-3 text-center border ${
                  router.pathname == "/" && "!bg-[#fd7e14] !text-white"
                } `}
              >
                <div className="flex flex-col ">
                  <Link href="/">
                    <h3 className={`navItems  `}>About Us</h3>
                  </Link>
                </div>
              </li>
              {Object.keys(user).length > 0 ? (
                <div className="mt-4 w-full text-center">
                  {!router?.pathname.includes("/user") ? (
                    <div
                      className="w-full"
                      onClick={() => {
                        router.push("/user/home");
                        setOpen(false);
                      }}
                    >
                      <li className="text-white font-semibold px-6 py-2 border w-full bg-blue-500 rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-blue-500 hover:text-white ">
                        DashBoard
                      </li>
                    </div>
                  ) : (
                    <div
                      className="w-full"
                      onClick={() => {
                        toast.success("Logout Successful");
                        userLogout();
                      }}
                    >
                      <li className="text-white font-semibold w-full px-6 py-2 border bg-red-600 rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-red-600 hover:text-white ">
                        Logout
                      </li>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="login" className="mt-4">
                  <li className="text-[#fd7e14] font-semibold px-6 py-2 border border-[#fd7e14] rounded-md shadow-sm cursor-pointer transition-all duration-200 lg:mr-12 hover:bg-[#fd7e14] hover:text-white ">
                    Login
                  </li>
                </Link>
              )}
            </ul>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
