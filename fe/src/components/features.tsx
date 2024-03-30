import Image from "next/image";
import { Titan_One } from "next/font/google";
import { HoverEffect } from "./ui/hoverEffect";
import { ReactNode } from "react";
import { ArrowBigUp, MessagesSquare, PencilLine } from "lucide-react";
// import Icon, { IconProps } from "./ui/icon";
import { motion, Variants } from "framer-motion";
const titanOne = Titan_One({ subsets: ["latin"], weight: "400" });

export default function Features() {
  const variants: Variants = {
    initial: {
      opacity: 1,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 1,
      },
    },
  };
  const projects: {
    title: string;
    icon: ReactNode;
    description: string;
    link?: string;
  }[] = [
    {
      title: "Post",
      icon: <PencilLine size={30} />,
      description:
        "Users can create new post to share medical information or ask questions.",
    },
    {
      title: "Comment",
      icon: <MessagesSquare size={30} />,
      description:
        "Allows users to engage in discussions by providing feedback or additional information on posts.",
    },
    {
      title: "Vote",
      icon: <ArrowBigUp size={30} />,
      description:
        "Enables users to show appreciation for helpful content by voting it up , increasing visibility of relevant posts.",
    },
  ];
  return (
    <section className="w-full min-h-screen flex flex-col items-center gap-32">
      <div className="flex flex-col justify-center items-center gap-2 text-center">
        <h2
          className={`text-rose-500 ${titanOne.className} text-5xl dark:text-rose-300`}
        >
          About Health Club
        </h2>
        <span className="max-w-sm">
          Health Club is the largest community of verified healthcare
          professionals working together, safely and securely, to improve
          patient outcomes.
        </span>
      </div>
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        className="min-h-1/2 z-[-1]"
      >
        <Image
          alt="image"
          priority
          className="select-none"
          src="/images/reddit.png"
          width={700}
          height={700}
        />
      </motion.div>
      <div className="max-w-[1170px]">
        <HoverEffect items={projects} />
      </div>
    </section>
  );
}
