import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { IoMdCamera } from "react-icons/io";
import axios from "axios";
import { server } from "../constant/config";
import { Headers } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const [dp, setDp] = useState("");
  const [isUser, setIsUser] = useState(true);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const toastId = toast.loading("Loggin in...");

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          username: username,
          password: password,
        },
        config
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Signing in...");

    var formData = new FormData();

    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("avatar", dp);

    const config = {
      withCredentials: true,
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#90D26D] ">
      {isUser ? (
        <div className="w-full h-[100vh] grid justify-center items-center ">
          <div className=" w-[300px] h-[300px] p-5 shadow-lg bg-slate-300 rounded-md flex flex-col justify-center  items-center gap-3">
            <h2 className=" text-lg  font-semibold">Login Page</h2>
            <form className=" flex flex-col gap-5" onSubmit={handleLogin}>
              <input
                placeholder="username"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className=" outline-none border-b-2 border-black bg-transparent"
              />
              <input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                name="password"
                className=" outline-none border-b-2 border-black bg-transparent"
              />
              <button
                className={`${
                  !isLoading ? "bg-blue-600" : "bg-blue-400"
                } rounded-md text-white`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                Login
              </button>
            </form>
            <span>or</span>
            <button
              onClick={() => setIsUser((prev) => !prev)}
              className="  text-blue-700"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </div>
      ) : (
        <div className="min-w-[1000px] h-[100vh] grid justify-center items-center ">
          <div className=" min-w-[320px] min-h-[300px] p-4 shadow-lg bg-slate-300 rounded-md flex flex-col justify-center  items-center gap-3">
            <h2 className=" text-xl font-semibold border-b-2 border-b-black">
              SignUp Page
            </h2>
            <form
              className=" flex  flex-col gap-10 items-center"
              onSubmit={handleSignUp}
            >
              <div className=" bg-[rgb(103,107,105)]  w-[100px] h-[100px] grid justify-center  rounded-[50%] relative">
                {dp ? (
                  <div className=" w-full rounded-full ">
                    <img
                      className=" w-[100px] h-[100px] rounded-full "
                      src={URL.createObjectURL(dp)}
                    />
                  </div>
                ) : (
                  <RxAvatar size={100} />
                )}
                <div className=" absolute left-20 bottom-4">
                  <label htmlFor="dp" className="">
                    <IoMdCamera color="blue" size={30} />
                  </label>
                </div>
              </div>
              <input
                className="hidden"
                onChange={(e) => {
                  setDp(e.target.files[0]);
                }}
                id="dp"
                type="file"
              />

              <input
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className=" outline-none border-b-2 border-black bg-transparent"
              />
              <input
                placeholder="Bio"
                name="bio"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                className=" outline-none border-b-2 border-black bg-transparent"
              />

              <input
                placeholder="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className=" outline-none border-b-2 border-black bg-transparent"
              />
              <input
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className=" outline-none border-b-2 border-black bg-transparent"
              />
              <button
                className={`${
                  !isLoading ? "bg-blue-600" : "bg-blue-400"
                } rounded-md text-white w-full`}
                disabled={isLoading}
              >
                SignUp
              </button>
            </form>
            <span>or</span>
            <button
              onClick={() => setIsUser((prev) => !prev)}
              className="  text-blue-600"
              disabled={isLoading}
            >
              Login Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
