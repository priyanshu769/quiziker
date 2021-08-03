import QuizzesDisplay from "./pages/quizzesDisplay";
import PlayArea from "./pages/playArea";
import FinalScore from "./pages/finalScore";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { Results } from './pages/results';
import { Routes, Route } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import axios from "axios";
import { QuizServerResponse, LSLoggedInUser } from "./utils/types";
import PrivateRoute from "./utils/privateRoute";
import { useQuiz } from "./contexts/QuizContext";
import { useState } from 'react';
import { Loading } from "./utils/types"
import { Link } from "react-router-dom";

function App() {
  const { state, dispatch } = useQuiz();
  const [loading, setLoading] = useState<Loading['loading']>(null)
  console.log(state)
  useEffect(() => {
    (async () => {
      setLoading("Laoding Quizzes")
      try {
        const response = await axios.get<QuizServerResponse>("https://quiziker-api.herokuapp.com/quizzes")
        if (response.data.success) {
          dispatch({ type: "SET_QUIZZES", payload: response.data.quizzes })
          setLoading(null)
        }
      } catch (error) {
        setLoading("Some Error Occured!")
        console.log(error)
      }
    })()
  }, [dispatch])

  useEffect(() => {
    (async () => {
      const dataFromLocalStorage = localStorage.getItem("loggedInUser")
      if (dataFromLocalStorage) {
        const parsedData: LSLoggedInUser = JSON.parse(dataFromLocalStorage || '{}')
        dispatch({ type: "SET_LOGGED_IN_TOKEN", payload: parsedData.loggedInToken })
        dispatch({ type: "SET_LOGGED_IN_USER", payload: parsedData.user })
      }
    })()
  }, [dispatch])
  return (
    <div className="App">
      <Box textAlign="center" bg="#3fc1c9" w="100%" p={4} marginBottom="1rem" color="black">
        <Link to="/">
          <Text fontSize="6xl">Quiziker</Text>
        </Link>
      </Box>
      {loading && <Text display="flex" justifyContent="center" >{loading}</Text>}
      <Routes>
        <Route path="/" element={<QuizzesDisplay />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <PrivateRoute login={state.loggedInToken ? true : false} path="/results" element={<Results />} />
        <Route path="/play/:quizId" element={<PlayArea />} />
        <Route path="/final-score/:quizId" element={<FinalScore />} />
      </Routes>
    </div>
  );
}

export default App;
