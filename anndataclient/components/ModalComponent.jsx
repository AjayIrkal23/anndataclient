import { Box, LinearProgress, Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import GeneralSec from "./GeneralSec";
import { AuthContext } from "@/Contexts/Auth";

import Member1 from "./Member1";
import Member2 from "./Member2";
import Member3 from "./Member3";
import Member4 from "./Member4";
import Member5 from "./Member5";
import Member6 from "./Member6";
import Bank1 from "./Bank1";
import Bank2 from "./Bank2";
import Bank5 from "./Bank5";
import Bank6 from "./Bank6";
import Bank7 from "./Bank7";
import Mentor1 from "./Mentor1";
import Mentor2 from "./Mentor2";
import Mentor3 from "./Mentor3";
import Mentor4 from "./Mentor4";
import Mentor5 from "./Mentor5";
import Marketing1 from "./Marketing1";
import Marketing2 from "./Marketing2";
import Marketing3 from "./Marketing3";
import Marketing5 from "./Marketing5";
import Marketing4 from "./Marketing4";

const ModalComponent = ({
  open,
  setOpen,
  progress,
  setProgress,
  phaseOne,
  setPhaseOne,
  phaseTwo,
  setPhaseTwo,
  phaseThree,
  setPhaseThree,
  phaseFour,
  setPhaseFour,
  phasefive,
  setPhasefive,
  phaseSix,
  setPhaseSix,
}) => {
  const { user } = useContext(AuthContext);

  console.log(user);

  const style = {
    position: "absolute",
    top: "10%",

    p: 4,
  };

  return (
    <Modal open={open} onClose={(e) => {}}>
      <>
        {user.type === "Bank" && (
          <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-[50%] bg-white rounded-md shadow-md p-4  flex flex-col ">
            <h1 className="text-center  text-sm font-semibold text-gray-600 ">
              Complete Your Profile Details To Start Meeting People
            </h1>
            <div className="flex gap-3 items-center ">
              <div className="flex-[1]">
                <LinearProgress variant="determinate" value={progress} />
              </div>

              <p className="text-gray-700 text-sm italic font-semibold font-nunito animate-pulse">
                {progress}%
              </p>
            </div>
            <div>
              <h1 className="text-center text-xl font-nunito text-gray-800 ">
                Profile Details
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-xl mb-3" />
            </div>
            {phaseOne ? (
              <div>
                {phaseTwo ? (
                  <>
                    {" "}
                    {phaseThree ? (
                      <div>
                        {" "}
                        {phaseFour ? (
                          <Bank6 setOpen={setOpen} />
                        ) : (
                          <Bank7
                            setPhaseFour={setPhaseFour}
                            setProgress={setProgress}
                          />
                        )}
                      </div>
                    ) : (
                      <Bank5
                        setPhaseThree={setPhaseThree}
                        setProgress={setProgress}
                      />
                    )}
                  </>
                ) : (
                  <Bank2 setPhaseTwo={setPhaseTwo} setProgress={setProgress} />
                )}
              </div>
            ) : (
              <Bank1 setProgress={setProgress} setPhaseOne={setPhaseOne} />
            )}
          </div>
        )}
        {user.type === "Member" && (
          <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-[50%] bg-white rounded-md shadow-md p-4  flex flex-col ">
            <h1 className="text-center  text-sm font-semibold text-gray-600 ">
              Complete Your Profile Details To Start Meeting People
            </h1>
            <div className="flex gap-3 items-center ">
              <div className="flex-[1]">
                <LinearProgress variant="determinate" value={progress} />
              </div>

              <p className="text-gray-700 text-sm italic font-semibold font-nunito animate-pulse">
                {progress}%
              </p>
            </div>
            <div>
              <h1 className="text-center text-xl font-nunito text-gray-800 ">
                Profile Details
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-xl mb-3" />
            </div>
            {phaseOne ? (
              <div>
                {phaseTwo ? (
                  <div>
                    {phaseThree ? (
                      <Member6 setOpen={setOpen} />
                    ) : (
                      <Member5
                        setPhaseThree={setPhaseThree}
                        setProgress={setProgress}
                      />
                    )}
                  </div>
                ) : (
                  <Member2
                    setPhaseTwo={setPhaseTwo}
                    setProgress={setProgress}
                  />
                )}
              </div>
            ) : (
              <Member1 setProgress={setProgress} setPhaseOne={setPhaseOne} />
            )}
          </div>
        )}
        {user.type === "Mentor" && (
          <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-[50%] bg-white rounded-md shadow-md p-4  flex flex-col ">
            <h1 className="text-center  text-sm font-semibold text-gray-600 ">
              Complete Your Profile Details To Start Meeting People
            </h1>
            <div className="flex gap-3 items-center ">
              <div className="flex-[1]">
                <LinearProgress variant="determinate" value={progress} />
              </div>

              <p className="text-gray-700 text-sm italic font-semibold font-nunito animate-pulse">
                {progress}%
              </p>
            </div>
            <div>
              <h1 className="text-center text-xl font-nunito text-gray-800 ">
                Profile Details
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-xl mb-3" />
            </div>
            {phaseOne ? (
              <div>
                {phaseTwo ? (
                  <div>
                    {phaseThree ? (
                      phaseFour ? (
                        <div>
                          {phasefive ? (
                            <div>
                              {phaseSix ? (
                                <Mentor4 setOpen={setOpen} />
                              ) : (
                                <Member2
                                  setProgress={setProgress}
                                  p="90"
                                  setPhaseTwo={setPhaseSix}
                                />
                              )}
                            </div>
                          ) : (
                            <Member1
                              setPhaseOne={setPhasefive}
                              setProgress={setProgress}
                              p="80"
                            />
                          )}
                        </div>
                      ) : (
                        <Mentor5
                          setPhaseFour={setPhaseFour}
                          setProgress={setProgress}
                        />
                      )
                    ) : (
                      <Mentor3
                        setPhaseThree={setPhaseThree}
                        setProgress={setProgress}
                      />
                    )}
                  </div>
                ) : (
                  <Mentor2
                    setPhaseTwo={setPhaseTwo}
                    setProgress={setProgress}
                  />
                )}
              </div>
            ) : (
              <Mentor1 setProgress={setProgress} setPhaseOne={setPhaseOne} />
            )}
          </div>
        )}
        {user.type === "Marketing" && (
          <div className="absolute top-[5%] md:top-[10%] left-[50%] -translate-x-[50%] bg-white rounded-md shadow-md p-4  flex flex-col ">
            <h1 className="text-center  text-sm font-semibold text-gray-600 ">
              Complete Your Profile Details To Start Meeting People
            </h1>
            <div className="flex gap-3 items-center ">
              <div className="flex-[1]">
                <LinearProgress variant="determinate" value={progress} />
              </div>

              <p className="text-gray-700 text-sm italic font-semibold font-nunito animate-pulse">
                {progress}%
              </p>
            </div>
            <div>
              <h1 className="text-center text-xl font-nunito text-gray-800 ">
                Profile Details
              </h1>
              <div className="w-20 h-1 bg-blue-500 mx-auto rounded-xl mb-3" />
            </div>
            {phaseOne ? (
              <div>
                {phaseTwo ? (
                  <div>
                    {phaseThree ? (
                      phaseFour ? (
                        <Marketing5 setOpen={setOpen} />
                      ) : (
                        <Marketing4
                          setPhaseFour={setPhaseFour}
                          setProgress={setProgress}
                        />
                      )
                    ) : (
                      <Marketing3
                        setPhaseThree={setPhaseThree}
                        setProgress={setProgress}
                      />
                    )}
                  </div>
                ) : (
                  <Marketing2
                    setPhaseTwo={setPhaseTwo}
                    setProgress={setProgress}
                  />
                )}
              </div>
            ) : (
              <Marketing1 setProgress={setProgress} setPhaseOne={setPhaseOne} />
            )}
          </div>
        )}
      </>
    </Modal>
  );
};

export default ModalComponent;
