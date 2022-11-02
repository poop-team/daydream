import React from "react";
import { Image } from "react-native";

//fixme: I will probably have to break card up unto a sub-component like the web version and then url will be required
interface Props {
  url?: string;
  styles?: string;
}
/**
 * @url url of the image string (default: muppet)
 * @styles width & height (default h-96, w-11/12)
 */
export default function Card({
  url = "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
  styles,
}: Props) {
  //these spaces are here so that the user of this api cannot mess it up if they forget to add a space
  let baseStyle = "rounded-lg mt-5 mx-auto bottom-10";
  console.log(styles);
  return (
    <Image
      source={{ uri: url }}
      className={`${baseStyle} h-96 w-11/12 ${styles}`}
    />
  );
}
