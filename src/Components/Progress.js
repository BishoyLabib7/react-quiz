import { useQuize } from "../context/QuizeProvider";

function Progress() {
  const { index, numQuestions, point, answer, maxPoints } = useQuize();
  return (
    <div className="progress">
      <progress
        max={numQuestions}
        value={answer !== null ? index + 1 : index}
      />
      <p>
        Question <strong>{index + 1} </strong>/ {numQuestions}
      </p>

      <p>
        <strong>{point} </strong>/ {maxPoints}
      </p>
    </div>
  );
}

export default Progress;
