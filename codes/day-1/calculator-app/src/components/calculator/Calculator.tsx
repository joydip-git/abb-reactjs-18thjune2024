import { useState } from "react"
import StateChoices from "../../models/state-choices"
import EntryForm from "../entry-form/EntryForm"
import ResultDisplayer from "../result-displayer/ResultDisplayer"

const Calculator = () => {
    const [choice, setChoice] = useState<number>(0)
    const [first, setFirst] = useState<number>(0)
    const [second, setSecond] = useState<number>(0)
    const [result, setResult] = useState<number>(0)

    const stateHandler = (val: number, stateToUpdate: StateChoices) => {
        switch (stateToUpdate) {
            case StateChoices.Choice:
                setChoice(val)
                break;

            case StateChoices.First:
                setFirst(val)
                break;

            case StateChoices.Second:
                setSecond(val)
                break;

            // case StateChoices.Result:
            //     calculationHandler()
            //     break;

            default:
                break;
        }
    }

    const calculationHandler = () => {
        switch (choice) {
            case 1:
                setResult(first + second)
                break;

            case 2:
                setResult(first - second)
                break;

            case 3:
                setResult(first * second)
                break;

            case 4:
                setResult(first / second)
                break;

            default:
                window.alert('please make a correct choice')
                break;
        }
    }

    return (
        <>
            {/**<Fragment> */}
            <EntryForm
                firstValue={first}
                secondValue={second}
                stateHandlerFn={stateHandler}
                calculationHandlerFn={calculationHandler}
            />
            <br />
            <ResultDisplayer resultValue={result} />
            {/* </Fragment > */}
        </>
    )
}

export default Calculator