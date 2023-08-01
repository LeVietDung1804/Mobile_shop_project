import { useDispatch, useSelector } from "react-redux";
import { getProductImage } from "../../shared/ultils";
import { DELETE_ITEM_CART, UPDATE_CART } from "../../shared/constants/action-type";
import { useState } from "react";
import { order } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [inputs, setInputs] = useState({});

    const carts = useSelector(({ Cart }) => {
        return Cart.items;
    });

    const totalPrice = carts?.reduce((total, cart) => total + cart.qty * cart.price, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    //UPDATE CART
    const onChangeCart = (e, _id) => {
        const val = e.target.value;
        if (val > 0) {
            dispatch({
                type: UPDATE_CART,
                payload: {
                    _id,
                    qty: val
                }
            });
        }

        else {
            //eslint-disable-next-line no-restricted-globals
            const isConfirm = confirm("Xóa sản phẩm?");
            if (isConfirm) {
                dispatch({
                    type: DELETE_ITEM_CART,
                    payload: {
                        _id
                    }
                });
            }

            else {
                dispatch({
                    type: UPDATE_CART,
                    payload: {
                        _id,
                        qty: 1
                    }
                });
            }
        }
    };

    //DELETE CART
    const onDeleteItem = (e, _id) => {
        e.preventDefault();
        //eslint-disable-next-line no-restricted-globals
        const isConfirm = confirm("Xóa sản phẩm?");
        if (isConfirm) {
            dispatch({
                type: DELETE_ITEM_CART,
                payload: {
                    _id
                }
            });
        }

        else {
            return false;
        }
    };

    //ORDER
    const onChangeInputs = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const onSubmitOrder = (e) => {
        e.preventDefault();
        const items = carts?.map((cart) => ({ prd_id: cart._id, qty: cart.qty }));
        order({ items, ...inputs }).then(({ data }) => {
            if (data.status === "success") {
                return navigate("/success");
            }
        });
    };

    return (
        <>
            {/*	Cart	*/}
            <div id="my-cart">
                <div className="row">
                    <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">Thông tin sản phẩm</div>
                    <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">Tùy chọn</div>
                    <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
                </div>
                <form method="post">
                    {
                        carts?.map((cart) =>
                            <div className="cart-item row">
                                <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                                    <img src={getProductImage(cart.image)} />
                                    <h4>{cart.name}</h4>
                                </div>
                                <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                                    <input onChange={(e) => onChangeCart(e, cart._id)} type="number" id="quantity" className="form-control form-blue quantity" value={cart.qty} />
                                </div>
                                <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cart.qty * cart.price)}</b><a onClick={(e) => onDeleteItem(e, cart._id)} href="#">Xóa</a></div>
                            </div>
                        )
                    }
                    <div className="row">
                        <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                            <button id="update-cart" className="btn btn-success" type="submit" name="sbm">Cập nhật giỏ hàng</button>
                        </div>
                        <div className="cart-total col-lg-2 col-md-2 col-sm-12"><b>Tổng cộng:</b></div>
                        <div className="cart-price col-lg-3 col-md-3 col-sm-12"><b>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</b></div>
                    </div>
                </form>
            </div>
            {/*	End Cart	*/}
            {/*	Customer Info	*/}
            <div id="customer">
                <form method="post">
                    <div className="row">
                        <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                            <input onChange={onChangeInputs} value={inputs?.name} placeholder="Họ và tên (bắt buộc)" type="text" name="name" className="form-control" required />
                        </div>
                        <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                            <input onChange={onChangeInputs} value={inputs?.phone} placeholder="Số điện thoại (bắt buộc)" type="text" name="phone" className="form-control" required />
                        </div>
                        <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                            <input onChange={onChangeInputs} value={inputs?.email} placeholder="Email (bắt buộc)" type="text" name="email" className="form-control" required />
                        </div>
                        <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                            <input onChange={onChangeInputs} value={inputs?.address} placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)" type="text" name="address" className="form-control" required />
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a onClick={onSubmitOrder} href="#">
                            <b>Mua ngay</b>
                            <span>Giao hàng tận nơi siêu tốc</span>
                        </a>
                    </div>
                    <div className="by-now col-lg-6 col-md-6 col-sm-12">
                        <a href="#">
                            <b>Trả góp Online</b>
                            <span>Vui lòng call (+84) 0988 550 553</span>
                        </a>
                    </div>
                </div>
            </div>
            {/*	End Customer Info	*/}
        </>
    );
};

export default Cart;