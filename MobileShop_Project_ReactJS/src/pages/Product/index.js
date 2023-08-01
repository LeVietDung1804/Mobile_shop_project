import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getComments, getProduct, createCommentProducts } from "../../services/Api";
import { getProductImage } from "../../shared/ultils";
import moment from "moment";
import Pagination from "../../shared/components/Pagination";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../shared/constants/action-type";

const Product = () => {
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [inputs, setInputs] = useState({});
    const [pages, setPages] = useState({
        limit: 10
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page") || 1;
    const params = useParams();
    const id = params.id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        //Get Product Details
        getProduct(id, {}).then(({ data }) => setProduct(data.data));

        //Get Comments
        getProductComment(id);

    }, [id, page]);

    //Post Comments
    const getProductComment = (id) => {
        getComments(id, {
            params: {
                limit: 10,
                page: page
            }
        }).then(({ data }) => {
            setComments(data.data.docs);
            //Pagination
            setPages({ ...pages, ...data.data.pages });
        });

    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        createCommentProducts(id, inputs, {}).then(({ data }) => {
            console.log(data);
            if (data.status === "success") {
                setInputs({});
            }
            getProductComment(id);
        });
    };

    //ADD ITEM TO CART

    const addItemCart = (type) => {
        if (product) {
            const { _id, name, price, image } = product;
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    _id,
                    name,
                    price,
                    image,
                    qty: 1
                }
            });
        }

        if (type === "buy-now") {
            return navigate("/cart");
        }
    };

    return (
        <>
            {/*	List Product	*/}
            <div id="product">
                <div id="product-head" className="row">
                    <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                        <img src={getProductImage(product.image)} />
                    </div>
                    <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                        <h1>{product.name}</h1>
                        <ul>
                            <li><span>Bảo hành:</span> 12 Tháng</li>
                            <li><span>Đi kèm:</span> {product.accessories}</li>
                            <li><span>Tình trạng:</span> {product.status}</li>
                            <li><span>Khuyến Mại:</span> {product.promotion}</li>
                            <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                            <li id="price-number">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}</li>
                            <li className={product.is_stock ? "" : "text-danger"} id="status">{product.is_stock ? "Còn hàng" : "Hết hàng"}</li>
                        </ul>
                        <div id="add-cart">
                            <button onClick={() => addItemCart("buy-now")} className="btn btn-warning mr-2"> Mua ngay</button>
                            <button onClick={addItemCart} className="btn btn-info"> Thêm vào giỏ hàng</button>
                        </div>

                    </div>
                </div>
                <div id="product-body" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Đánh giá về {product.name}</h3>
                        {product.details}
                    </div>
                </div>
                {/*	Comment	*/}
                <div id="comment" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h3>Bình luận sản phẩm</h3>
                        <form method="post">
                            <div className="form-group">
                                <label>Tên:</label>
                                <input onChange={onChangeInput} name="name" required type="text" className="form-control" value={inputs?.name || ""} />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input onChange={onChangeInput} name="email" required type="email" className="form-control" id="pwd" value={inputs?.email || ""} />
                            </div>
                            <div className="form-group">
                                <label>Nội dung:</label>
                                <textarea onChange={onChangeInput} name="content" required rows={8} className="form-control" value={inputs?.content || ""} />
                            </div>
                            <button onClick={onHandleSubmit} type="submit" name="sbm" className="btn btn-primary">Gửi</button>
                        </form>
                    </div>
                </div>
                {/*	End Comment	*/}
                {/*	Comments List	*/}
                <div id="comments-list" className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="comment-item">
                            {
                                comments.map((comment) =>
                                    <ul>
                                        <li><b>{comment.name}</b></li>
                                        <li>{moment(comment.createdAt).fromNow()}</li>
                                        <li>
                                            <p>{comment.content}</p>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                </div>
                {/*	End Comments List	*/}
            </div>
            {/*	End Product	*/}
            <div id="pagination">
                <Pagination pages={pages} />
            </div>
        </>

    );
};

export default Product;