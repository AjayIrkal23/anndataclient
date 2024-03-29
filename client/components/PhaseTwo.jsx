import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const PhaseTwo = ({ setPhaseTwo, setProgress }) => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const { user, userLogin } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };
  const handleUpload = async (data) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          zipCode: data.zipcode,
          district: data.district,
          state: data.state,
          country: data.country,
          additionalContact1: data.AdditionalContact1,
          additionalContact2: data.AdditionalContact2,
          email: user.email,
          type: user.type,
          website: data.website,
        },
        { headers: headers }
      )
      .then((response) => {
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
      <div className="flex flex-col p-2">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <div className="flex justify-around my-5 gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Zip Code
              </p>
              <input
                type="text"
                {...register("zipcode", { required: true })}
                placeholder="Zip Code"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.number && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                District
              </p>
              <input
                type="text"
                {...register("district", { required: true })}
                placeholder="District"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.linkedin && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                State
              </p>
              <input
                type="text"
                {...register("state", { required: true })}
                placeholder="State"
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
                  errors.linkedin && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-around my-5 gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Additional Contact 2
              </p>
              <input
                type="text"
                {...register("AdditionalContact2", { required: true })}
                placeholder="Additional Contact 2"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.number && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Additional Contact 1
              </p>
              <input
                type="text"
                {...register(" AdditionalContact1", { required: true })}
                placeholder=" Additional Contact 1"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.linkedin && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-center my-5 gap-6">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Website URL
              </p>
              <input
                type="text"
                {...register("website", { required: true })}
                placeholder="WebSite Url"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.number && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
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

export default PhaseTwo;
