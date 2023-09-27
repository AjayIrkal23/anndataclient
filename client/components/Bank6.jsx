import React from "react";

const Bank6 = ({ setOpen }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[250px] md:w-auto">
      <img
        src="https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png"
        alt=""
        className="w-[150px] h-[150px] my-3 rounded-full"
      />
      <button
        onClick={(e) => setOpen(false)}
        className="bg-blue-500 my-6 text-white cursor-pointer py-1.5 px-6 rounded-md hover:animate-pulse shadow-md"
      >
        Close
      </button>
    </div>
  );
};

export default Bank6;
