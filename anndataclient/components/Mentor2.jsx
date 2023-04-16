import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Mentor2 = ({ setPhaseTwo, setProgress }) => {
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
          phoneNumber: data.number,
          district: data.district,
          email: user.email,
          type: user.type,
          website: data.website,
          country: data.country,
          interest: data.interest,
          linkedIn: data.linkedin,
          workExp: data.workexp,
          companyAssociated: data.companyass,
          profileDetails: data.profileDets,
          profileReady: "2",
        },
        { headers: headers }
      )
      .then((response) => {
        console.log("yoyoyoyoy");
        setProgress(50);
        toast.dismiss();
        setPhaseTwo(true);
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
      <div className="flex flex-col w-[250px] md:w-auto p-2 h-[500px] md:h-auto overflow-scroll md:overflow-auto">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <div className="flex justify-around my-5 gap-6 md:flex-row flex-col">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Phone Number
              </p>
              <input
                type="text"
                {...register("number", { required: true })}
                placeholder="Number"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.number && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Country
              </p>
              <input
                type="text"
                {...register("country", { required: true })}
                placeholder="Country"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.country && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6 md:flex-row flex-col">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Work Experience
              </p>
              <input
                type="number"
                {...register("workexp", { required: true })}
                placeholder="5 ,6, 7"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.workexp && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Company Associated
              </p>
              <input
                type="text"
                {...register("companyass", { required: true })}
                placeholder=" Company Associated"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.companyass && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6 flex-col md:flex-row">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Website
              </p>
              <input
                type="text"
                {...register("website", { required: true })}
                placeholder="Website"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.website && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                LinkedIn URL
              </p>
              <input
                type="text"
                {...register("linkedin", { required: true })}
                placeholder="LinkedIn URL"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.district && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-center my-3 w-full gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-center text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Interest (Connect Startups)
              </p>
              <select
                name=""
                {...register("interest", { required: true })}
                className={`border text-gray-600 w-full placeholder:text-sm bg-transparent p-3 placeholder:text-center ${
                  errors.type && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
                id=""
              >
                <option className="bg-white" value="POC Stage">
                  POC Stage
                </option>
                <option className="bg-white" value="Early Traction">
                  Early Traction
                </option>
                <option className="bg-white" value="Scaling">
                  Scaling
                </option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            {" "}
            <div className="my-2 flex-1">
              {" "}
              <p className="text-gray-600 text-sm italic ml-2 font-semibold mb-0.5 text-center">
                Profile Details
              </p>
              <textarea
                type="text"
                rows={4}
                cols={3}
                {...register("profileDets", { required: true })}
                placeholder="Write about your profile Details"
                className={` border text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                  errors.profileDets && "border border-red-600"
                }`}
              />
            </div>
          </div>

          <div className="mx-auto my-4 flex justify-center">
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

export default Mentor2;
