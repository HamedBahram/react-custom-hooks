const ErrorScreen = ({ error }) => {
    return (
        <div className='error'>
            <h3>Sorry... something went wrong</h3>
            <p>We cannot process your request at this moment.</p>
            <p>Error: {error.message}</p>
        </div>
    )
}

export default ErrorScreen
