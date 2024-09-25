import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className=" grid justify-center items-center">
      <span className=" text-4xl font-bold">404</span>
      <h1>Page Not Found 404</h1>
      <Link to={"/"} className=" text-blue-400 underline">
        Go To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
