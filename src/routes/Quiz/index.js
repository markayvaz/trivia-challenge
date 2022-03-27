import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getTrivia } from "../../api/OpenTableDB";
import Spinner from "../../components/elements/Spinner";
import { useTriviaState } from "../../context/TriviaState";

export default function Quiz() {
  const { triviaState, setTriviaQuestions, setTriviaError } = useTriviaState();

  let navigate = useNavigate();

  useEffect(() => {
    if (!triviaState.started) {
      getTrivia(setTriviaQuestions, setTriviaError);
    }
  }, []);

  useEffect(() => {
    navigate(`${triviaState.currentQuestion}`);
  }, [triviaState.currentQuestion]);

  return (
    <div>
      {triviaState.error ? (
        <div className="space-y-4">
          <h3>Oops, there was an error in getting the quiz...</h3>

          <p>
            Please{" "}
            <span
              className="font-medium text-blue-700 hover:cursor-pointer"
              onClick={() => {
                getTrivia(setTriviaQuestions, setTriviaError);
              }}
            >
              try again
            </span>
            .
          </p>
        </div>
      ) : triviaState.questions.length === 0 ? (
        <Spinner />
      ) : null}
      <Outlet />
    </div>
  );
}