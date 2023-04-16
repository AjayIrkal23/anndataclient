import React from "react";
import { motion } from "framer-motion";

const TabComponent = ({ tab }) => {
  const getInvestor = () => {
    return [
      { name: "Ajay Irkal", profession: "Director At Google", img: "/i1.avif" },
      {
        name: "Akash Ladwa",
        profession: "Managing Partner At Facebook,Instagram",
        img: "/i2.jpeg",
      },
      { name: "Elon Musk", profession: "Director At Tesla", img: "/i3.jpeg" },
    ];
  };

  const getMentors = () => {
    return [
      { name: "Ajay Irkal", profession: "Director At Google", img: "/i1.avif" },
      {
        name: "Akash Ladwa",
        profession: "Managing Partner At Facebook,Instagram",
        img: "/i2.jpeg",
      },
      { name: "Elon Musk", profession: "Director At Tesla", img: "/i3.jpeg" },
    ];
  };

  const getMembers = () => {
    return [
      { name: "Ajay Irkal", profession: "Director At Google", img: "/i1.avif" },
      {
        name: "Akash Ladwa",
        profession: "Managing Partner At Facebook,Instagram",
        img: "/i2.jpeg",
      },
      { name: "Elon Musk", profession: "Director At Tesla", img: "/i3.jpeg" },
    ];
  };

  const getCompanies = () => {
    return [
      {
        company: "yes",
        img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAilBMVEUAAADlCRTsCRVyBQrrCRXoCRTvCRWJBQwlAwSzBxDHCBFBAwY7AgXdCRTSCBLhCRRoBAleBAgWAQLBCBGoBw+YBg3NCBK7CBB3BQodAQOTBg1kBAlUBAhYBAj1ChVtBQo2AwWABQtLAwfWCBMjAgOjBw4qAgQwAgVFBAfWJiyDBQspAwUaAQOlBg7vh4njAAAG4UlEQVR4nO2caVviPBSG29CmwiiIssmmiAuvOv//7720NMnJ0lqazjjheu5vhpimN0l7shFFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJ1wt+iVrLV0kdpbPMi0Va+a8SnLuiZLXtgp18OiJsvhlOdRJjxVVv4gy9mIpF+q6I2W9019sGgr63PLSkZaeiqStweZNuOsCj44ZZlUZykKK+9oW52FZ6c8I/k/j5WVz8TV+FwkvauiUy2vqpnKfC5XPC7hzzR9JJN/ybRBGleR3pdVqs5SFHbKdc2rsySlrBuRwG6rZSXi8n1HJZlmOZFX0G+0nax0chGyHplZp1NWlTxr64rIirVmG6ysiFztSqXK4mLW60KWVqtwZb3KDseWMnFFrtjalday6IMvXFmk8BtH1YlBH1niVgKXFc1kHXgZ0ES/SP9p70qTxXYXIWunnuUiWVVLy+kjKx00lpUaJEJWIpOoSoEtyywoZd6ySJQgmpHUR2/HT1bMPxvK2s8MhmXcMR3KJFWsyr03ZaVmQbPhwluWakdlM11KfbQ9eMpK1MOvVlby0aDkocjN1uZHpGVV/ruHrLX6Lvb6zRiB6rlossqytfKdsrIGJStZY/OjPywr2qtHfB6tqziVvB/boMkiI4GgZWWq2+WPh5nZLduiy1JDnqBlkQd6EkUHTv/y4cp4i4v0sGXNVQy6iPoqbpi4y2mKIYutyvSwZY3J6zZSF+NPDepdgyFLDnnClkXff6Rh3TtLaY7ZDUWvDlyWiqxiFR1zqyJnYspiZUwYuKxPx4CKBEYtMWWJEDdwWdG9PUilQ992mLJi/lKkhy6LBKKyHTSodD2WrHK+J3RZZMJUVPq1QaXrsWSZw6kOxoY/IktNmIobeWlQ6XosWTEv1r5qZaWT2172IcienCU3kpWOKPQJ7CvryXwYt14AU9iyTs21foomZSyRbN1v5GYtS7sfOsz1lUVGhKf7sOY+zseWdeoaZ8yU2jIKzpcVdyproT3i02FTIzU4ZBU3F76sSKutf9wQ6as79MoXIEtfD2gqpA6yIv2ffNlFFyHrmVwlmTYVUoeSlSzEpfMhzwXIUjU4FnLXVEgdZGOI7OT5kOcSZJEFsA7ihkiXJScz+MNFyCJhqecUaQmVtRIvW5Z9F2eVq4X+cRan0Kewv6yMyGKtN7BRiKw7OZ46DnnqI/jBpGBZML12lvzDwx26ccZrnxFBkyU7OX8LfmyobZw53ob7Gz0PTdZG/JEsZV1DnXUwnrAdzDkYslTnU004VFnWS6RBlb9Dl2XNa4Qry9zP47HhT6LLOtjv9FBlmTOl3ks7kSmL7BIIXNbS6iNki1BbDFlT+xphylILh4IOhoeGrHd74jRIWT17vSIeOcs4B0MWHXyGLGvmGJl5r7FasjJrnj9EWeRFRbZ2eo+mTVkP1jpiiLLoxhlyK77zNKYsa2ohRFl3ZKD+ogIu5reVzSFrZzwaf15W9aOmSpZ6px+jK9UlvTc7WLIiox82kvVwbY9Tu5KVDvv9yXS6261WB+MqVbJI7cf0neW7HGbLMrZUuGSxXfS+vu1ly9/9+XAYp5xze8t0V7JiMXPGWDHnFQ/ltSpkqUWwoi19qHbmc2IgcskyQhTn5N+x2vkxx0SeDnAMJjqTZZLKgKlClmpKrJhLUjfkcxYlcsmK9ODhvOMorip3LUvNPrtlqW3w5Wyyejd6rh46ZPU1J+HJUrtvy0kscojAb8LUIWul9cPgZJFlY3E60zk71wKHrCjslqXm5GTIvlRP/N/n6dFxydLmzYKTRTbcikjhq+Js87m4ZG1oqOUhS5ybs2SpnyqoXs8bVV+sVtZOjxtOkEMEPiedXLK0LYbNZCUOWaPhcHg/n8/7B/Mj8iMYlRUbjIoIhRdBSh5mqUOMtbL2rlffrTLoc4bOKYtOxVfIKiJFluS/KcFZcrP3ehbU8H59WI17u4/ptN8fDPY3+fVk35W/P6BkjUmvIMWouUD+1r4yTll0/wmVleShdKHnGEbPJ6/Z7nHz/PLgKvfP8fIuj65ladHwjnWSstT4Q5sZVV+/z4SpUxZ9uhJZ80H/93J3u35qf7nOuXsaP+6WEzFYvd7KA8fsi2Qjhwg8JkzdsqYsFo0o7WIp96+xmU7mw1He3Lg+DiRDtVXF/36PW9b19mbQf/14fPZfEfkR3te9TA8/1YjXY8JUyErTbSf7vf5Z8lF/2Sq+vs/t5oqneW9L9veeBxf/dTbLyeCGHd/cCW/9myGf+/l0sbn6PuNl8Dbevc69fq4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACJT/AXHmeW4t6wuWAAAAAElFTkSuQmCC",
      },
      {
        company: "yes",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/800px-Facebook_icon.svg.png",
      },
      {
        company: "yes",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/800px-Facebook_icon.svg.png",
      },
      {
        company: "yes",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/800px-Facebook_icon.svg.png",
      },
    ];
  };

  const datamap = [
    {
      name: "Startup Investment",
      heading: "Startup Investment",
      h2: "We help founders and investors discover each other and build trusted relationships",
      num1: "3,000+",
      num2: "1,50,000+",
      t1: "Investors & Founder",
      t2: "Connections made",
      img: "/startup.avif",
      imgt1:
        "Success is not final; failure is not fatal: it is the courage to continue that counts",
      buttont1: "Apply for Investment",
      buttont2: "Become an Investor",
      t3: "Investors on Annadata.guru",
      t4: "See All Investors",
      investorList: getInvestor(),
    },
    {
      name: "Opportunities",
      heading: "Career Opportunities",
      h2: "We help founders/CEOs discover senior talent to augment their leadership team",
      num1: "1,000+",
      num2: "1,00,000+",
      t1: "Professionals",
      t2: "Connections",
      img: "/opp.png",
      imgt1: "A wise man will make more opportunities than he finds",
      buttont1: "See Job Openings",
      buttont2: "Post a Job",
      t3: "Hiring Companies on Annadata.guru",
      t4: "See All Companies",
      investorList: getCompanies(),
    },
    {
      name: "Mentorship",
      heading: "Mentorship",
      h2: "We help mentors and mentees discover each other and build trusted relationships",
      num1: "5,000+",
      num2: "50,000+",
      t1: "Mentors & Mentees",
      t2: "Connections made",
      img: "/mentor.jpg",
      imgt1:
        "A mentor is someone who sees more talent and ability within you, than you see in yourself, and helps bring it out of you",
      buttont1: "Apply for Mentorship ",
      buttont2: "Become a Mentor",
      t3: "Mentors on Annadata.guru",
      t4: "See All Mentors",
      investorList: getMentors(),
    },
    {
      name: "Brainstorming",
      heading: "Brainstorming",
      h2: "We facilitate brainstorming and solving your business problems from domain experts",
      num1: "1,50,000+",
      num2: "20,00,000+",
      t1: "Professionals",
      t2: "Connections made",
      img: "/brain.png",
      imgt1: "An idea that's BOLD is worthless until SOLD",
      buttont1: "Join Now For Free",
      buttont2: "Signup Now",
      t3: "Members on Annadata.guru",
      t4: "See All Members",
      investorList: getMembers(),
    },
  ];
  return (
    <>
      {datamap?.map(
        (item, i) =>
          item.name == tab && (
            <motion.div
              key={i}
              initial={{
                x: -200,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
              className="md:w-[960px] mx-auto bg-white shadow-md rounded-xl md:px-12 px-6 py-8"
            >
              <div className="flex flex-col">
                <div className="flex pb-7 flex-col md:flex-row">
                  <div className="flex flex-col flex-[0.6]">
                    <div>
                      <h3 className="font-oswald  text-gray-800 md:text-3xl mb-4 text-2xl">
                        {item.heading}
                      </h3>
                      <p className="text-gray-800 mb-4 text-sm">{item.h2}</p>
                      <div className="flex justify-between md:w-[80%] w-full">
                        <div className="flex flex-col space-y-1 ">
                          <div className="md:text-2xl text-xl text-gray-800 ">
                            <p>{item.num1}</p>
                          </div>
                          <div className="text-gray-800 md:text-lg text-sm ">
                            <p>{item.t1}</p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <div className="md:text-2xl text-xl text-gray-800 ">
                            <p>{item.num2}</p>
                          </div>
                          <div className="text-gray-800 md:text-lg text-sm ">
                            <p>{item.t2}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-6">
                        <div className="mb-6 md:mb-0">
                          <button className="flex bg-[#29ABE2] rounded-md px-6 text-xs md:text-base gap-1 py-2 shadow-md border-[#29ABE2] bor border-2 duration-200  hover:bg-white hover:text-[#29ABE2] items-center transition-all ease-in-out  text-white font-semibold font-sans ">
                            {item.buttont1}{" "}
                            <span>
                              <svg
                                className=" w-5 h-5 mt-[1px] hidden :inlineblock"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                        <div>
                          <button className="flex border-2 border-[#29ABE2] hover:bg-[#29ABE2] text-xs md:text-base hover:text-white rounded-md px-6 gap-1 py-2 shadow-md  items-center transition-all ease-in-out  text-[#29ABE2] font-semibold font-sans ">
                            {item.buttont2}{" "}
                            <span>
                              <svg
                                className=" w-5 h-5 mt-[1px] hidden :inlineblock"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-[0.4] ">
                    {" "}
                    <img
                      src={item.img}
                      className="md:h-[260px] h-[220px] w-auto"
                      alt=""
                    />
                    <h3 className="text-sm italic text-gray-600">
                      {item.imgt1}
                    </h3>
                  </div>
                </div>
                <div className="border-t-[1px]">
                  <div className="flex flex-col my-6 ">
                    <div className="md:flex space-x-5 hidden">
                      <h3 className="font-nunito text-2xl">{item.t3}</h3>
                      <div className="flex gap-2 hover:scale-105 transition-all duration-200 ease-in-out items-center text-[#29ABE2] font-semibold cursor-pointer">
                        <p>{item.t4} </p>
                        <svg
                          className=" w-4 h-4 mt-1 "
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="md:flex hidden justify-between  mt-8 items-center">
                      {item?.investorList?.map((person, i) =>
                        person.company === "yes" ? (
                          <img
                            key={i}
                            src={person.img}
                            className="w-36 h-26 rounded-md"
                            alt=""
                          />
                        ) : (
                          <div className="flex  space-x-3 items-center" key={i}>
                            <div>
                              <img
                                src={person.img}
                                className="w-24 h-24 rounded-full shadow-md border"
                                alt=""
                              />
                            </div>
                            <div>
                              <h1 className="font-semibold ">{person.name}</h1>
                              <p className="font-normal italic w-44 text-gray-700 ">
                                {person.profession}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
      )}
    </>
  );
};

export default TabComponent;
