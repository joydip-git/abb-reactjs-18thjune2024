import { Ref, forwardRef } from "react"

const Nested = forwardRef(
    ({ value }: any, refToInput: Ref<HTMLInputElement>) => {
        return (
            <div>
                <input type="text" ref={refToInput} />
            </div>
        )
    }
)

export default Nested