import { useState, useRef, useCallback, useMemo } from 'react'

const useIntersection = optionsObj => {
    const [entry, setEntry] = useState({ entry: null, isIntersecting: false })
    const observer = useRef(null)
    const options = useMemo(() => optionsObj, [optionsObj])

    const ref = useCallback(
        node => {
            if (!node) return
            if (observer.current) observer.current.disconnect()

            observer.current = new IntersectionObserver(entries => {
                const entry = entries[0]
                setEntry({ entry, isIntersecting: entry.isIntersecting })
            }, options)

            observer.current.observe(node)
        },
        [options]
    )

    // Alternative
    // const ref = useRef(null)
    // useEffect(() => {
    //     if (!ref.current) return
    //     if (observer.current) observer.current.disconnect()
    //     observer.current = new IntersectionObserver(entries => {
    //         const entry = entries[0]
    //         setEntry({ entry, isIntersecting: entry.isIntersecting })
    //     }, options)
    //     observer.current.observe(ref.current)
    //     return () => observer.current.disconnect()
    // }, [options])

    return { ref, ...entry, observer: observer.current }
}

export default useIntersection
