import React from "react";

const ConfirmDeleteDialog = ({ closeDeleteDialog, confirmDeleteHandler }) => {
  return (
    <>
      <div className=" max-sm:text-xs max-sm:w-[200px]  shadow-lg outline  outline-1 rounded-xl z-10 absolute top-[20%] left-[40%] max-sm:left-[20%]  mx-auto my-2 bg-white w-[350px] h-[150px]">
        <div className="  flex flex-col p-2 gap-1 ">
          <h2 className=" font-semibold">Confirm Delete</h2>
          <p>Are you sure You wanna delete the Group?</p>
          <div className=" w-fit  max-sm:items-center flex mt-2 self-end max-sm:self-center  max-sm:flex-col-reverse gap-3">
            <button
              className=" text-red-500  w-fit outline outline-1 outline-black p-1 rounded-md"
              onClick={closeDeleteDialog}
            >
              Cancel
            </button>
            <button
              className=" bg-blue-500  w-fit  text-white p-1 rounded-md "
              onClick={confirmDeleteHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteDialog;
