import { useEffect, useMemo, useState } from "react"
import { Product } from "../../../models/product"
import { getProduct } from "../../../services/productservice"

type ProductViewPropType = {
    selectedProductId: number
}
const ProductView = ({ selectedProductId }: Readonly<ProductViewPropType>) => {
    const [fetchStatus, setFetchStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [productInfo, setProduct] = useState<Product | undefined>(undefined)

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
    useMemo(
        () => selectedProductId, [selectedProductId]
    )
    useEffect(
        () => {
            fetchProduct()
        },
        [selectedProductId]
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
                </div>
            </div >
        )

    console.log('PView rendering...');
    return design
}

export default ProductView