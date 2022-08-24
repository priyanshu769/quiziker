import { Box, Button, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { LoginSignup, LoginSignupServerResponse, Loading } from "../utils/types";

const Signup = () => {
    const [name, setName] = useState<LoginSignup["name"]>('')
    const [email, setEmail] = useState<LoginSignup["email"]>('')
    const [password, setPassword] = useState<LoginSignup["password"]>('')
    const [loading, setLoading] = useState<Loading['loading']>(null)
    const { state, dispatch } = useQuiz()
    const navigate = useNavigate()
    const checkCredentials = (name: String, email: String, password: String) => {
        if (name.length > 3) {
            if (email.includes('@') && !email.includes(' ')) {
                if (password.length > 5) {
                    return true
                } else {
                    setLoading('Password must 6 characters or long.')
                    return false
                }
            } else {
                setLoading('Enter a Valid email.')
                return false
            }
        } else {
            setLoading('Name must be greater than two characters.')
            return false
        }
    }
    const signupHandler = async () => {
        const credentialsChecked = checkCredentials(name, email, password)
        if (credentialsChecked) {
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
    }
    return (
        <div>
            <div style={{ display: state.loggedInToken ? "none" : "block" }}>
                <Box display="flex" justifyContent="center">
                    <Box w="20rem" p={4} m={1} color="black">
                        {loading && <Text>{loading}</Text>}
                        <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" size="md" m="0.5rem" />
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" size="md" m="0.5rem" />
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" size="md" m="0.5rem" />
                        <Button onClick={signupHandler} colorScheme="teal" size="md" m="0.5rem">Signup</Button>
                        <Text fontSize='2xl'>Already a user? <Link to="/login"><Text color="#3490de">Login</Text></Link></Text>
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

export default Signup;