import { Suspense, lazy } from "react"
import { Navigate, RouteObject, useRoutes } from "react-router-dom"
import Login from "../components/auth/login/Login";
import AddProduct from "../components/products/add-product/AddProduct";
import EditProduct from "../components/products/edit-product/EditProduct";
//import RouteGuard from "../components/auth/route-guard/RouteGuard";
// import ProductList from "../components/products/product-list/ProductList"
// import ProductView from "../components/products/product-view/ProductView"
// import Home from "../components/common/home/Home"
// import PageNotFound from "../components/common/page-not-found/PageNotFound"

const ProductList = lazy(() => import('../components/products/product-list/ProductList'));
const ProductDetail = lazy(() => import("../components/products/product-detail/ProductDetail"));
const Home = lazy(() => import("../components/common/home/Home"))
const PageNotFound = lazy(() => import("../components/common/page-not-found/PageNotFound"))
const RouteGuard = lazy(() => import("../components/auth/route-guard/RouteGuard"));

const AppRoutes = () => {

    const appRoutes: RouteObject[] = [
        {
            path: 'products',
            element: <RouteGuard />,
            children: [
                {
                    path: '',
                    element: <ProductList />
                },
                {
                    path: 'add',
                    element: <AddProduct />
                },
                {
                    path: 'view/:id',
                    element: <ProductDetail />
                },
                {
                    path: 'edit/:id',
                    element: <EditProduct />
                }
            ]
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'home',
            element: <Home />
        },
        {
            path: '',
            element: <Navigate to={'/home'} replace />
        },
        {
            path: '*',
            element: <PageNotFound />
        }
    ]

    const routes = useRoutes(appRoutes)
    return (
        <Suspense fallback={<Fallback />}>
            {routes}
        </Suspense>
    )
}

const Fallback = () => {
    return <span>Loading module..please wait</span>
}

export default AppRoutes