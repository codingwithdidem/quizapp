"use client";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { Button } from "@/app/_ui/components/Button";

import confettiAnimation from "@/ui/assets/animations/confetti.json";
import { DonutChart } from "./DonutChart";

interface ResultProps {
  results: {
    correctAnswers: number;
    wrongAnswers: number;
    secondsUsed: number;
  };
  totalQuestions: number;
}
export const Result = ({ results, totalQuestions }: ResultProps) => {
  const { correctAnswers, wrongAnswers, secondsUsed } = results;

  const handleRetry = () => {
    // Restart quiz
    window.location.reload();
  };

  console.log("results", results);

  return (
    <motion.div
      key={"result"}
      variants={{
        initial: {
          background: "#FF6A66",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#FF6A66",
          clipPath: "circle(100% at 50% 50%)",
        },
      }}
      className="w-full h-full flex justify-center p-5"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col text-black font-bold text-[32px] text-center w-full">
        <h1 className="font-bold text-base text-white">QuizApp</h1>

        {/* Result Box */}
        <div className="mt-6 flex-1 bg-brand-light-gray border border-brand-light-gray rounded-2xl flex flex-col items-center ">
          <Lottie
            animationData={confettiAnimation}
            loop={false}
            autoplay={true}
            style={{ width: "300px", height: "250px" }}
          />
          <h3 className="text-brand-midnight text-[32px] font-medium leading-9 mt-4">
            Congratulations!
          </h3>
          <p className="text-brand-midnight text-xl font-normal mt-2">
            You scored
          </p>
          <span className="text-brand-midnight font-medium text-[40px]">
            {`${correctAnswers}/${totalQuestions}`}
          </span>
          <p className="text-brand-midnight text-sm font-normal mt-1">
            correct answers
          </p>

          {/* Charts */}
          <div className="flex items-center mt-4 gap-4">
            <DonutChart
              successColor={"#56C490"}
              failureColor={"#FF6A66"}
              total={totalQuestions}
              numOfCorrect={correctAnswers}
              numOfWrong={wrongAnswers}
            />
          </div>
        </div>

        {/* Retry Button */}
        <div className="mt-auto">
          <Button
            intent={"secondary"}
            size="small"
            block
            className="mt-6"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
