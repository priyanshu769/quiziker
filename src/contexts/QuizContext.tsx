import { createContext, useContext, useReducer } from "react";
import { quizReducer, initialState } from '../utils/quizReducer'
import { AppProvider } from "../utils/types"

export const QuizContext = createContext<AppProvider>({} as AppProvider);

const QuizProvider = ({ children } : any) => {
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
    return useContext<AppProvider>(QuizContext)
}

export default QuizProvider