const Condition = ({ conditionId, handleChange, loadCondition }) => {
  
    return (
        <>
            <label className="p-1" htmlFor="condicion_act">
                Condición{" "}
            </label>
            <select
                className="form-control"
                name="conditionId"
                value={conditionId}
                onChange={handleChange}
                id="condicion_act"
                required
            >
                {loadCondition}
            </select>
        </>
    )
}
export default Condition