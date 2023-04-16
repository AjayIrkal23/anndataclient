import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Member3 = ({ setPhaseThree, setProgress }) => {
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
          userType: data.userType,
          stage: data.stage,
          farmingType: data.farmingType,
          collabration: data.collabration,
          interest: data.interest,
          usp: data.usp,
          type: user.type,
          email: user.email,
          profileReady: "3",
        },
        { headers: headers }
      )
      .then((response) => {
        setProgress(75);
        toast.dismiss();
        setPhaseThree(true);
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
                Stage
              </p>
              <select
                name=""
                {...register("stage", { required: true })}
                className={`border text-gray-600 w-full placeholder:text-sm bg-transparent p-3 placeholder:text-center ${
                  errors.stage && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
                id=""
              >
                <option className="bg-white" value="Ideation">
                  Ideation
                </option>
                <option className="bg-white" value="Proof of Concept">
                  Proof of Concept
                </option>
                <option className="bg-white" value="Early Traction">
                  Early Traction
                </option>
                <option className="bg-white" value="Scaling">
                  Scaling
                </option>
              </select>
            </div>
            <div className="flex flex-col flex-[1]">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Type
              </p>
              <select
                name=""
                {...register("userType", { required: true })}
                className={`border text-gray-600 w-full placeholder:text-sm bg-transparent p-3 placeholder:text-center ${
                  errors.type && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
                id=""
              >
                <option className="bg-white" value="Farmer">
                  Farmer
                </option>
                <option className="bg-white" value="Student">
                  Student
                </option>
                <option className="bg-white" value="Startup">
                  Startup
                </option>
                <option className="bg-white" value="Fresher">
                  Fresher
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6">
            <div className="flex flex-col flex-[1]">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Interested In
              </p>
              <select
                name=""
                {...register("interest", { required: true })}
                className={`border text-gray-600 w-full placeholder:text-sm bg-transparent p-3 placeholder:text-center ${
                  errors.type && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
                id=""
              >
                <option className="bg-white" value="Bank">
                  Bank
                </option>
                <option className="bg-white" value="Mentorship">
                  Mentorship
                </option>
                <option className="bg-white" value="Startup">
                  Startup
                </option>
                <option className="bg-white" value="Marketing">
                  Marketing
                </option>
                <option className="bg-white" value="Social Media">
                  Social Media
                </option>
              </select>
            </div>
            <div className="flex flex-col flex-1">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                USP
              </p>
              <input
                type="text"
                {...register("usp", { required: true })}
                placeholder="Your USP"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.usp && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6">
            <div className="flex flex-col flex-1">
              <p className="text-sm text-center text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Type of Farming Interested
              </p>
              <input
                type="text"
                {...register("farmingType", { required: true })}
                placeholder="Farming Type"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.farmingType && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-center my-5 gap-6">
            <textarea
              type="text"
              rows={4}
              {...register("collabration")}
              placeholder="Any incubation / collaboration
              "
              className={` border text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                errors.addInfo && "border border-red-600"
              }`}
            />
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

export default Member3;
