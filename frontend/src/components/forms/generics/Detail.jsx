const Detail = ({ handleChange, detail }) => {
    return (
        <>
            <label className="p-1" htmlFor="detalle_act">
                Detalle
            </label>
            <textarea
                className="form-control"
                id="detalle_act"
                name="detail"
                value={detail}
                onChange={handleChange}
                rows="3"
            ></textarea>
        </>
    )
}

export default Detail