const Menu = ({ categories }) => {
    return (
        <>
            <nav>
                <div id="menu" className="collapse navbar-collapse">
                    <ul>
                        {
                            categories.map((category) =>
                                <li className="menu-item"><a href={`/category-${category._id}`}>{category.name}</a></li>
                            )
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Menu;