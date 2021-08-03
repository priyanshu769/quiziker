import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { LoginSignup, LoginSignupServerResponse, Loading } from "../utils/types";

const Signup = () => {
    const [name, setName] = useState<LoginSignup["name"]>(null)
    const [email, setEmail] = useState<LoginSignup["email"]>(null)
    const [password, setPassword] = useState<LoginSignup["password"]>(null)
    const [loading, setLoading] = useState<Loading['loading']>(null)
    const { dispatch } = useQuiz()
    const navigate = useNavigate()
    const signupHandler = async () => {
        try {
            setLoading("Creating Your Account...")
            const signedUp = await axios.post<LoginSignupServerResponse>('https://quiziker-api.herokuapp.com/signup', { name: name, email: email, password: password })
            if (signedUp.data.success) {
                setLoading("Signed Up")
                dispatch({ type: "SET_LOGGED_IN_TOKEN", payload: signedUp.data.token })
                dispatch({ type: "SET_LOGGED_IN_USER", payload: signedUp.data.restUserData })
                localStorage.setItem("loggedInUser", JSON.stringify({ loggedInToken: signedUp.data.token, user: signedUp.data.restUserData }))
                navigate('/')
            }
        } catch (error) {
            setLoading("Some error occured!")
            console.log(error)
        }
    }
    return (
        <div>
            <Box display="flex" justifyContent="center">
                {loading && <Text>{loading}</Text>}
                <Box textAlign="center" bg="#3fc1c9" w="20rem" p={4} m={1} color="black">
                    <Input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" size="md" />
                    <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" size="md" />
                    <Input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" size="md" />
                    <Button onClick={signupHandler} colorScheme="teal" size="md">Signup</Button>
                    <Text fontSize='2xl'>Already a user, <Link to="/login">Signup.</Link></Text>
                </Box>
            </Box>
        </div>
    )
}

export default Signup;