import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const GeneralSec = ({ setProgress, setPhaseOne }) => {
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
          address: data.address,
          phoneNumber: data.number,
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((response) => {
        setProgress(25);
        toast.dismiss();
        setPhaseOne(true);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="flex flex-col p-2">
      <form action="" onSubmit={handleSubmit(handleUpload)}>
        <div className="flex gap-4">
          {" "}
          <div className="my-2 flex-1">
            {" "}
            <p className="text-gray-600 text-sm italic ml-2 font-semibold mb-0.5 text-center">
              About Yourself
            </p>
            <textarea
              type="text"
              rows={4}
              {...register("yourself", { required: true })}
              placeholder="Write Few Lines About Yourself"
              className={` border text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                errors.yourself && "border border-red-600"
              }`}
            />
          </div>
        </div>
        <div className="flex justify-around my-3 gap-6">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
              Phone Number
            </p>
            <input
              type="text"
              {...register("number", { required: true })}
              placeholder="Phone Number"
              className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                errors.number && "border border-red-600"
              } border-black/20 shadow-md py-1 outline-none text-sm`}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
              LinkedIn Profile URL
            </p>
            <input
              type="text"
              {...register("linkedin", { required: true })}
              placeholder="LinkedIn URL"
              className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                errors.linkedin && "border border-red-600"
              } border-black/20 shadow-md py-1 outline-none text-sm`}
            />
          </div>
        </div>
        <div className="flex gap-4">
          {" "}
          <div className="my-2 flex-1">
            {" "}
            <p className="text-gray-600 text-sm italic ml-2 font-semibold mb-0.5 text-center">
              Address
            </p>
            <textarea
              type="text"
              {...register("address", { required: true })}
              rows={3}
              placeholder="Your Address"
              className={` border text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                errors.address && "border border-red-600"
              }`}
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
  );
};

export default GeneralSec;
