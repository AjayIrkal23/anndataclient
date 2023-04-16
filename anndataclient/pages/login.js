import Link from "next/link";
import { useForm } from "react-hook-form";

import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";

import { Blocks } from "react-loader-spinner";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "@mui/material/Modal";
import { AuthContext } from "@/Contexts/Auth";
import { useRouter } from "next/router";
import Head from "next/head";

const login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [otpBool, setOtpBool] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [password, setPassword] = useState(null);
  const emailChangeRef = useRef();
  const otpRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleOpen = () => setOpen(true);
  const router = useRouter();
  const { userLogin, user, userLogout } = useContext(AuthContext);

  if (Object.keys(user).length > 0) {
    router.push("/user/home");
    return null;
  }

  const SendOtp = async (data) => {
    if (!value) {
      toast.error("Please Select Account Type");
    } else {
      setLoading(true);

      await axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/sendOtp`, {
          email: data.username,
          nakedpassword: data.password,
          type: value,
        })
        .then((response) => {
          setOtpBool(true);
          toast.success("Otp Sent Please Enter");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.dismiss();
          console.log(error); // Handle Login Error
          if (error?.response?.status === 400) {
            toast.error("Please Enter Correct Password");
          } else if (error?.response?.status === 404) {
            toast.error("User Not Found");
          } else if (error?.response?.status === 300) {
            toast.error("Verify your Email");
            router.push({
              pathname: "/signup",
              query: {
                emailVerification: true,
                email: data.username,
                type: value,
              },
            });
          } else {
            toast.error("Something Went Wrong");
          }
        });
    }
  };
  const onSubmit = async (data) => {
    if (!value) {
      toast.error("Please Select Account Type");
    } else {
      setLoading(true);

      await axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/signIn`, {
          email: data.username,
          nakedpassword: data.password,
          type: value,
        })
        .then((response) => {
          userLogin({
            token: response.data.token,
            name: response.data.name,
            email: response.data.email,
            type: value,
          });
          toast.dismiss();
          router.push("/user/home");
          setLoading(false);
          toast.success("Login Successful");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.dismiss();
          console.log(error); // Handle Login Error
          if (error?.response?.status === 400) {
            toast.error("Please Enter Correct Password");
          } else if (error?.response?.status === 404) {
            toast.error("User Not Found");
          } else if (error?.response?.status === 300) {
            toast.error("Verify your Email");
            router.push({
              pathname: "/signup",
              query: {
                emailVerification: true,
                email: data.username,
                type: value,
              },
            });
          } else {
            toast.error("Something Went Wrong");
          }
        });
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (emailChangeRef.current.value.includes("@")) {
      setEmailLoading(true);
      await axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/reqPass`, {
          email: emailChangeRef.current.value,
          type: value,
        })
        .then((response) => {
          setEmailLoading(false);
          setEmailSent(true);
          setEmail(emailChangeRef.current.value);
        })
        .catch((error) => {
          toast.dismiss();
          console.log(error); // Handle Login Error
          toast.error("Something Went Wrong");

          setEmailLoading(false);
        });
    } else {
      toast.dismiss();
      toast.error("Please Enter Valid Email Address");
    }
  };

  const handlePasswordChangeRequest = async () => {
    if (passwordRef.current.value.length > 8) {
      if (confirmPasswordRef?.current?.value === passwordRef?.current?.value) {
        // Change password api;
        await axios
          .post(`${process.env.NEXT_PUBLIC_URL}/api/verifyOtp`, {
            otp: otpRef.current.value,
            password: passwordRef.current.value,
            email: email,
            type: value,
          })
          .then((response) => {
            passwordRef.current.value = "";
            confirmPasswordRef.current.value = "";

            setEmailLoading(false);
            setEmailSent(false);
            toast.success("Password Changed, Please Login");
            setEmail(null);
            setOpen(false);
          })
          .catch((error) => {
            console.log(error);
            toast.error("Otp Incorrect or Otp Expired");
          });
      } else {
        toast.dismiss();
        toast.error("Passwords do not Match");
      }
    } else {
      toast.dismiss();
      toast.error("Password length cannot be less then 8");
    }
  };

  const handleClose = () => {
    setEmailLoading(false);
    setEmailSent(false);

    setOpen(false);
  };

  console.log(!otpBool && value == "Member");

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="px-1">
        <div className=" md:flex">
          <div className="relative overflow-hidden md:flex md:w-1/2 bg-gradient-to-tr md:h-auto h-[300px]  from-[#39B54A] to-[#29ABE2] i md:justify-around  items-center ">
            <div className="flex flex-col items-center h-full justify-center">
              <h1 className="text-white font-bold text-4xl font-sans">
                Aandata.Guru
              </h1>
              <p className="text-white mt-1">
                Connect People Together Professionally
              </p>
              <Link href="/signup">
                <button
                  type="submit"
                  className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Signup
                </button>
              </Link>
            </div>
            <div className="absolute hidden md:inline-block -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute hidden md:inline-block  -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form
              className="bg-white"
              onSubmit={
                !otpBool && value == "Member"
                  ? handleSubmit(SendOtp)
                  : handleSubmit(onSubmit)
              }
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Hello Again!
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-7">
                Welcome Back
              </p>

              <div
                className={`flex items-center border-2 py-2 mb-4 px-3 rounded-2xl ${
                  errors.username && "!border-red-500"
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
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>

                <input
                  className="pl-2 outline-none border-none"
                  placeholder="Phone Number"
                  {...register("username", { required: true })}
                />
              </div>

              <div
                className={` items-center border-2 py-2 px-3 rounded-2xl ${
                  errors.password && "!border-red-500"
                } ${!otpBool && value == "Member" ? "hidden" : "flex"}`}
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
                  {...register("password", {
                    required: value == "Member" ? false : true,
                  })}
                  placeholder={value == "Member" ? "OTP" : "Password"}
                  type="password"
                />
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
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Login
              </button>

              {value != "Member" && (
                <span
                  className="text-sm ml-2 hover:text-blue-500 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  Forgot Password ?
                </span>
              )}
            </form>
          </div>
        </div>
        <Modal open={open} onClose={(e) => {}}>
          <div className="absolute outline-none w-[600px]  shadow-lg bg-[white] border border-black/20  top-[20%] left-[50%] -translate-x-[50%]">
            <div className="flex relative w-full h-full flex-col p-6  items-center">
              <p className="text-black font-semibold capitalize text-xl italic ">
                Reset Your Password
              </p>
              <div className="border mb-4 border-blue-500 w-[20%] mt-0.5" />
              <img src="/network.png" alt="" className="w-[200px] h-[200px]" />
              {emailSent ? (
                <div>
                  <div className="w-full">
                    <p className="text-gray-600 italic mb-2 text-center">
                      Enter The Otp Sent To Email
                    </p>
                    <div className="w-full flex justify-center items-center">
                      <input
                        type="text"
                        ref={otpRef}
                        placeholder="Enter Otp"
                        className="px-3 py-1.5 border  text-gray-600 border-black/30 focus:text-black placeholder:text-gray-400 outline-none placeholder:font-semibold placeholder:text-sm placeholder:text-center rounded-md shadow-lg mb-3"
                      />
                    </div>

                    <p className="text-gray-600 italic mb-2 text-center">
                      Enter Your New Password
                    </p>
                    <div className="flex gap-4 items-center ">
                      <input
                        type="password"
                        ref={passwordRef}
                        placeholder=" New Password"
                        className="px-3 py-1.5 border text-gray-600 border-black/30 focus:text-black placeholder:text-gray-400 outline-none placeholder:font-semibold placeholder:text-sm placeholder:text-center rounded-md shadow-lg mb-3"
                      />
                      <input
                        type="password"
                        ref={confirmPasswordRef}
                        placeholder="Confirmation Password"
                        className="px-3 py-1.5 border text-gray-600 border-black/30 focus:text-black placeholder:text-gray-400 outline-none placeholder:font-semibold placeholder:text-sm placeholder:text-center rounded-md shadow-lg mb-3"
                      />
                    </div>
                    <button
                      onClick={handlePasswordChangeRequest}
                      className="block mx-auto px-12 py-2 font-semibold my-2 transition-all duration-300 ease-in-out border-2 rounded-sm border-[#006ce6]  hover:border-black hover:text-[black] "
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col w-full h-full items-center ">
                  <p className="text-black text-xl mb-3 font-semibold">
                    Forgot Password?{" "}
                  </p>
                  <p className="text-gray-600 italic mb-2">
                    {" "}
                    Enter Your Email to Reset Password
                  </p>
                  <form
                    onSubmit={handlePasswordChange}
                    className="flex flex-col justify-center items-center"
                  >
                    <div>
                      <input
                        type="text"
                        ref={emailChangeRef}
                        placeholder="Enter Your Mail"
                        className="px-3 py-1.5 border text-gray-600 border-black/30 focus:text-black placeholder:text-gray-400 outline-none placeholder:font-semibold placeholder:text-sm placeholder:text-center rounded-md shadow-lg mb-3"
                      />
                    </div>

                    <div>
                      <select
                        className="w-full text-sm bg-transparent text-gray-500 font-semibold   shadow-md border  py-2 px-3 rounded-md border-black/20"
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
                    <p className="text-sm italic text-gray-500 my-2">
                      Check Your Spam/Junk folder in Email
                    </p>
                    {emailLoading ? (
                      <button className="inline-block px-12 py-2 font-semibold my-2 transition-all duration-300 ease-in-out border-2 rounded-sm border-[#006ce6]  hover:border-black hover:text-[black] ">
                        <Blocks
                          height="25"
                          width="50"
                          color="blue"
                          ariaLabel="bars-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-block px-8 text-white shadow-md rounded-md py-1 font-semibold my-2 transition-all duration-300 ease-in-out border-2  border-[#006ce6] bg-[#006ce6]   hover:animate-pulse "
                      >
                        Submit
                      </button>
                    )}
                  </form>
                </div>
              )}
              <button className="">
                <XMarkIcon
                  className="absolute w-8 h-8 text-white right-0 top-0 bg-black rounded-lg shadow-lg font-semibold cursor-pointer hover:text-red-500 "
                  onClick={handleClose}
                />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default login;
