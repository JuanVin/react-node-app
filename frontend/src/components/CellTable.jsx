function CellTable(row) {
    return (
        <tr>
            {row.map(cell => {
                <td>{cell}</td>
            })}
        </tr>
    )
}

export default CellTable