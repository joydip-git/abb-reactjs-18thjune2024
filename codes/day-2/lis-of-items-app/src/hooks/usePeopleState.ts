import { useState } from "react"
import { people } from "../data/people"
import { Person } from "../models/person"

const usePeopleState = (): [Person[], (x: Person[]) => void] => {
    const [peopleState, setPeopleState] = useState(people)
    const updatePeople = (updatedPeople: Person[]) => {
        setPeopleState(updatedPeople)
    }
    return [peopleState, updatePeople]
}
export default usePeopleState