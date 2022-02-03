import useIntersection from '../hooks/useIntersection'
const App = () => {
    const { ref, isIntersecting } = useIntersection()
    console.log(isIntersecting)

    return (
        <>
            <h1>React Custom Hooks</h1>
            <div style={{ padding: '10rem', background: 'red' }}></div>
            <div style={{ padding: '10rem', background: 'green' }}></div>
            <div style={{ padding: '10rem', background: 'blue' }}></div>
            <div style={{ padding: '10rem', background: 'gold' }}></div>
            <div style={{ padding: '10rem', background: 'white' }}></div>
            <div style={{ padding: '10rem', background: 'maroon' }}></div>
            <div ref={ref} style={{ padding: '10rem', background: 'orange' }}></div>
        </>
    )
}

export default App
