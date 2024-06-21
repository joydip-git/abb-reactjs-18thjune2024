import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authenticate } from "../../../services/authservice"
import { User } from "../../../models/user"

const Login = () => {

    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const returnUrl = queryParams.get('returnUrl')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async () => {

        const user: User = { username: userName, password: password }
        try {
            const response = await authenticate(user)
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                localStorage.setItem('token', apiResponse.data)
                if (returnUrl) {
                    navigate(`/${returnUrl}`)
                } else
                    navigate('/products')
            } else
                alert('not a valid user')
        } catch (err: any) {
            alert(err.message)
        }
    }
    return (
        <form>
            <div>
                <label htmlFor="txtUserName">UserName:&nbsp;</label>
                <input type="text"
                    id='txtUserName'
                    value={userName}
                    onChange={
                        (e) => setUserName(e.target.value)
                    }
                />
            </div>
            <div>
                <label htmlFor="txtPassword">Password:&nbsp;</label>
                <input type="password"
                    id='txtPassword'
                    value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                />
            </div>
            <div>
                <input type="submit" value="LogIn" onClick={
                    (e) => {
                        e.preventDefault()
                        loginHandler()
                    }
                } />
            </div>
        </form>
    )
}

export default Login