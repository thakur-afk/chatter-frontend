import moment from "moment";
import { CgTapSingle } from "react-icons/cg";

export const FileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";
  return "file";
};

export const transformImage = (url = "", widht = 100) => {
  const newUrl = url.replace("upload/", `upload/dpr_auto/w_${widht}/`);
  return newUrl;
};

export const getOrSaveLocal = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const last7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const day = currentDate.clone().subtract(i, "days").format("ddd");
    last7Days.unshift(day);
  }
  return last7Days;
};
