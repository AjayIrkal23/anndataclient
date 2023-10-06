import { FaRegEnvelope, FaUserAlt } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { Blocks } from "react-loader-spinner";
import { Modal } from "@mui/material";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "@/Contexts/Auth";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Head from "next/head";

const signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState(null);
  const [value, setValue] = useState(null);
  const [name, setName] = useState(null);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const { userLogin } = useContext(AuthContext);
  const data = router.query;
  useEffect(() => {
    if (data.emailVerification) {
      setOpen(true);
    }
  }, []);

  const onSubmit = async (data) => {
    if (data.password.length > 6 || value == "Member") {
      setEmail(data.email);
      setLoading(true);
      if (
        value != null && value == "Member"
          ? true
          : data.password == data.confirm
      ) {
        await axios
          .post(`${process.env.NEXT_PUBLIC_URL}/api/signUp`, {
            name: data.fullName,
            email: data.email,
            phoneNumber: value == "Member" && data.email,
            nakedpassword: data.password,
            type: value,
          })
          .then(() => {
            toast.dismiss();
            setLoading(false);
            toast.success("Account Created Successful");
            setOpen(true);
          })
          .catch((error) => {
            toast.dismiss();
            setLoading(false);
            console.log(error); // Handle Signup Error
            if (error?.response?.status === 400) {
              toast.error("User Already Exits");
            } else if (error?.response?.status === 300) {
              toast.success("Please Verify Your Account");
              setOpen(true);
            } else {
              toast.error("Something Went Wrong");
            }
          });
      } else {
        if (value == null) {
          toast.error("Select Account Type");
        } else {
          toast.error("Confirm Password Did Not Match");
        }
      }
    } else {
      toast.error("Please Enter An Strong Password");
    }
  };

  const otpRef = useRef();

  const handleOtp = async (event) => {
    event.preventDefault();

    await axios
      .post(`${process.env.NEXT_PUBLIC_URL}/api/verifyOtp`, {
        email: email ? email : data.email,

        otp: otpRef.current.value,
        type: value != null ? value : data.type,
      })
      .then((response) => {
        router.push("/login");
        setOpen(false);
        toast.success("Verification Successful");
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error); // Handle Login Error
        if (error.response.status === 400) {
          toast.error("Please Enter Correct OTP");
        } else {
          toast.error("Something Went Wrong");
        }
      });
  };

  const googleHandleSubmit = async (event) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/googlelogin`, {
        event,
      })
      .then((response) => {
        toast.dismiss();
        userLogin({
          token: response.data.token,
          name: response.data.name,
          email: response.data.email,
        });
        navigate("/");
        toast.success("Login Successful");
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("User Login Failed");
      });
  };
  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>

      <div className="px-1">
        <div className=" md:flex">
          <div className="relative overflow-hidden  md:w-1/2 bg-gradient-to-tr md:h-auto h-[300px] md:hidden  from-[#39B54A] to-[#29ABE2] i md:justify-around  items-center ">
            <div className="flex flex-col items-center h-full justify-center">
              <h1 className="text-white font-bold text-4xl font-sans">
                AandataGuru.<span className="text-green-500">AI</span>
              </h1>
              <p className="text-white mt-1 max-w-[350px] text-xs text-center">
                True networking does not mean meeting people; it means becoming
                the type of person other people want to meet
              </p>
              <Link href="/login">
                <button
                  type="submit"
                  className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="absolute hidden md:inline-block -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white ">
            <form className="bg-white px-3" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1 text-center md:text-left">
                Welcome to AandataGuru.
                <span className="text-green-500">AI</span>
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7 text-center md:text-left">
                Register Now
              </p>
              <div
                className={`flex items-center border-2 mb-3 py-2 px-3 rounded-2xl ${
                  errors.fullName && "!border-red-500"
                } ${value == "Member" && "hidden"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  {...register("fullName", {
                    required: value == "Member" ? false : true,
                  })}
                  placeholder="Full name"
                />
              </div>

              <div
                className={`flex items-center border-2 py-2 mb-3 px-3 rounded-2xl ${
                  errors.email && "!border-red-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="Phone Number"
                />
              </div>
              <div
                className={`flex md:flex-row flex-col  ${
                  value == "Member" ? "gap-0" : "gap-4"
                }`}
              >
                <div
                  className={`flex items-center border-2 py-2 px-3 rounded-2xl ${
                    errors.password && "!border-red-500"
                  }  ${value == "Member" && "hidden"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="password"
                    {...register("password", {
                      required: value == "Member" ? false : true,
                    })}
                    placeholder="Password"
                  />
                </div>
                <div
                  className={`flex items-center border-2 py-2 px-3 rounded-2xl ${
                    errors.confirm && "!border-red-500"
                  } ${value == "Member" && "hidden"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    className="pl-2 outline-none border-none"
                    type="password"
                    {...register("confirm", {
                      required: value == "Member" ? false : true,
                    })}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="mt-4">
                <select
                  className="w-full bg-transparent text-gray-500 font-semibold   shadow-md border-2 py-2 px-3 rounded-2xl"
                  name=""
                  onChange={(e) => setValue(e.target.value)}
                  id=""
                >
                  <option
                    disabled={value != null ? true : false}
                    className="border-b py-1 border-black"
                  >
                    Please Select Account Type
                  </option>
                  <option value="Member">Member</option>

                  <option value="Mentor">Mentor</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>
              <Link href={"/tc"}>
                <p className="text-xs text-gray-700 underline italic my-2 ml-3">
                  Please Read T&C Before Registering
                </p>
              </Link>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:animate-pulse"
              >
                Signup
              </button>
            </form>
          </div>
          <div className="relative overflow-hidden md:flex md:w-1/2 bg-gradient-to-tr md:h-auto h-[300px] hidden  from-[#39B54A] to-[#29ABE2] i md:justify-around  items-center ">
            <div className="flex flex-col items-center h-full justify-center">
              <h1 className="text-white font-bold text-4xl font-sans">
                AandataGuru.<span className="text-green-500">AI</span>
              </h1>
              <p className="text-white mt-1 max-w-[350px] text-xs text-center">
                True networking does not mean meeting people; it means becoming
                the type of person other people want to meet
              </p>
              <Link href="/login">
                <button
                  type="submit"
                  className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Login
                </button>
              </Link>
            </div>
            <div className="absolute hidden md:inline-block -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
        </div>
        <Modal open={open} onClose={(e) => {}}>
          <div className="absolute outline-none w-[600px]  shadow-lg bg-[whitesmoke] border border-black/20  top-[20%] left-[50%] -translate-x-[50%]">
            <div className="flex relative w-full h-full flex-col p-6  items-center">
              <p className="text-black font-semibold capitalize text-xl italic ">
                Verify Your Account
              </p>
              <div className="border mb-4 border-blue-500 w-[20%] mt-0.5" />
              <Image
                src="/login.avif"
                width={150}
                height={150}
                className="my-4"
              />
              <p className="text-gray-600 italic mb-2 text-center">
                Enter The Otp Sent To Whatsapp
              </p>
              <div className="w-full flex justify-center items-center">
                <input
                  type="text"
                  ref={otpRef}
                  placeholder="Enter Otp"
                  className="px-3 py-1.5 border  text-gray-600 border-black/30 focus:text-black placeholder:text-gray-400 outline-none placeholder:font-semibold placeholder:text-sm placeholder:text-center rounded-md shadow-lg mb-3"
                />
              </div>

              <button
                className="bg-[#006ce6] px-8 py-1.5 text-white rounded-[5px] font-semibold shadow-lg shadow-slate-200 transition-all duration-300 ease-in-out hover:animate-pulse"
                onClick={handleOtp}
              >
                Verify Number
              </button>
              <p className="text-sm italic text-gray-500 my-2">
                Check Your Whatsapp Inbox
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default signup;
