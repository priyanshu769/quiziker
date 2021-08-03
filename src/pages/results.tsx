import { Box, Flex, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { Result, Loading, ResultsServerResponse } from "../utils/types";


export const Results = () => {
    const { state, dispatch } = useQuiz()
    const [results, setResults] = useState<Result[] | null>(null)
    const [loading, setLoading] = useState<Loading["loading"]>(null)
    useEffect(() => {
        (async () => {
            setLoading("Loading...")
            try {
                const results = await axios.get<ResultsServerResponse>('https://quiziker-api.herokuapp.com/results', { headers: { Authorization: state.loggedInToken } })
                if (results.data.success) {
                    setResults(results.data.results)
                    setLoading(null)
                }
            } catch (error) {
                setLoading("Some Error Occured!")
                console.log(error)
            }
        })()
    }, [state.loggedInToken])
    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Link to="/">
                    <Button onClick={() => dispatch({ type: "RESET_QUIZ" })} colorScheme="teal" size="lg" width="10rem" >
                        Play More
                    </Button>
                </Link>
            </Box>
            {loading && <Text display="flex" justifyContent="center" fontSize="2xl">{loading}</Text>}
            <Flex alignItems="flex-start" justifyContent="center" flexWrap="wrap">
                {results?.map(result => {
                    return (
                        <Box borderWidth="3px" borderRadius="lg" overflow="hidden" w="20rem" p={4} m={1} color="black">
                            <Text fontWeight="bold" fontSize="2xl">{result.usersName}</Text>
                            <Text fontSize="2xl">{result.quizName} Quiz</Text>
                            <Text color="#3490de" fontSize="2xl">{result.finalScore}</Text>
                        </Box>
                    )
                })}
            </Flex>
        </div>
    )
}
