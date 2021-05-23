import { Text, Flex, Box, Button } from "@chakra-ui/react";
import { useQuiz } from "../contexts/QuizContext";
import { useParams, Link } from "react-router-dom";
import { quizzes } from "../utils/data";
import { Quiz } from "../utils/types";

const FinalScore = () => {
    const { state, dispatch } = useQuiz()
    const { quizId } = useParams()
    const quizToPlay: Quiz | undefined = quizzes.find(quiz => quiz.id === quizId)
    return (
        <div>
            <Box textAlign="center">
                <Link to="/">
                    <Button onClick={() => dispatch({ type: "RESET_QUIZ" })} colorScheme="teal" size="lg" width="10rem" >
                        Play More
                    </Button>
                </Link>
            </Box>
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
                                            <Text>
                                                {option.correct && option.answer}
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