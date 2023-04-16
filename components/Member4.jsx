import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Member4 = ({ setPhaseFour, setProgress }) => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const { user, userLogin } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXlpcmthbDIzQGdtYWlsLmNvbSIsIm5hbWUiOiJhamF5aXJrYWwiLCJpZCI6IjYyZTkwM2RiLTc5MDEtNGM4MS05MjQ2LTJiMWE4NGIxMGI5ZSIsImlhdCI6MTY3OTE1NDE5N30.FJ_LyQF7i-h7guI3QoF5cOB7bbxGbZTTXDo0NN89yfc`,
  };

  const handleUpload = async (data) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          knowledgeFarming:
            watch("knowledge") == "Other"
              ? data.otherKnowledge
              : data.knowledge,
          learningAbout:
            watch("learn") == "Other" ? data.otherlearn : data.learn,
          type: user.type,
          email: user.email,
          profileReady: "4",
        },
        { headers: headers }
      )
      .then((response) => {
        setProgress(85);
        toast.dismiss();
        setPhaseFour(true);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div>
      <div className="flex flex-col p-2">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <div className="flex justify-between my-5 gap-6">
            <div className="flex flex-col flex-[1]">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Please rate your current knowledge on agriculture enterprises
              </p>
              <select
                name=""
                {...register("knowledge", { required: true })}
                className={`border text-gray-600 w-full placeholder:text-sm max-w-lg bg-transparent p-3 placeholder:text-center ${
                  errors.knowledge && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
                id=""
              >
                <option
                  className="bg-white"
                  value="I don’t have any idea about agriculture enterprise"
                >
                  I don’t have any idea about agriculture enterprise
                </option>
                <option className="bg-white" value="Some Idea about farming">
                  Some Idea about farming
                </option>
                <option
                  className="bg-white"
                  value="I surely need guidance on agriculture enterprise"
                >
                  I surely need guidance on agriculture enterprise
                </option>
                <option
                  className="bg-white"
                  value=" I have agriculture enterprise related work experience"
                >
                  I have agriculture enterprise related work experience
                </option>
                <option
                  className="bg-white"
                  value="I want to scale my existing agriculture enterprise"
                >
                  I want to scale my existing agriculture enterprise
                </option>
                <option
                  className="bg-white"
                  value=" I am a professional student agriculture/ MBA/Engg/ Medical/
                  Other (please specify) interested in agriculture startup"
                >
                  I am a professional student agriculture/ MBA/Engg/ Medical/
                  Other (please specify) interested in agriculture startup
                </option>
                <option
                  className="bg-white"
                  value="I’m a student of BA/ B Com/ BSc/ Other (please specify)
                  interested in Agriculture Startup"
                >
                  I’m a student of BA/ B Com/ BSc/ Other (please specify)
                  interested in Agriculture Startup
                </option>
                <option className="bg-white" value="Other">
                  Other
                </option>
              </select>
              {watch("knowledge") === "Other" && (
                <textarea
                  type="text"
                  rows={4}
                  {...register("otherKnowledge")}
                  placeholder="Optional 50 words

              "
                  className={` border my-6 text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                    errors.otherKnowledge && "border border-red-600"
                  }`}
                />
              )}
            </div>
          </div>
          <div className="flex justify-between my-5 gap-6">
            <div className="flex flex-col flex-[1]">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Learning About ?
              </p>
              <select
                name=""
                {...register("learn", { required: true })}
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
                  Different kinds of agriculture enterprise sectors
                </option>
                <option className="bg-white" value="  In-person Mentoring">
                  In-person Mentoring
                </option>
                <option
                  className="bg-white"
                  value="Exposure to existing enterprises in the country
                  "
                >
                  Exposure to existing enterprises in the country
                </option>
                <option
                  className="bg-white"
                  value="           
                  Investment Opportunities"
                >
                  Investment Opportunities
                </option>
                <option className="bg-white" value="Mentoring Opportunities">
                  Mentoring Opportunities
                </option>
                <option className="bg-white" value=" Marketing Opportunities">
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
                  Meeting expert on agriculture enterprise Export or Import
                </option>
                <option
                  className="bg-white"
                  value=" Business Details Events / Seminars / Webinars Brainstorming"
                >
                  Business Details Events / Seminars / Webinars
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
              {watch("learn") === "Other" && (
                <textarea
                  type="text"
                  rows={4}
                  {...register("otherlearn")}
                  placeholder="Optional 50 words

              "
                  className={` border my-6 text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                    errors.otherKnowledge && "border border-red-600"
                  }`}
                />
              )}
            </div>
          </div>

          <div className="mx-auto my-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white cursor-pointer py-1.5 px-6 rounded-md hover:animate-pulse shadow-md"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Member4;
