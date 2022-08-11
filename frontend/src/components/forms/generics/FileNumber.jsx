const FileNumber = ({ fileNumber, handleChange }) => {
    return (
        <input
            type="text"
            name="fileNumber"
            value={fileNumber}
            onChange={handleChange}
            className="form-control d-inline w-75"
            placeholder="Formato XXXX/YY ó XXXXYY"
            required
        />
    )
}   

export default FileNumber