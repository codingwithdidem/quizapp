"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { quizQuestions } from "@/ui/content/content";
import { Button } from "@/ui/components/Button";
import { OptionList } from "./OptionList";
import { formatTime } from "../utils/formatTime";
import { Result } from "./Result";
import {
  playCorrectAnswer,
  playWrongAnswer,
  playQuizEnd,
} from "../utils/playSound";

const TIME_LIMIT = 60; // 1 minute per question

export const Quiz = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [timePassed, setTimePassed] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [results, setResults] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    secondsUsed: 0,
  });

  const setupTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimePassed((prevTimePassed) =>
        prevTimePassed > TIME_LIMIT ? TIME_LIMIT : prevTimePassed + 1
      );
    }, 1000);
  };

  useEffect(() => {
    if (quizFinished) return;

    setupTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quizFinished]);

  useEffect(() => {
    if (quizFinished) return;

    if (timePassed > TIME_LIMIT) {
      // The time limit has been reached for this question
      // So the answerr will be considered wrong

      // Update results
      if (selectedAnswerIndex === -1) {
        setResults((prev) => ({
          ...prev,
          secondsUsed: prev.secondsUsed + TIME_LIMIT,
          wrongAnswers: prev.wrongAnswers + 1,
        }));
      }

      handleNextQuestion();
      // Restart timer
      setTimePassed(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timePassed]);

  const handleNextQuestion = () => {
    // Reset selected answer
    setSelectedAnswerIndex(-1);

    // Check if quiz finished
    if (activeQuestion + 1 >= quizQuestions.length) {
      console.log("Quiz finished!");
      playQuizEnd();
      setQuizFinished(true);
      return;
    }

    // Set next question
    setActiveQuestion((prev) => prev + 1);

    // Reset timer
    setupTimer();
    setTimePassed(0);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    //  Stop timer
    clearInterval(timerRef.current!);
    setSelectedAnswerIndex(answerIndex);

    // Check if answer is correct
    const correctAnswer = quizQuestions[activeQuestion].correctAnswer;
    const selectedAnswer = quizQuestions[activeQuestion].options[answerIndex];

    if (correctAnswer === selectedAnswer) {
      console.log("Correct answer!");
      playCorrectAnswer();
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        correctAnswers: prev.correctAnswers + 1,
      }));

      setIsCorrectAnswer(true);
    } else {
      console.log("Wrong answer!");
      playWrongAnswer();
      // Update results
      setResults((prev) => ({
        ...prev,
        secondsUsed: prev.secondsUsed + timePassed,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
      setIsCorrectAnswer(false);
    }
  };

  const { question, options } = quizQuestions[activeQuestion];
  const numberOfQuestions = quizQuestions.length;

  if (quizFinished) {
    return <Result results={results} totalQuestions={quizQuestions.length} />;
  }

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

          <div
            key={activeQuestion}
            className="flex justify-center items-center w-full mt-[18px]"
          >
            {/* Start time */}
            <span className="text-brand-mountain-mist text-xs font-normal">
              {formatTime(timePassed)}
            </span>

            {/* Bar */}
            <div className="relative flex-1 h-3 bg-[#F0F0F0] mx-1 rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand-cerulean-blue rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(timePassed / TIME_LIMIT) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            {/* End time */}
            <span className="text-brand-mountain-mist text-xs font-normal">
              {formatTime(TIME_LIMIT)}
            </span>
          </div>

          <h4 className="text-brand-midnight font-medium text-base mt-[34px]">
            {question}
          </h4>
        </div>

        <OptionList
          activeQuestion={quizQuestions[activeQuestion]}
          options={options}
          selectedAnswerIndex={selectedAnswerIndex}
          onAnswerSelected={handleSelectAnswer}
          isCorrectAnswer={isCorrectAnswer}
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
