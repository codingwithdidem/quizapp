"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Countdown } from "@/ui/components/Countdown";
import { Intro } from "@/ui/components/Intro";
import { Quiz } from "@/ui/components/Quiz";

export default function Home() {
  const [displayView, setDisplayView] = useState("intro");

  return (
    <main className="relative flex h-screen w-screen flex-col items-center overflow-hidden">
      <AnimatePresence mode="wait">
        {
          {
            intro: (
              <Intro
                onGetStartedClick={() => {
                  setDisplayView("countdown");
                }}
              />
            ),
            countdown: (
              <Countdown
                onGoClick={() => {
                  setDisplayView("quiz");
                }}
              />
            ),
            quiz: <Quiz />,
          }[displayView]
        }
      </AnimatePresence>
    </main>
  );
}
