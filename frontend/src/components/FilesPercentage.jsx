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
        // a must be equal to b
        return 0;
      });
    data.forEach((item, index) => {
        percentages.push(
            <div key={"fpa"+ index}>
                <p>{item.name}</p>
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${((item.amount * 100) / total)}%` }} aria-valuemax="100">
                        <b>{((item.amount * 100) / total).toFixed(2) + "%"}</b>
                    </div>
                </div>
            </div >         
        )
    });
   
    return (
        <>
            {percentages}
        </>
    )

}
export default FilesPercentage