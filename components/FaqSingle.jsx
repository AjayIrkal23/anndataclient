import { useState } from "react";

const FaqSingle = ({ q, a }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      className="w-full p-1 cursor-pointer"
      onClick={() => setActive(!active)}
    >
      <div
        className={`py-7 px-8 bg-white bg-opacity-60 border border-gray-200 hover:border-gray-300 rounded-2xl shadow-10xl  ${
          active && "border-2 !border-indigo-600"
        }`}
      >
        <div className="flex flex-wrap justify-between -m-2">
          <div className="flex-1 p-2">
            <h3
              className={`${
                active && "mb-4"
              } text-lg font-semibold leading-normal`}
            >
              {q}
            </h3>
            <p
              className={`text-gray-600  font-medium ${
                active ? "inline-block" : "hidden"
              }`}
            >
              {a}
            </p>
          </div>
          <div className="w-auto p-2">
            <svg
              className={`relative top-1  ${
                active ? "rotate-180" : "rotate-0"
              }`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                stroke={`${active ? "#4F46E5" : "black"}`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSingle;
