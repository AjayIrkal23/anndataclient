import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
const WhySection = () => {
  return (
    <div className="py-9 max-w-5xl mx-auto over">
      <div>
        <h1 className="font-nunito md:text-5xl text-3xl text-center capitalize">
          Why make connections through <br /> Annadata.
          <span className="text-green-600">Guru</span> ?
        </h1>

        <div className="flex md:justify-center justify-between text-center md:text-left mt-11 md:space-x-40">
          <div className="flex flex-col">
            <h4 className="md:text-4xl font-semibold text-gray-700 ">
              2,90,000+
            </h4>
            <p className="italic text-gray-700 md:text-xl text-lg">
              Senior Professionals
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="md:text-4xl font-semibold text-gray-700  ">
              22,90,000+
            </h4>
            <p className="italic text-gray-700 md:text-xl text-lg">
              Connections Made
            </p>
          </div>
        </div>
        <div className="mt-14">
          <div className="flex-col">
            <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-around w-full items-center">
              <div className="flex-1 md:pl-16 w-full">
                <ul className="space-y-5 ">
                  <li>
                    <div className="flex justify-start text-start gap-3 items-center">
                      <svg
                        className="w-8 h-8 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                        />
                      </svg>
                      <p>Curated Network of Senior Professionals </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-start gap-3 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                      <p>No Spam messaging allowed </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-start gap-3 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <p>1:1 Introductions with consent </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 w-full ">
                  <Link href="/signup">
                    <button className="border-[#29ABE2] hover:scale-105 flex items-center gap-1 hover:bg-transparent bg-[#29ABE2] font-semibold md:mx-0 mx-auto text-white hover:text-[#29ABE2] transition-all duration-300 ease-in-out border-2 px-12 py-2 rounded-md shadow-md ">
                      <p>Join Now For Free</p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                          />
                        </svg>
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-[500px] ">
                <img
                  src="/connections.jpg"
                  className=" w-[300px] md:h-auto h-auto md:w-[450px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
