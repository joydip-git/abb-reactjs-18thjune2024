import { Navigate, useLocation } from 'react-router-dom'
import ProductOutlet from '../../products/product-outlet/ProductOutlet'

const RouteGuard = () => {

    const location = useLocation()
    const path = location.pathname
    const url = path.replace('/', '')

    const token = localStorage.getItem('token')

    if (token) {
        return <ProductOutlet />
    } else {
        return <Navigate to={`/login?returnUrl=${url}`} />
    }
}

export default RouteGuard