export type Option = {
    answer: string,
    correct: boolean
}

export type Question = {
    question: string,
    options: Option[]
}

export type Quiz = {
    id: string,
    name: string,
    questions: Question[]
}

export type Quizzes = Quiz[]

export type Action =
    | { type: "RESET_QUIZ" }
    | { type: "INCREMENT_SCORE"; payload: number }
    | { type: "DECREMENT_SCORE"; payload: number }
    | { type: "INCREMENT_QUESTION_NUMBER" };