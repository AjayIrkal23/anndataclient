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

const Mentor3 = ({ setPhaseThree, setProgress }) => {
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

  const handleUpload = async (data) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          fundingStage: value,
          email: user.email,
          type: user.type,
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

  const HandleClick = (type) => {
    if (type == "+") {
      setValue(value + 25000);
    } else {
      if (value > 100000) {
        setValue(value - 25000);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col p-2 w-[250px] md:w-auto">
        <form action="" onSubmit={handleSubmit(handleUpload)}>
          <p className="text-center text-sm text-gray-600 font-semibold">
            Funding Stage (Amount In INR)
          </p>
          <div>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <MinusCircleIcon
                width={60}
                onClick={() => HandleClick()}
                height={60}
                className="text-blue-500 "
              />

              <Slider
                aria-label="Volume"
                value={value}
                onChange={handleChange}
                min={100000}
                max={10000000}
              />
              <PlusCircleIcon
                width={60}
                onClick={() => HandleClick("+")}
                height={60}
                className="text-blue-500 "
              />
            </Stack>
            <p className="text-center font-semibold font-italic">
              {value.toLocaleString()} INR
            </p>
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

export default Mentor3;
