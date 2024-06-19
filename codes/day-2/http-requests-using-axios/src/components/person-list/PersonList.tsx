import { useState } from 'react'
//import usePeopleState from '../../hooks/usePeopleState'
import PersonDetail from '../person-detail/PersonDetail'
import PostFilter from '../post-filter/PostFilter'
import { Person } from '../../models/person'
import { getPeople } from '../../service/people-service'
//import { people } from '../../data/people'

const PersonList = () => {
    //const [peopleState, updatePeopleState] = usePeopleState()
    const [peopleState, updatePeopleState] = useState<Person[] | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState('')
    const [fetchStatus, setFetchStatus] = useState(false)
    const [filterText, setFilterText] = useState('')

    const filterTextHandler = (text: string) => {
        setFilterText(text)
        if (text !== '') {
            const filteredPeople =
                peopleState?.filter(p => p.name
                    .toLocaleLowerCase()
                    .includes(text.toLocaleLowerCase())
                )
            updatePeopleState(filteredPeople)
        } else
            loadData()
    }

    const sortPeople = () => {
        if (peopleState) {
            const copyPeople = [...peopleState]
            copyPeople.sort(
                (p1, p2) => p1.name
                    .toLocaleLowerCase()
                    .localeCompare(p2.name.toLocaleLowerCase())
            )
            updatePeopleState(copyPeople)
        }
    }

    const loadData = () => {
        getPeople()
            .then(
                (response) => {
                    updatePeopleState(response.data);
                    setErrorMessage('');
                    setFetchStatus(true);
                },
                (err) => {
                    updatePeopleState(undefined)
                    setErrorMessage(err.message)
                    setFetchStatus(true)
                }
            )
    }

    let design: any;

    if (!fetchStatus) {
        design = <span>Loading....</span>
    } else if (errorMessage !== '') {
        design = <span>{errorMessage}</span>
    } else if (peopleState?.length === 0 || !peopleState) {
        design = <span>No records found</span>
    } else {
        design =
            <ul>
                {
                    peopleState
                        .map(
                            (p) => <PersonDetail
                                pesron={p} key={p.id} />
                        )
                }
            </ul>
    }


    return (
        <div>
            <PostFilter
                filterValue={filterText}
                filterValueHandler={filterTextHandler}
            />
            {
                design
            }
            <br />
            <button type='button'
                onClick={loadData}>
                Load Data
            </button>
            <br />
            <button
                type='button'
                onClick={sortPeople}
                disabled={!fetchStatus}
            >
                Sort People
            </button>
        </div>
    )
}

export default PersonList