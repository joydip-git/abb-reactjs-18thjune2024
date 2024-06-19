import { Product } from "../../../models/product"
import styles from "./ProductDetail.module.css";
//import './ProductDetail.module.css'

type ProductDetailPropType = {
    product: Product
}

const ProductDetail = (props: Readonly<ProductDetailPropType>) => {
    const { product } = props
    return (
        <tr>
            <td>
                <img
                    src={product.imageUrl}
                    title={product.productName}
                    alt="NA"
                    className={styles.imgstyle}
                />
            </td>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.starRating}</td>
            <td>
                <button type="button">Delete</button>
            </td>
        </tr>
    )
}

export default ProductDetail