import { Person } from '../../models/person'

type PersonDetailPropType = {
    pesron: Person
}
const PersonDetail = ({ pesron }: Readonly<PersonDetailPropType>) => {
    return (
        <li>
            <span>{pesron.name}</span>
        </li>
    )
}

export default PersonDetail