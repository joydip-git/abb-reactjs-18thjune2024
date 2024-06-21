import { useEffect, useState } from "react"
import { Product } from "../../../models/product"
import { updateProduct, getProduct } from "../../../services/productservice"
import { useNavigate, useParams } from "react-router-dom"

const EditProduct = () => {

    const [product, setProduct] = useState<Product | undefined>(undefined)
    const [fetchStatus, setFetchStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { id } = useParams()
    const selectedProductId = Number(id)

    const navigate = useNavigate()

    const fetchProduct = async () => {
        try {
            const response = await getProduct(selectedProductId)
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                setProduct(apiResponse.data)
                setErrorMessage('')
                setFetchStatus(true)
            } else {
                setProduct(undefined)
                setErrorMessage(apiResponse.message)
                setFetchStatus(true)
            }
        } catch (error: any) {
            setProduct(undefined)
            setErrorMessage(error.message)
            setFetchStatus(true)
        }
    }

    const sendProduct = async () => {
        if (window.confirm('like to submit?')) {
            if (product) {
                try {
                    const response = await updateProduct(
                        selectedProductId, product)
                    const apiResponse = response.data
                    if (apiResponse.data !== null) {
                        navigate('/products')
                    } else {
                        alert(apiResponse.message)
                    }
                } catch (error: any) {
                    alert(error.message)
                }
            }
        } else
            alert('product data unavailable')
    }

    const updateProductState = (propName: string, value: any) => {
        if (product) {
            const updated: Product = {
                ...product,
                [propName]: value
            }
            setProduct(updated)
        }
    }

    useEffect(
        () => {
            fetchProduct()
        },
        []
    )

    let design: any;
    if (!fetchStatus)
        design = <span>Loading...</span>
    else if (errorMessage !== '')
        design = <span>{errorMessage}</span>
    else if (!product)
        design = <span>No record</span>
    else
        design = (
            <div className="row">
                <div className="col-xs-12 col-md-6 col-md-6-offest-3">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="productId">Id:</label>
                            <input type="number" id="productId" className="form-control" placeholder="enter product id" readOnly value={product.productId} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="productName">Name:</label>
                            <input type="text"
                                id="productName"
                                className="form-control"
                                placeholder="enter product name"
                                value={product.productName}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('productName', val)
                                    }
                                } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="productCode">Code:</label>
                            <input type="text"
                                id="productCode"
                                className="form-control"
                                placeholder="enter product code"
                                value={product.productCode}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('productCode', val)
                                    }
                                } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea id="description"
                                className="form-control"
                                placeholder="enter product description"
                                cols={20}
                                value={product.description}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('description', val)
                                    }
                                }>
                            </textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="releaseDate">Released On:</label>
                            <input type="datetime"
                                id="releaseDate"
                                className="form-control"
                                placeholder="enter product releaseDate"
                                value={product.releaseDate}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('releaseDate', val)
                                    }
                                } />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input type="text"
                                id="price"
                                className="form-control"
                                placeholder="enter product price"
                                value={product.price}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('price', Number(val))
                                    }
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="starRating">Rating:</label>
                            <input type="text"
                                id="starRating"
                                className="form-control"
                                placeholder="enter product rating"
                                value={product.starRating}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('starRating', Number(val))
                                    }
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl">URL:</label>
                            <input type="text"
                                id="imageUrl"
                                className="form-control"
                                placeholder="enter product url"
                                value={product.imageUrl}
                                onChange={
                                    (e) => {
                                        const val = e.target.value
                                        if (val && val !== '')
                                            updateProductState('imageUrl', val)
                                    }
                                }
                            />
                        </div>

                        <div className="container-fluid centerStyle">
                            <button type="submit" className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    sendProduct()
                                }}>
                                Submit
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="button" className="btn btn-danger">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    return design
}

export default EditProduct