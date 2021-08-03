import { Action, InitialState } from "./types"

export const initialState: InitialState = {
    quizzes: null,
    score: 0,
    currentQuestionNumber: 0,
    loggedInToken: null,
    user: null,
}

export const quizReducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case "RESET_QUIZ":
            return { ...state, score: 0, currentQuestionNumber: 0 }
        case "INCREMENT_SCORE":
            return { ...state, score: state.score + action.payload }
        case "DECREMENT_SCORE":
            return { ...state, score: state.score - action.payload }
        case "INCREMENT_QUESTION_NUMBER":
            return { ...state, currentQuestionNumber: state.currentQuestionNumber + 1 }
        case "SET_QUIZZES":
            return { ...state, quizzes: action.payload }
        case "SET_LOGGED_IN_TOKEN":
            return { ...state, loggedInToken: action.payload }
        case "SET_LOGGED_IN_USER":
            return { ...state, user: action.payload }
        default:
            return state;
    }
}