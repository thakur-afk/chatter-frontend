import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
export const useErrors = (errors = []) => {
  useEffect(() => {
    errors?.forEach(({ isError, error, fallback }) => {
      if (isError) {
        if (fallback) fallback();
        else {
          toast.error(error?.data.message);
        }
      }
    });
  }, [errors]);
};

export const asyncMutationHandler = (mutationFunction) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationFunction();

  const executeMutate = async (toastMessage, ...args) => {
    setLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data....");
    try {
      const res = await mutate(...args);

      if (res.data) {
        toast.success(res.data.message || "Updated Data Successfully!!!", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return [executeMutate, loading, data];
};

export const useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  });

  return domNode;
};

const useSocketEventhandler = (socket, handlers) => {
  useEffect(() => {
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]);
};

export { useSocketEventhandler };
// export default useErrors;
