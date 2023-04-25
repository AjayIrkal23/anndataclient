import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Member1 = ({ setProgress, setPhaseOne, p }) => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm();

  const [value, setValue] = useState("");

  const { user, userLogin } = useContext(AuthContext);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXlpcmthbDIzQGdtYWlsLmNvbSIsIm5hbWUiOiJhamF5aXJrYWwiLCJpZCI6IjYyZTkwM2RiLTc5MDEtNGM4MS05MjQ2LTJiMWE4NGIxMGI5ZSIsImlhdCI6MTY3OTE1NDE5N30.FJ_LyQF7i-h7guI3QoF5cOB7bbxGbZTTXDo0NN89yfc`,
  };

  const handleUpload = async (data) => {
    if (value?.length > 0) {
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
          {
            name: p ? user.name : data.name,
            industry: value,
            email: user.email,
            type: user.type,
            profileReady: p ? "Done" : "1",
          },
          { headers: headers }
        )
        .then((response) => {
          p ? setProgress(p) : setProgress(25);
          toast.dismiss();
          setPhaseOne(true);
        })
        .catch((error) => {
          console.log(error);
          toast.dismiss();
          console.log(error); // Handle Login Error
          toast.error("Something Went Wrong");
        });
    } else {
      toast.error("Please Select Industry");
    }
  };

  return (
    <div className="flex flex-col p-2 w-[250px] md:w-auto h-[450px] overflow-scroll">
      <form action="" onSubmit={handleSubmit(handleUpload)}>
        <div className="flex justify-around my-3 gap-6">
          {!p && (
            <div className="flex flex-col">
              <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold text-center">
                Name
              </p>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.name && "border border-red-600"
                } border-black/20 shadow-md py-1 outline-none text-sm`}
              />
            </div>
          )}
        </div>

        <div className="flex justify-around my-3 gap-6">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 ml-0.5 mb-0.5 font-semibold text-center">
              Select Your Industry
            </p>

            <div className="pb-4  ">
              <input
                type="text"
                {...register("industry")}
                placeholder="Search Your Industry"
                className={`border text-gray-600 w-full placeholder:text-sm p-3 placeholder:text-center ${
                  errors.industry && "border border-red-600"
                } border-black/20 shadow-md  py-1 outline-none text-sm`}
              />
            </div>
            <div className="flex flex-wrap flex-col marker: gap-2 pt-3">
              {[
                "Consumer Internet",
                "Investor/VC",
                "Big Data/AI/IOT/Robotics",
                "FinTech",
                "B2B Tech",
                "Recruitment",
                "Healthtech",
                "E-commerce",
                "Edutech",
                "Adtech",
                "Advertising/Digital Marketing",
                "Agritech",
                "Automotive",
                "B2B services",
                "Construction",
                "Consulting",
                "Consumer Goods/CPG",
                "Content production",
                "Education",
                "Electroics",
                "Energy",
                "Entertainment",
                "F&B",
                "Financial & Beauty",
                "Gaming",
                "Healthcare/Pharma",
                "Hospitality/Travel",
                "Legal Service",
                "Media",
                "Real Estate",
                "Retail",
                "Social Impact",
                "Software Development",
                "Sports",
                "Supply Chain/Logistics",
                "Sustainability",
                "Telecom",
              ].map((item, i) =>
                watch("industry")?.length > 0 ? (
                  item
                    ?.toLowerCase()
                    .includes(watch("industry")?.toLowerCase()) && (
                    <div
                      key={i}
                      className={`border py-1.5 text-center text-sm  italic px-2 rounded-md shadow-md text-gray-600 ${
                        value == item && "border-blue-500 "
                      } cursor-pointer hover:animate-pulse`}
                      onClick={() => setValue(item)}
                    >
                      {item}
                    </div>
                  )
                ) : (
                  <div
                    key={i}
                    className={`border py-1.5 text-center text-sm  italic px-2 rounded-md shadow-md text-gray-600 ${
                      value == item && "border-blue-500 "
                    } cursor-pointer hover:animate-pulse`}
                    onClick={() => setValue(item)}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
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

export default Member1;
