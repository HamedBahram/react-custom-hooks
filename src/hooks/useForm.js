import { useReducer, useEffect, useRef } from 'react'

const FORM_ACTIONS = {
    INPUT: 'INPUT',
    TOUCHED: 'TOUCHED',
    VALIDATE: 'VALIDATE',
    RESET: 'RESET',
}

const init = initialValues => {
    return {
        values: initialValues,
        errors: {},
        touched: {},
        valid: false,
        dirty: false,
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case FORM_ACTIONS.INPUT:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.name]: action.value,
                },
                touched: {
                    ...state.touched,
                    [action.name]: true,
                },
            }
        case FORM_ACTIONS.TOUCHED:
            return {
                ...state,
                touched: {
                    ...state.touched,
                    ...action.touched,
                },
            }
        case FORM_ACTIONS.VALIDATE:
            return {
                ...state,
                errors: {
                    ...action.errors,
                },
                valid: action.valid,
                dirty: action.dirty,
            }
        case FORM_ACTIONS.RESET:
            return init(action.initialValues)
        default:
            throw new Error()
    }
}

const useForm = ({ initialValues, validate, onSubmit }) => {
    const [state, dispatch] = useReducer(reducer, initialValues, init)
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const errors = validate(state.values)
        const valid = Object.values(errors).length === 0
        let dirty = false
        for (const key in state.touched) {
            if (state.touched[key] === true) {
                dirty = true
                break
            }
        }
        dispatch({ type: FORM_ACTIONS.VALIDATE, errors, valid, dirty })
    }, [state.values, state.touched, validate])

    const handleChange = e => {
        const { target } = e
        const { name } = target
        const value = target.type === 'checkbox' ? target.checked : target.value
        dispatch({ type: FORM_ACTIONS.INPUT, name, value })
    }

    const handleBlur = e => {
        const { name } = e.target
        dispatch({ type: FORM_ACTIONS.TOUCHED, touched: { [name]: true } })
    }

    const handleReset = () => {
        dispatch({ type: FORM_ACTIONS.RESET, initialValues })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (!state.valid) {
            const touched = {}
            for (const key in initialValues) {
                touched[key] = true
            }
            dispatch({ type: FORM_ACTIONS.TOUCHED, touched })
            return
        }
        onSubmit(state.values)
        dispatch({ type: FORM_ACTIONS.RESET, initialValues })
    }

    const getFieldProps = name => {
        const value = state.values[name]
        return {
            name,
            value,
            checked: value,
            onChange: handleChange,
            onBlur: handleBlur,
        }
    }

    const getFieldMeta = name => {
        return {
            touched: state.touched[name],
            error: state.errors[name],
        }
    }

    return {
        ...state,
        handleChange,
        handleBlur,
        handleReset,
        handleSubmit,
        getFieldProps,
        getFieldMeta,
    }
}

export default useForm
