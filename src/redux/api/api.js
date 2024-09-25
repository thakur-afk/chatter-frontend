import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constant/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Messages"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/myChats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchFriend: builder.query({
      query: (name) => ({
        url: `users/searchUser?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `users/sendRequest`,
        credentials: "include",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `users/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "users/acceptRequest",
        credentials: "include",
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;

        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/attachments",
        credentials: "include",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `users/friends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: "chat/newgroup",
        credentials: "include",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        credentials: "include",
        body: { name },
        method: "PUT",
      }),
      invalidatesTags: ["Chat"],
    }),
    myGroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    addMemberInGroup: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `chat/addmembers`,
        credentials: "include",
        body: { chatId, members },
        method: "PUT",
      }),
      invalidatesTags: ["Chat"],
    }),
    removeMemberInGroup: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        credentials: "include",
        body: { chatId, userId },
        method: "PUT",
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        credentials: "include",

        method: "delete",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        credentials: "include",

        method: "delete",
      }),
      invalidatesTags: ["Chat"],
    }),

    // admin  query

    adminLogin: builder.query({
      query: (secretKey) => ({
        url: `admin/verify`,
        body: { secretKey },
        credentials: "include",
        method: "POST",
      }),
    }),

    getAdminData: builder.query({
      query: () => ({
        url: "admin/",
        credentials: "include",
      }),
    }),
    getStats: builder.query({
      query: () => ({
        url: "admin/stats",
        credentials: "include",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "admin/users",
        credentials: "include",
      }),
    }),
    getAllChats: builder.query({
      query: () => ({
        url: "admin/chats",
        credentials: "include",
      }),
    }),
    getAllMessages: builder.query({
      query: () => ({
        url: "admin/messages",
        credentials: "include",
      }),
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchFriendQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useChatDetailsQuery,
  useAcceptFriendRequestMutation,

  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useAvailableFriendsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation,
  useMyGroupsQuery,
  useAddMemberInGroupMutation,
  useRemoveMemberInGroupMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useAdminLoginQuery,
  useGetAdminDataQuery,
  useGetStatsQuery,
  useGetUsersQuery,
  useGetAllChatsQuery,
  useGetAllMessagesQuery,
} = api;
