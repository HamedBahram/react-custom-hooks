import { useState, useEffect } from 'react'

const loadJSON = key => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const useLocalStorage = (key, initialState) => {
    const [value, setValue] = useState(loadJSON(key) || initialState)

    useEffect(() => {
        saveJSON(key, value)
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorage
