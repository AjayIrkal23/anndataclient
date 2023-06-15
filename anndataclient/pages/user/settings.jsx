import { AuthContext } from "@/Contexts/Auth";
import SecondaryNav from "@/components/SecondaryNav";
import { Edit } from "@/components/svgs";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Blocks } from "react-loader-spinner";

const settings = () => {
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);
  const [learn, setLearn] = useState();
  const [knowledge, setKnowledge] = useState();
  const [profile, setProfile] = useState();
  console.log(knowledge, learn);
  const [locationValue, setLocationValue] = useState(null);
  const [edit, setEdit] = useState(false);
  const [edit1, setEdit1] = useState(false);
  const [desActive, setDescActive] = useState(false);

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const desc = useRef();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const getData = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: user.email,
          type: user.type,
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

  const handleUpload1 = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          bankScheme: desc?.current?.value,
          aboutMe: desc?.current?.value,
          profileDetails: desc?.current?.value,
          previousWork: desc?.current?.value,
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((response) => {
        setDescActive(false);
        getData();
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  const handleUpload2 = async () => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          knowledgeFarming: knowledge ? knowledge : profile.knowledgeFarming,
          learningAbout: learn ? learn : profile.learningAbout,
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  const handleUpload = async (data) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          dob: data?.dob?.length > 1 ? data?.dob : profile.dob,
          zipCode: data?.zipCode?.length > 1 ? data?.zipCode : profile.zipCode,
          additionalContact1:
            data?.additionalContact1?.length > 1
              ? data?.additionalContact1
              : profile.additionalContact1,
          state: data?.state?.length > 1 ? data?.state : profile.state,
          website: data?.website?.length > 1 ? data?.website : profile.website,
          additionalContact2:
            data?.additionalContact2?.length > 1
              ? data?.additionalContact2
              : profile.additionalContact2,
          linkedIn:
            data?.linkedIn?.length > 1 ? data?.linkedIn : profile.linkedIn,
          phoneNumber:
            data?.phoneNumber?.length > 1
              ? data?.phoneNumber
              : profile.phoneNumber,
          district:
            data?.district?.length > 1 ? data?.district : profile.district,
          usp: data?.usp?.length > 1 ? data?.usp : profile.usp,
          workExp: data?.workExp?.length > 1 ? data?.workExp : profile.workExp,
          learn: data?.learn?.length > 1 ? data?.learn : profile.learn,
          knowledge:
            data?.knowledge?.length > 1 ? data?.knowledge : profile.knowledge,
          knowledgeFarming:
            data?.knowledgeFarming?.length > 1
              ? data?.knowledgeFarming
              : profile.knowledgeFarming,
          taluk:
            data?.talukcountry?.length > 1 ? data?.talukcountry : profile.taluk,
          country:
            data?.talukcountry?.length > 1
              ? data?.talukcountry
              : profile.country,
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((response) => {
        getData();
        handleUpload2();
        toast.success("Data uploaded Successfully");
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getData();
  }, []);

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
        <title>Settings</title>
      </Head>
      <div className="">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <div>
            <div>
              <h1 className="md:text-4xl text-3xl text-center font-nunito tracking-wide  mt-6 md:mt-0">
                Your Profile
              </h1>
              <div className="w-20 h-1 mx-auto my-2 bg-blue-500 rounded-lg" />
              <div className="flex justify-center items-center my-6  font-nunito text-lg gap-2">
                <Edit />
                <p className="mt-1 text-[#29ABE2] font-semibold">
                  {" "}
                  Manage your Membership details
                </p>
              </div>
              <div className="my-3 max-w-5xl  mx-auto mt-20 md:mt-0">
                <div className="flex md:space-x-6 md:flex-row flex-col">
                  <div className="basis-2/5    ">
                    <div className="flex flex-col relative items-center  space-y-7   justify-center">
                      <div className="flex min-w-[400px] p-4 items-center border justify-center shadow-black/20 rounded-md shadow-lg  flex-col">
                        <img
                          src={
                            profile?.profilePic ||
                            "https://assets.coffeemug.ai/assets/images/default-user.png"
                          }
                          className="rounded-full  w-20 h-20 absolute -top-10 "
                          alt=""
                        />
                        <div className="mb-4 flex flex-col space-y-0.5  mt-14 text-center">
                          <p className="text-center  font-nunito font-semibold text-gray-700">
                            {profile?.name}
                          </p>
                          <p className="text-gray-500 italic text-sm tracking-wide text-center">
                            {user.type}
                          </p>
                        </div>
                        <div className="flex gap-1 p-4">
                          {desActive ? (
                            <textarea
                              name=""
                              ref={desc}
                              className="border p-1 rounded-md shadow-md border-black/20 outline-none text-sm "
                              id=""
                              defaultValue={
                                (user?.type == "Bank" && profile?.bankScheme) ||
                                (user?.type == "Member" && profile?.aboutMe) ||
                                (user?.type == "Mentor" &&
                                  profile?.profileDetails) ||
                                (user?.type == "Marketing" &&
                                  profile?.previousWork)
                              }
                              cols="30"
                              rows="10"
                            />
                          ) : (
                            <div className="">
                              <p className="text-sm text-gray-600 italic">
                                {user?.type == "Bank" && profile?.bankScheme}
                                {user?.type == "Member" && profile?.aboutMe}
                                {user?.type == "Mentor" &&
                                  profile?.profileDetails}
                                {user?.type == "Marketing" &&
                                  profile?.previousWork}
                              </p>
                            </div>
                          )}
                          <div className="">
                            {desActive ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                onClick={() => handleUpload1()}
                                className="w-5 h-5 text-[#29ABE2] hover:bg-gray-200 rounded-md cursor-pointer "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                onClick={() => setDescActive(!desActive)}
                                className="w-5 h-5 text-[#29ABE2] hover:bg-gray-200 rounded-md cursor-pointer "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="my-3 flex space-x-4 flex-wrap  justify-start">
                          {user.type == "Marketing" ? (
                            profile?.servicesOffered
                              ?.split(",")
                              .map(
                                (item, i) =>
                                  i > 0 && (
                                    <div className="text-[#29ABE2] cursor-pointer hover:bg-[#29ABE2] hover:text-white border border-[#29ABE2] text-xs py-1 px-4 transition-all duration-200 ease-in-out">
                                      {item}
                                    </div>
                                  )
                              )
                          ) : (
                            <div className="text-[#29ABE2] cursor-pointer hover:bg-[#29ABE2] hover:text-white border border-[#29ABE2] text-xs py-1 px-4 transition-all duration-200 ease-in-out">
                              {user?.type == "Bank" && (
                                <Link
                                  href={`${profile?.documentFile}`}
                                  className=""
                                >
                                  Check Our Scheme Here
                                </Link>
                              )}
                              {user?.type == "Member" && (
                                <p> {profile?.stage}</p>
                              )}
                              {user?.type == "Mentor" && (
                                <p> {profile?.companyAssociated}</p>
                              )}
                            </div>
                          )}
                        </div>
                        <div className=" text-xs py-1 px-4 transition-all duration-200 ease-in-out underline text-gray-700 italic">
                          {user?.type == "Marketing" && (
                            <Link
                              href={`${profile?.imagesVideos}`}
                              className=""
                            >
                              <p>Check Out Our Work Here</p>
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col bg-white w-full shadow-lg border shadow-black/20 rounded-md p-2 justify-center items-center pb-6 ">
                        <div className="flex gap-2 my-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3"
                            />
                          </svg>

                          <p className="text-[#29ABE2] font-semibold font-nunito tracking-wide">
                            I would like to meet
                          </p>
                        </div>
                        <p className="text-center font-semibold font-nunito mb-4">
                          Role
                        </p>
                        <div className="flex space-x-3 text-xs text-[#29ABE2]">
                          <p className="border border-[#29ABE2] px-3 py-1 rounded-sm  hover:bg-[#29ABE2] hover:text-white transition-all duration-200 ease-in-out cursor-default">
                            {profile?.role}
                          </p>
                        </div>
                        <p className="text-center font-semibold font-nunito mt-6 mb-3">
                          Industry
                        </p>
                        <div className="flex space-x-3 text-xs text-[#29ABE2]">
                          <p className="border border-[#29ABE2] px-3 py-1 rounded-sm  hover:bg-[#29ABE2] hover:text-white transition-all duration-200 ease-in-out cursor-default">
                            {profile?.industry}
                          </p>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="basis-3/5  ">
                    <div className="flex flex-col relative w-full  items-center space-y-7">
                      <div className="w-full bg-white  shadow-lg border  shadow-black/20 rounded-md  justify-center items-center  hidden md:inline-block">
                        <p className="text-center py-2 text-gray-700 font-semibold border-b border-black/30">
                          Menu Bar
                        </p>
                        <SecondaryNav settings={true} />
                      </div>
                      <div className="flex flex-col w-full bg-white  shadow-lg border  shadow-black/20 rounded-md p-5     ">
                        <p className="text-gray-700 font-nunito font-semibold ">
                          Profile Info
                        </p>
                        <div className="my-4">
                          <div className="flex space-x-10 items-end my-3">
                            {user?.type == "Member" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    dob
                                  </p>
                                  <input
                                    type="text"
                                    {...register("dob")}
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    aria-label=""
                                    defaultValue={profile?.dob}
                                  />
                                </div>
                              </div>
                            )}
                            {user?.type == "Bank" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    Additional Contact 1
                                  </p>
                                  <input
                                    type="text"
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    {...register("additionalContact1")}
                                    aria-label=""
                                    defaultValue={profile?.additionalContact1}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex flex-col space-y-0.5">
                              <p className="text-[13px] text-gray-700 font-semibold">
                                State
                              </p>
                              <input
                                type="text"
                                className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                {...register("state")}
                                aria-label=""
                                defaultValue={profile?.state}
                              />
                            </div>
                          </div>
                          <div className="flex space-x-10 items-end my-3">
                            <div className="flex flex-col space-y-0.5">
                              <p className="text-[13px] text-gray-700 font-semibold">
                                Website
                              </p>
                              <input
                                type="text"
                                className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                {...register("website")}
                                aria-label=""
                                defaultValue={profile?.website}
                              />
                            </div>
                            {user?.type == "Bank" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    Additional Contact 2
                                  </p>
                                  <input
                                    type="text"
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    {...register("additionalContact2")}
                                    aria-label=""
                                    defaultValue={profile?.additionalContact2}
                                  />
                                </div>
                              </div>
                            )}
                            {user?.type == "Member" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    LinkedIn{" "}
                                  </p>
                                  <input
                                    type="text"
                                    {...register("linkedIn")}
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    aria-label=""
                                    defaultValue={profile?.linkedIn}
                                  />
                                </div>
                              </div>
                            )}
                            {user?.type == "Mentor" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    LinkedIn{" "}
                                  </p>
                                  <input
                                    type="text"
                                    {...register("linkedIn")}
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    aria-label=""
                                    defaultValue={profile?.linkedIn}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex  flex-col"></div>
                          </div>
                          <div className="flex space-x-10 items-end my-3">
                            <div className="flex flex-col space-y-0.5">
                              <p className="text-[13px] text-gray-700 font-semibold">
                                Phone Number
                              </p>
                              <input
                                type="text"
                                {...register("phoneNumber")}
                                className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                aria-label=""
                                defaultValue={profile?.phoneNumber}
                              />
                            </div>
                            <div className="flex flex-col space-y-0.5">
                              <p className="text-[13px] text-gray-700 font-semibold">
                                District{" "}
                              </p>
                              <input
                                type="text"
                                className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                {...register("district")}
                                aria-label=""
                                defaultValue={profile?.district}
                              />
                            </div>
                            <div className="flex  flex-col"></div>
                          </div>
                          <div className="flex space-x-10 items-end my-3">
                            {user?.type == "Member" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    USP
                                  </p>
                                  <input
                                    type="text"
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    {...register("usp")}
                                    aria-label=""
                                    defaultValue={profile?.usp}
                                  />
                                </div>
                              </div>
                            )}
                            {user?.type == "Mentor" && (
                              <div>
                                <div className="flex flex-col space-y-0.5">
                                  <p className="text-[13px] text-gray-700 font-semibold">
                                    Work Experience
                                  </p>
                                  <input
                                    type="number"
                                    className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                    {...register("workExp")}
                                    aria-label=""
                                    defaultValue={profile?.workExp}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="flex flex-col space-y-0.5">
                              <p className="text-[13px] text-gray-700 font-semibold">
                                Zip Code{" "}
                              </p>
                              <input
                                type="text"
                                className="bg-transparent border rounded-md w-[150px] outline-none p-1 text-xs text-gray-600"
                                {...register("zipCode")}
                                aria-label=""
                                defaultValue={profile?.zipCode}
                              />
                            </div>
                            <div className="flex  flex-col"></div>
                          </div>

                          {user?.type == "Member" && (
                            <div className="flex space-x-10 items-end my-3">
                              <div className="flex flex-col space-y-0.5  flex-[0.77]">
                                <p className="text-[13px] text-gray-700 font-semibold">
                                  Learning About
                                </p>

                                <select
                                  onChange={(e) => {
                                    setLearn(e.target.value);
                                  }}
                                  name=""
                                  className={`border text-gray-600 w-full placeholder:text-sm max-w-lg bg-transparent p-3 placeholder:text-center ${
                                    errors.learn && "border border-red-600"
                                  } border-black/20 shadow-md py-1 outline-none text-sm`}
                                  id=""
                                >
                                  <option
                                    className="bg-white"
                                    value="Different kinds of agriculture enterprise sectors
                       "
                                  >
                                    Different kinds of agriculture enterprise
                                    sectors
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="  In-person Mentoring"
                                  >
                                    In-person Mentoring
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="Exposure to existing enterprises in the country
                       "
                                  >
                                    Exposure to existing enterprises in the
                                    country
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="           
                       Investment Opportunities"
                                  >
                                    Investment Opportunities
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="Mentoring Opportunities"
                                  >
                                    Mentoring Opportunities
                                  </option>
                                  <option
                                    className="bg-white"
                                    value=" Marketing Opportunities"
                                  >
                                    Marketing Opportunities
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="Bank schemes on agriculture enterprises"
                                  >
                                    Bank schemes on agriculture enterprises
                                  </option>
                                  <option
                                    className="bg-white"
                                    value=" Meeting expert on agriculture enterprise Export or Import"
                                  >
                                    Meeting expert on agriculture enterprise
                                    Export or Import
                                  </option>
                                  <option
                                    className="bg-white"
                                    value=" Business Details Events / Seminars / Webinars Brainstorming"
                                  >
                                    Business Details Events / Seminars /
                                    Webinars
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="Bank schemes on agriculture enterprises"
                                  >
                                    Brainstorming Ideas
                                  </option>
                                  <option className="bg-white" value="Other">
                                    Other
                                  </option>
                                </select>
                              </div>
                            </div>
                          )}

                          {user?.type == "Member" && (
                            <div className="flex space-x-10 items-end my-3">
                              <div className="flex flex-col space-y-0.5  flex-[0.77]">
                                <p className="text-[13px] text-gray-700 font-semibold">
                                  Knowledge
                                </p>

                                <select
                                  name=""
                                  onChange={(e) => {
                                    setKnowledge(e.target.value);
                                  }}
                                  className={`border text-gray-600 w-full placeholder:text-sm max-w-lg bg-transparent p-3 placeholder:text-center ${
                                    errors.knowledge && "border border-red-600"
                                  } border-black/20 shadow-md py-1 outline-none text-sm`}
                                  id=""
                                >
                                  <option
                                    className="bg-white"
                                    value="I don’t have any idea about agriculture enterprise"
                                  >
                                    I don’t have any idea about agriculture
                                    enterprise
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="Some Idea about farming"
                                  >
                                    Some Idea about farming
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="I surely need guidance on agriculture enterprise"
                                  >
                                    I surely need guidance on agriculture
                                    enterprise
                                  </option>
                                  <option
                                    className="bg-white"
                                    value=" I have agriculture enterprise related work experience"
                                  >
                                    I have agriculture enterprise related work
                                    experience
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="I want to scale my existing agriculture enterprise"
                                  >
                                    I want to scale my existing agriculture
                                    enterprise
                                  </option>
                                  <option
                                    className="bg-white"
                                    value=" I am a professional student agriculture/ MBA/Engg/ Medical/
                                Other (please specify) interested in agriculture startup"
                                  >
                                    I am a professional student agriculture/
                                    MBA/Engg/ Medical/ Other (please specify)
                                    interested in agriculture startup
                                  </option>
                                  <option
                                    className="bg-white"
                                    value="I’m a student of BA/ B Com/ BSc/ Other (please specify)
                                interested in Agriculture Startup"
                                  >
                                    I’m a student of BA/ B Com/ BSc/ Other
                                    (please specify) interested in Agriculture
                                    Startup
                                  </option>
                                  <option className="bg-white" value="Other">
                                    Other
                                  </option>
                                </select>
                              </div>
                            </div>
                          )}

                          {/* <div className="my-4 relative">
                        <p className="text-gray-700 font-nunito text-[13px]  font-semibold ">
                          Expertise:
                        </p>
                        <div className="flex gap-5 flex-wrap">
                          {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((item) => (
                            <div className="flex  bg-[#29ABE2] items-center gap-1.5  px-2 ">
                              <p className="     py-1 rounded-sm  text-xs text-white   transition-all duration-200 ease-in-out cursor-default">
                                Technology
                              </p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mt-0.5 text-white cursor-pointer hover:animate-pulse hover:scale-110 transition-all duration-200 ease-in-out"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          ))}
                        </div>
                        <div
                          className=" border text-sm text-gray-600 italic inline-flex space-x-1 py-1 rounded-md px-2 my-2 items-center border-black/20 shadow-md "
                          onClick={() => setActive(!active)}
                        >
                          <p className="text-gray-600 text-xs">
                            Select Expertise{" "}
                          </p>
                          {active ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        {active && (
                          <>
                            <div className="absolute bg-white   border border-black/40   rounded-md ">
                              <div className="relative ">
                                {" "}
                                <div className="flex gap-2 items-center justify-between border-b border-black/40 mb-2 text-[#29ABE2] p-2">
                                  <p>Select Your Expertise</p>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-4 h-4 mt-1 cursor-pointer hover:scale-125 transition-all ease-in-out hover:animate-pulse"
                                    onClick={() => setActive(!active)}
                                  >
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                  </svg>
                                </div>
                                <div className="flex w-[200px] h-[200px] overflow-scroll flex-col space-y-2 px-4">
                                  {[1, 2, 2, 2, 2, 2, 2, 2, 2].map((item) => (
                                    <div className="flex items-center space-x-2 py-2">
                                      <input
                                        type="checkbox"
                                        id="label"
                                        value="Audit"
                                      />
                                      <label
                                        htmlFor="label"
                                        className="text-gray-600 font-nunito text-sm mt-0.5 tracking-wide italic"
                                      >
                                        {" "}
                                        Audit{" "}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                <div className="bg-white w-full border-t border-black/40">
                                  <button className="flex bg-[#29ABE2] px-6 m-3 italic text-sm  hover:animate-pulse transition-all duration-200 ease-in-out rounded-md shadow-md  py-1 justify-center text-white">
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div> */}
                          <div className="flex flex-col mb-4 ">
                            <p className="text-[14px] text-gray-600 ">
                              {user?.type == "Bank" || ("Mentor" && "Country")}
                              {user?.type == "Member" && "Taluk"}
                            </p>
                            <div className="flex items-center space-x-4">
                              <div>
                                {" "}
                                <input
                                  type="text"
                                  {...register("talukcountry")}
                                  defaultValue={
                                    profile?.taluk || profile?.country
                                  }
                                  aria-label="he"
                                  className="border p-0.5 border-black/20 text-sm  rounded-md bg-transparent outline-none w-[150px] text-gray-700 px-1"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="my-6">
                            <div className="bg-white w-full">
                              <button
                                className="flex bg-[#29ABE2] px-6 m-3 italic text-sm  hover:animate-pulse transition-all duration-200 ease-in-out rounded-md shadow-md  py-1 justify-center text-white"
                                type="submit"
                              >
                                Update Changes
                              </button>
                            </div>
                          </div>
                          <div className="flex space-x-2 items-center">
                            <p className="text-xl font-semibold font-nunito text-gray-700">
                              Account Status{" "}
                            </p>
                            <p className="text-xl font-semibold font-nunito text-gray-700">
                              :
                            </p>
                            <p className="text-xl font-semibold font-nunito text-[#29ABE2]">
                              {" "}
                              Active
                            </p>
                          </div>
                          <p className="text-gray-500 italic text-xs tracking-wide ">
                            Your account is active and you will receive regular
                            matches.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default settings;
