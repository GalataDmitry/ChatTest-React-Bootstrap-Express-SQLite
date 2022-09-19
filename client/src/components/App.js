import {useEffect, useState} from "react"
import {getAllUsers} from "../services/getAllUsers"
import {getAllMessages} from "../services/getAllMessages"
import {sendMessage} from "../services/sendMessage"
import {baseServerUrlConfig} from "../urlConfigs"
import '../styles/App.css'

const App = () => {

    const [users, setUsers] = useState([])
    const [currentUserName, setCurrentUserName] = useState()
    const [currentUserId, setCurrentUserId] = useState()
    const [currentPage, setCurrentPage] = useState(0)
    const [messages, setMessages] = useState()
    const [areaData, setAreaData] = useState()
    const [uploadImage, setUploadImage] = useState()

    let pagesCount = []
    const tableHeaders = ['date', 'messages count']

    useEffect(() => {
        getAllUsers(setUsers)
        getAllMessages(setMessages, currentPage)
    }, [currentPage])

    let fullPages = Math.floor(messages?.count / messages?.countOnPage)
    let partPage = Boolean(messages?.count % messages?.countOnPage)
    let finalCountPages

    if (messages?.count <= 5) pagesCount = []
    else if (partPage) finalCountPages = fullPages + 1
    else finalCountPages = fullPages

    for (let i = 1; i <= finalCountPages; i++) pagesCount.push(i)

    return <div className="App">
        <header className="App-header">
            <select className="form-select w-25 mb-2">
                <option selected
                        onClick={() => {
                            setCurrentUserName('')
                        }}
                >All users
                </option>
                {users?.map((el) => {
                    return <option
                        onClick={() => {
                            setCurrentUserId(el.id)
                            setCurrentUserName(el.name)
                        }}
                    >
                        {el.name}
                    </option>
                })}
            </select>
            <div className='container w-25 mb-2'>
                <div className="row">
                    <div className="col">
                        <div className="card radius-10">
                            <div className="card-body text-dark">
                                {messages?.data?.map(el => {
                                    return <div>{el.name === currentUserName ? "You" : el.name}:{el.message}
                                        <img src={`${baseServerUrlConfig}${el.image_name}`} alt=''/>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <textarea
                onChange={(e) => setAreaData(e.target.value)}
                className="form-control db-input w-25"
                value={areaData}
                data-testid='text-area'
            />
            <form encType="multipart/form-data" className='w-25 mt-2'>
            <input
                onChange={e => setUploadImage(e.target.files[0])}
                accept='image/*'
                type='file'
                name='img'
            />
            </form>
            <nav aria-label="Page navigation example" className='mt-2'>
                <ul className="pagination round-pagination mb-0">
                    {pagesCount?.map(el => {
                        return <li className="page-item">
                            <button
                                onClick={() => {
                                    setCurrentPage(pagesCount.findIndex(page => page === el))
                                }}
                                className="page-link"
                            >
                                {el}
                            </button>
                        </li>
                    })}
                </ul>
            </nav>
            <button
                onClick={() => {
                    sendMessage(areaData, currentUserId, setMessages, currentPage, uploadImage)
                    setAreaData('')
                    setUploadImage('')
                }}
                type="button"
                className="btn btn-secondary w-25 mt-2"
            >
                Send message
            </button>
            <div>
                total messages count: {messages?.messagesCountForWeek[0]['count']}
            </div>
            <div className=" mt-3" style={{marginTop: '10px'}}>
                <table className="table align-middle mb-0">
                    <thead className="table-light">
                    <tr>
                        {tableHeaders.map((el) => {
                            return <th className='text-center'
                                       key={Math.random() * 10}>{el}</th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {messages?.datesForTables?.map((el) => {
                        return <tr className='text-center text-white'
                                   key={Math.random() * 10}>
                            <td>{el.date}</td>
                            <td>{el.messCount}</td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </header>
    </div>
}

export default App
