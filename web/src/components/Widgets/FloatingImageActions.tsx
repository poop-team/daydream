import { toast } from "react-hot-toast";
import { MdDownload, MdShare } from "react-icons/md";

import IconButton from "../Inputs/IconButton";
import LinkIconButton from "../Inputs/LinkIconButton";

interface Props {
  postId: string;
  downloadLink: string;
  className?: string;
}
export default function FloatingImageActions({
  postId,
  downloadLink,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-center justify-center gap-4 rounded-full bg-slate-100/80 px-4 py-2 text-4xl dark:bg-slate-800/80 ${className}`}
    >
      <IconButton
        onClick={() => {
          navigator.clipboard
            .writeText(`${location.origin}/post/${postId}`)
            .then(() => {
              toast("Share link copied to clipboard");
            })
            .catch(() => {
              toast.error("Insufficient permissions to copy link to clipboard");
            });
        }}
      >
        <MdShare />
      </IconButton>
      <LinkIconButton href={downloadLink} target={"_blank"} download>
        <MdDownload />
      </LinkIconButton>
    </div>
  );
}
