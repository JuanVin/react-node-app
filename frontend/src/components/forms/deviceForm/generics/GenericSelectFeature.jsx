function GenericSelectFeature({ title, value, options, handleFormChange, name }) {
    return (
        <div className="form-group">
            <label>{title}</label>
            <select className="form-control" name={name} onChange={handleFormChange} value={value} >
                {
                    options.map((opt, index) => {
                        return (<option value={index+1} key={index}>{opt+1}</option>)
                    })
                }
            </select>
        </div>
    )
}
export default GenericSelectFeature