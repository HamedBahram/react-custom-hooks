import { useReducer, useCallback } from 'react'

const HTTP_ACTIONS = {
    SEND: 'SEND',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
}

const init = initialValues => {
    return {
        loading: false,
        data: null,
        error: null,
        ...initialValues,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case HTTP_ACTIONS.SEND:
            return {
                loading: true,
                error: null,
                data: null,
            }
        case HTTP_ACTIONS.SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.response,
            }
        case HTTP_ACTIONS.ERROR:
            return {
                loading: false,
                error: action.error,
                data: null,
            }
        default:
            return state
    }
}

const useHttp = (requestFunction, initialValues = {}) => {
    const [httpState, dispatch] = useReducer(reducer, initialValues, init)

    const sendRequest = useCallback(
        async data => {
            try {
                dispatch({ type: HTTP_ACTIONS.SEND })
                const response = await requestFunction(data)
                dispatch({ type: HTTP_ACTIONS.SUCCESS, response })
            } catch (error) {
                dispatch({ type: HTTP_ACTIONS.ERROR, error })
            }
        },
        [requestFunction]
    )

    return { sendRequest, ...httpState }
}

export default useHttp

// Sample request functions

export async function getSinglePost(id) {
    const response = await fetch('API_ENDPOINT')
    const data = await response.json()

    if (!response.ok) throw new Error(data.message || 'Request failed')

    return data
}

export async function addPost(post) {
    const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    })
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Request failed')
    }

    return data
}
