"use client";
import { Comment } from "react-loader-spinner";
export default function Loader2() {
  return (
    <div className="h-full w-full mx-auto flex justify-center items-center z-[15000]">
      <Comment
        visible={true}
        height={200}
        width={200}
        ariaLabel="Loading"
        backgroundColor="rgb(253,164,175,0.6)"
        color="#1c1917"
      />
    </div>
  );
}
