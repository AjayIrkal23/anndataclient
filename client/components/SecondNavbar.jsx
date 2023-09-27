import { useRouter } from "next/router";
import React from "react";

const SecondNavbar = ({ jsx, title, text, setTest }) => {
  const router = useRouter();

  return (
    <>
      {title == "Psychometric Test" ? (
        <div
          onClick={() => setTest(true)}
          className={`flex items-center group gap-4 ${
            router.pathname.includes(text) && "text-[#29ABE2]"
          } hover:text-[#29ABE2]  cursor-pointer font-nunito  tracking-wide transition-all ease-in-out duration-200`}
        >
          {jsx}
          <p>{title}</p>
        </div>
      ) : (
        <div
          className={`flex items-center group gap-4 ${
            router.pathname.includes(text) && "text-[#29ABE2]"
          } hover:text-[#29ABE2]  cursor-pointer font-nunito  tracking-wide transition-all ease-in-out duration-200`}
        >
          {jsx}
          <p>{title}</p>
        </div>
      )}
    </>
  );
};

export default SecondNavbar;
