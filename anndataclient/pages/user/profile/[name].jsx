import { AuthContext } from "@/Contexts/Auth";
import { setConversation } from "@/services/api";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Name = () => {
  const router = useRouter();
  const name = router?.query?.name;
  const { user, person, setperson } = useContext(AuthContext);
  const [profile, setProfile] = useState();
  console.log(profile);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };

  const getUser = async (item) => {
    setperson(profile);
    await setConversation({
      senderId: user?.email,
      receiverId: profile?.email,
      ReType: name?.split(" ")[1],
      Setype: user?.type,
    });

    router.push({
      pathname: "/user/chat",
      query: {
        text: "Hello, I am Interested to Share My Knowledge with you And Work With You ",
        active: true,
      },
    });
  };

  const getData = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: name?.split(" ")[0],
          type: name?.split(" ")[1],
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
  }, [name]);

  return (
    <div className="py-6 max-w-5xl mx-auto">
      <div className="flex justify-around gap-6">
        <div className="border basis-3/4 w-full  flex flex-col rounded-md">
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
            <div></div>
          </div>
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
                    Interest
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
                onClick={getUser}
              >
                <p>Connect Now </p>
              </button>
            </div>
          </div>
        </div>
        <div className="basis-1/4 flex flex-col justify-between items-center w-full ">
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
          <div className="border p-2 flex flex-col justify-center items-center w-full space-y-3 rounded-md cursor-pointer hover:shadow-xl shadow-blue-200 transition-all duration-200 ease-in-out ">
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

export default Name;
