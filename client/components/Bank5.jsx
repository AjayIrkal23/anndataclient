import { AuthContext } from "@/Contexts/Auth";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";

const Bank5 = ({ setPhaseThree, setProgress }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors },
  } = useForm();
  const [file, setfile] = useState(null);
  const { user, userLogin } = useContext(AuthContext);
  const [fileuploaded, setFileuploaded] = useState(null);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
  };

  const onFileUpload = (e) => {
    setfile(e.target.files[0], "AI");
    console.log(file);
    handleUpload();
  };

  const handleUpload = async (data) => {
    if (file) {
      toast.loading("Uploading File");
      const data = new FormData();
      data.append("name", file.name);
      data.append("department", user.email);
      data.append("file", file);

      await axios
        .post(`https://react-sop.onrender.com/file/upload`, data)
        .then(async (res) => {
          setFileuploaded(res.data);
          await axios
            .put(
              `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
              {
                documentFile: res.data,
                type: user.type,
                email: user.email,
                profileReady: "Done",
              },
              { headers: headers }
            )
            .then((response) => {
              toast.dismiss();
              toast.success("Document  Uploaded Successfully");
              setProgress(80);
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
          <p className="text-center text-sm text-gray-600 s">
            Bank Scheme Documents
          </p>
          <div className="mx-auto my-2 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center md:flex-row md:gap-6 ">
              {" "}
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
                onChangeCapture={onFileUpload}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white cursor-pointer py-1.5 px-6 rounded-md hover:animate-pulse shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bank5;
