import { useEffect } from "react"
import { getProduct } from "../../../services/productservice"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from "../../../redux/store"
import { fetchProductFailure, fetchProductInitiate, fetchProductSuccess } from "../../../redux/reducers"


const ProductDetail = () => {

    const { id } = useParams()
    const selectedProductId = Number(id)

    // const [fetchStatus, setFetchStatus] = useState(false)
    // const [errorMessage, setErrorMessage] = useState('')
    // const [productInfo, setProduct] = useState<Product | undefined>(undefined)

    const { fetchStatus, errorMessage, productInfo } = useSelector((stateMap: AppStateType) => stateMap.productInfoState)
    const dispatch = useDispatch()

    const fetchProduct = async () => {
        const initiateAction = fetchProductInitiate()
        dispatch(initiateAction)
        try {
            const response = await getProduct(selectedProductId)
            const apiResponse = response.data
            if (apiResponse.data !== null) {
                // setProduct(apiResponse.data)
                // setErrorMessage('')
                // setFetchStatus(true)
                const successAction = fetchProductSuccess(apiResponse.data)
                dispatch(successAction)
            } else {
                // setProduct(undefined)
                // setErrorMessage(apiResponse.message)
                // setFetchStatus(true)
                const failureAction = fetchProductFailure(apiResponse.message)
                dispatch(failureAction)
            }
        } catch (error: any) {
            // setProduct(undefined)
            // setErrorMessage(error.message)
            // setFetchStatus(true)
            const failureAction = fetchProductFailure(error.message)
            dispatch(failureAction)
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
    else if (!productInfo)
        design = <span>No record</span>
    else
        design = (
            <div>
                <div>
                    <div>
                        Details of: &nbsp;{productInfo.productName}
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>Name:&nbsp;</div>
                                <div >{productInfo.productName}</div>
                            </div>
                            <div>
                                <div>Code:&nbsp;</div>
                                <div>{productInfo.productCode}</div>
                            </div>
                            <div>
                                <div>Description:&nbsp;</div>
                                <div>{productInfo.description}</div>
                            </div>
                            <div>
                                <div>Availability:&nbsp;</div>
                                <div>{productInfo.releaseDate}</div>
                            </div>
                            <div>
                                <div>Price:&nbsp;</div>
                                <div>{productInfo.price}</div>
                            </div>
                            <div>
                                <div>Rating:&nbsp;</div>
                                <div>
                                    {productInfo.starRating}
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={productInfo.imageUrl}
                                alt="NA" title={productInfo.productName} />
                        </div>
                    </div>
                    <div>
                        <Link to={`/products/edit/${productInfo.productId}`}>
                            <button type="button"
                                className="btn btn-primary">Edit</button>
                        </Link>
                    </div>
                </div>
            </div >
        )

    console.log('PView rendering...');
    return design
}

export default ProductDetail