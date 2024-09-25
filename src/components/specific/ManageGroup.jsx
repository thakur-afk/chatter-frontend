import React from "react";

const ManageGroup = () => {
  return (
    <>
      {" "}
      <div className=" z-10 flex justify-center items-center absolute  bg-black opacity-40  right-0  mt-[8vh] w-[100vw] h-[92vh] backdrop-blur-[100vh] top-0"></div>
      <div className=" rounded-xl z-10 absolute top-[12%] left-[30%]  mx-auto my-2 bg-white w-[30%] h-[80%]">
        <div className="  flex flex-col p-4 items-center gap-4">
          <h2>Notifications</h2>

          <div className=" w-[70%] flex flex-col gap-4 p-2 ">
            <p>Friend Requests</p>
            {/* {searchResults.length > 0 ? (
              searchResults.map((user, i) => (
                <NotificationItem key={i} user={user} />
              ))
            ) : (
              <p>0 Notifications</p>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageGroup;
