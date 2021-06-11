import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";

const QuizzesDisplay = () => {
    const { state } = useQuiz();
    return (
        <div>
            <Flex alignItems="flex-start" justifyContent="center" flexWrap="wrap">
                {state.quizzes?.map(quiz => {
                    return (
                        <Box textAlign="center" bg="#3fc1c9" w="20rem" p={4} m={1} color="white">
                            <Text fontSize="2xl">{quiz.name}</Text>
                            <Link to={`/play/${quiz._id}`}>
                                <Button colorScheme="teal" size="lg">
                                    Play
                                </Button>
                                </Link>
                        </Box>
                    )
                })}
            </Flex>
        </div>
    )
}

export default QuizzesDisplay;