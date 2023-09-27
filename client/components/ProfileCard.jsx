import Image from "next/image";
import React, { useContext } from "react";
import { Check, Point, Target, Thumbs, Tv } from "./svgs";
import { AuthContext } from "@/Contexts/Auth";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileCard = ({ item }) => {
  var encrypter = new (require("encrypter"))(process.env.NEXT_PUBLIC_KEY);
  const router = useRouter();

  const handleClick = (data) => {
    router.push({
      pathname: "/user/profile/profileDetails",

      query: {
        type: encrypter.encrypt(data?.type),
        email: encrypter.encrypt(data?.email),
      },
    });
  };

  return (
    <>
      {item && (
        <>
          {item?.type == "Member" && (
            <div className="bg-white border border-black/10 hover:border-[#29ABE2]  rounded-md ">
              <div className="p-5">
                <div>
                  <p className="text-[21px] font-nunito tracking-wide">
                    Would you like to meet{" "}
                    <span className="text-[#29ABE2]">{item?.name}</span> ?{" "}
                  </p>
                  <div className="bg-gray-100 rounded-md p-4 my-6 flex flex-col">
                    <div className="flex md:items-center md:space-x-2 md:w-full flex-col md:flex-row">
                      <div className="flex items-center justify-center gap-4 mb-3 md:mb-0 border-b border-b-black/10 pb-2 md:pb-0 md:border-none ">
                        <img
                          src={item.profilePic}
                          alt=""
                          className="w-14 h-14 rounded-full"
                        />
                        <div className="">
                          <div className="flex items-center gap-0.5 ">
                            <p className="text-gray-800 font-semibold">
                              {item?.name}
                            </p>
                            {item?.linkedIn != null && (
                              <Link target="_blank" href={item?.linkedIn}>
                                {" "}
                                <Image
                                  src="/linkedIn.svg"
                                  className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                                  width={20}
                                  height={20}
                                />
                              </Link>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 italic font-semibold">
                            {item.type}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item?.stage}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-8  border-b border-b-black/10 md:border-none justify-center pb-4 md:pb-0 ">
                        <div className="md:ml-12 text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Tv />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Role
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.role}
                          </p>
                        </div>
                        <div className=" text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Point />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Industry
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-6 ">
                      <p className="text-gray-600 italic text-sm">
                        {item.aboutMe}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-around md:text-sm md:flex-row flex-col text-xs">
                        {item?.userType && (
                          <div className="flex text-green-600 space-x-1 items-center gap-2">
                            <Check />
                            <p className="tracking-wide text-gray-700 ">
                              {item.userType}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="px-16 bg-blue-500 py-2.5 text-white rounded-md shadow-md border-2 border-blue-500 hover:bg-white hover:text-black font-semibold transition-all duration-300 ease-in-out font-nunito "
                  onClick={() => handleClick(item)}
                >
                  Express Interest{" "}
                </button>
              </div>
            </div>
          )}
          {item?.type == "Mentor" && (
            <div className="bg-white border border-black/10 hover:border-[#29ABE2]  rounded-md ">
              {console.log(item)}
              <div className="p-5">
                <div>
                  <p className="text-[21px] font-nunito tracking-wide">
                    Would you like to meet{" "}
                    <span className="text-[#29ABE2]">{item?.name}</span> ?{" "}
                  </p>
                  <div className="bg-gray-100 rounded-md p-4 my-6 flex flex-col">
                    <div className="flex md:items-center md:space-x-2 md:w-full flex-col md:flex-row">
                      <div className="flex items-center justify-center gap-4 mb-3 md:mb-0 border-b border-b-black/10 pb-2 md:pb-0 md:border-none ">
                        <img
                          src={
                            item?.profilePic ||
                            "https://assets.coffeemug.ai/assets/images/default-user.png"
                          }
                          alt=""
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-0.5">
                            <p className="text-gray-800 font-semibold">
                              {item.name}
                            </p>
                            {item?.linkedIn != null && (
                              <Link target="_blank" href={item?.linkedIn}>
                                <Image
                                  src="/linkedIn.svg"
                                  className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
                                  width={20}
                                  height={20}
                                />
                              </Link>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 italic font-semibold">
                            {item.type}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.companyAssociated}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-8  border-b border-b-black/10 md:border-none justify-center pb-4 md:pb-0">
                        <div className="md:ml-12 text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Tv />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Role
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.role}
                          </p>
                        </div>
                        <div className=" text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Point />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Industry
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-6 ">
                      <p className="text-gray-600 italic text-sm break-words max-w-[500px]">
                        {item.profileDetails}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-around md:text-sm flex-col text-xs md:flex-row">
                        <div className="flex text-green-600 space-x-1 items-center gap-2">
                          <Check />
                          <p className="tracking-wide text-gray-700 ">
                            {item.workExp}+ Years Experienced
                          </p>
                        </div>
                        <div className="flex text-green-600 space-x-1 items-center gap-2">
                          <Check />
                          <div>
                            {" "}
                            <p className="text-black">
                              {item.interest} Business
                            </p>
                          </div>
                        </div>
                        <div className="flex text-green-600 space-x-1 items-center gap-2">
                          <Check />
                          <p className="tracking-wide text-gray-700 ">
                            {item.fundingStage < 0
                              ? "Funding : No"
                              : "Funding : Yes"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="px-16 bg-blue-500 py-2.5 text-white rounded-md shadow-md border-2 border-blue-500 hover:bg-white hover:text-black font-semibold transition-all duration-300 ease-in-out font-nunito "
                  onClick={() => handleClick(item)}
                >
                  Express Interest{" "}
                </button>
              </div>
            </div>
          )}
          {item?.type == "Bank" && (
            <div className="bg-white border border-black/10 hover:border-[#29ABE2]  rounded-md ">
              <div className="p-5">
                <div>
                  <p className="text-[21px] font-nunito tracking-wide">
                    Would you like to meet{" "}
                    <span className="text-[#29ABE2]">{item.name}</span> ?{" "}
                  </p>
                  <div className="bg-gray-100 rounded-md p-4 my-6 flex flex-col">
                    <div className="flex md:items-center md:space-x-2 md:w-full flex-col md:flex-row">
                      <div className="flex items-center justify-center gap-4 mb-3 md:mb-0 border-b border-b-black/10 pb-2 md:pb-0 md:border-none ">
                        <img
                          src={item.profilePic}
                          alt=""
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-0.5">
                            <p className="text-gray-800 font-semibold">
                              {item.name}
                            </p>
                            <Image
                              src="/index.png"
                              className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out mx-0.5"
                              width={15}
                              height={15}
                            />
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            {item.type}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.state}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-8  border-b border-b-black/10 md:border-none justify-center pb-4 md:pb-0">
                        <div className="md:ml-12 text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Tv />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Role
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.role}
                          </p>
                        </div>
                        <div className=" text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Point />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Industry
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-6 ">
                      <p className="text-gray-600 italic text-sm">
                        {item.bankScheme}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-around text-sm">
                        <div className="flex text-green-600 space-x-1 items-center gap-2 text-xs md:text-base">
                          <img
                            src="/download.svg"
                            alt=""
                            className="w-5 h-5 "
                          />
                          {item?.documentFile != null && (
                            <Link href={item?.documentFile} target="_blank">
                              <p className="tracking-wide text-gray-700 underline italic cursor-pointer">
                                Check Our Bank Scheme Here
                              </p>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="px-16 bg-blue-500 py-2.5 text-white rounded-md shadow-md border-2 border-blue-500 hover:bg-white hover:text-black font-semibold transition-all duration-300 ease-in-out font-nunito "
                  onClick={() => handleClick(item)}
                >
                  Express Interest{" "}
                </button>
              </div>
            </div>
          )}
          {item?.type == "Marketing" && (
            <div className="bg-white border border-black/10 hover:border-[#29ABE2]  rounded-md ">
              <div className="p-5">
                <div>
                  <p className="text-[21px] font-nunito tracking-wide">
                    Would you like to meet{" "}
                    <span className="text-[#29ABE2]">{item?.name}</span> ?{" "}
                  </p>
                  <div className="bg-gray-100 rounded-md p-4 my-6 flex flex-col">
                    <div className="flex md:items-center md:space-x-2 md:w-full flex-col md:flex-row">
                      <div className="flex items-center justify-center gap-4 mb-3 md:mb-0 border-b border-b-black/10 pb-2 md:pb-0 md:border-none ">
                        {" "}
                        <img
                          src={item?.profilePic}
                          alt=""
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <div className="flex items-center gap-0.5">
                            <p className="text-gray-800 font-semibold">
                              {item?.name}
                            </p>
                            {item?.website != null && (
                              <Link target="_blank" href={item?.website}>
                                <Image
                                  src="/index.png"
                                  className="cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out mx-0.5"
                                  width={15}
                                  height={15}
                                />
                              </Link>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            {item.type}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.usertype}
                          </p>
                          <p className="text-sm text-gray-600 italic">
                            {item.state}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-8  border-b border-b-black/10 md:border-none justify-center pb-4 md:pb-0">
                        <div className="md:ml-12 text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Tv />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Role
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.role}
                          </p>
                        </div>
                        <div className=" text-[#29ABE2]">
                          <div className="flex justify-center w-full">
                            <Point />
                          </div>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            Industry
                          </p>
                          <p className="text-[12px] leading-4 text-center italic text-gray-600 font-semibold">
                            {item.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-6 ">
                      <p className="text-gray-600 italic text-sm">
                        {item.previousWork}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-around md:text-sm flex-col text-xs md:flex-row">
                        {item.servicesOffered.split(",").map(
                          (word, i) =>
                            i > 0 && (
                              <div className="flex text-green-600 space-x-1 items-center gap-2">
                                <Check />
                                <p className="tracking-wide text-gray-700 ">
                                  {word}
                                </p>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="px-16 bg-blue-500 py-2.5 text-white rounded-md shadow-md border-2 border-blue-500 hover:bg-white hover:text-black font-semibold transition-all duration-300 ease-in-out font-nunito "
                  onClick={() => handleClick(item)}
                >
                  Express Interest{" "}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileCard;
