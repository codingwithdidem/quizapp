interface DonutChartProps {
  successColor: string;
  failureColor: string;
  total: number;
  numOfCorrect: number;
  numOfWrong: number;
}

export const DonutChart = ({
  successColor,
  failureColor,
  total,
  numOfCorrect,
  numOfWrong,
}: DonutChartProps) => {
  const convertToPercentage = (value: number) => {
    return Math.round((value / total) * 100);
  };
  const convertToDegrees = (value: number) => {
    return Math.round((value / 100) * 360);
  };

  const correctAnswerPercentage = convertToPercentage(numOfCorrect); // 60
  const wrongAnswerPercentage = convertToPercentage(numOfWrong); // 40

  const correctAnswerDegrees = convertToDegrees(correctAnswerPercentage); // 216
  const wrongAnswerDegrees = convertToDegrees(wrongAnswerPercentage); // 144

  const css_string = `
    
    ${successColor} 0deg ${correctAnswerDegrees}deg,
    ${failureColor} ${correctAnswerDegrees}deg ${
    correctAnswerDegrees + wrongAnswerDegrees
  }deg,
  ${failureColor} ${correctAnswerDegrees + wrongAnswerDegrees}deg 360deg

    `;

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: "100%", width: "100px", height: "100px" }}
    >
      <foreignObject x="0" y="0" width="100" height="100">
        <div
          style={{
            width: "100%",
            height: "100%",
            background: `conic-gradient(${css_string})`, // <- 🥳
          }}
        />
      </foreignObject>
    </svg>
  );
};
