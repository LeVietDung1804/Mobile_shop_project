import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    //Search
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const onSubmitSearch = (e) => {
        e.preventDefault();
        return navigate(`/search?keyword=${keyword}`);
    };

    //Total Cart
    const totalCart = useSelector(({ Cart }) => {
        return Cart.items.reduce((total, item) => total + item.qty, 0);
    });

    return (
        <>
            {/*	Header	*/}
            <div id="header">
                <div className="container">
                    <div className="row">
                        <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
                            <h1><a href="/"><img className="img-fluid" src="images/logo.png" /></a></h1>
                        </div>
                        <div id="search" className="col-lg-6 col-md-6 col-sm-12">
                            <form className="form-inline">
                                <input onChange={onChangeSearch} className="form-control mt-3" type="search" placeholder="Tìm kiếm" aria-label="Search" value={keyword} />
                                <button onClick={onSubmitSearch} className="btn btn-danger mt-3" type="submit">Tìm kiếm</button>
                            </form>
                        </div>
                        <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
                            <a className="mt-4 mr-2" href="/cart">giỏ hàng</a><span className="mt-3">{totalCart}</span>
                        </div>
                    </div>
                </div>
                {/* Toggler/collapsibe Button */}
                <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#menu">
                    <span className="navbar-toggler-icon" />
                </button>
            </div>
            {/*	End Header	*/}
        </>
    );
};

export default Header;