import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
// import { createColumnHelper } from "react-table";
import { createColumnHelper } from "@tanstack/react-table";
import AvatarCard from "../../components/shared/AvatarCard";
import { dashboardData } from "../../constant/SampleData";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { FileFormat } from "../../lib/features";
import { useGetAllMessagesQuery } from "../../redux/api/api";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("_id", {
    id: "_id",
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Id",
  }),

  columnHelper.accessor("attachments", {
    cell: (info) => {
      const attachments = info.getValue();

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = FileFormat(url);

            return (
              <div key={url}>
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{ color: "black" }}
                >
                  <RenderAttachment file={file} url={url} />
                </a>
              </div>
            );
          })
        : "No attachments";
    },
    header: "Attachements",
  }),
  columnHelper.accessor("content", {
    cell: (info) => <span>{info.getValue()}</span>,
    Header: "Content",
  }),
  columnHelper.accessor("sender", {
    cell: (info) => (
      <div className=" flex gap-3 ">
        {/* <img
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
          src={info?.getValue().avatar}
          alt=""
        /> */}
        <div>
          <AvatarCard avatars={[info?.getValue().avatar]} />
        </div>
      </div>
    ),
    header: "Sent By",
  }),
  columnHelper.accessor("chat", {
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("groupChat", {
    cell: (info) => {
      return <span>{info.getValue() ? "True" : "False"}</span>;
    },
    header: "Group Chat",
  }),
  columnHelper.accessor("createdAt", {
    cell: (info) => <span>{info.getValue()}</span>,
    header: "Time",
  }),
];

const MessageManagement = () => {
  const [rows, setRows] = useState(dashboardData.messages);

  const { isLoading, isError, error, data } = useGetAllMessagesQuery();
  useEffect(() => {
    if (data) {
      setRows(data.messages.map((i) => ({ ...i, id: i._id })));
    }
  }, [data]);

  return (
    <AdminLayout>
      <p className=" text-center font-medium text-lg">All messages</p>

      <Table data={rows} columns={columns} />
    </AdminLayout>
  );
};

export default MessageManagement;
