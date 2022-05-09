files.data.map((rowData) => {
    fileCards.push(
        <div className="p-1">
            <Card border="light shadow p-1 mb-5 bg-white rounded" style={{ width: '18rem', height: '13rem' }}>
                <Card.Body>
                    <Card.Title><b>{rowData.file_number.toUpperCase()}</b></Card.Title>
                    <Card.Text>
                        <p>Fecha de turno: {formatDate(rowData.FileDate.shift_date)}</p>
                        <p>Unidad Fiscal: {formatOffice(rowData.FiscalUnit)}</p>
                    </Card.Text>
                    <button className="position-absolute bottom-0 end-0 m-1 btn btn-outline-primary">Ver Detalle</button>
                </Card.Body>
            </Card>
        </div>
    )
})