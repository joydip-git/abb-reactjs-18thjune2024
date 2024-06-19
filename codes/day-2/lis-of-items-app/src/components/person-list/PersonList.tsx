import usePeopleState from '../../hooks/usePeopleState'
import PersonDetail from '../person-detail/PersonDetail'

const PersonList = () => {
    const [peopleState, updatePeopleState] = usePeopleState()

    const transformedArray =
        peopleState
            .map(
                (p) => {
                    return <PersonDetail pesron={p} key={p.id} />
                }
            )

    const sortPeople = () => {
        const copyPeople = [...peopleState]
        copyPeople.sort(
            (p1, p2) => p1.name
                .toLocaleLowerCase()
                .localeCompare(p2.name.toLocaleLowerCase())
        )
        updatePeopleState(copyPeople)
    }
    return (
        <div>
            <ul>
                {transformedArray}
            </ul>
            <br />
            <button
                type='button'
                onClick={sortPeople}>
                Sort People
            </button>
        </div>
    )
}

export default PersonList