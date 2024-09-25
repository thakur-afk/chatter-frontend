import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import moment from "moment";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useGetStatsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { LayoutLoader } from "../../components/Layout/Loaders";

const Dashboard = () => {
  const { isLoading, isError, error, data } = useGetStatsQuery();

  useErrors([{ isError, error }]);

  const Appbar = (
    <div className=" w-full p-2 rounded-lg  bg-white flex  items-center justify-between gap-3">
      <div className=" flex items-center gap-3">
        <MdAdminPanelSettings size={28} />
        <input
          className=" bg-gray-200 rounded-lg p-1"
          placeholder=" search..."
        />
        <CiSearch size={25} />
      </div>
      <div className=" flex justify-center items-center gap-2">
        <p className=" text-sm max-sm:hidden">
          {moment().format("dddd, D MMMM YYYY")}
        </p>
        <IoIosNotifications size={22} />
      </div>
    </div>
  );

  const Widgets = (
    <div className="flex flex-col  md:flex-row gap-2  justify-evenly items-center w-full ">
      <Widget
        title={"users"}
        value={data?.stats?.usersCount || 0}
        Icon={<FaUserCog size={25} />}
      />
      <Widget
        title={"chats"}
        value={data?.stats?.totalChatsCount || 0}
        Icon={<FaUsersGear size={25} />}
      />
      <Widget
        title={"Messgages"}
        value={data?.stats?.messagesCount || 0}
        Icon={<BiSolidMessageSquareDetail size={25} />}
      />
    </div>
  );

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <div className=" overflow-y-auto flex flex-col items-center gap-5 px-10">
        {Appbar}

        <div className=" scrollbar-thin flex md:flex-row flex-wrap rounded-lg gap-4 justify-center  items-center md:items-stretch  w-full">
          <div className=" flex flex-col w-full p-2 rounded-lg sm:max-w-xl  max-sm:max-w-md  max-sm:max-h-md bg-white h-96">
            <p>Last Messages</p>
            <LineChart lineValue={data?.stats?.messages} />
          </div>
          <div className="  p-4 bg-white flex flex-col  gap-2 justify-center items-center  max-sm:max-w-sm   sm:w-full max-w-[23rem] rounded-lg">
            <DoughnutChart
              values={[
                data?.stats?.totalChatsCount - data?.stats?.groupsCount,
                data?.stats?.groupsCount,
              ]}
              labels={["User Chats", "Group Chats"]}
            />

            <div className="  flex gap-2  justify-center items-center">
              <FaUserCog size={25} />
              Vs <FaUsersGear size={25} />
            </div>
          </div>
        </div>
        {Widgets}
      </div>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <div className=" p-2 rounded-lg w-64 bg-white  flex flex-col items-center justify-center gap-3">
    <div className=" w-20 h-20 flex justify-center items-center border-4 px-10 py-10 rounded-full  border-black ">
      {value}
    </div>

    <div className=" flex flex-col items-center justify-center">
      {Icon}
      {title}
    </div>
  </div>
);

export default Dashboard;
