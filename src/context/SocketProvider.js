import { useState, useEffect, createContext, useContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()
export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ id, children }) => {
    const [socket, setSocket] = useState()

    useEffect(() => {
        const newSocket = io('SOCKET_SERVER_ADDRESS', { query: { id } })
        setSocket(newSocket)
    }, [id])

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

export default SocketProvider
