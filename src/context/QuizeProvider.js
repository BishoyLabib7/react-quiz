import { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";

const QuizeContext = createContext();

const initialState = {
  questions: [],

  // loading , error , ready , active , finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};
const SEE_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "dataActive":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEE_QUESTION,
      };
    case "next":
      return { ...state, index: state.index + 1 };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,

        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "newQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: localStorage.getItem("highScore"),
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unkonwn");
  }
}

function QuizeProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(function () {
    dispatch({ type: "dataLoading" });

    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFaild" }));
  }, []);

  return (
    <QuizeContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizeContext.Provider>
  );
}

function useQuize() {
  const context = useContext(QuizeContext);
  if (context === undefined)
    throw new Error("QuizeContext was used outside QuizeProvider");
  return context;
}

export { QuizeProvider, useQuize };
