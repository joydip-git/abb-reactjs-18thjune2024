import StateChoices from "../../models/state-choices"

type EntryFormPropType = {
    stateHandlerFn: (val: number, choice: StateChoices) => void,
    firstValue: number,
    secondValue: number,
    calculationHandlerFn: () => void
}
const EntryForm = (props: Readonly<EntryFormPropType>) => {
    const { stateHandlerFn, calculationHandlerFn, firstValue, secondValue } = props
    return (
        <form>
            <div>
                <label htmlFor="radioAdd">Add: &nbsp;</label>
                <input type="radio" id="radioAdd"
                    name="calcRadio"
                    onChange={
                        () => stateHandlerFn(
                            1, StateChoices.Choice
                        )
                    } />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label htmlFor="radioSub">Subtract: &nbsp;</label>
                <input type="radio" id="radioSub"
                    name="calcRadio"
                    onChange={
                        () => stateHandlerFn(
                            2, StateChoices.Choice
                        )
                    } />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label htmlFor="radioMulti">Multiply: &nbsp;</label>
                <input type="radio" id="radioMulti"
                    name="calcRadio"
                    onChange={
                        () => stateHandlerFn(
                            3, StateChoices.Choice
                        )
                    } />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                <label htmlFor="radioDiv">Divide: &nbsp;</label>
                <input type="radio" id="radioDiv"
                    name="calcRadio"
                    onChange={
                        () => stateHandlerFn(
                            4, StateChoices.Choice
                        )
                    }
                />
            </div>
            <br />
            <div>
                <label htmlFor="txtFirst">First: &nbsp;</label>
                <input type="text" id="txtFirst"
                    value={firstValue}
                    onChange={(e) => {
                        const val = e.target.value
                        if (val && val !== '')
                            stateHandlerFn(
                                Number(val), StateChoices.First
                            )
                    }} />
            </div>
            <div>
                <label htmlFor="txtSecond">Second: &nbsp;</label>
                <input type="text" id="txtSecond"
                    value={secondValue}
                    onChange={(e) => {
                        const val = e.target.value
                        if (val && val !== '')
                            stateHandlerFn(
                                Number(val), StateChoices.Second
                            )
                    }} />
            </div>
            <div>
                <input type="submit" value='Add'
                    onClick={
                        (e) => {
                            e.preventDefault()
                            calculationHandlerFn()
                        }
                    }
                />
            </div>
        </form>
    )
}

export default EntryForm