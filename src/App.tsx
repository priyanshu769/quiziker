import React from 'react';
import './App.css';
import Quizzes from "./pages/quizzes";
import PlayArea from "./pages/playArea";
import FinalScore from "./pages/finalScore";
import { Routes, Route } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Box bg="#3fc1c9" w="100%" p={4} marginBottom="1rem" color="black">
      <Text fontSize="6xl">Quiziker</Text>
      </Box>
      <Routes>
        <Route path="/" element={<Quizzes />} />
        <Route path="/play/:quizId" element={<PlayArea />} />
        <Route path="/final-score/:quizId" element={<FinalScore />} />
      </Routes>
    </div>
  );
}

export default App;
