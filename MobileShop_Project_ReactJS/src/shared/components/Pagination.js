import { Link, useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ pages }) => {
    const { total, limit, currentPage, next, prev, hasNext, hasPrev } = pages;
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const renderPageHtml = (delta = 2) => {
        const pages = [];
        const left = currentPage - delta;
        const right = currentPage + delta;
        const totalPage = Math.ceil(total / limit);

        for (let i = 1; i <= totalPage; i++) {
            if (
                i === 1 ||
                i === totalPage ||
                i === currentPage ||
                (i >= left) && (i <= right)
            ) {
                pages.push(i);
            }
        }

        return pages;
    };

    const formatUrl = (page) => {
        return `${location.pathname}?keyword=${searchParams.get("keyword")}&page=${page}`;
    };

    return (
        <ul className="pagination">
            {
                hasPrev ?
                    <li className="page-item"><Link className="page-link" to={formatUrl(prev)}>Trang trước</Link></li>
                    : null
            }
            {
                renderPageHtml().map((page) =>
                    <li className={`page-item ${page === currentPage ? "active" : ""}`}><Link className="page-link" to={formatUrl(page)}>{page}</Link></li>
                )
            }
            {
                hasNext ?
                    <li className="page-item"><Link className="page-link" to={formatUrl(next)}>Trang sau</Link></li>
                    : null
            }
        </ul>
    );
};

export default Pagination;