import { useRef, useState } from "react"
import { Product } from "../../../models/product"
import { addProduct } from "../../../services/productservice"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {

    const navigate = useNavigate()

    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [productCode, setProductCode] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [price, setPrice] = useState(0)
    const [starRating, setStarRating] = useState(0)

    // const [input, setInput] = useState<{ value: any, name: string, valErro: '' }>({ value: 0, name: 'productId', valErro: '' })

    //const [inputError, setInputError] = useState('')
    const idRef = useRef<HTMLInputElement>(null)


    // const validate = () => {
    //     console.log(idRef);
    //     if (idRef !== null) {
    //         if (idRef.current?.value === '')
    //             setInputError('value required')
    //         else {
    //             setInputError('')
    //         }
    //     }
    // }

    const submitProduct = async () => {
        if (window.confirm('like to submit?')) {
            const product: Product = {
                productId: Number(productId),
                productName: productName,
                productCode: productCode,
                description: description,
                releaseDate: releaseDate,
                starRating: starRating,
                imageUrl: imageUrl,
                price: price
            }
            console.log(product);
            try {
                const response = await addProduct(product)
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
    }

    const addFormDesign = (
        <div className="row">
            <div className="col-xs-12 col-md-6 col-md-6-offest-3">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="productId">Id:</label>
                        <input type="text"
                            ref={idRef}
                            id="productId"
                            className="form-control"
                            placeholder="enter product id"
                            value={productId}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setProductId(val)
                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productName">Name:</label>
                        <input type="text"
                            id="productName"
                            className="form-control"
                            placeholder="enter product name"
                            value={productName}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setProductName(val)
                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productCode">Code:</label>
                        <input type="text"
                            id="productCode"
                            className="form-control"
                            placeholder="enter product code"
                            value={productCode}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setProductCode(val)
                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="enter product description"
                            value={description}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setDescription(val)
                                }
                            }
                            cols={80}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="releaseDate">Released On:</label>
                        <input type="datetime"
                            id="releaseDate"
                            className="form-control"
                            placeholder="enter product releaseDate"
                            value={releaseDate}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setReleaseDate(val)
                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number"
                            id="price"
                            className="form-control"
                            placeholder="enter product price"
                            value={price}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setPrice(Number(val))
                                }
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="starRating">Rating:</label>
                        <input type="number"
                            id="starRating"
                            className="form-control"
                            placeholder="enter product rating"
                            value={starRating}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setStarRating(Number(val))
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
                            value={imageUrl}
                            onChange={
                                (e) => {
                                    const val = e.target.value
                                    if (val && val !== '')
                                        setImageUrl(val)
                                }
                            }
                        />
                    </div>

                    <div className="container-fluid centerStyle">
                        <button type="submit" className="btn btn-primary"
                            onClick={
                                (e) => {
                                    e.preventDefault()
                                    submitProduct()
                                }
                            }
                        >
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
    return addFormDesign
}

export default AddProduct