"use client";
import PostCard from "@/components/ui/postCard";
import { Service } from "@/services/services";
import { Post } from "@/utils/constants";
import { useContext, useEffect, useState } from "react";
import Loader from "../loader";
import { UserContext } from "./layout";

export default function Feed() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const user = useContext(UserContext);
  useEffect(() => {
    const controller = new AbortController();
    Service.getAllPosts(controller.signal)
      .then((response) => setPosts(response.res.posts))
      .catch((error) => console.log(error));
    return () => {
      controller.abort();
    };
  }, []);
  if (posts === null) {
    return <Loader />;
  }
  return (
    <section className="w-full flex justify-center">
      <div className="w-full xl:w-4/6 flex flex-col gap-5 xl:gap-10 p-10">
        {posts &&
          user &&
          posts.map((post) => (
            <PostCard key={post.id} post={post} user={user} />
          ))}
      </div>
    </section>
  );
}
