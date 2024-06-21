import { useEffect, useState } from "react";
//import { Product } from "../../../models/product";
import ProductRow from "../product-row/ProductRow";
import { deleteProduct, getProducts } from "../../../services/productservice";
import styles from "./ProductList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../../redux/store";
import { fetchProductsFailure, fetchProductsInitiate, fetchProductsSuccess } from "../../../redux/reducers";

const ProductList = () => {


    const { fetchStatus, errorMessage, products } = useSelector((stateMap: AppStateType) => stateMap.productRecordsState)
    const dispatch = useDispatch()

    // const [fetchStatus, setFetchStatus] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')
    // const [products, setProducts] = useState<Product[]>([])

    const loadData = async () => {
        const initiateAction = fetchProductsInitiate()
        dispatch(initiateAction)

        try {
            const response = await getProducts()
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                // setFetchStatus(true)
                // setErrorMessage('')
                // setProducts(apiResponse.data)
                const successAction = fetchProductsSuccess(apiResponse.data)
                dispatch(successAction)
            } else {
                // setFetchStatus(true)
                // setErrorMessage(apiResponse.message)
                // setProducts([])
                const failureAction = fetchProductsFailure(apiResponse.message)
                dispatch(failureAction)
            }
        } catch (error: any) {
            // setFetchStatus(true)
            // setErrorMessage(error.message)
            // setProducts([])
            const failureAction = fetchProductsFailure(error.message)
            dispatch(failureAction)
        }
    }

    const deleteRecord = async (id: number) => {
        try {
            const response = await deleteProduct(id)
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                loadData()
            } else {
                //setErrorMessage(apiResponse.message)
                alert(apiResponse.message)
            }
        } catch (error: any) {
            //setErrorMessage(error.message)
            alert(error.message)
        }
    }

    useEffect(
        () => {
            loadData()
        },
        []
    )
    let design: any;
    if (!fetchStatus) {
        design = <span>Loading...</span>
    } else if (errorMessage !== '') {
        design = <span>{errorMessage}</span>
    } else if (products.length === 0) {
        design = <span>No records...</span>
    } else {
        design = (
            <>
                <h2>List of Products</h2>
                <br />
                <table className="table table-hover">
                    <thead className={styles.tblheadstyle}>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="table-dark">
                        {
                            products.map(
                                p => <ProductRow
                                    key={p.productId}
                                    product={p}
                                    deleteProductHandler={deleteRecord}
                                />
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }
    console.log('Plist rendering');
    return design
}

export default ProductList