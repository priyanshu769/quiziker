import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { LoginSignup, LoginSignupServerResponse, Loading } from "../utils/types"

const Login = () => {
    const [email, setEmail] = useState<LoginSignup["email"]>(null)
    const [password, setPassword] = useState<LoginSignup["password"]>(null)
    const [loading, setLoading] = useState<Loading['loading']>(null)
    const { state, dispatch } = useQuiz()
    const navigate = useNavigate()
    const location: any = useLocation()
    const loginHandler = async () => {
        try {
            setLoading("Logging In...")
            const loggedIn = await axios.post<LoginSignupServerResponse>('https://quiziker-api.herokuapp.com/login', { email: email, password: password })
            console.log(loggedIn)
            if (loggedIn.data.success) {
                setLoading("Logged In")
                dispatch({ type: "SET_LOGGED_IN_TOKEN", payload: loggedIn.data.token })
                dispatch({ type: "SET_LOGGED_IN_USER", payload: loggedIn.data.restUserData })
                localStorage.setItem("loggedInUser", JSON.stringify({ loggedInToken: loggedIn.data.token, user: loggedIn.data.restUserData }))
                if (!location.state) {
                    dispatch({ type: "RESET_QUIZ" })
                    return navigate('/')
                } else navigate(location.state?.from)
            } else if (loggedIn.data.message) {
                setLoading(loggedIn.data.message)
            }
        } catch (error) {
            setLoading("Some error occured!")
            console.log(error)
        }
    }
    return (
        <div>
            <div style={{ display: state.loggedInToken ? "none" : "block" }}>
                <Box display="flex" justifyContent="center">
                    <Box w="20rem" p={4} m={1} color="black">
                        {loading && <Text fontSize='2xl'>{loading}</Text>}
                        <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" size="md" m="0.5rem" />
                        <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" size="md" m="0.5rem" />
                        <Button onClick={loginHandler} colorScheme="teal" size="md" m="0.5rem">Login</Button>
                        <Text fontSize='2xl'>Not a user? <Link to="/signup"><Text color="#3490de">Signup</Text></Link></Text>
                    </Box>
                </Box>
            </div>
            <div style={{ display: state.loggedInToken ? "block" : "none" }}>
                <Box display="flex" justifyContent="center">
                    <Text fontSize='2xl'>You are logged in, <Link to="/"><Text color="#3490de">Go Play</Text></Link></Text>
                </Box>
            </div>
        </div>
    )
}

export default Login;