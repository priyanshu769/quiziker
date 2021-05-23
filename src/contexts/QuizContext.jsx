import { createContext, useContext, useReducer } from "react";
import { quizReducer, initialState } from '../utils/quizReducer'

export const QuizContext = createContext();

const QuizProvider = ({ children }) => {
    const [state, dispatch] = useReducer(quizReducer, initialState)
    return (
        <QuizContext.Provider
            value={{
                state, dispatch
            }}
        >
            {children}
        </QuizContext.Provider>
    )
};

export const useQuiz = () => {
    return useContext(QuizContext)
}

export default QuizProvider