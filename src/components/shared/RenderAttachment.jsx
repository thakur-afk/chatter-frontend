import React from "react";
import { MdFileOpen } from "react-icons/md";
import { transformImage } from "../../lib/features";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;

    case "image":
      return (
        <img
          className=" p-1"
          src={transformImage(url)}
          alt="attachment"
          // width={"150px"}
          // height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;

    default:
      return <MdFileOpen />;
  }
};

export default RenderAttachment;
