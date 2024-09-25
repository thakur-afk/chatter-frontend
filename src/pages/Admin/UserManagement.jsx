import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
// import { createColumnHelper } from "react-table";
import { createColumnHelper } from "@tanstack/react-table";
import AvatarCard from "../../components/shared/AvatarCard";
import { dashboardData } from "../../constant/SampleData";
import { useGetUsersQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { LayoutLoader } from "../../components/Layout/Loaders";
import { transformImage } from "../../lib/features";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    cell: (info) => <span>{info.getValue()}</span>,
    Header: "Id",
  }),

  columnHelper.accessor("avatar", {
    cell: (info) => {
      // <img
      //   className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
      //   src={info?.getValue()}
      //   alt="imageLoading"
      // />

      return <AvatarCard avatars={[info.getValue()]} />;
    },
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    Header: "Name",
  }),
  columnHelper.accessor("username", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Username",
  }),
  columnHelper.accessor("friends", {
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("groups", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Groups",
  }),
];

const UserManagement = () => {
  const [rows, setRows] = useState(dashboardData.users);

  const { data, isLoading, error, isError } = useGetUsersQuery();

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          ...i,
          id: i._id,
          avatar: transformImage(i.avatar),
        }))
      );
    }
  }, [data]);

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <p className=" text-center font-medium text-lg">User Management</p>
      <Table data={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
