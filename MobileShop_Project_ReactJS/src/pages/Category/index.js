import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getCategory, getProductsCategory } from "../../services/Api";
import ProductItem from "../../shared/components/Product-item";
import Pagination from "../../shared/components/Pagination";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [total, setTotal] = useState(0);

  const [pages, setPages] = useState({
    limit: 9
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    //Get Products by Category ID
    getProductsCategory(id, {
      params: {
        limit: 9,
        page: page
      }
    }).then(({ data }) => {
      setProducts(data.data.docs);
      //Get Total Products
      setTotal(data.data.docs.length);
      //Pagination
      setPages({ ...pages, ...data.data.pages });
    });

    //Get Category
    getCategory(id, {}).then(({ data }) => setCategory(data.data));
  }, [id, page]);

  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <h3>{category.name} (hiện có {total} sản phẩm)</h3>
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

export default Category;