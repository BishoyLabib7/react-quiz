function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  let emoji =
    percentage === 100
      ? "🥇"
      : percentage >= 80 && percentage < 100
      ? "🎉"
      : percentage >= 50 && percentage < 80
      ? "🙃"
      : percentage >= 0 && percentage < 50
      ? "🤨"
      : "🤦‍♂️";
  localStorage.setItem("highScore", highScore);
  return (
    <div>
      <p className="result">
        {emoji} Your score is {points} out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
