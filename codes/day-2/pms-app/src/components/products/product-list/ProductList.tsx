import { useState } from "react";
import { Product } from "../../../models/product";
import ProductDetail from "../product-detail/ProductDetail";
import { deleteProduct, getProducts } from "../../../services/productservice";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../models/apiresponse";
import styles from "./ProductList.module.css";

const ProductList = () => {

    const [fetchStatus, setFetchStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [products, setProducts] = useState<Product[]>([])

    const loadData = () => {
        getProducts()
            .then(
                (response: AxiosResponse<ApiResponse<Product[]>>) => {
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
                },
                (error) => {
                    setFetchStatus(true)
                    setErrorMessage(error.message)
                    setProducts([])
                }
            )
    }

    const deleteRecordHandler = (id: number) => {
        console.log(id);
        deleteProduct(id)
            .then(
                (response) => {
                    const apiResponse = response.data
                    if (apiResponse.data !== null) {
                        loadData()
                    } else {
                        setErrorMessage(apiResponse.message)
                    }
                },
                (err) => {
                    setErrorMessage(err.message)
                }
            )
    }
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
                                    deleteProductHandler={deleteRecordHandler}
                                />
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <div>
            <button type="button" onClick={loadData}>
                Load Products
            </button>
            <br />
            {
                design
            }
        </div>
    )
}

export default ProductList