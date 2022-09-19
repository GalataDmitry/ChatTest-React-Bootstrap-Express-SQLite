import {useEffect, useState} from "react"
import {getAllUsers} from "../services/getAllUsers"

const SelectUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers(setUsers)
    }, [])

    return <select className="form-select w-25 mb-5">
        <option selected
            // onClick={() => {})
        >All users
        </option>
        {users?.map((el) => {
            return <option
                onClick={() => console.log(el.id)}
            >
                {el.name}
            </option>
        })}
    </select>
}

export default SelectUser