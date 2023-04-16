import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Bank2 = ({ setPhaseTwo, setProgress }) => {
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
          zipCode: data.zipcode,
          district: data.district,
          email: user.email,
          type: user.type,
          website: data.website,
          country: data.country,
          interest: data.interest,
          additionalContact1: data.ad1,
          additionalContact2: data.ad2,
          bankScheme: data.bankdets,
          profileReady: "2",
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
      <div className="flex flex-col p-2 w-[250px] md:w-auto h-[450px] overflow-scroll">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <div className="flex justify-around my-5 gap-6 flex-col md:flex-row">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Zip Code
              </p>
              <input
                type="text"
                {...register("zipcode", { required: true })}
                placeholder="Zip Code"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.zipcode && "border border-red-600"
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
          <div className="flex justify-around my-5 gap-6 flex-col md:flex-row">
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Additional Contact 1
              </p>
              <input
                type="text"
                {...register("ad1", { required: true })}
                placeholder="Additional Contact 1"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.ad1 && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Additional Contact 2
              </p>
              <input
                type="text"
                {...register("ad2", { required: true })}
                placeholder="Additional Contact 2"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.ad2 && "border border-red-600"
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
                District
              </p>
              <input
                type="text"
                {...register("district", { required: true })}
                placeholder="  District"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.district && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          </div>
          <div className="flex justify-center my-3 w-full gap-6 flex-col md:flex-row">
            <div className="flex flex-col">
              <p className="text-sm text-center text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Interest
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
                  Investor
                </option>
                <option className="bg-white" value="Mentorship">
                  Mentorship
                </option>
                <option className="bg-white" value="Startup">
                  Startup
                </option>
              </select>
            </div>
          </div>
          <div className="flex gap-4">
            {" "}
            <div className="my-2 flex-1">
              {" "}
              <p className="text-gray-600 text-sm italic ml-2 font-semibold mb-0.5 text-center">
                Bank Schemes Details
              </p>
              <textarea
                type="text"
                rows={4}
                {...register("bankdets", { required: true })}
                placeholder="Write your Bank Schemes Details"
                className={` border text-gray-600 w-full p-3 placeholder:text-center border-black/20 shadow-md py-1 outline-none text-sm ${
                  errors.bankdets && "border border-red-600"
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

export default Bank2;
