function Pagination({ amount, currentPage, setCurrentPage }) {
    let _pagination = []
    for (let index = 0; index < amount; index++) {
        _pagination.push(
            <li className="page-item" key={index * Math.random()}><button onClick={() => setCurrentPage(index)} className="page-link">{index + 1}</button></li>
        )
    }
    
    function handleNextPage(){
        if((currentPage+1) === amount){
            setCurrentPage(0)
        }else{
            setCurrentPage(currentPage+1)
        }
    }
    function handlePreviousPage(){
        console.log(currentPage)
        if(currentPage === 0){
            setCurrentPage(amount-1)
        }else{
            setCurrentPage(currentPage-1)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <nav className="mt-1 text-center">
                <ul className="pagination">
                    <li className="page-item"><button className="page-link" onClick={handlePreviousPage}>Previous</button></li>
                    {_pagination}
                    <li className="page-item"><button className="page-link" onClick={handleNextPage}>Next</button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination