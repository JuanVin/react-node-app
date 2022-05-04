function File(row) {
    return (
        <tr>
            {row.map(cell => {
                <td>{cell}</td>
            })}
        </tr>
    )
}

export default File