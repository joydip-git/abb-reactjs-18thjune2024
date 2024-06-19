import { useState } from 'react'
//import usePeopleState from '../../hooks/usePeopleState'
import PersonDetail from '../person-detail/PersonDetail'
import PostFilter from '../post-filter/PostFilter'
import { people } from '../../data/people'

const PersonList = () => {
    //const [peopleState, updatePeopleState] = usePeopleState()
    const [peopleState, updatePeopleState] = useState(people)
    const [filterText, setFilterText] = useState('')

    const filterTextHandler = (text: string) => {
        setFilterText(text)
        if (text !== '') {
            const filteredPeople =
                peopleState
                    .filter(p => p.name
                        .toLocaleLowerCase()
                        .includes(text.toLocaleLowerCase())
                    )
            updatePeopleState(filteredPeople)
        } else
            updatePeopleState(people)
    }
    const peopleList =
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
            <PostFilter
                filterValue={filterText}
                filterValueHandler={filterTextHandler}
            />
            <ul>
                {peopleList}
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