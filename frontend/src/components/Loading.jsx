import NavBar from "./NavBar"

function Loading() {
    return (
        <>
            <NavBar></NavBar>
            <div className="controller">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border mt-5" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Loading