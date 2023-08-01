import { createStore } from "redux";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: "redux-store",
    storage: storage,
    keyPrefix: "MobileShop"
};

const store = createStore(persistReducer(persistConfig, reducers));
persistStore(store);
export default store;