import NavBar from "./navbar/NavBar"

function Loading() {
    return (
        <>

            <div className="d-flex justify-content-center">
                <div className="spinner-border mt-5" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>

        </>
    )
}
export default Loading