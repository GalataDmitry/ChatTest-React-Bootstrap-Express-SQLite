import {useEffect, useState} from "react"
import {getAllMessages} from "../services/getAllMessages"

const MessagesArea = () => {

    const [messages, setMessages] = useState()

    useEffect(() => {
        getAllMessages(setMessages)
    }, [])

    return <div className='container w-25 mb-5'>
        <div className="row">
            <div className="col">
                <div className="card radius-10">
                    <div className="card-body text-dark">
                        {messages?.map(el => {
                            return <div>{el.name}:{el.message}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default MessagesArea