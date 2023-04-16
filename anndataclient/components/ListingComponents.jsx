import React, { useState } from "react";
import UserComponent from "./UserComponent";

const ListingComponents = ({ tab }) => {
  const [selectUser, setSelectUser] = useState("null");

  const users = [
    {
      name: "Ajay Irkal",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima iure dolorem nulla quam illo exercitatm maiores aspernatur necessitatibus!",
      id: "fasdadfgaew32323",
      joinDate: "21/20/2020",
    },
    {
      name: "Akash Kabady",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima iure dolorem nulla quam illo exercam maiores aspernatur necessitatibus!",
      id: "fasdadfgaew32323",
      joinDate: "21/20/2020",
    },
    {
      name: "Jay",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima iure dolorem nullssitatibus!",
      id: "fasdadfgaew32323",
      joinDate: "21/20/2020",
    },
    {
      name: "Lul",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima iure dolorem nulla quam illo exercitationem. Ratione, laudantium tibus!",
      id: "fasdadfgaew32323",
      joinDate: "21/20/2020",
    },
    {
      name: "Aditya",
      desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima iure dolorem nulla quam illo exercitationem. Ratione, laudantium quisquam? Eius labore expedita minima, veritatis nemo esse quisquam maiores aspernatur necessitatibus!",
      id: "fasdadfgaew32323",
      joinDate: "21/20/2020",
    },
  ];

  let meeting = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <div>
        {tab === "User Dashboard" && (
          <div className="flex flex-col">
            <div>
              <h1 className="text-2xl text-center italic text-gray-600 pb-1 border-b">
                User Dashboard
              </h1>
              <div className="border-b pb-6">
                <div>
                  <h1 className="text-center text-lg my-2 text-gray-800 font-semibold italic">
                    Add New User
                  </h1>
                  <div className="flex justify-center space-x-5">
                    <div>
                      <button
                        disabled={selectUser === "null"}
                        className={`${
                          selectUser === "null"
                            ? "bg-gray-500 hover:bg-gray-500"
                            : "bg-[#29ABE2]"
                        } px-6 py-1.5 text-white shadow-md rounded-md hover:bg-blue-600`}
                      >
                        Create New User
                      </button>
                    </div>
                    <div>
                      <select
                        name=""
                        id=""
                        className="border border-black/30 shadow-md py-1.5 px-3 bg-transparent rounded-md"
                        onChange={(e) => setSelectUser(e.target.value)}
                      >
                        <option
                          value="null"
                          defaultValue
                          disabled={selectUser !== "null"}
                        >
                          Select Type
                        </option>
                        <option value="Member">Member</option>
                        <option value="Mentor">Investor/Mentor</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Bank">Bank</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-center text-lg my-1  text-gray-800 font-semibold italic">
                Delete User
              </h1>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Search Name Here"
                  className="px-3 py-1.5 border border-black/30 placeholder:text-center placeholder:text-sm italic rounded-md focus:shadow-md outline-none "
                />
              </div>
              <div className=" m-6 flex flex-col overflow-scroll   border rounded-md ">
                <div className="flex text-center  bg-gray-100">
                  <div className="border py-2  basis-1/5">Name</div>
                  <div className="border py-2 basis-1/5">Id</div>
                  <div className="border py-2 basis-2/5">Description</div>
                  <div className="border py-2 basis-1/5">Join Date</div>
                </div>
                <div className=" flex flex-col overflow-scroll  h-[500px]  border rounded-md ">
                  {users.map((item) => (
                    <UserComponent item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "Manage Meetings" && (
          <div className="overflow-scroll h-screen">
            <div>
              <h1 className="text-center text-black italic my-1 text-2xl border-b pb-2 font-semibold ">
                Manage Meetings
              </h1>
              <div>
                <button className="bg-blue-500 text-center py-1.5 px-4 text-white italic flex mx-auto my-4 rounded-md shadow-md ">
                  Create New Meeting
                </button>
              </div>
              <div className="text-center italic text-gray-600 text-md">
                <h1 className="my-3">Current Meetings</h1>
              </div>
              <div className="flex overflow-scroll flex-col space-y-6">
                {meeting.map((item) => (
                  <div className="p-4 border relative  border-black/40 max-w-[800px] mx-auto rounded-md hover:shadow-md hover:shadow-blue-100 transition-all duration-200 group ease-in-out">
                    <div className="absolute content-none bg-[#29ABE2]/80 w-[770px] left-[50%] -translate-x-[50%] h-[200px] shadow-md shadow-blue-500/30 rounded-md hidden group-hover:inline-block transition-all duration-300 ease-in-out ">
                      <div className="flex gap-3 w-full h-full justify-center items-center">
                        <button className="px-3 py-1.5 bg-black text-white rounded-md shadow-md shadow-blue-500/20 italic hover:scale-105 transition-all ease-in-out ">
                          {" "}
                          Cancal The Meeting
                        </button>
                        <button className=" bg-green-500 px-3 py-1.5  text-white rounded-md shadow-md shadow-blue-500/20 italic hover:scale-105 transition-all ease-in-out">
                          Reschedule Meeting
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col   ">
                      <div className="flex border-b pb-4  items-center gap-3 justify-between w-full">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80"
                            alt=""
                            className="w-20 h-20 rounded-full border"
                          />
                          <div>
                            {" "}
                            <p className="text-lg text-gray-600">
                              Ashish Chauhan
                            </p>
                            <p className="text-xs font-semibold">
                              Founder at Vehiclent Services{" "}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-semibold underline">With</p>
                        <div className="flex items-center gap-3">
                          <div>
                            {" "}
                            <p className="text-lg text-gray-600 text-right">
                              Ajay Irkal
                            </p>
                            <p className="text-xs font-semibold text-right ">
                              Founder of DocketRun{" "}
                            </p>
                          </div>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcLJjW4q3WawvgG5l1h-DWsZI0SuMEUgeRg&usqp=CAU"
                            alt=""
                            className="w-20 h-20 rounded-full border"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="mt-2 text-center  ">
                          <p className="italic text-gray-600 underline tracking-wider">
                            Meeting Short Description
                          </p>
                          <p className="text-xs">
                            Ashish is an entrepreneur in the automobile
                            manufacturing domain and focuses in providing
                            affordable vehicle services and cleaning with the
                            most affordable and transparent services. He also
                            holds experience as a consulting psychologist.
                          </p>
                        </div>
                        <div className="mt-2 text-center  ">
                          <p className="text-xs">
                            Ajay is a senior IT project manager with over a
                            decade of experience in planning, developing, and
                            managing IT projects. He has a strong background in
                            system architecture, software development, and IT
                            security.
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <div className="mt-2 text-center  ">
                          <p className="italic text-gray-600 underline tracking-wider">
                            Technical Details
                          </p>
                          <div className="flex justify-around">
                            <div className="text-xs flex-col">
                              <p className="">
                                <span className="font-semibold tracking-wider">
                                  Time
                                </span>{" "}
                                : 4 pm
                              </p>
                            </div>
                            <div className="text-xs flex-col">
                              <p className="">
                                <span className="font-semibold tracking-wider">
                                  Date
                                </span>{" "}
                                : 21/20/22 5:30 Pm
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Broadcast News" && <div>broardcast news</div>}
        {tab === "Match Users" && <div>Match user</div>}
        {tab === "Chats" && <div>chats</div>}
      </div>
    </div>
  );
};

export default ListingComponents;
