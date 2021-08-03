import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { useQuiz } from "../contexts/QuizContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Quiz } from "../utils/types";
import axios from "axios";
import { ResultsServerResponse, Loading } from "../utils/types"
import { useState } from "react";

const FinalScore = () => {
    const { state, dispatch } = useQuiz()
    const navigate = useNavigate()
    const { quizId } = useParams()
    const [loading, setLoading] = useState<Loading['loading']>(null)
    const quizToPlay: Quiz | undefined = state.quizzes?.find(quiz => quiz._id === quizId)
    const saveResult = async () => {
        if (!state.loggedInToken) {
            navigate('/login')
        } else {
            setLoading("Saving Result...")
            try {
                const resultPosted = await axios.post<ResultsServerResponse>('https://quiziker-api.herokuapp.com/results', { quizName: quizToPlay?.name, finalScore: state.score, usersName: state?.user?.name }, { headers: { Authorization: state.loggedInToken } })
                if (resultPosted.data.success) {
                    setLoading("Result Saved!")
                }
            } catch (error) {
                setLoading("Some Error Occured!")
                console.log(error)
            }
        }
    }
    return (
        <div>
            <Box textAlign="center">
                <Link to="/">
                    <Button onClick={() => dispatch({ type: "RESET_QUIZ" })} colorScheme="teal" size="lg" width="10rem" margin="0.5rem" >
                        Play More
                    </Button>
                </Link>
                <Button onClick={saveResult} colorScheme="teal" size="lg" width="10rem" margin="0.5rem" >
                    Save Result
                </Button>
                <Link to="/results">
                    <Button colorScheme="teal" size="lg" width="10rem" margin="0.5rem" >
                        Results
                    </Button>
                </Link>
            </Box>
            {loading && <Text textAlign="center" fontSize="2xl">{loading}</Text>}
            <Text textAlign="center" fontSize="4xl">{quizToPlay?.name}</Text>
            <Text textAlign="center" fontSize="3xl">Your final score is {state.score}.</Text>
            <Flex alignItems="flex-start" justifyContent="center" flexWrap="wrap">
                {
                    quizToPlay?.questions.map(question => {
                        return (
                            <Box height="13rem" borderWidth="3px" borderRadius="lg" overflow="hidden" w="20rem" p={4} m={1} color="black">
                                <Text fontSize="2xl">{question.question}</Text>
                                {
                                    question.options.map(option => {
                                        return (
                                            <Text color="#3490de">
                                                {option.correct && `Answer: ${option.answer}`}
                                            </Text>
                                        )
                                    })
                                }
                                <Text></Text>
                            </Box>
                        )
                    })
                }
            </Flex>
        </div>
    )
}

export default FinalScore;