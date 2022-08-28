import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'

const GlobalStateContext = createContext({})

export const GlobalStateProvider = ({ children }) => {
    const [locales, setLocales] = useState()

    useEffect(() => {}, [])

    const changeLocales = (value) => {
        setLocales(value)
    }

    const memoedValue = useMemo(
        () => ({
            locales,
            changeLocales
        }),
        [locales]
    )

    return (
        <GlobalStateContext.Provider value={memoedValue}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export default function useGlobalState() {
    return useContext(GlobalStateContext)
}
