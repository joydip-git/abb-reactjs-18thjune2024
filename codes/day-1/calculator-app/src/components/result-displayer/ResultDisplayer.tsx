type ResultDisplayerPropType = {
    resultValue: number
}
const ResultDisplayer = (props: Readonly<ResultDisplayerPropType>) => {
    return (
        <div>
            <label htmlFor="txtResult">Result: &nbsp;</label>
            <input type="text" id="txtResult"
                value={props.resultValue} readOnly
            />
        </div>
    )
}

export default ResultDisplayer