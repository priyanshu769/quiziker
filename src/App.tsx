import React from 'react';
import QuizzesDisplay from "./pages/quizzesDisplay";
import PlayArea from "./pages/playArea";
import FinalScore from "./pages/finalScore";
import { Routes, Route } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { QuizServerResponse } from "./utils/types";
import { useQuiz } from "./contexts/QuizContext";

function App() {
  const { dispatch } = useQuiz();
  const getQuizzes = async () => {
    const response = await axios.get<QuizServerResponse>("https://apiquiz.priyanshu769.repl.co/quizzes")
    console.log(response.data.quizzes)
    return response.data.quizzes
  }
  getQuizzes()
  useEffect(() => {
    (async () => {
      const quizzes = await getQuizzes();
      console.log(quizzes, "from useEffect")
      dispatch({ type: "SET_QUIZZES", payload: quizzes })
    })()
  }, [])
  return (
    <div className="App">
      <Box textAlign="center" bg="#3fc1c9" w="100%" p={4} marginBottom="1rem" color="black">
        <Text fontSize="6xl">Quiziker</Text>
      </Box>
      <Routes>
        <Route path="/" element={<QuizzesDisplay />} />
        <Route path="/play/:quizId" element={<PlayArea />} />
        <Route path="/final-score/:quizId" element={<FinalScore />} />
      </Routes>
    </div>
  );
}

export default App;
