import { useState } from "react"
import Nested from "../nested/Nested"

type StateStype = { count: number }

const Parent = () => {
    console.log('parent rendered');

    const [data, setData] = useState<number>(0)
    const [value, setValue] = useState<StateStype>({ count: 0 })

    const dataHandler = () => {
        //setData(100)
        setData(
            (currentDataState) => currentDataState + 1
        )
    }
    const valueStateHandler = () => {
        setValue(
            (currentValueState) => {
                return { count: currentValueState.count + 1 }
            }
        )
    }
    return (
        <div>
            <div>
                <span>Value: &nbsp;{value.count}</span>
                <br />
                <button type="button"
                    onClick={valueStateHandler}>
                    Increase Value State
                </button>
            </div>
            <br />
            <Nested
                value={data}
                valueHandler={dataHandler}
            />
        </div>
    )
}
export default Parent