import { Product } from "../../../models/product"
import styles from "./ProductDetail.module.css";
//import './ProductDetail.module.css'

type ProductDetailPropType = {
    product: Product,
    deleteProductHandler: (id: number) => void,
    selectIdHandler: (id: number) => void
}

const ProductDetail = (props: Readonly<ProductDetailPropType>) => {
    const { product, deleteProductHandler, selectIdHandler } = props
    const design = (
        <tr>
            <td>
                <img
                    src={product.imageUrl}
                    title={product.productName}
                    alt="NA"
                    className={styles.imgstyle}
                    onClick={
                        () => selectIdHandler(product.productId)
                    }
                />
            </td>
            <td>{product.productName}</td>
            <td>{product.price}</td>
            <td>{product.starRating}</td>
            <td>
                <button type="button" onClick={
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

export default ProductDetail