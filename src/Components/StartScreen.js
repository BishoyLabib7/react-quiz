import { useQuize } from "../context/QuizeProvider";

export default function StartScreen() {
  const { numQuestions, dispatch } = useQuize();
  return (
    <div className="start">
      <h2>Welcome to The React mastery</h2>
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "dataActive" })}
      >
        Let's start
      </button>
    </div>
  );
}
