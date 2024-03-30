"use client";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";

import { Titan_One } from "next/font/google";
const titanOne = Titan_One({ subsets: ["latin"], weight: "400" });
export default function Welcome() {
  return (
    <section className="w-full min-h-screen relative z-[-1]">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 160 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className={`${titanOne.className} mt-8 bg-rose-500 dark:bg-gradient-to-b dark:from-rose-300 dark:to-white py-4 bg-clip-text text-center text-4xl font-medium text-transparent md:text-7xl tracking-wide`}
        >
          Health Club <br />
          <span className="text-3xl text-rose-500 dark:text-rose-200 tracking-wider">
            Where Ideas Heal, Together
          </span>
        </motion.h1>
      </LampContainer>
    </section>
  );
}
