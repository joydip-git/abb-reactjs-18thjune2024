import { Link, useNavigate } from "react-router-dom"
import { TokenStorageService } from "../../../services/tokenstoageservice"
import { useEffect, useState } from "react"

const DashBoard = () => {
    const [tokenState, setTokenState] = useState('')
    const navigate = useNavigate()

    const tokenService = TokenStorageService.instantiate()

    useEffect(
        () => {
            tokenService
                .storeObservable
                .subscribe({
                    next: (token) => setTokenState(token),
                    error: (err) => setTokenState('')
                })
        },
        [tokenState]
    )

    const dashBoardDesign = (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/home'}>PRODUCT MANAGEMENT SYSTEM</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to={'/home'}>Home
                                <span className="visually-hidden">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">PRODUCTS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products/add">ADD PRODUCT</Link>
                        </li>
                        <li className="nav-item">
                            {
                                tokenState !== '' ?
                                    (
                                        <button type="button"
                                            className="btn btn-primary"
                                            onClick={
                                                () => {
                                                    tokenService.removeToken()
                                                    navigate('/login')
                                                }
                                            }>
                                            Logout
                                        </button>
                                    ) :
                                    (
                                        <button type="button"
                                            className="btn btn-primary"
                                            onClick={
                                                () => navigate('/login')
                                            }
                                        >
                                            Login
                                        </button>
                                    )
                            }

                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
    return dashBoardDesign
}

export default DashBoard