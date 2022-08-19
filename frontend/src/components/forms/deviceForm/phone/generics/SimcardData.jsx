function SimcardData({container, handleSimcardData, value1, value2, titles}) {
    return (
        <>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="simcard">{titles[1]}</label>
                    <input type="number" defaultValue={value1} name="number" container={container} onChange={handleSimcardData} className="form-control" id="simcard" required
                    ></input>
                </div>
            </div>
            <div className="col">
                <div className="form-group">
                    <label htmlFor="company">{titles[2]}</label>
                    <input type="text" defaultValue={value2} name="company" container={container} onChange={handleSimcardData} className="form-control" id="company" required
                    ></input>
                </div>
            </div>
        </>
    )
}
export default SimcardData