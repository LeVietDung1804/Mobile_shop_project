import { useEffect, useState } from "react";
import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/Product-item";
import Pagination from "../../shared/components/Pagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [lastestProducts, setLastestProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const [pages, setPages] = useState({
        limit: 9
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get("page");

    useEffect(() => {
        //Get Featured Products
        getProducts({
            params: {
                limit: 9,
                "filter[is_featured]": true,
                page: page
            }
        }).then(({ data }) => {
            setFeaturedProducts(data.data.docs);
            setPages({ ...pages, ...data.data.pages });
        });

        //Get Lastest Products
        getProducts({
            params: {
                limit: 9,
                page: page
            }
        }).then(({ data }) => {
            setLastestProducts(data.data.docs);
            setPages({ ...pages, ...data.data.pages });
        });


    }, [page]);

    return (
        <>
            {/*	Feature Product	*/}
            <div className="products">
                <h3>Sản phẩm nổi bật</h3>
                <div className="product-list card-deck">
                    {
                        featuredProducts.map((featured) =>
                            <ProductItem item={featured} />
                        )
                    }
                </div>

            </div>

            {/*	End Feature Product	*/}
            {/*	Latest Product	*/}
            <div className="products">
                <h3>Sản phẩm mới</h3>
                <div className="product-list card-deck">
                    {
                        lastestProducts.map((lastest) =>
                            <ProductItem item={lastest} />
                        )
                    }
                </div>
            </div>
            {/*	End Latest Product	*/}
            <div id="pagination">
                <Pagination pages={pages} />
            </div>
        </>
    );
};

export default Home;