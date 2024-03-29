function Pagination({ amount, currentPage, setCurrentPage, loaded }) {
    let _pagination = []

    for (let index = 0; index < amount; index++) {
        if (loaded.find(element => element === index + 1)) {
            _pagination.push(
                <li className="page-item" key={index * Math.random()}><button type="button" onClick={() => setCurrentPage(index)} className="page-link bg-success text-white">{setCurrentPageStyle(index)}</button></li>
            )
        } else {
            _pagination.push(
                <li className="page-item" key={index * Math.random()}><button type="button" onClick={() => setCurrentPage(index)} className="page-link text-secondary">{setCurrentPageStyle(index)}</button></li>
            )
        }
    }

    function setCurrentPageStyle(index) {
        if (index === currentPage) {
            return <h5><b>{index + 1}</b></h5>
        } else {
            return index + 1
        }
    }
    function handleNextPage() {
        if ((currentPage + 1) === amount) {
            setCurrentPage(0)
        } else {
            setCurrentPage(currentPage + 1)
        }
    }
    function handlePreviousPage() {
        if (currentPage === 0) {
            setCurrentPage(amount - 1)
        } else {
            setCurrentPage(currentPage - 1)
        }
    }


    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <nav className="mt-1 text-center">
                <ul className="pagination">
                    <li className="page-item"><button type="button" className="page-link text-success" onClick={handlePreviousPage}>
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only"></span>
                    </button></li>
                    {_pagination}
                    <li className="page-item"><button type="button" className="page-link text-success" onClick={handleNextPage}>
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only"></span>
                    </button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination