import { useEffect, useState } from "react";
import { Product } from "../../../models/product";
import ProductDetail from "../product-detail/ProductDetail";
import { deleteProduct, getProducts } from "../../../services/productservice";
import styles from "./ProductList.module.css";

const ProductList = () => {

    const [fetchStatus, setFetchStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [products, setProducts] = useState<Product[]>([])

    const loadData = async () => {
        try {
            const response = await getProducts()
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                setFetchStatus(true)
                setErrorMessage('')
                setProducts(apiResponse.data)
            } else {
                setFetchStatus(true)
                setErrorMessage(apiResponse.message)
                setProducts([])
            }
        } catch (error: any) {
            setFetchStatus(true)
            setErrorMessage(error.message)
            setProducts([])
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
                <table>
                    <thead className={styles.tblheadstyle}>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(
                                p => <ProductDetail
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