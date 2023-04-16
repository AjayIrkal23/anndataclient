import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="py-2 max-w-6xl mx-auto pb-14">
      <div className="">
        <div className="flex md:flex-row flex-col justify-between mt-14 gap-12">
          <div className="flex-col flex-1 space-y-8">
            <div className="">
              <h1 className="md:text-5xl text-4xl text-center md:text-left  capitalize tracking-normal md:tracking-wider text-gray-800 font-nunito ">
                Discover Connections that Matter!
              </h1>
            </div>
            <div className="">
              <p className="text-gray-700 italic md:text-xl text-[15px] text-center md:text-left  ">
                Our{" "}
                <span className="underline decoration-double decoration-green-500">
                  AI based matchmaking and psychometric
                </span>{" "}
                analysis help you discover more meaningful connections for -
              </p>
            </div>
            <div className="md:w-[75%] w-full">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <ul className="font-semibold text-gray-700">
                    <li className="flex items-center gap-2">
                      <span>
                        <svg
                          className="text-green-600 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      Fund Raising
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <svg
                          className="text-green-600 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      Mentorship
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col">
                  <ul className="font-semibold text-gray-700">
                    <li className="flex items-center gap-2">
                      <span>
                        <svg
                          className="text-green-600 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      Jobs
                    </li>
                    <li className="flex items-center gap-2">
                      <span>
                        <svg
                          className="text-green-600 w-5 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                      </span>
                      Brainstorming
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <div className="">
                <Link href="/signup">
                  <button className="bg-[#29ABE2] flex gap-2  items-center text-white shadow-md px-24 py-2.5 rounded-md hover:scale-105 transition-all duration-200 ease-in-out mx-auto md:mx-0">
                    <span className="hidden md:inline-block">
                      {" "}
                      Join Now For Free{" "}
                    </span>
                    <span className="md:hidden inline-block"> Join Now </span>
                    <span>
                      <svg
                        className="text-white/60 w-5 h-5 mt-[0.9px]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-center items-center">
              <div className="md:h-[280px] md:w-[280px] bg-[#DBBD59] relative md:flex justify-center items-end rounded-full hidden ">
                <img
                  src="/farmer.jpg"
                  alt=""
                  className="absolute top-[50%] left-[50%] md:w-[250px] md:h-[250px] -translate-x-[50%] -translate-y-[50%] rounded-full"
                />
              </div>
              <div className="h-[280px] w-[280px] bg-[#754C24] relative flex justify-center items-end rounded-full">
                <img
                  src="/farmer2.jpg"
                  alt=""
                  className="absolute top-[50%] left-[50%] w-[250px] h-[250px] -translate-x-[50%] -translate-y-[50%] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
