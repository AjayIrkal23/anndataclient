import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Marketing2 = ({ setPhaseTwo, setProgress }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { user, userLogin } = useContext(AuthContext);
  const [value, setValue] = useState("");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const HandleRemove = (item) => {
    let newArr = value?.split(",").filter((one, i) => {
      if (one != item) {
        return i;
      }
    });
    setValue(newArr.toString());
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
          linkedIn: data.linkedin,
          servicesOffered: value,
          previousWork: data.prev,
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
          <div className="flex w-full justify-around my-1 gap-6">
            <div className="flex w-full flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold">
                Services
              </p>
              <div className="flex text-xs gap-2 mb-2 flex-wrap max-w-sm ">
                {value?.split(",").map(
                  (item) =>
                    item.length > 0 && (
                      <p
                        className="bg-blue-500 px-2 py-1 rounded-md  text-white hover:bg-red-600 cursor-pointer"
                        onClick={() => HandleRemove(item)}
                      >
                        {item}
                      </p>
                    )
                )}
              </div>

              <input
                type="text"
                {...register("service", { required: true })}
                placeholder="Service Offered"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.workexp && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
              <button
                onClick={() => {
                  setValue(`${value},${watch("service")}`);
                }}
                className="text-sm my-3 py-1 px-3 bg-blue-500 rounded-md text-white hover:animate-pulse"
              >
                Add New
              </button>
            </div>
          </div>
          <div className="flex justify-around my-2 gap-6 flex-col md:flex-row">
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

          <div className="flex gap-4">
            {" "}
            <div className="my-2 flex-1">
              {" "}
              <p className="text-gray-600 text-sm italic ml-2 font-semibold mb-0.5 text-center">
                Previous Work
              </p>
              <textarea
                type="text"
                rows={4}
                {...register("prev", { required: true })}
                placeholder="Write about your Previous Works"
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

export default Marketing2;
