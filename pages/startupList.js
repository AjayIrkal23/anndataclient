import { AuthContext } from "@/Contexts/Auth";
import InvestorSingle from "@/components/InvestorSingle";
import axios from "axios";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const startupList = () => {
  const [open, setOpen] = useState(false);
  const { user, users, setUsers, socket, profiles, setProfiles } =
    useContext(AuthContext);

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

  const getUsers = async (data) => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/getAllUsers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        console.log(error); // Handle Login Error
        toast.error("Something Went Wrong");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Head>
        <title>Member's List</title>
      </Head>
      <div className="w-full h-full mb-6">
        <div>
          <div className="">
            <h1 className="font-sanserif font-semibold text-4xl tracking-wider text-gray-700 text-center mt-7   ">
              Member's List{" "}
            </h1>
            <div className="w-20  mx-auto h-1 mt-1 bg-blue-500 rounded-md" />
          </div>
          <div className="my-12 max-w-3xl mx-auto ">
            <div className="flex gap-6 space-y-4 flex-wrap justify-center items-center">
              {profiles?.map(
                (item) =>
                  item.type == "Member" &&
                  item.profileReady == "Done" && <InvestorSingle item={item} />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-6 py-2 text-lg hover:scale-105 transition-all duration-200 ease-in-out rounded-md shadow-md font-semibold mx-auto   ">
              View All Startup's
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default startupList;
