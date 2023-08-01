module.exports = (page, totalPage, delta = 2) => {
    const pages = [];
    const left = page - delta;
    const right = page + delta;
    for (let i = 1; i <= totalPage; i++) {
        if (
            i === 1 ||
            i === page ||
            i === totalPage ||
            (i >= left) && (i <= right)
        ) {
            pages.push(i);
        }

        if (
            (left - 1) === i && i > 1 ||
            (right + 1) === i && i > totalPage
        ) {
            pages.push("...");
        }
    }

    return pages;
};