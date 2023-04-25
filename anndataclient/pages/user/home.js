import { AuthContext } from "@/Contexts/Auth";
import ModalComponent from "@/components/ModalComponent";
import ProfileCard from "@/components/ProfileCard";
import SecondNavbar from "@/components/SecondNavbar";
import SecondaryNav from "@/components/SecondaryNav";
import {
  Chat,
  Connection,
  House,
  Members,
  Mentor,
  Rupees,
  Settings,
} from "@/components/svgs";
import { Modal } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Blocks } from "react-loader-spinner";

const UserDashboard = (props) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phaseOne, setPhaseOne] = useState(false);
  const [before, setBefore] = useState(false);
  const [after, setAfter] = useState(false);
  const [phaseTwo, setPhaseTwo] = useState(false);
  const [phaseThree, setPhaseThree] = useState(false);
  const [phaseFour, setPhaseFour] = useState(false);
  const [phasefive, setPhasefive] = useState(false);
  const [phaseSix, setPhaseSix] = useState(false);
  const [notPaid, setNotPaid] = useState(false);
  const router = useRouter();

  const {
    user,
    users,
    setUsers,
    socket,
    profiles,
    setProfiles,
    mainNav,
    setMainNav,
  } = useContext(AuthContext);

  const getUsersInArray = () => {
    let realUsers = [];
    let types = ["Member", "Mentor", "Marketing", "Bank"];
    for (let index = 0; index < 4; index++) {
      Object.keys(users).length > 1 &&
        users[types[index]].map((item) => {
          realUsers.push({ ...item, type: types[index] });
        });
    }
    setProfiles(realUsers);
  };

  useEffect(() => {
    if (users) {
      getUsersInArray();
    }
  }, [users]);

  useEffect(() => {
    if (user) {
      if (Object.keys(user).length < 1) {
        router.push("/login");
      } else {
        setChecked(true);
        ("addUsers");
        socket?.current.emit("addUsers", user);
        socket?.current.on("getUsers", (users) => {}, [user]);
      }
    }
  }, [user]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token}`,
  };
  useEffect(() => {
    getData();
    getUsers();
  }, []);

  const showRazorPay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
    script.onload = () => {
      HandlePayment();
    };
  };

  const getUsers = async (data) => {
    if (user) {
      if (Object.keys(user).length > 1) {
        await axios
          .get(`${process.env.NEXT_PUBLIC_URL}/api/getAllUsers`, {
            headers: headers,
          })
          .then((response) => {
            setUsers(response.data);
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            console.log(error); // Handle Login Error
            toast.error("Something Went Wrong");
          });
      }
    }
  };

  const handleUpload = async (data) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_URL}/api/updateUserDetails`,
        {
          paid: true,
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((response) => {
        setNotPaid(false);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    if (open == false) {
      getData1();
    }
  }, [open]);

  const getData1 = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((res) => {
        if (res.data?.paid != true && res.data?.profileReady == "Done") {
          setNotPaid(true);
          showRazorPay();
        } else {
          setNotPaid(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const HandlePayment = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/payment`,
      {},
      { headers: headers }
    );

    const options = {
      key: "rzp_test_L36esytYvjRbfR",
      amount: res.data.amount,
      currency: res.data.currency,
      name: "Aandata.Guru",
      description: "Test Transaction",
      order_id: res.data.id,
      handler: function (response) {
        toast.success(`Payment Success`);
        handleUpload();
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#39B54A",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      toast.error(`${response?.error?.description} ${response.error.reason}`, {
        duration: 8000,
      });
    });
  };

  const getData = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_URL}/api/getSingleUser`,
        {
          email: user.email,
          type: user.type,
        },
        { headers: headers }
      )
      .then((res) => {
        if (res.data?.paid != true && res.data?.profileReady == "Done") {
          setNotPaid(true);
        } else {
          setNotPaid(false);
        }
        if (!res.data?.profileReady) {
          setOpen(true);
        } else if (res.data.profileReady == "1") {
          setPhaseOne(true);
          setProgress(25);
          setOpen(true);
        } else if (res.data.profileReady == "2") {
          setPhaseTwo(true);
          setPhaseOne(true);
          setProgress(50);
          setOpen(true);
        } else if (res.data.profileReady == "3") {
          setPhaseThree(true);
          setPhaseTwo(true);
          setPhaseOne(true);
          setProgress(75);
          setOpen(true);
        } else if (res.data.profileReady == "4") {
          setPhaseThree(true);
          setPhaseTwo(true);
          setPhaseOne(true);
          setPhaseFour(true);
          setProgress(85);
          setOpen(true);
        } else if (res.data.profileReady == "5") {
          setPhaseThree(true);
          setPhaseTwo(true);
          setPhaseOne(true);
          setPhaseFour(true);
          setPhasefive(true);
          setProgress(90);
          setOpen(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getData();
    getUsers();
  }, []);

  if (!checked)
    return (
      <div className="flex justify-center">
        <Blocks
          height="200"
          width="200"
          color="blue"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {notPaid ? (
        <div>
          <p className="text-center text-gray-600 italic font-semibold flex flex-col items-center justify-center">
            Please Pay the Registration Amount to Continue
          </p>
          <div className="flex justify-center">
            <img src="/c.png" className="w-28 h-28 my-6" alt="" />
          </div>
          <p
            className="my-4 text-gray-600 italic text-sm underline text-center cursor-pointer"
            onClick={showRazorPay}
          >
            Click Here to Pay
          </p>
        </div>
      ) : (
        <div className="bg-[#f6f3f2]  min-h-screen ">
          <div className=" flex md:space-x-12 p-2 max-w-7xl mx-auto py-6   ">
            <SecondaryNav />
            <div className="lg:basis-2/4 md:basis-3/4 flex flex-col w-full space-y-4 ">
              <div className="bg-white border rounded-t-xl rounded-br-xl  p-4 border-[#29ABE2] ">
                <p className="text-lg font-semibold text-center text-gray-700 font-nunito">
                  Welcome to Aandata.Guru
                </p>
                <p className="text-gray-700 italic text-center text-sm">
                  Find Your Perfect Professional Match{" "}
                </p>
                <p className="text-gray-700 italic text-center text-sm">
                  Connect With Them Now....
                </p>
              </div>
              {profiles?.map(
                (item) =>
                  item.profileReady == "Done" &&
                  item.email != user?.email && <ProfileCard item={item} />
              )}
            </div>

            <div className="basis-1/4  lg:flex flex-col justify-between hidden  items-center w-full ">
              <div className="border p-2 flex flex-col bg-white justify-center items-center w-full space-y-3 rounded-md cursor-pointer hover:shadow-xl shadow-blue-200 transition-all duration-200 ease-in-out ">
                <Image
                  src="/invitation.png"
                  width={120}
                  height={120}
                  alt="p-4"
                />
                <p className="text-gray-600 font-semibold ">Invite Friends</p>
                <p className="text-xs text-center  text-gray-600">
                  We need innovators and disruptors. Know someone who fits the
                  bill? Invite them to apply and be a part of the network.
                </p>
                <p className="my-3 text-xs text-[#29ABE2] hover:underline">
                  Learn More
                </p>
              </div>
            </div>
          </div>

          <ModalComponent
            open={open}
            setOpen={setOpen}
            progress={progress}
            setProgress={setProgress}
            phaseOne={phaseOne}
            setPhaseOne={setPhaseOne}
            phaseTwo={phaseTwo}
            setPhaseTwo={setPhaseTwo}
            phaseThree={phaseThree}
            setPhaseThree={setPhaseThree}
            phaseFour={phaseFour}
            setPhaseFour={setPhaseFour}
            phasefive={phasefive}
            before={before}
            setBefore={setBefore}
            after={after}
            setAfter={setAfter}
            setPhasefive={setPhasefive}
            phaseSix={phaseSix}
            setPhaseSix={setPhaseSix}
          />
        </div>
      )}
    </>
  );
};

export default UserDashboard;
