import { Outlet } from 'react-router-dom'

const ProductOutlet = () => {
    return (
        <div className='container container-fluid'>
            <Outlet />
        </div>
    )
}

export default ProductOutlet