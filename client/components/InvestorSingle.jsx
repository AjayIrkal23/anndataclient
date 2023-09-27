import Link from "next/link";
import React from "react";

const InvestorSingle = ({ item }) => {
  console.log(item);
  const name = "Ajayirkal";
  return (
    <div className="flex flex-col p-2 space-y-[0.5px]  items-center hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer hover:scale-105 rounded-md ">
      <div className="w-24 h-24 mb-2">
        <img
          src={item?.profilePic}
          className=" bg-contain w-full h-full rounded-full bg-blue-500"
          alt=""
        />
      </div>
      <div>
        <h1 className="font-bold text-gray-700 text-xl ">{item?.name}</h1>
      </div>
      <div>
        <h3 className=" text-gray-600">{item?.interest}</h3>
      </div>
      <div>
        <h3 className="italic text-gray-500">{item?.website} </h3>
      </div>
    </div>
  );
};

export default InvestorSingle;
