"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { quizQuestions } from "@/ui/content/content";
import { Button } from "@/ui/components/Button";
import { OptionList } from "./OptionList";

export const Quiz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);

  const handleNextQuestion = () => {
    // If the user has reached the last question, do nothing
    if (activeQuestion === quizQuestions.length - 1) {
      return;
    }

    // If the user has answered the question, move to the next question
    setActiveQuestion(activeQuestion + 1);
    setSelectedAnswerIndex(-1);
  };

  const { question, correctAnswer, options } = quizQuestions[activeQuestion];
  const numberOfQuestions = quizQuestions.length;
  return (
    <motion.div
      key={"countdown"}
      variants={{
        initial: {
          background: "#FF6A66",
          clipPath: "circle(0% at 50% 50%)",
        },
        animate: {
          background: "#ffffff",
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
        <h1 className="font-bold text-base text-brand-cerulean-blue">
          QuizApp
        </h1>
        <div className="mt-6 rounded-2xl border border-brand-light-gray px-7 py-4 w-full mb-1">
          <h3 className="text-black font-medium text-sm">
            Question {activeQuestion + 1} / {numberOfQuestions}
          </h3>
          <h4 className="text-brand-midnight font-medium text-base mt-[34px]">
            {question}
          </h4>
        </div>

        <OptionList
          options={options}
          correctAnswer={correctAnswer}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={(answer) => {
            setSelectedAnswerIndex(options.indexOf(answer));
          }}
        />

        <div className="mt-auto w-full z-10">
          <Button
            disabled={selectedAnswerIndex === -1}
            block
            size="small"
            onClick={handleNextQuestion}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
