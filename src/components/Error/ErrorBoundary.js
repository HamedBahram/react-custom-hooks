import { Component } from 'react'
import ErrorScreen from './ErrorScreen'

const logError = (error, errorInfo) => {
    // custom error logging/reporting
    console.log(error, errorInfo)
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    // use this method to render a fallback UI
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { error }
    }

    // use this method to log error information, this method receives errorInfo
    componentDidCatch(error, errorInfo) {
        // log the error to an error reporting service
        logError(error, errorInfo)

        // you could also upate the state here to show the fallback UI
        // and remove getDerivedStateFromError() method
        // this.setState({
        //     error: error,
        //     errorInfo: errorInfo,
        // })
    }

    render() {
        const { error } = this.state
        const { children, fallback } = this.props
        if (error && !fallback) return <ErrorScreen error={error} />
        if (error) return <fallback error={error} />
        return children
    }
}

export default ErrorBoundary
