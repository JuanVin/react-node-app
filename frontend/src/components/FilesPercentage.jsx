function FilesPercentage(param) {
    let data = param.props.fileStadistic,
        total = param.props.total

    let percentages = []

    data.sort(function (a, b) {
        if (a.amount < b.amount) {
            return 1;
        }
        if (a.amount > b.amount) {
            return -1;
        }
        return 0;
    });

    function formatTittle(tittle) {
        tittle = tittle[0].toUpperCase() + tittle.slice(1);
        tittle = tittle.replace("_", " ")
        return tittle
    }

    data.forEach((item, index) => {
        if (item.amount > 0) {
            percentages.push(
                <div key={"fpa" + index}>
                    <p className="p-1">{formatTittle(item.name)}</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-success progress-bar-animated" style={{ width: `${((item.amount * 100) / total)}%` }} aria-valuemax="100">
                            <b>{((item.amount * 100) / total).toFixed(2) + "%"}</b>
                        </div>
                    </div>
                </div >
            )
        }
    });

    return (
        <>
            {percentages}
        </>
    )

}
export default FilesPercentage