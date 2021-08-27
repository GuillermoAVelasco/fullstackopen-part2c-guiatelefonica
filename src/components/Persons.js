import Person from "./Person"

const Persons= ({persons})=>{
    return(
        <ul>
        {
            persons.map(e=>
            <Person key={e.name} person={e} />
            )
        }
        </ul>        
    )
}

export default Persons