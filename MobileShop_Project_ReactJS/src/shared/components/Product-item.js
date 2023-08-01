import { Link } from "react-router-dom";
import { getProductImage } from "../ultils";

const ProductItem = ({item}) => {
    return (
        <div className="product-item card text-center">
            <Link to={`/product-${item._id}`}><img src={getProductImage(item.image)} /></Link>
            <h4><Link to={`/product-${item._id}`}>{item.name}</Link></h4>
            <p>Giá Bán: <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span></p>
        </div>
    );
};

export default ProductItem;