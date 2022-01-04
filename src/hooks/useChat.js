import { useState, useReducer, useEffect } from 'react'

const reducer = (messages, newMessage) => [...messages, newMessage]

const useChat = (socket, initialMessages = []) => {
    const [status, setStatus] = useState(null)
    const [messages, appendMessage] = useReducer(reducer, initialMessages)

    const send = message => socket.emit('message', message)

    useEffect(() => {
        if (!socket) return

        socket.on('connection', () => setStatus('connected'))
        socket.on('disconnecting', () => setStatus('disconnected'))
        socket.on('message', appendMessage)

        return () => {
            socket.removeAllListeners('connect')
            socket.removeAllListeners('disconnecting')
            socket.removeAllListeners('message')
        }
    }, [socket])

    return { status, messages, send }
}

export default useChat
