import { Navigate, useLocation } from 'react-router-dom'
import ProductOutlet from '../../products/product-outlet/ProductOutlet'
import { TokenStorageService } from '../../../services/tokenstoageservice'

const RouteGuard = () => {

    const location = useLocation()
    const path = location.pathname
    const url = path.replace('/', '')

    //const token = localStorage.getItem('token')
    const token = TokenStorageService.instantiate().getToken()
    if (token) {
        return <ProductOutlet />
    } else {
        return <Navigate to={`/login?returnUrl=${url}`} />
    }
}

export default RouteGuard