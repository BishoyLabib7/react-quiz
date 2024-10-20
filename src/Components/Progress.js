function Progress({ index, numQuestions, point, answer, maxPoints }) {
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
