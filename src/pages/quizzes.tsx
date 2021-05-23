import { quizzes } from "../utils/data";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"

const Quizzes = () => {
    return (
        <div>
            <Flex alignItems="flex-start" justifyContent="center" flexWrap="wrap">
                {quizzes.map(quiz => {
                    return (
                        <Box bg="#3fc1c9" w="20rem" p={4} m={1} color="white">
                            <Text fontSize="2xl">{quiz.name}</Text>
                            <Link to={`/play/${quiz.id}`}>
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

export default Quizzes;