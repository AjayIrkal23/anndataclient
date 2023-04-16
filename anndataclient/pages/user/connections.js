import { AuthContext } from "@/Contexts/Auth";
import SecondNavbar from "@/components/SecondNavbar";
import SecondaryNav from "@/components/SecondaryNav";
import { getConversationAll } from "@/services/api";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";

const connections = () => {
  const [checked, setChecked] = useState(false);
  const [connections, setConnections] = useState(null);
  console.log(connections);
  const router = useRouter();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (Object.keys(user).length < 1) {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [user]);

  const getUserAll = async () => {
    let data = await getConversationAll({
      senderId: user.email,
      receiverId: user.email,
    });
    setConnections(data);
  };

  useEffect(() => {
    getUserAll();
  }, []);

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
        <title>My Connections</title>
      </Head>
      <div>
        <div className="my-6 mb-12">
          <h1 className="text-4xl text-gray-800 text-center font-nunito tracking-wide">
            My Connections
          </h1>
          <div className="w-20 h-1 mx-auto my-2 bg-blue-500 rounded-lg  mb-5" />
          <div className="flex justify-center md:flex-row md:space-x-12 space-y-16 flex-col text-center md:text-base">
            <div className="flex-[0.27] flex flex-col ">
              <div className="shadow-md">
                {" "}
                <SecondaryNav />
              </div>
            </div>

            {connections?.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {connections?.map((item) => (
                  <div>{item.id}</div>
                ))}
              </div>
            ) : (
              <div className="">
                <div className="flex flex-col items-center justify-center   space-y-6">
                  <div className="inline-flex p-3  border rounded-md border-black/10 space-x-4 items-center   bg-gray-100 ">
                    <div>
                      <img src="/env.png" alt="" className="w-12 h-12" />
                    </div>
                    <div className="flex flex-col pr-20 ">
                      <p className="text-sm font-bold text-gray-700 ">
                        Ready for a new match next week?
                      </p>
                      <p className="text-sm italic text-gray-600">
                        Let us know your availability
                      </p>
                    </div>
                    <div className="mx-3">
                      <button className="bg-[#29ABE2] py-1 px-4 text-sm hover:animate-pulse font-semibold text-white rounded-md">
                        Yes I'm In
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2 items-center justify-center">
                    <img src="/chat.png" alt="" className="w-10 h-10" />
                    <p className="text-lg font-semibold text-gray-800 capitalize">
                      We are finding the best match for you this week.
                    </p>
                  </div>
                  <div className="my-6 text-[15px] text-gray-500 font-semibold  capitalize">
                    We will introduce you two over email on Wednesday morning.
                  </div>
                  <div className="flex flex-col space-y-3">
                    {" "}
                    <img
                      src="https://assets.coffeemug.ai/assets/images/working-on-match.png"
                      alt=""
                      className=" h-56"
                    />
                    <p className="text-center text-gray-600 italic ">
                      No Active Connections Found
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-[0.27]">
              <div className="flex flex-col space-y-3 ">
                {" "}
                <img
                  src="https://assets.coffeemug.ai/assets/images/mfg-banner-m-bg.jpg"
                  alt=""
                  className=" h-56 bg-center"
                />
                <p className="text-center text-gray-600 italic ">
                  Grow With us by Meeting people axaxaxaxxxxxxxxxxxxxxxxx{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connections;
