import { useState } from "react"
import { Product } from "../../../models/product"
import { addProduct } from "../../../services/productservice"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {

    const navigate = useNavigate()

    /*
    const [productId, setProductId] = useState('')
    const [productName, setProductName] = useState('')
    const [productCode, setProductCode] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [price, setPrice] = useState(0)
    const [starRating, setStarRating] = useState(0)
    */
    //now state of every input control value has been saved as part of form state
    const [formData, setFormData] = useState({
        productId: '',
        productName: '',
        productCode: '',
        releaseDate: '',
        description: '',
        imageUrl: '',
        price: '',
        starRating: ''
    });

    const updateFormData = (propName: string, propValue: string) => {
        setFormData((currentFormData) => ({
            ...currentFormData,
            [propName]: propValue
        })
        )
    }

    const submitProduct = async () => {
        if (window.confirm('like to submit?')) {
            const product: Product = {
                productId: Number(formData.productId),
                productName: formData.productName,
                productCode: formData.productCode,
                description: formData.description,
                releaseDate: formData.releaseDate,
                starRating: Number(formData.starRating),
                imageUrl: formData.imageUrl,
                price: Number(formData.price)
            }
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
                            id="productId"
                            className="form-control"
                            placeholder="enter product id"
                            value={formData.productId}
                            onChange={
                                (e) => updateFormData(
                                    'productId', e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productName">Name:</label>
                        <input type="text"
                            id="productName"
                            className="form-control"
                            placeholder="enter product name"
                            value={formData.productName}
                            onChange={
                                (e) => updateFormData(
                                    'productName', e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="productCode">Code:</label>
                        <input type="text"
                            id="productCode"
                            className="form-control"
                            placeholder="enter product code"
                            value={formData.productCode}
                            onChange={
                                (e) => updateFormData(
                                    'productCode', e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="enter product description"
                            value={formData.description}
                            onChange={
                                (e) => updateFormData(
                                    'description', e.target.value
                                )
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
                            value={formData.releaseDate}
                            onChange={
                                (e) => updateFormData(
                                    'releaseDate', e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="number"
                            id="price"
                            className="form-control"
                            placeholder="enter product price"
                            value={formData.price}
                            onChange={
                                (e) =>
                                    updateFormData(
                                        'price', e.target.value
                                    )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="starRating">Rating:</label>
                        <input type="number"
                            id="starRating"
                            className="form-control"
                            placeholder="enter product rating"
                            value={formData.starRating}
                            onChange={
                                (e) => updateFormData(
                                    'starRating', e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">URL:</label>
                        <input type="text"
                            id="imageUrl"
                            className="form-control"
                            placeholder="enter product url"
                            value={formData.imageUrl}
                            onChange={
                                (e) => updateFormData(
                                    'imageUrl', e.target.value
                                )
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