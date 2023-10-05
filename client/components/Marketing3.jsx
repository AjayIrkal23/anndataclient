import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const Marketing3 = ({ setPhaseThree, setProgress }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();
  const [file, setfile] = useState(null);
  const [value, setValue] = useState(100000);
  const { user, userLogin } = useContext(AuthContext);
  const [fileuploaded, setFileuploaded] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onFileUpload = (e) => {
    setfile(e.target.files[0], "AI");
    console.log(file);
    handleUpload();
  };

  const handleUpload = async (data) => {
    if (file) {
      const data1 = new FormData();
      data1.append("name", file.name);
      data1.append("department", user.email);
      data1.append("file", file);
      toast.loading("Uploading File");
      await axios
        .post(`${process.env.NEXT_PUBLIC_BUCKET}/file/upload`, data1)
        .then(async (res) => {
          setFileuploaded(res.data);
          await axios
            .put(
              `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
              {
                imagesVideos: res.data,
                type: user.type,
                email: user.email,
                usertype: data?.userType,
                profileReady: "3",
              },
              { headers: headers }
            )
            .then((response) => {
              toast.dismiss();
              toast.success("File Uploaded Successfully");
              setProgress(60);
              setPhaseThree(true);
            })
            .catch((error) => {
              console.log(error);
              toast.dismiss();
              console.log(error); // Handle Login Error
              toast.error("Something Went Wrong");
            });
        });
    }
  };

  return (
    <div>
      <div className="flex flex-col p-2 w-[250px] md:w-auto">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <p className="text-center text-sm text-gray-600 font-semibold">
            Additional Details
          </p>
          <div className="flex justify-center my-3 w-full gap-6">
            <div className="flex w-full flex-col">
              <p className="text-sm text-center text-gray-600 ml-0.5 mb-0.5 font-semibold">
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
                <option className="bg-white" value="Marketing">
                  Marketing
                </option>
                <option className="bg-white" value="Social Media">
                  Social Media
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center md:flex-row md:gap-6 ">
            <label
              htmlFor="file"
              className="flex items-center gap-1 text-white bg-green-500 w-[180px]  justify-center rounded-md shadow-md  outline-none py-1.5 my-2 md:my-5 curosr-pointer "
            >
              Select Your File <FaFileUpload className="text-xl" />{" "}
            </label>
            <input
              className="hidden"
              type="file"
              name="file"
              id="file"
              onChange={onFileUpload}
            />
          </div>
          <p className="text-sm text-center text-gray-600 ml-0.5 mb-6 font-semibold">
            Selected File - {file ? file.name : "N/A"}
          </p>
          <p className="text-sm text-center text-gray-600 ml-0.5 mb-0.5 font-semibold">
            Please Upload an File like PDF or DOCX of your work
          </p>{" "}
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

export default Marketing3;
