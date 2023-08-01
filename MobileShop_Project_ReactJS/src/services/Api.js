import Http from "./Http";

//Get Products
export const getProducts = (config) => {
    return Http.get("products", config);
};

//Get Categories
export const getCategories = (config) => {
    return Http.get("categories", config);
};

//Get Product by Category Id
export const getProductsCategory = (id, config) => {
    return Http.get(`categories/${id}/products`, config);
};

//Get Category by ID
export const getCategory = (id, config) => {
    return Http.get(`categories/${id}`, config);
};

//Get Product Detail
export const getProduct = (id, config) => {
    return Http.get(`products/${id}`, config);
};

//Get Comments
export const getComments = (id, config) => {
    return Http.get(`products/${id}/comments`, config);
};

//Post Comments
export const createCommentProducts = (id, data, config) => {
    return Http.post(`products/${id}/comments`, data, config);
};

//Order
export const order = (data, config) => {
  return Http.post("order", data, config)
}
