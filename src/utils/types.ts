export type Option = {
    answer: string,
    correct: boolean
}

export type Question = {
    question: string,
    options: Option[]
}

export type Quiz = {
    _id: string,
    name: string,
    questions: Question[]
}

export type Quizzes = Quiz[];

export type Action =
    | { type: "RESET_QUIZ" }
    | { type: "INCREMENT_SCORE"; payload: number }
    | { type: "DECREMENT_SCORE"; payload: number }
    | { type: "INCREMENT_QUESTION_NUMBER" }
    | { type: "SET_QUIZZES"; payload: Quiz[] }
    | { type: "SET_LOGGED_IN_TOKEN"; payload: string | null }
    | { type: "SET_LOGGED_IN_USER"; payload: User | null };

export type User = {
    _id: string;
    name: string;
    email: string;
}

export type InitialState = {
    quizzes: Quiz[] | null,
    score: number,
    currentQuestionNumber: number,
    loggedInToken: null | string,
    user: null | User,
}

export type AppProvider = {
    state: InitialState,
    dispatch: (action: Action) => void
}

export type QuizServerResponse = {
    success: boolean;
    quizzes: Quiz[]
}

export type LoginSignupServerResponse = {
    success: boolean;
    token: string;
    restUserData: User;
    message: string | undefined;
    errorMessage: string | undefined;
}

export type Result = {
    quizName: string;
    finalScore: string;
    usersName: string;
    userId: string
}

export type ResultsServerResponse = {
    success: boolean;
    results: Result[] | null;
    resultSaved: Result | null;
    message: string | undefined;
    errorMessage: string | undefined;
}

export type LoginSignup = {
    name: null | string,
    email: null | string,
    password: null | string,
}

export type Loading = {
    loading: null | string;
}

export type PrivateRouteProps = {
    path: string;
    login: boolean;
    element: any;
}

export type LSLoggedInUser = {
    loggedInToken: string;
    user: User
}

export type LocalStorage = {
    loggedInUser: LSLoggedInUser | null
}