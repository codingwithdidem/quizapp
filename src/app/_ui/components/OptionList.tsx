import { Tick, Close } from "@/ui/icons/index";

interface OptionListProps {
  options: string[];
  isCorrectAnswer: boolean;
  selectedAnswerIndex: number;
  onAnswerSelected: (answerIndex: number) => void;
}

const correctAnswerBadge = (
  <div className="bg-brand-paris-green text-white px-3 py-2 flex items-center justify-center gap-1 rounded-[53px]">
    <Tick />
    <p className="text-xs font-jakarta font-medium">Correct answer</p>
  </div>
);

const wrongAnswerBadge = (
  <div className="bg-brand-bittersweet text-white px-3 py-2 flex items-center justify-center gap-1 rounded-[53px]">
    <Close />
    <p className="text-xs font-jakarta font-medium">Your answer</p>
  </div>
);

export const OptionList = ({
  options,
  selectedAnswerIndex,
  onAnswerSelected,
  isCorrectAnswer,
}: OptionListProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      {options.map((option, idx) => (
        <div
          key={idx}
          className="font-jakarta flex items-center gap-2 rounded-xl border border-brand-light-gray px-6 py-4 w-full cursor-pointer select-none"
          onClick={() => {
            if (selectedAnswerIndex !== -1) {
              return;
            }
            onAnswerSelected(idx);
          }}
        >
          <div
            className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center ${
              idx === selectedAnswerIndex
                ? "bg-brand-cerulean-blue"
                : "bg-brand-white-smoke-100"
            }`}
          >
            <div
              className={`w-[14px] h-[14px] rounded-full bg-white ${
                idx === selectedAnswerIndex
                  ? "bg-white"
                  : "bg-brand-white-smoke-100"
              }
          `}
            />
          </div>
          <p className="text-brand-midnight font-normal text-base">{option}</p>
          {idx === selectedAnswerIndex && (
            <div className="ml-auto">
              {isCorrectAnswer ? correctAnswerBadge : wrongAnswerBadge}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
