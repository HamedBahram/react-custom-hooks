import { useState, useEffect, useCallback } from 'react'
import useMountedRef from './useMountedRef'

const useFetch = URL => {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const mounted = useMountedRef()

    const fetchData = useCallback(async (URL, mounted) => {
        try {
            setLoading(true)
            setError(null)

            const res = await fetch(URL)
            const data = await res.json()

            if (!mounted.current) throw new Error('component is not mounted')

            if (!res.ok) {
                setError(data)
            } else {
                setData(data)
            }
        } catch (error) {
            if (!mounted.current) return
            setError(error)
        } finally {
            if (!mounted.current) return
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!URL) return
        if (!mounted.current) return
        fetchData(URL, mounted)
    }, [URL, fetchData, mounted])

    return { data, loading, error }
}

export default useFetch
