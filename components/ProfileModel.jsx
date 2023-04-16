import React from "react";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileModel = ({ handleClose, item, show }) => {
  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex-col">
            <div className="flex items-center gap-6 border-b pb-4 border-black/20">
              <div className="bg-gray-200 rounded-full  ">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5231/5231019.png"
                  alt=""
                  className="rounded-full w-20 h-20"
                />
              </div>
              <div className="bg-blue-500 w-[80%] px-3 py-2 text-white rounded-md shadow-md">
                <p className="  italic tracking-wide">{item?.name}</p>
                <p className=" italic text-sm">Founder of DocketRun</p>
              </div>
            </div>
            <div>
              <div>
                <h1 className="text-center font-semibold  text-lg py-2">
                  Basic Info
                </h1>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between">
                  <p className="text-gray-600 italic">
                    <span className="font-semibold text-black">Name</span> :
                    Ajay Irkal
                  </p>
                  <p className="text-gray-600 italic">
                    <span className="font-semibold text-black">Role</span> : SE
                    (Software Eng)
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 italic">
                    <span className="font-semibold text-black">City</span> :
                    Hubli
                  </p>
                  <p className="text-gray-600 italic">
                    <span className="font-semibold text-black">State</span> :
                    Karnataka
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-600 italic ">
                    <span className="font-semibold  text-black">
                      Profession
                    </span>{" "}
                    :{" "}
                    <span className="text-sm">
                      Ashish is an entrepreneur in the automobile manufacturing
                      domain and focuses in providing affordable vehicle
                      services and cleaning with the most affordable and
                      transparent services. He also holds experience as a
                      consulting psychologist.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModel;
