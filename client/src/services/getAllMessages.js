import {getAllMessagesUrlConfig} from "../urlConfigs"

export const getAllMessages = (setMessages, currentPage) => {
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({currentPage})
    }
    return fetch(getAllMessagesUrlConfig, options)
        .then(response => response.json())
        .then(result => setMessages(result))
        .catch(err => console.log('getAllUsers err -->', err))
}