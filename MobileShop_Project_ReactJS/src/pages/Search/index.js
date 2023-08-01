import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../shared/components/Product-item";
import { getProducts } from "../../services/Api";
import Pagination from "../../shared/components/Pagination";

const Search = () => {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState({
    limit: 9
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    //Get Search Products
    getProducts({
      params: {
        name: keyword,
        limit: 9,
        page: page
      }
    }).then(({ data }) => {
      setProducts(data.data.docs);
      setPages({ ...pages, ...data.data.pages });
    });

  }, [keyword, page]);

  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">Kết quả tìm kiếm với sản phẩm <span>{keyword}</span></div>
        <div className="product-list card-deck">
          {
            products.map((product) =>
              <ProductItem item={product} />
            )
          }
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>

  );
};

export default Search;