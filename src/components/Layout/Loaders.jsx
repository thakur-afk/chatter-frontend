import React from "react";

export const LayoutLoader = () => {
  return (
    <div>
      <div className="h-[100vh]">
        <div className="h-full grid grid-cols-12 gap-2 animate-pulse">
          <div className=" bg-gray-200 col-span-3 max-sm:hidden sm:col-span-4  md:col-span-3"></div>
          <div className="h-full md:col-span-6 max-sm:col-span-12 sm:col-span-8 ">
            <div className=" flex flex-col gap-8 mt-8 ">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className=" rounded-lg w-full  h-[6rem] animate-pulse bg-gray-200 "
                ></div>
              ))}
            </div>
          </div>
          <div className="h-full bg-gray-200 col-span-3 max-md:hidden  "></div>
        </div>
      </div>
    </div>
  );
};

export const BackDrop = () => {
  return (
    <div className=" absolute  bg-black right-0 opacity-50 w-[100vw] h-[100vh] backdrop-blur-[100vh] top-0"></div>
  );
};

export const ChatListLoader = ({ w = "100%" }) => {
  <div className={`flex flex-col p-2 gap-2 w-[${w}] animate-pulse`}></div>;
};

export const TypingLoader = () => {
  return (
    <div className={`bg-white w-fit px-4 py-1 rounded-lg`}>
      <p>Typing...</p>
    </div>
  );
};
