import { Heading, Text, Button, UnorderedList, ListItem } from "@chakra-ui/react";
import { useQuiz } from "../contexts/QuizContext";
import { Quiz, Option } from "../utils/types";
import { initialState } from "../utils/quizReducer";
import { useParams, Link } from "react-router-dom";
import { quizzes } from "../utils/data";
import { useState } from "react";

const PlayArea = () => {
    const [buttonColor, setButtonColor] = useState<boolean>(false)
    const { state, dispatch } = useQuiz()
    const { quizId } = useParams()
    const quizToPlay: Quiz | undefined = quizzes.find(quiz => quiz.id === quizId)

    const buttonColorChanger = (buttonColor: boolean, option: Option) => {
        if (!buttonColor) {
            return "teal"
        }
        if (buttonColor) {
            if (option.correct) {
                return "green"
            } else return "red"
        }
    }

    const increaseQuestionNumber = () => {
        setButtonColor(false)
        dispatch({ type: "INCREMENT_QUESTION_NUMBER" })
    }

    const chosenOptionFunction = (option: Option, state: typeof initialState, quizToPlay: Quiz | undefined) => {
        if (option.correct) {
            dispatch({ type: "INCREMENT_SCORE", payload: 5 });
            setButtonColor(true)
            if (quizToPlay && state.currentQuestionNumber !== quizToPlay?.questions?.length - 1) {
                return setTimeout(increaseQuestionNumber, 2000)
            }
        }
        if (!option.correct) {
            dispatch({ type: "DECREMENT_SCORE", payload: 0 })
            setButtonColor(true)
            if (quizToPlay && state.currentQuestionNumber !== quizToPlay?.questions?.length - 1) {
                return setTimeout(increaseQuestionNumber, 2000)
            }
        }
    }


    return (
        <div>
            <Heading textAlign="center">{quizToPlay?.name}</Heading>
            <Text textAlign="center">Your Score: {state.score}</Text>
            <Text textAlign="center" fontSize="2xl">{quizToPlay?.questions[state.currentQuestionNumber].question}</Text>
            <UnorderedList textAlign="center" listStyleType="none">
                {quizToPlay?.questions[state.currentQuestionNumber].options.map((option: Option) => {
                    return (
                        <ListItem margin={2}>
                            {
                                state.currentQuestionNumber + 1 === quizToPlay?.questions?.length ?
                                    <Link to={`/final-score/${quizToPlay.id}`}>
                                        <Button onClick={() => chosenOptionFunction(option, state, quizToPlay)} colorScheme={buttonColorChanger(buttonColor, option)} size="lg" width="20rem" >
                                            {option.answer}
                                        </Button>
                                    </Link>
                                    :
                                    <Button onClick={() => chosenOptionFunction(option, state, quizToPlay)} colorScheme={buttonColorChanger(buttonColor, option)} size="lg" width="20rem" >
                                        {option.answer}
                                    </Button>
                            }
                        </ListItem>
                    )
                })}
            </UnorderedList>
        </div >
    )
}

export default PlayArea;