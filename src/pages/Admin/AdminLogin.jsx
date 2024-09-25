import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAdminLoginQuery, useGetAdminDataQuery } from "../../redux/api/api";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../constant/config";
import { adminExists, adminNotExists } from "../../redux/reducers/auth";

const AdminLogin = () => {
  // const [isLogged, setIsLogged] = useState(false);
  const [secret, setSecret] = useState("");

  const dispatch = useDispatch();

  const { isAdmin } = useSelector((state) => state.auth);

  const adminLoginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${server}/api/v1/admin/verify`,
        { secretKey: secret },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(adminExists(data.success));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(adminNotExists(false));
    }
  };
  useEffect(() => {
    axios
      .get(`${server}/api/v1/admin`, { withCredentials: true })
      .then(() => dispatch(adminExists()))
      .catch(() => {
        dispatch(adminNotExists());
      });
  }, []);
  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div>
      <div className="w-full h-[100vh] grid justify-center items-center ">
        <div className=" w-[300px] h-[300px] p-5 shadow-lg bg-slate-300 rounded-md flex flex-col justify-center  items-center gap-3">
          <h2 className=" text-lg  font-semibold">Admin Login Page</h2>
          <form className=" flex flex-col gap-5" onSubmit={adminLoginHandler}>
            <input
              placeholder="Enter secret key"
              type="password"
              name="password"
              value={secret}
              onChange={(e) => {
                setSecret(e.target.value);
              }}
              className=" outline-none border-b-2 border-black bg-transparent"
            />
            <button className=" bg-blue-600 rounded-md text-white">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
