function Pagination({ amount, setCurrentPage }) {
    let _pagination = []
    for (let index = 0; index < amount; index++) {
        _pagination.push(
            <li className="page-item" key={index * Math.random()}><button onClick={() => setCurrentPage(index)} className="page-link">{index + 1}</button></li>
        )
    }
    
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <nav className="mt-1 text-center">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                    {_pagination}
                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination