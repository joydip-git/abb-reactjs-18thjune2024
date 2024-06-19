type PostFilterPropType = {
    filterValue: string,
    filterValueHandler: (value: string) => void
}
const PostFilter = (props: Readonly<PostFilterPropType>) => {
    //props.filterValue = ''
    return (
        <div>
            <label htmlFor="txtFilter">Filter By: &nbsp;</label>
            <input
                type="text"
                id="txtFilter"
                value={props.filterValue}
                onChange={
                    (e) => props
                        .filterValueHandler(e.target.value)
                } />
        </div>
    )
}

export default PostFilter