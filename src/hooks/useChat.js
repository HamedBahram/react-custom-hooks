import { useState, useReducer, useEffect } from 'react'

const reducer = (messages, newMessage) => [...messages, newMessage]

const useChat = (socket, initialMessages = []) => {
    const [status, setStatus] = useState(null)
    const [messages, appendMessage] = useReducer(reducer, initialMessages)

    const send = message => socket.emit('message', message)

    useEffect(() => {
        socket.on('connection', () => setStatus('connected'))
        socket.on('disconnecting', () => setStatus('disconnected'))
        socket.on('message', appendMessage)
    }, [socket])

    return { status, messages, send }
}

export default useChat
