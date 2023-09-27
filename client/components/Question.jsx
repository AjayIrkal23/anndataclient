import { Modal } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Question = ({
  onGoing,
  setOnGoing,
  arr,
  getTests,
  setOpen1,
  headers,
  text,
  rText,
  page2,
  setPage2,
}) => {
  const [open, setOpen] = useState(false);
  const [a, setA] = useState(null);
  const [ques, setQues] = useState(null);
  const [qNum, setQnum] = useState(0);
  const [option, setOption] = useState(null);
  const [ob, setOb] = useState({
    q1: {
      a: 0,
      b: 0,
      c: 0,
    },
    q2: {
      a: 0,
      b: 0,
      c: 0,
    },
    q3: {
      a: 0,
      b: 0,
      c: 0,
    },
    q4: {
      a: 0,
      b: 0,
      c: 0,
    },
    q5: {
      a: 0,
      b: 0,
      c: 0,
    },
    q6: {
      a: 0,
      b: 0,
      c: 0,
    },
    q7: {
      a: 0,
      b: 0,
      c: 0,
    },
    q8: {
      a: 0,
      b: 0,
      c: 0,
    },
    q9: {
      a: 0,
      b: 0,
      c: 0,
    },
    q10: {
      a: 0,
      b: 0,
      c: 0,
    },
    q11: {
      a: 0,
      b: 0,
      c: 0,
    },
    q12: {
      a: 0,
      b: 0,
      c: 0,
    },
    q13: {
      a: 0,
      b: 0,
      c: 0,
    },
    q14: {
      a: 0,
      b: 0,
      c: 0,
    },
    q15: {
      a: 0,
      b: 0,
      c: 0,
    },
  });

  const handleClick = (q, item, a1) => {
    setQues(item);
    setOption(a1);
    setQnum(q);
    setOpen(true);
  };

  const check = () => {
    let flag = false;
    Object.keys(ob).forEach(function (key) {
      console.log("hello");
      if (ob[key]) {
        if (ob[key]["a"] == 0 && ob[key]["b"] == 0 && ob[key]["c"] == 0) {
          flag = true;
        }
      }
    });
    return flag;
  };

  const handleSubmit = async () => {
    if (!check()) {
      console.log(onGoing);
      console.log(onGoing.testResp["swayam_ref"]);
      const send = {
        swayam_reference: onGoing.testResp["swayam_ref"],
        [rText]: ob,
      };

      await axios
        .post(
          `${process.env.NEXT_PUBLIC_URL}/api/updateTest`,
          {
            send,
          },
          { headers: headers }
        )
        .then((resp) => {
          setPage2(true);

          getTests();
          if (page2) {
            setOpen1(false);
            toast.success("Find Your Result In Past Tests");
            setOnGoing(null);
          }
        });
    } else {
      toast.error("Please Select All The Options");
    }
  };

  const handleClickSelect = (strong) => {
    let TempOb = ob;
    TempOb[qNum][option] = strong;
    setOpen(false);
    setOb(TempOb);
    console.log(ob);
  };

  return (
    <div className="flex flex-col gap-8  ">
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className="absolute outline-none w-[300px] py-4   px-2 md:px-6  shadow-lg bg-[white] border border-black/20 top-[5%]   left-[50%] -translate-x-[50%]">
          <p className="text-gray-600 text-sm italic text-center underline">
            Select How Strongly Do You Agree The Statement
          </p>
          <div className="flex my-4 justify-between gap-2">
            <div
              className="bg-orange-500  text-center text-sm py-2 text-white rounded-md font-semibold px-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200"
              onClick={() => handleClickSelect(1)}
            >
              Minimally
            </div>
            <div
              className="bg-green-300  text-center text-sm py-2 text-white rounded-md font-semibold px-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200"
              onClick={() => handleClickSelect(2)}
            >
              Moderately
            </div>
            <div
              className="bg-green-600  text-center text-sm py-2 text-white rounded-md font-semibold px-2 cursor-pointer hover:scale-105 transition-all ease-in-out duration-200"
              onClick={() => handleClickSelect(3)}
            >
              Strongly
            </div>
          </div>
        </div>
      </Modal>
      {onGoing?.testResp[text]?.map((item, index) => (
        <>
          <div className="flex flex-col text-sm gap-5 text-gray-700 italic md:gap-1">
            <div className="flex text-start gap-2">
              {" "}
              <p className="font-semibold">Q{index + 1}. </p>
              <p className="font-semibold">{item[`q${index + 1}`]}</p>
            </div>
            <div
              className="flex gap-2 items-start  cursor-pointer"
              onClick={() => {
                handleClick(`q${index + 1}`, item, "a");
              }}
            >
              <p>-</p>
              <p
                className={`hover:underline !text-start ${
                  ob[`q${index + 1}`]["a"] == "1" && "text-orange-500"
                } ${ob[`q${index + 1}`]["a"] == "2" && "text-green-300"} ${
                  ob[`q${index + 1}`]["a"] == "3" && "text-green-500"
                } `}
              >
                {item[`a`]}
              </p>
            </div>
            <div
              className="flex gap-2 items-start  cursor-pointer"
              onClick={() => {
                handleClick(`q${index + 1}`, item, "b");
              }}
            >
              <p>-</p>
              <p
                className={`hover:underline !text-start ${
                  ob[`q${index + 1}`]["b"] == "1" && "text-orange-500"
                } ${ob[`q${index + 1}`]["b"] == "2" && "text-green-300"} ${
                  ob[`q${index + 1}`]["b"] == "3" && "text-green-500"
                } !text-start`}
              >
                {item[`b`]}
              </p>
            </div>
            <div
              className="flex gap-2 items-start  cursor-pointer"
              onClick={() => {
                handleClick(`q${index + 1}`, item, "c");
              }}
            >
              <p>-</p>
              <p
                className={`hover:underline !text-start ${
                  ob[`q${index + 1}`]["c"] == "1" && "text-orange-500"
                } ${ob[`q${index + 1}`]["c"] == "2" && "text-green-300"} ${
                  ob[`q${index + 1}`]["c"] == "3" && "text-green-500"
                }!text-start  `}
              >
                {item[`c`]}
              </p>
            </div>
          </div>
          <hr className="md:hidden" />
        </>
      ))}
      <button
        className="bg-green-500 text-white py-1.5  rounded-md"
        onClick={() => handleSubmit()}
      >
        Next
      </button>
    </div>
  );
};

export default Question;
