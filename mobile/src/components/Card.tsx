import React from "react";
import { Image } from "react-native";
interface Props {
  url?: string;
}

export default function Card({
  url = "https://project.up.railway.app/_next/image?url=https%3A%2F%2Fsbleaping.s3.us-east-1.amazonaws.com%2Fsb%2F9d532691aa47444996dba0e889b6a728.png&w=1080&q=90",
}: Props) {
  return (
    <Image
      source={{ uri: url }}
      className="rounded-lg w-11/12 h-96 mt-5 mx-auto bottom-10"
    />
  );
}
