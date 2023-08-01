import { BASE_URL } from "../constants/app";

export const getProductImage = (imageName) => {
    return `${BASE_URL}assets/uploads/products/${imageName}`;
};