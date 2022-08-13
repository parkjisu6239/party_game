import React from "react";
import type { Quiz, Option, Step } from "src/types";
import { csvToJSON } from "src/utils/data";
import Setting from "src/components/templates/Setting";
import Loading from "src/components/templates/Loading";
import Game from "src/components/templates/Game";

function HomePage() {
  const [step, setStep] = React.useState<Step>("SETTING");
  const [file, setFile] = React.useState<File | null>(null);
  const [gameOption, setGameOption] = React.useState<Option>(
    { timeLimit: 5, isRandom: true }
  );
  const [quizList, setQuizList] = React.useState<Quiz[] | null>(null);

  const setTimeLimit = (time: number) => {
    setGameOption((prev) => {
      return {
        ...prev,
        timeLimit: time
      };
    });
  };

  const setRandom = (random: boolean) => {
    setGameOption((prev) => {
      return {
        ...prev,
        isRandom: random
      };
    });
  };

  const moveToNextStep = () => {
    if (step === "SETTING") {
      setStep("LOADING");
    } else if (step === "LOADING") {
      setStep("GAME");
    } else {
      setStep("SETTING");
    }
  };

  React.useEffect(() => {
    if (file == null) {
      return;
    }
    file.text()
      .then((text) => {
        setQuizList(csvToJSON(text));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [file]);

  if (step === "SETTING") {
    return (
      <Setting
        file={file}
        setFile={setFile}
        gameOption={gameOption}
        setTimeLimit={setTimeLimit}
        setRandom={setRandom}
        moveToNextStep={moveToNextStep}
      />
    );
  }

  if (step === "LOADING") {
    return (
      <Loading
        quizList={quizList}
        moveToNextStep={moveToNextStep}
      />
    );
  }

  return (
    <Game
      quizList={quizList}
      moveToNextStep={moveToNextStep}
      gameOption={gameOption}
    />
  );
}

export default HomePage;
