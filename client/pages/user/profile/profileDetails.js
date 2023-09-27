import { AuthContext } from "@/Contexts/Auth";
import { setConversation } from "@/services/api";
import { Modal } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const User = () => {
  const encrypter = new (require("encrypter"))(process.env.NEXT_PUBLIC_KEY);
  const router = useRouter();

  const data = router?.query;

  const { user, person, setperson } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  const [timemap, setTimemap] = useState([]);
  const [Day, setDayToMap] = useState([]);
  const [timeSet, setTimeSet] = useState();
  const [daySet, setDaySet] = useState();
  const [open, setOpen] = useState(false);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };

  const getUser = async (item) => {
    if (timeSet && daySet) {
      setperson(profile);
      await setConversation({
        senderId: user?.email,
        receiverId: profile?.email,
        meetingTime: timeSet,
        meetingDate: daySet,
        ReType: data && encrypter?.decrypt(data.type),
        Setype: user?.type,
      });
      setOpen(false);
      router.push({
        pathname: "/user/chat",
        query: {
          text: "Hello, I am Interested to Share My Knowledge with you And Work With You ",
          active: true,
        },
      });
    } else {
      toast.error("Slots Full or Not Selected!");
    }
  };

  useEffect(() => {
    user && getReady();
  }, [user]);

  console.log(data);

  const getReady = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/users/single`,
        {
          email: data && encrypter?.decrypt(data.email),
        },
        { headers: headers }
      )
      .then(({ data }) => {
        setDayToMap([
          { day: data?.day1, av: data?.dt1 },
          { day: data?.day2, av: data?.dt2 },
          { day: data?.day3, av: data?.dt3 },
        ]);
        setTimemap([data.Time1, data.Time2, data.Time3]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getData = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: data && encrypter?.decrypt(data.email),
          type: data && encrypter?.decrypt(data.type),
        },
        { headers: headers }
      )
      .then((res) => {
        setProfile(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="py-6 max-w-5xl mx-auto">
      <div className="flex justify-around gap-6">
        <div className="border md:basis-3/4 w-full  flex flex-col rounded-md">
          <div className="border-b flex items-center gap-1">
            <div className="p-2">
              <img
                src={
                  profile?.profilePic ||
                  "https://assets.coffeemug.ai/assets/images/default-user.png"
                }
                className="w-20 h-20 rounded-full object-cover    "
                alt=""
              />
            </div>
            <div className="max-w-[50%] min-w-[30%]">
              <p className="font-semibold text-gray-700 text-lg font-nunito">
                {profile?.name}
              </p>
              <p className="text-xs text-gray-600">
                {profile?.companyAssociated ||
                  profile?.stage ||
                  profile?.usertype}
              </p>
              <p className="text-xs text-gray-700 font-semibold">
                {profile?.state}
              </p>
            </div>

            {profile?.linkedIn && (
              <div className="flex ml-auto mr-6 flex-col justify-center items-center p-1">
                <div className="flex gap-1 ">
                  {" "}
                  <Link href={`${profile?.linkedIn || profile?.website}`}>
                    <Image
                      src="/link.png"
                      className="rounded-md hover:shadow-xl hover:scale-105 cursor-pointer transition-all duration-200 ease-in-out hover:opacity-90 shadow"
                      width={30}
                      height={30}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            )}
          </div>
          {profile && (
            <div className="py-6 flex justify-evenly p-12 space-x-8">
              <div className="basis-1/3">
                <div className="flex gap-1 items-center mb-4">
                  <Image src="/applicant.png" width={20} height={20} alt="" />
                  <p className="text-xs font-semibold tracking-wide  text-black ">
                    {(profile?.knowledgeFarming && "Knowledge Farming") ||
                      (profile?.fundingStage && "Funding") ||
                      (profile?.additionalContact1 && "Additional Contact") ||
                      (profile?.servicesOffered && "Services Offered")}
                  </p>
                </div>
                <ul className={`list-disc text-xs  space-y-4 italic`}>
                  {profile?.servicesOffered ? (
                    profile?.servicesOffered
                      .split(",")
                      .map((item, i) => i > 0 && <li>{item}</li>)
                  ) : profile?.fundingStage ? (
                    <li>Upto {profile?.fundingStage} INR</li>
                  ) : (
                    <li>
                      {profile?.knowledgeFarming ||
                        (profile?.funding &&
                          `Upto ${profile?.fundingStage} INR`) ||
                        profile?.additionalContact1}
                    </li>
                  )}
                </ul>
              </div>
              {!profile?.servicesOffered && (
                <div className="basis-1/3">
                  <div className="flex gap-1 items-center mb-4">
                    <Image src="/diamond.png" width={20} height={20} alt="" />
                    <p className="text-xs font-semibold tracking-wide  text-black ">
                      {(profile?.learningAbout && "Learning About") ||
                        (profile?.workExp && "Work Experience") ||
                        (profile?.additionalContact2 && "Additional Contact")}
                    </p>
                  </div>
                  <ul className="list-disc text-xs space-y-4 italic">
                    <li>
                      {profile?.learningAbout ||
                        (profile?.workExp && `${profile?.workExp}+ Years`) ||
                        profile?.additionalContact2}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
          <div>
            <p className="p-4 text-xs text-gray-600">
              {profile?.aboutMe ||
                profile?.profileDetails ||
                profile?.bankScheme ||
                profile?.previousWork}
            </p>
            {profile?.imagesVideos && (
              <Link target="_blank" href={`${profile?.imagesVideos}`}>
                <p className="p-4 text-xs text-gray-600 text-center underline italic ">
                  {profile?.imagesVideos &&
                    "Click Here to View Our Previous Work"}
                </p>
              </Link>
            )}
            {profile?.documentFile && (
              <Link target="_blank" href={`${profile?.documentFile}`}>
                <p className="p-4 text-xs text-gray-600 text-center underline italic ">
                  {profile?.documentFile &&
                    "Click Here to View Our Previous Work"}
                </p>
              </Link>
            )}
          </div>
          <div>
            <div className="py-6">
              <div className="flex justify-center text-center ">
                {profile?.interest ||
                  (profile?.usertype && (
                    <div>
                      {" "}
                      <p className="font-semibold px-4 text-gray-600 tracking-wide my-1  ">
                        Interest
                      </p>
                      <div className="px-4 text-[10px] flex gap-5 text-[#29ABE2]">
                        <p className="border border-[#29ABE2] px-3 py-0.5">
                          {profile?.interest || profile?.usertype}
                        </p>
                      </div>
                    </div>
                  ))}
                <div>
                  {" "}
                  <p className="font-semibold px-4 text-gray-600 tracking-wide my-1  ">
                    Role
                  </p>
                  <div className="px-4 text-[10px] flex gap-5 text-[#29ABE2]">
                    <p className="border border-[#29ABE2] px-3 py-0.5">
                      {profile?.role}
                    </p>
                  </div>
                </div>
                <div>
                  {" "}
                  <p className="font-semibold px-4 text-gray-600 tracking-wide my-1  ">
                    Industry
                  </p>
                  <div className="px-4 text-[10px] flex gap-5 text-[#29ABE2]">
                    <p className="border border-[#29ABE2] px-3 py-0.5">
                      {profile?.industry}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end  px-6 pb-6 ">
              <button
                className="bg-[#29ABE2] text-white px-4 rounded-md shadow-md py-1 hover:scale-105 transition-all duration-200 ease-in-out"
                onClick={() => setOpen(true)}
              >
                <p>Connect Now </p>
              </button>
              <Modal open={open} onClose={() => setOpen(false)}>
                <div className="absolute left-[50%] -translate-x-[50%] rounded-md   bg-white outline-none  top-[10%] p-4">
                  <div className="flex flex-col items-center ">
                    <div>
                      <h1 className="text-gray-600 italic text-sm md:text-base px-3  font-semibold">
                        Select Your Available Time and Day
                      </h1>
                      <p className="text-center py-4 text-gray-600 italic ">
                        Select Time{" "}
                      </p>
                      <div className="flex gap-3 flex-wrap justify-center">
                        {timemap.map((item) => (
                          <div
                            className={`text-sm hover:bg-blue-500 ${
                              timeSet == item && "!bg-blue-500 !text-white"
                            } px-4 py-1.5 rounded-md cursor hover:text-white font-semibold border-blue-500 bg-white border shadow-md  cursor-pointer`}
                            onClick={() => setTimeSet(item)}
                          >
                            <p>{item}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-600 text-xs text-center py-4">
                        Click On The Time To Select
                      </p>

                      <div>
                        <p className="text-center py-4 text-gray-600 italic ">
                          Select Day{" "}
                        </p>
                        <div className="flex gap-3 flex-wrap justify-center">
                          {Day.map((item, i) =>
                            !item.av ? (
                              <div
                                className={`text-sm hover:bg-blue-500 ${
                                  daySet == item.day &&
                                  "!bg-blue-500 !text-white"
                                } px-4 py-1.5 rounded-md cursor hover:text-white font-semibold border-blue-500 bg-white border shadow-md  cursor-pointer`}
                                onClick={() => setDaySet(item.day)}
                              >
                                <p>{item.day}</p>
                              </div>
                            ) : (
                              <div
                                className={`text-sm hover:bg-red-500 ${
                                  daySet == item && "!bg-red-500 !text-white"
                                } px-4 py-1.5 rounded-md cursor hover:text-white font-semibold border-red-500 bg-white border shadow-md  cursor-pointer`}
                              >
                                <p>Full</p>
                              </div>
                            )
                          )}
                        </div>
                        <p className="text-gray-600 text-xs text-center py-4">
                          Click On The Time To Select
                        </p>
                        <p className="text-gray-600 text-xs text-center ">
                          If the slots are taken please try again next day or
                          week
                        </p>
                      </div>
                      <p
                        onClick={(e) => getUser()}
                        className="bg-blue-500  text-white py-1.5 w-[100px] text-center mx-auto rounded-md shadow-md font-semibold hover:animate-pulse cursor-pointer mt-6 "
                      >
                        Confirm
                      </p>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div className="basis-1/4  flex-col justify-between items-center w-full   hidden md:flex">
          <div className="border p-2 flex flex-col justify-center items-center w-full space-y-3 rounded-md cursor-pointer hover:shadow-xl shadow-blue-200 transition-all duration-200 ease-in-out ">
            <Image src="/s.png" width={120} height={120} alt="p-4" />
            <p className="text-gray-600 font-semibold ">Discover Members</p>
            <p className="text-xs text-center  text-gray-600">
              Discover members you might meet through CoffeeMug. We'd love to
              make the right intros for you.
            </p>
            <p className="my-3 text-xs text-[#29ABE2] hover:underline">
              Learn More
            </p>
          </div>
          <div className="border p-2 flex flex-col justify-center items-center w-full space-y-3 rounded-md cursor-pointer hover:shadow-xl shadow-blue-200 transition-all duration-200 ease-in-out mt-3">
            <Image src="/invitation.png" width={120} height={120} alt="p-4" />
            <p className="text-gray-600 font-semibold ">Invite Friends</p>
            <p className="text-xs text-center  text-gray-600">
              We need innovators and disruptors. Know someone who fits the bill?
              Invite them to apply and be a part of the network.
            </p>
            <p className="my-3 text-xs text-[#29ABE2] hover:underline">
              Learn More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
