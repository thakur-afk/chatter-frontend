import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
// import { createColumnHelper } from "react-table";
import { createColumnHelper } from "@tanstack/react-table";
import AvatarCard from "../../components/shared/AvatarCard";
import { dashboardData } from "../../constant/SampleData";
import { useChatDetailsQuery, useGetAllChatsQuery } from "../../redux/api/api";
import { LayoutLoader } from "../../components/Layout/Loaders";
import { useErrors } from "../../hooks/hook";
import { transformImage } from "../../lib/features";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("_id", {
    id: "_id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Id",
  }),

  columnHelper.accessor("avatar", {
    cell: (info) => {
      return <AvatarCard avatars={info?.getValue() || []} />;
    },
  }),
  columnHelper.accessor("name", {
    cell: (info) => <span>{info.getValue()}</span>,
    Header: "Name",
  }),
  columnHelper.accessor("totalMembers", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Total Members",
  }),
  columnHelper.accessor("members", {
    cell: (info) => <AvatarCard avatars={info?.getValue() || []} />,
  }),
  columnHelper.accessor("totalMessages", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Total Messages",
  }),
  columnHelper.accessor("createdBy", {
    cell: (info) => (
      <div className=" flex gap-3">
        <div>
          <AvatarCard avatars={[info?.getValue().avatar]} />
        </div>
        {info.getValue()?.name}
      </div>
    ),
    header: "Created By",
  }),
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  const { isLoading, data, isError, error } = useGetAllChatsQuery();

  useErrors([{ isError, error }]);

  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((i) => ({
          ...i,
          id: i._id,
          avatar: i.avatar.map((i) => i),
          createdBy: {
            name: i.creator.name,
            avatar: i.creator.avatar,
          },
          members: i.members.map((i) => i.avatar),
        }))
      );
    }
  }, [data]);

  return isLoading ? (
    <LayoutLoader />
  ) : (
    <AdminLayout>
      <p className=" text-center font-medium text-lg">Chat Management</p>
      <Table data={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ChatManagement;
