import React from "react";
import AppLayout from "../components/Layout/AppLayout";

const Home = () => {
  return (
    <div className=" bg-gray-200 h-[100%] p-2">
      <h2 className=" text-center">Please Select the Friend to Chat</h2>
    </div>
  );
};

export default AppLayout()(Home);
