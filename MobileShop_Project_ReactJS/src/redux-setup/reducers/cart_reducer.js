import { ADD_TO_CART, DELETE_ITEM_CART, UPDATE_CART } from "../../shared/constants/action-type";

const initState = {
    items: []
};

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART: return addItem(state, action.payload);
        case UPDATE_CART: return updateItem(state, action.payload);
        case DELETE_ITEM_CART: return deleteItem(state, action.payload);
        default: return state;
    }
};

const addItem = (state, payload) => {
    const items = state.items;
    let isProductExist = false;
    items.map((item) => {
        if (item._id === payload._id) {
            item.qty += payload.qty;
            isProductExist = true;
        }
        return item;
    });

    const newItems = isProductExist ? items : [...items, payload];
    localStorage.setItem("cart_items", JSON.stringify(newItems));
    return { ...state, items: newItems };
};

const updateItem = (state, payload) => {
    const items = state.items;
    const newItems = items.map((item) => {
        if (item._id === payload._id) {
            item.qty = payload.qty;
        }
        return item;
    });

    return { ...state, items: newItems };
};

const deleteItem = (state, payload) => {
    const items = state.items;
    const newItems = items.filter((item) => {
        return item._id != payload._id;
    });

    return { ...state, items: newItems };
};