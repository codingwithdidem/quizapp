import Image from "next/image";
import { CheckCircle } from "@/ui/icons/CheckCircle";
import { importantToKnow } from "@/ui/content/content";
import { Button } from "./Button";

interface IntroProps {
  onGetStartedClick: () => void;
}

export const Intro = ({ onGetStartedClick }: IntroProps) => {
  return (
    <div className="px-5 py-8 h-full w-full max-w-4xl mx-auto">
      <Image
        src="/doodles.svg"
        width={343}
        height={413}
        className="absolute -bottom-10 right-0 z-0 object-cover pointer-events-none"
        alt="Doodles Illustration"
      />
      <div className="w-full flex flex-col items-center h-full z-10">
        <h1 className="text-brand-cerulean-blue font-bold text-[32px] sm:text-4xl">
          QuizApp
        </h1>

        <h3 className="text-black font-bold text-2xl mt-[51.55px] sm:text-3xl">
          Things to know before you start:
        </h3>

        <div className="flex flex-col items-start mt-5 sm:mt-10 gap-9">
          {importantToKnow.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle />
              <p className="text-sm text-brand-storm-dust font-normal sm:text-xl">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-auto w-full z-10">
          <Button
            block
            size={"small"}
            onClick={onGetStartedClick}
          >{`Let's Get Started`}</Button>
        </div>
      </div>
    </div>
  );
};
