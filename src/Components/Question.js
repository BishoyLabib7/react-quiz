import { useQuize } from "../context/QuizeProvider";
import Options from "./Options";
export default function Question() {
  const { questions, index } = useQuize();
  const question = questions.at(index);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}
