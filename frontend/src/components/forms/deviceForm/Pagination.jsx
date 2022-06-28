function Pagination({ amount, currentPage, setCurrentPage }) {
    let _pagination = []

  
    for (let index = 0; index < amount; index++){
        if(index === currentPage){
            _pagination.push(
                <li className="page-item" key={index * Math.random()}><button type="button" onClick={() => setCurrentPage(index)} className="page-link bg-success text-white">{index + 1}</button></li>
            )
        }else{
            _pagination.push(
                <li className="page-item" key={index * Math.random()}><button type="button" onClick={() => setCurrentPage(index)} className="page-link text-secondary">{index + 1}</button></li>
            )
        }
        
    }
   
    function handleNextPage(){
        if((currentPage+1) === amount){
            setCurrentPage(0)
        }else{
            setCurrentPage(currentPage+1)
        }
    }
    function handlePreviousPage(){
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
                    <li className="page-item"><button type="button" className="page-link text-success" onClick={handlePreviousPage}>
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only"></span>
                    </button></li>
                    {_pagination}
                    <li className="page-item"><button type="button" className="page-link text-success" onClick={handleNextPage}>
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only"></span>
                    </button></li>
                </ul>
            </nav>
        </div>
    )
}
export default Pagination