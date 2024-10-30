import { useQuize } from "../context/QuizeProvider";

function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuize();
  if (answer === null) return;

  if (index < numQuestions - 1)
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "newQuestion" })}
        >
          Next
        </button>
      </div>
    );
  else
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      </div>
    );
}

export default NextButton;
