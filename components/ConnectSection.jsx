import React, { useState } from "react";
import TabComponent from "./TabComponent";

const ConnectSection = () => {
  const [tab, setTab] = useState("Startup Investment");

  const data = [
    "Startup Investment",
    "Opportunities",
    "Mentorship",
    "Brainstorming",
  ];
  return (
    <div className="bg-[#faf5e9] ">
      <div className="py-16">
        <h1 className="text-center text-4xl font-nunito text-gray-800 ">
          Annadata.<span className="text-green-600">Guru</span> Provides You
        </h1>

        <div className="mt-8 ">
          <div className="flex justify-center items-center font-nunito tracking-wider text-[15px]  overflow-x-scroll md:flex-row flex-col w-full gap-1 md:gap-0">
            {data.map((item, i) => (
              <div
                key={i}
                onClick={(e) => setTab(item)}
                className={`border md:w-auto rounded-lg md:rounded-none  w-full ${
                  i == 0 && "!rounded-l-lg"
                } ${
                  i == data.length - 1 && "!rounded-r-lg"
                } bg-white  px-8 py-3 ${
                  tab == item && "text-[#29ABE2] !border-[#29ABE2]"
                } cursor-pointer hover:text-[#29ABE2] hover:!border-[#29ABE2] border-black/20`}
              >
                <div>{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <TabComponent tab={tab} />
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;
