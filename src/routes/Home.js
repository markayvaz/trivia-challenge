import { Link } from "react-router-dom";
import { useTriviaState } from "../context/TriviaState";
import PrimaryButton from "../components/elements/PrimaryButton";
import { NUMBER_OF_QUESTIONS } from "./Quiz";

export default function Home() {
  const { triviaState, resetTriviaState } = useTriviaState();

  return (
    <>
      <div className="space-y-6">
        <h1>🎉</h1>
        {triviaState.started ? (
          <h1>Hey, welcome back!</h1>
        ) : (
          <h1>Welcome to the Trivia Challenge!</h1>
        )}
      </div>

      {triviaState.started ? (
        <h3>{`You still have ${
          triviaState.questions.length - triviaState.responses.length
        } questions to go...`}</h3>
      ) : (
        <h3>
          You'll be presented with {NUMBER_OF_QUESTIONS} True or False
          questions.
        </h3>
      )}

      <div className="flex flex-col text-center space-y-4">
        {!triviaState.started && (
          <span className="text-slate-600 text-sm">Can you score 100%?</span>
        )}

        <div>
          <Link to="/quiz">
            <PrimaryButton
              title={`${triviaState.started ? "Continue..." : "Begin"}`}
            />
          </Link>

          {triviaState.started && (
            <span
              className="text-red-600 text-sm font-medium hover:cursor-pointer"
              onClick={() => resetTriviaState()}
            >
              Start over
            </span>
          )}
        </div>
      </div>
    </>
  );
}
