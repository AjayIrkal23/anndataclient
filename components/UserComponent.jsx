import React, { useState } from "react";
import ProfileModel from "./ProfileModel";

const UserComponent = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const HandleDelete = (id) => {
    let ans = prompt("Please Enter yes to delete");

    if (ans?.toLowerCase() === "yes") {
      console.log("Delete user");
    } else {
      alert("User Deleting Action Was Not Completed");
    }
  };
  return (
    <div key={item?.key}>
      {show && (
        <ProfileModel handleClose={handleClose} item={item} show={show} />
      )}
      {hovered ? (
        <div
          onMouseLeave={(e) => setHovered(!hovered)}
          key={item?.id}
          className="flex text-center relative bg-[#29ABE2]   text-sm italic cursor-pointer  "
        >
          <div className=" w-full  flex  justify-center items-center  ">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5231/5231019.png"
              className="w-20 h-20 rounded-lg p-2"
              alt=""
            />
            <p className="font-semibold text-white italic "> {item?.name}</p>
            <div className="flex space-x-4 ml-4">
              {" "}
              <button
                className="bg-red-500 px-3 py-1.5 text-white shadow-md rounded-md hover:bg-red-700 transition-all duration-200 ease-in-out"
                onClick={(e) => HandleDelete(item?.id)}
              >
                Delete
              </button>
              <button
                className=" bg-[#FCEE21] px-3 py-1.5 text-black shadow-md rounded-md hover:bg-[#bfb310] transition-all duration-200 ease-in-out"
                onClick={(e) => setShow(true)}
              >
                View Complete Profile
              </button>
              <button className="bg-[black] px-3 py-1.5 text-white shadow-md rounded-md hover:bg-[#2d2d2d] transition-all duration-200 ease-in-out">
                Block
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={(e) => setHovered(true)}
          key={item?.id}
          className="flex text-center relative hover:bg-gray-100 group  text-sm italic cursor-pointer group  "
        >
          <p className="absolute top-[50%] left-[50%] bg-gray-500/70 rounded-lg shadow-lg transition-all duration-200 ease-in-out hidden group-hover:inline-block   text-white px-3 py-2 -translate-x-[50%] -translate-y-[50%]">
            Click To Edit Profile
          </p>
          <div className="border flex flex-col p-1 justify-center items-center basis-1/5 ">
            <p> {item?.name}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5231/5231019.png"
              className="w-20 h-20 rounded-lg p-2"
              alt=""
            />
          </div>
          <div className="border basis-1/5 p-2">{item?.id}</div>
          <div className="border basis-2/5 p-2">{item?.desc}</div>
          <div className="border basis-1/5 p-2">{item?.joinDate}</div>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
