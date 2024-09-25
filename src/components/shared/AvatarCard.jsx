import React from "react";
import { transformImage } from "../../lib/features";

const AvatarCard = ({ avatars = [], max = 4 }) => {
  const limit = max > avatars.length ? avatars.length : max;

  return (
    <div className="flex -space-x-1 p-1 overflow-hidden">
      {avatars?.map((i, index) => (
        <img
          key={i || index}
          className="inline-block h-6 w-6 rounded-full ring-2 object-cover ring-white"
          src={i}
          alt={"Profile"}
          onError={(e) =>
            (e.target.src = "https://ui-avatars.com/api/?name=Desktop+Picsture")
          }
        />
      ))}
    </div>
  );
};

export default AvatarCard;
