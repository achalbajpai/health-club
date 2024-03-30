import { ArrowBigUp, MessagesSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Post, ResponseStatus, User } from "@/utils/constants";
import { fixedDateFromPrisma } from "@/utils/fixDateTime";
import { Service } from "@/services/services";
import { useEffect, useState } from "react";

export default function PostCard({ post, user }: { post: Post; user: User }) {
  const parsedDateTime = fixedDateFromPrisma(post.postedOn);
  const [upVotes, setUpVotes] = useState<number>(post.upvotes);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isVoted, setIsVoted] = useState<boolean>(
    post.upVoters.find((upvoter) => upvoter.id === user.id) ? true : false
  );
  const dateTime = `${
    parsedDateTime.getHours() +
    ":" +
    parsedDateTime.getMinutes() +
    " - " +
    parsedDateTime
      .toLocaleString("en-Us", {
        month: "long",
      })
      .substring(0, 3) +
    " " +
    parsedDateTime.getDate() +
    " , " +
    parsedDateTime.getFullYear()
  }`;

  const handleUpvote = async () => {
    setIsDisabled(true);
    if (isVoted) {
      setIsVoted(false);
      setUpVotes((upVotes) => upVotes - 1);
      const response = await Service.unVotePost(post.id);
      console.log(response);
    } else {
      setIsVoted(true);
      setUpVotes((upVotes) => upVotes + 1);
      const response = await Service.upVotePost(post.id);
      console.log(response);
    }
    setIsDisabled(false);
  };

  return (
    <div className="bg-rose-100 dark:bg-sdColor xl:p-5 p-3 rounded flex flex-col gap-3 xl:gap-5">
      <div className="flex gap-2 items-center">
        <Avatar className="md:h-12 select-none md:w-12 border-2 border-black">
          <AvatarImage src={post.authorDetails.profilePic} />
          <AvatarFallback className="text-xl">
            {post.authorDetails.firstName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center mr-auto">
          <span className="text-sm">{post.authorDetails.username}</span>
          <span className="text-xs">{dateTime}</span>
        </div>
        <div className="text-xs border border-black dark:border-rose-300 p-2 rounded-full">
          {post.authorDetails.profession}
        </div>
      </div>
      <div className="text-sm">{post.description}</div>
      <div className="flex justify-center max-h-96">
        {post.image && (
          <img
            className="rounded overflow-hidden object-contain select-none"
            src={post.image}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:items-center">
        <div className="flex gap-5 w-full justify-between md:justify-normal">
          <div className="flex items-center">
            <Button
              variant={"ghost"}
              className={`flex gap-1 ${
                isVoted ? "bg-blue-500 hover:bg-blue-800" : ""
              }`}
              onClick={handleUpvote}
              disabled={isDisabled}
            >
              <ArrowBigUp />
              <span>{upVotes}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant={"ghost"} className="flex gap-2">
              <MessagesSquare size={20} />
              <span>{post.numberOfComments}</span>
            </Button>
          </div>
        </div>
        {/* {post.tag && <div className="justify-start text-xs">{post.tag}</div>} */}
      </div>
    </div>
  );
}
