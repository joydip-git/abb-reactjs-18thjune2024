import { Link } from "react-router-dom";
import { Product } from "../../../models/product"
import styles from "./ProductRow.module.css";
//import './ProductRow.module.css'

type ProductRowPropType = {
    product: Product,
    deleteProductHandler: (id: number) => void
}

const ProductRow = (props: Readonly<ProductRowPropType>) => {
    const { product, deleteProductHandler } = props
    const design = (
        <tr>
            <td>
                <Link to={`/products/view/${product.productId}`}>
                    <img

                        src={product.imageUrl}
                        title={product.productName}
                        alt="NA"
                        className={styles.imgstyle}
                    />
                </Link>
            </td>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.starRating}</td>
            <td>
                <button type="button" className="btn btn-danger"
                    onClick={
                        () => {
                            console.log(product);
                            deleteProductHandler(product.productId)
                        }
                    }>Delete</button>
            </td>
        </tr>
    )
    console.log('PDetail rendering...');
    return design
}

export default ProductRow