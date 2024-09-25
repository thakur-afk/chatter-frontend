import React, { useRef } from "react";
import { useClickOutside } from "../../hooks/hook";
import { CiImageOn } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  setIsFileMenu,
  setIsUplaodingLoader,
} from "../../redux/reducers/miscSlice";
import { MdAudioFile } from "react-icons/md";
import { FaFileVideo, FaFileArrowUp, FaImage } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenuDialog = ({ isFileMenu, chatId }) => {
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const dispatch = useDispatch();
  let fileMenuRef1 = useClickOutside(() => {
    dispatch(setIsFileMenu(false));
  });

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return toast.error("No files are selected");
    if (files.length > 5) return toast.error("Cannot send 5 files at a time");

    dispatch(setIsUplaodingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    dispatch(setIsFileMenu(false));

    try {
      //upload

      const myform = new FormData();
      myform.append("chatId", chatId);
      files.forEach((file) => myform.append("files", file));

      const res = await sendAttachments(myform);

      if (res.data) toast.success(`${key} send successfully`, { id: toastId });
      else {
        toast.error(`Error while uplaoding ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error(error, toast._id);
    } finally {
      dispatch(setIsUplaodingLoader(false));
    }
  };

  return (
    <div
      ref={fileMenuRef1}
      className={`mb-2  ml-2 p-2 bottom-7  font-semibold origin-top-right absolute  w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
        isFileMenu ? "" : "hidden"
      }`}
    >
      <div>
        <div
          onClick={() => {
            imageRef.current.click();
          }}
          className=" flex  rounded-md gap-2 p-1 justify-center items-center cursor-pointer hover:bg-slate-100"
        >
          <FaImage size={20} />
          <p>Image</p>
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg, image/gif"
            className="hidden"
            onChange={(e) => fileChangeHandler(e, "image")}
            ref={imageRef}
          />
        </div>
        <div
          onClick={() => {
            audioRef.current.click();
          }}
          className=" rounded-md  flex gap-2  p-1 justify-center items-center cursor-pointer hover:bg-slate-100"
        >
          <MdAudioFile size={20} />
          <p>Audio</p>
          <input
            ref={audioRef}
            type="file"
            multiple
            accept="audio/mpeg,audio/wav"
            className="hidden"
            onChange={(e) => fileChangeHandler(e, "image")}
          />
        </div>
        <div
          onClick={() => {
            videoRef.current.click();
          }}
          className="rounded-md  flex gap-2 p-1 justify-center items-center cursor-pointer hover:bg-slate-100"
        >
          <FaFileVideo size={20} />
          <p>Video</p>
          <input
            ref={videoRef}
            type="file"
            multiple
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={(e) => fileChangeHandler(e, "videos")}
          />
        </div>
        <div
          onClick={() => videoRef.current.click()}
          className="rounded-md  flex gap-2 p-1 justify-center items-center cursor-pointer hover:bg-slate-100"
        >
          <FaFileArrowUp size={20} />
          <p>File</p>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="*"
            className="hidden"
            onChange={(e) => fileChangeHandler(e, "image")}
          />
        </div>
      </div>
    </div>
  );
};

export default FileMenuDialog;
