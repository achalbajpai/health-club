import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const AboutCard = ({
  items,
  className,
}: {
  items: {
    pfp: string;
    name: string;
    description: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.name}
          className="relative group  block p-2 h-full w-full max-h-[501px]"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl z-10"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-8 items-center flex-1">
                <div className="rounded-full overflow-hidden h-auto w-40">
                  <img src={item.pfp} />
                </div>
                <div className="flex justify-center flex-col items-center">
                  <CardTitle className="text-center">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </div>
              <div className="flex gap-3 h-full items-center justify-center">
                <Link href="/">
                  <img
                    src="/images/github.png"
                    className="h-auto w-8 dark:invert transition  hover:-translate-y-1"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="/images/instagram.png"
                    className="h-auto w-8 dark:invert transition  hover:-translate-y-1"
                  />
                </Link>
                <Link href="/">
                  <img
                    src="/images/linkedin.png"
                    className="h-auto w-8 dark:invert transition  hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-rose-50 p-3 dark:bg-sdColor border border-black/[0.2] dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50 h-full">
        <div className="p-3 h-full">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-black dark:text-zinc-100 font-bold tracking-wide",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-zinc-500 dark:text-zinc-400 tracking-wide leading-relaxed text-base",
        className
      )}
    >
      {children}
    </p>
  );
};
