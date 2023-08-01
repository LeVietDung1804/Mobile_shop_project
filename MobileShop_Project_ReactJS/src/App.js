import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./shared/components/Layout/Footer";
import Header from "./shared/components/Layout/Header";
import Menu from "./shared/components/Layout/Menu";
import Sidebar from "./shared/components/Layout/Sidebar";
import Slider from "./shared/components/Layout/Slider";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Success from "./pages/Success";
import { useEffect, useState } from "react";
import { getCategories } from "./services/Api";
import { Provider } from "react-redux";
import store from "./redux-setup/store";

const App = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //Get Categories
        getCategories({}).then(({ data }) => setCategories(data.data.docs));
    }, []);

    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Header />
                        {/*	Body	*/}
                        <div id="body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <Menu categories={categories} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                                        <Slider />
                                        <Routes>
                                            <Route path="/" element={<Home />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/category-:id" element={<Category />} />
                                            <Route path="/product-:id" element={<Product />} />
                                            <Route path="/search" element={<Search />} />
                                            <Route path="/success" element={<Success />} />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </div>
                                    <Sidebar />
                                </div>
                            </div>
                        </div>
                        {/*	End Body	*/}
                        <Footer />
                    </div>
                </BrowserRouter>
            </Provider>
        </>
    );
};


export default App;