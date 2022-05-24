function FilesPercentage(param) {
    let data = param.props.fileStadistic,
        total = param.props.total
    console.log(data)
    let percentages = []

    data.forEach(item => {
        percentages.push(
            <>
                <p>{item.name}</p>
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${((item.amount * 100) / total)}%`, backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }} aria-valuemax="100">
                        {((item.amount * 100) / total).toFixed(2)+"%"}
                    </div>
                </div>
            </>
        )
    });
    percentages.splice(-1,1)
    return (
        <>
            {percentages}
        </>
    )

}
export default FilesPercentage