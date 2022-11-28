import { ChangeEvent } from "react";
import { MdAccountCircle, MdEdit } from "react-icons/md";

import CircularProgress from "../Feedback/CircularProgress";
import CustomImage from "./CustomImage";

interface Props {
  image: string | null;
  onImageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  isSelf: boolean;
  isLoading: boolean;
}

export default function ProfileImage({
  image,
  onImageChange,
  isSelf,
  isLoading,
}: Props) {
  return (
    <div className={"group relative select-none"}>
      {image ? (
        <CustomImage
          src={image}
          alt="Profile Image"
          fill
          priority
          sizes={"12rem"}
          containerClassName={"relative h-48 w-48 rounded-full"}
          className={"absolute h-full w-full rounded-full object-cover"}
        />
      ) : (
        <div className="h-48 w-48">
          <MdAccountCircle className="h-full w-full text-slate-800 dark:text-slate-100" />
        </div>
      )}
      {isSelf && (
        // Allow user to update their profile image if they are viewing their own profile
        <div
          className={`absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full 
          transition-colors duration-200 ease-out group-hover:bg-slate-900/70 ${
            isLoading ? "bg-slate-900/70" : ""
          }`}
        >
          {!isLoading ? (
            <>
              <input
                type={"file"}
                onChange={onImageChange}
                title={" "}
                aria-label={"Set Profile Image"}
                className={
                  "absolute z-10 h-full w-full cursor-pointer opacity-0"
                }
              />
              <MdEdit
                className={`absolute top-1/2 left-1/2 h-full w-10 -translate-x-1/2 -translate-y-1/2 text-slate-100 
                  opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100`}
              />
            </>
          ) : (
            <CircularProgress
              className={
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[200%] text-slate-100"
              }
            />
          )}
        </div>
      )}
    </div>
  );
}
