import { Status } from "@prisma/client";
import { IconType } from "react-icons";
import { IoIosTimer, IoMdClose, IoMdDoneAll, IoMdPause } from "react-icons/io";
import cn from "../helpers/cn";

const StatusBox = ({ status }: { status: Status }) => {
  let Icon: IconType = IoIosTimer;
  let boxClassName = "";
  const text = status === "NotPaid" ? "Not Paid" : status;

  switch (status) {
    case "Paid":
      Icon = IoMdDoneAll;
      boxClassName = "bg-green-500";
      break;
    case "Processing":
      Icon = IoIosTimer;
      boxClassName = "bg-zinc-300";
      break;
    case "NotPaid":
      Icon = IoMdPause;
      boxClassName = "bg-yellow-500 text-white";
      break;
    case "Failed":
      Icon = IoMdClose;
      boxClassName = "bg-red-700 text-white";
      break;
    default:
      break;
  }
  return (
    <div
      className={cn(
        boxClassName,
        "sm:w-[145px] text-sm sm:py-3 sm:px-6 py-2 px-3 sm:rounded-lg rounded-md flex flex-row items-center justify-center"
      )}
    >
      <Icon className="sm:block hidden text-sm mr-2" />
      <p className={cn("text-sm text-center", boxClassName)}>{text}</p>
    </div>
  );
};

export default StatusBox;
