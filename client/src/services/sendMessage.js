import {getAllMessagesUrlConfig, sendMessagesUrlConfig} from "../urlConfigs"

export const sendMessage = (areaData, currentUserId, setMessages, currentPage, uploadImage) => {
    const formData = new FormData()
    const formData_1 = new FormData()
    formData.append('areaData', areaData)
    formData.append('currentUserId', currentUserId)
    formData.append('img', uploadImage)
    formData_1.append('currentPage', currentPage)

    const options = {
        method: 'POST',
        body: formData
    }
    const options_1 = {
        method: 'POST',
        body: formData_1
    }

    return fetch(sendMessagesUrlConfig, options)
        .then(response => {
            if (response.status === 200)
                return fetch(getAllMessagesUrlConfig, options_1)
                    .then(response => response.json())
                    .then(result => {
                        setMessages(result)
                    })
                    .catch(err => console.log('sendMessage inner err -->', err))
        }).catch(err => console.log('sendMessage err outer -->', err))
}