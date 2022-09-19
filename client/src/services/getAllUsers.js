import {getAllUsersUrlConfig} from "../urlConfigs"

export const getAllUsers = (setUsers) => {
    return fetch(getAllUsersUrlConfig)
        .then(response => response.json())
        .then(result => setUsers(result))
        .catch(err => console.log('getAllUsers err -->', err))
}