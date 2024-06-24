import { useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { authenticate } from "../../../services/authservice"
import { User } from "../../../models/user"
import { TokenStorageService } from "../../../services/tokenstoageservice"

type FormErrorType = {
    username: string, password: string, email: string
}
const Login = () => {

    const navigate = useNavigate()
    const [queryParams] = useSearchParams()
    const returnUrl = queryParams.get('returnUrl')

    // const [userName, setUserName] = useState('')
    // const [password, setPassword] = useState('')

    const [formData, setFormData] = useState<User>({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<any>({});

    const buttonRef = useRef<HTMLInputElement>(null)

    const validateForm = (data: User) => {
        const formErrors: any = {};

        if (!data.username.trim()) {
            formErrors.username = 'Username is required';
        } else if (!/\S+@\S+\.\S+/.test(data.username)) {
            formErrors.username = 'Email is invalid';
        }

        if (!data.password) {
            formErrors.password = 'Password is required';
        } else if (data.password.length < 6 || data.password.length > 12) {
            formErrors.password = `Password must be between 6 to 12 characters long`;
        }

        return formErrors;
    };

    const loginHandler = async () => {
        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const user: User = { username: formData.username, password: formData.password }
            try {
                const response = await authenticate(user)
                const apiResponse = response.data
                if (apiResponse.data !== null) {
                    //localStorage.setItem('token', apiResponse.data)
                    //using TokenService class here
                    TokenStorageService
                        .instantiate()
                        .saveToken(apiResponse.data)

                    if (returnUrl) {
                        navigate(`/${returnUrl}`)
                    } else
                        navigate('/products')
                } else
                    alert('not a valid user')
            } catch (err: any) {
                alert(err.message)
            }
        } else {
            alert('form validation failed...')
        }
    }
    return (
        <form>
            <div>
                <label htmlFor="txtUserName">UserName:&nbsp;</label>
                <input type="text"
                    id='txtUserName'
                    value={formData.username}
                    onChange={
                        (e) => setFormData(
                            (currentFormData) => ({ username: e.target.value, password: currentFormData.password })
                        )
                    }
                />
                <br />
                {
                    errors.username &&
                    (
                        <span className="error-message">
                            {errors.username}
                        </span>
                    )
                }
            </div>
            <div>
                <label htmlFor="txtPassword">Password:&nbsp;</label>
                <input type="password"
                    id='txtPassword'
                    value={formData.password}
                    onChange={
                        (e) => setFormData(
                            (currentFormData) => ({ password: e.target.value, username: currentFormData.username })
                        )
                    }
                />
                <br />
                {errors.password &&
                    (
                        <span className="error-message">
                            {errors.password}
                        </span>
                    )
                }
            </div>
            <div>
                <input type="submit" value="LogIn" ref={buttonRef} onClick={
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