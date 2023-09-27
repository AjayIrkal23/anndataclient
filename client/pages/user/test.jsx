import { AuthContext } from "@/Contexts/Auth";
import SecondNavbar from "@/components/SecondNavbar";
import SecondaryNav from "@/components/SecondaryNav";
import { getConversationAll } from "@/services/api";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import ReactPlayer from "react-player";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "@mui/material";
import Question from "@/components/Question";
import Question2 from "@/components/Question2";
import Image from "next/image";

const test = () => {
  const { user } = useContext(AuthContext);
  const [past, setPast] = useState([]);

  const [live, setLive] = useState(null);
  const [test, setTest] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [stageOne, setStageOne] = useState(true);
  const [takeTest, setTakeTest] = useState(null);
  const [result, setResult] = useState(null);
  const [onGoing, setOnGoing] = useState(null);
  const [page2, setPage2] = useState(false);
  let arr = [];
  console.log(result);
  console.log(test);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const getTests = async () => {
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_URL}/api/getTests`,
          {
            email: user?.email,
          },
          { headers: headers }
        )
        .then(({ data }) => {
          let arr = [];
          console.log(data.test);
          data?.test?.map((item) => {
            if (item.state) {
              if (item.page == 2) {
                setPage2(true);
              }
              setOnGoing(item);
            } else {
              arr.push(item);
            }
          });
          setPast(arr);
        });
    }
  };

  const CheckAndStart = async () => {
    if (user) {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_URL}/api/CheckActive`,
          {
            email: user?.email,
          },
          { headers: headers }
        )
        .then((resp) => {
          console.log(resp);
          if (resp.status == 202) {
            toast.dismiss();
            toast.error("Please Complete The Existing Test");
          } else if (resp.status == 200) {
            showRazorPay();
          }
        });
    }
  };

  useEffect(() => {
    getTests();
  }, [user, open]);

  const showRazorPay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      HandlePayment();
    };
  };

  const HandlePayment = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/startTest`,
      {
        email: user?.email,
      },
      { headers: headers }
    );

    const options = {
      key: "rzp_test_L36esytYvjRbfR",
      amount: res?.data?.amount,
      currency: res?.data?.currency,
      name: "Aandata.Guru",
      description: "Test Transaction",
      order_id: res?.data?.id,
      handler: async function (response) {
        toast.success(`Payment Success`);
        axios
          .post(
            `${process.env.NEXT_PUBLIC_URL}/api/createTest`,
            {
              email: user?.email,
            },
            { headers: headers }
          )
          .then((resp) => {
            setTest(resp.data.data);
            getTests();
            setOpen(true);
          });
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#39B54A",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      toast.error(`${response?.error?.description} ${response.error.reason}`, {
        duration: 8000,
      });
    });
  };
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("English");

  const router = useRouter();

  const lan = ["English", "Hindi", "Kannada"];

  useEffect(() => {
    if (Object.keys(user).length < 1) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [user]);

  if (!checked)
    return (
      <div className="flex justify-center">
        <Blocks
          height="200"
          width="200"
          color="blue"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <>
      <Head>
        <title>Psychometric Test</title>
      </Head>
      <div>
        {takeTest ? (
          <div className="my-6 mb-12">
            <div className="flex justify-center md:flex-row md:space-x-12 gap-16 flex-col px-6 text-center md:text-base">
              <div className="flex-[0.35] flex flex-col ">
                <div className="w-full">
                  {" "}
                  <SecondaryNav />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col items-center justify-center">
                  <div className="shadow-md my-3">
                    <Image src="/s.webp" width={180} height={180} />
                  </div>{" "}
                  <h1 className="text-4xl text-gray-800 text-center  tracking-wide font-nunito">
                    Psychometric Test
                  </h1>
                </div>
                <div className="w-20 h-1 mx-auto my-2 bg-blue-500 rounded-lg  mb-5" />
                <div className="">
                  <p className="text-center italic text-gray-600 text-sm my-3">
                    You Need to Pay An Token Amount 299/- To Take The Test
                  </p>
                </div>
                <div className="w-full text-[18px] font-nunito text-gray-700 my-3 underline">
                  Past Test Results
                </div>
                {past?.length > 0 ? (
                  <>
                    {past?.map((item) => (
                      <div
                        className=""
                        onClick={() => {
                          setResult(item.testResp);
                          setOpen1(true);
                        }}
                      >
                        <div className="p-1 ">
                          <div className="border rounded-md border-[#f57424]  py-4 px-6 shadow-md cursor-pointer relative">
                            <p className="text-gray-600 font-semibold tracking-wide">
                              Swayam Ref ID
                            </p>
                            <p className="text-sm italic text-gray-500">
                              {item.swayamRef}
                            </p>
                            <div className="flex justify-between my-1">
                              <div>
                                <p className="text-gray-500 font-semibold">
                                  Date
                                </p>
                                <p className="italic text-gray-500 text-sm">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500 font-semibold">
                                  Test Physiology
                                </p>
                                <p className="italic text-gray-500 text-sm">
                                  {item.testResp.physiology
                                    ? item.testResp.physiology
                                    : "Result Pending"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-gray-700  italic my-6">
                    No Past Tests Found
                  </div>
                )}
                <div className="w-full text-[18px] font-nunito text-gray-700 my-3 underline">
                  On Going Test
                </div>
                {onGoing ? (
                  <div className="" onClick={() => setOpen(true)}>
                    <div className="p-1 ">
                      <div className="border rounded-md border-[#f57424]  py-4 px-6 shadow-md cursor-pointer relative">
                        <p className="text-gray-600 font-semibold tracking-wide">
                          Swayam Ref ID
                        </p>
                        <p className="text-sm italic text-gray-500">
                          {onGoing?.swayamRef}
                        </p>
                        <div className="flex justify-between my-1">
                          <div>
                            <p className="text-gray-500 font-semibold">Date</p>
                            <p className="italic text-gray-500 text-sm">
                              {new Date(
                                onGoing?.createdAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500 font-semibold">State</p>
                            <p className="italic text-gray-500 text-sm">
                              {onGoing?.physiology
                                ? onGoing?.physiology
                                : "Result Pending"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div className="p-1 ">
                      <div className="border rounded-md border-[#f57424]  py-4 px-6 shadow-md cursor-pointer">
                        <p className="text-gray-600 font-semibold tracking-wide">
                          No Active Tests Found
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 mt-3">
                  <button
                    className="bg-blue-500 text-white shadow-md  py-1.5 w-full rounded-md  font-semibold"
                    onClick={() => CheckAndStart()}
                  >
                    Take The Test
                  </button>
                  <button
                    className="bg-green-500 text-white shadow-md  py-1.5 w-full rounded-md  font-semibold"
                    onClick={() => setTakeTest(false)}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-6 mb-12">
            <div className="flex justify-center md:flex-row md:space-x-12 gap-16 flex-col px-6 text-center md:text-base">
              <div className="flex-[0.27] flex flex-col ">
                <div className="">
                  {" "}
                  <SecondaryNav />
                </div>
              </div>
              <div className="">
                <div className="flex flex-col items-center justify-center">
                  <div className="shadow-md my-3">
                    <Image src="/s.webp" width={180} height={180} />
                  </div>{" "}
                  <h1 className="text-4xl text-gray-800 text-center  tracking-wide font-nunito">
                    Psychometric Test
                  </h1>
                </div>
                <div className="w-20 h-1 mx-auto my-2 bg-blue-500 rounded-lg  mb-5" />
                <p className="text-center italic text-gray-600 text-sm my-3">
                  Please Watch The Complete Guide About The Test Before Taking
                  it.
                </p>
                {value == "English" && (
                  <>
                    {" "}
                    <div className="player-wrapper md:hidden">
                      <ReactPlayer
                        className="react-player"
                        url="https://youtu.be/7kozfFPKwjE"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <ReactPlayer
                      className="hidden md:inline-block"
                      url="https://youtu.be/7kozfFPKwjE"
                    />
                  </>
                )}
                {value == "Kannada" && (
                  <>
                    {" "}
                    <div className="player-wrapper md:hidden">
                      <ReactPlayer
                        className="react-player"
                        url="https://youtu.be/e-Dp0YZe65A"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <ReactPlayer
                      className="hidden md:inline-block"
                      url="https://youtu.be/e-Dp0YZe65A"
                    />
                  </>
                )}
                {value == "Hindi" && (
                  <>
                    {" "}
                    <div className="player-wrapper md:hidden">
                      <ReactPlayer
                        className="react-player"
                        url="https://youtu.be/l7I0_ZG2Q-E"
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <ReactPlayer
                      className="hidden md:inline-block"
                      url="https://youtu.be/l7I0_ZG2Q-E"
                    />
                  </>
                )}

                <div className="flex w-full justify-between items-center md:gap-6 gap-2 my-2">
                  {lan.map((item) => (
                    <div
                      className={`${
                        value == item
                          ? "bg-blue-500 text-white"
                          : "border border-black/20 text-black"
                      } w-full py-2 px-4  border cursor-pointer`}
                      onClick={() => setValue(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div>
                  <button
                    className="bg-green-500 text-white shadow-md  py-1.5 w-full rounded-md animate-pulse font-semibold"
                    onClick={() => setTakeTest(true)}
                  >
                    Take The Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal open={open} onClose={(e) => {}}>
          <div className="absolute outline-none md:w-[90%] w-full px-2 md:px-6  shadow-lg bg-[white] border border-black/20 top-[5%]   left-[50%] -translate-x-[50%] md:h-auto h-[600px] overflow-scroll">
            <div className="text-center flex flex-col gap-1  mt-6">
              <div className=" my-3">
                <Image
                  src="/s.webp"
                  className="mx-auto shadow-md"
                  width={180}
                  height={180}
                />
              </div>{" "}
              <h3 className="test-gray-700 text-lg font-nunito italic ">
                {page2
                  ? "Swayam Psychological Test - Short"
                  : " Swayam Physiological Test - Short"}
              </h3>
              <div>
                {" "}
                <p className="md:text-sm text-xs italic text-gray-500 ">
                  Please Do Not Close The Window Before Completing The Whole
                  Assessment
                </p>
                <p className="md:text-sm text-xs italic text-gray-500 ">
                  You Cannot Close The Window Without Completing The Test
                </p>
                <div className="flex items-center gap-2 text-black justify-center text-center mt-4 md:text-lg">
                  <p className=" italic  text-black">Swayam Ref ID</p>
                  <p className=" italic  ">-</p>
                  <p className=" italic ">{onGoing?.swayamRef}</p>
                </div>
                <div className="flex items-center gap-2 text-black justify-center text-center mb-4 md:text-lg">
                  <p className=" italic  text-black">Page</p>
                  <p className=" italic  ">-</p>
                  <p className=" italic ">{onGoing?.page}</p>
                </div>
                <div className="my-3 w-full h-[1px] bg-black/20 shadow-md" />
                <div className=" overflow-scroll max-h-[400px]">
                  {page2 ? (
                    <div>
                      <Question
                        onGoing={onGoing}
                        setOnGoing={setOnGoing}
                        setPage2={setPage2}
                        arr={arr}
                        page2={page2}
                        getTests={getTests}
                        setOpen1={setOpen}
                        headers={headers}
                        rText="psychology_response"
                        text="psychology_assessment"
                      />
                    </div>
                  ) : (
                    <div>
                      <Question2
                        onGoing={onGoing}
                        setOnGoing={setOnGoing}
                        setPage2={setPage2}
                        setOpen1={setOpen}
                        page2={page2}
                        arr={arr}
                        getTests={getTests}
                        headers={headers}
                        rText="physiology_response"
                        text="physiology_assessment"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal open={open1} onClose={(e) => setOpen1(false)}>
          <div className="absolute outline-none md:w-[90%] w-full px-2 md:px-6  shadow-lg bg-[white] border border-black/20 top-[5%]   left-[50%] -translate-x-[50%] h-[600px] overflow-scroll">
            <div className="text-center flex flex-col gap-3 my-2 mt-6">
              <div className="flex flex-col items-center justify-center">
                <div className="shadow-md my-3">
                  <Image src="/s.webp" width={180} height={180} />
                </div>{" "}
                <h1 className="text-4xl text-gray-800 text-center  tracking-wide font-nunito">
                  Psychometric Test
                </h1>
              </div>
              <div>
                {" "}
                <p className="md:text-sm text-xs italic text-gray-500 ">
                  Note That These Are Post Test Results
                </p>
                <div className="flex items-center gap-2 text-black justify-center text-center pt-4 md:text-lg mb-4">
                  <p className=" italic  text-black">Swayam Ref ID</p>
                  <p className=" italic  ">-</p>
                  <p className=" italic ">{result?.swayam_ref}</p>
                </div>
                <hr />
                <div className="  text-center md:text-start flex flex-col gap-5 md:text-base sm:text-sm text-xs justify-center md:justify-start">
                  <div className="flex text-gray-700 md:flex-row flex-col  items-start gap-2 ">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      physiology
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic md:flex-[0.7]">{result?.physiology}</p>
                  </div>
                  <div className="flex text-gray-700  items-start gap-2 md:flex-row flex-col">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      physiology attribute
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic flex-[0.7]">
                      {result?.physiology_attribute}
                    </p>
                  </div>
                  <div className="flex text-gray-700  items-start gap-2 md:flex-row flex-col">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      physiology nature
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic md:flex-[0.7]">
                      {result?.physiology_nature}
                    </p>
                  </div>
                  <div className="flex text-gray-700  items-start gap-2 md:flex-row flex-col">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      psychology
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic md:flex-[0.7] ">
                      {result?.psychology}
                    </p>
                  </div>
                  <div className="flex text-gray-700  items-start gap-2 md:flex-row flex-col">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      psychology attribute
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic md:flex-[0.7]">
                      {result?.psychology_attribute}
                    </p>
                  </div>
                  <div className="flex text-gray-700  items-start gap-2 md:flex-row flex-col">
                    <p className="font-semibold uppercase md:flex-[0.2] underline">
                      psychology nature
                    </p>
                    <p className="md:inline-block hidden">:</p>
                    <p className="italic md:flex-[0.7]">
                      {result?.psychology_nature}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default test;
