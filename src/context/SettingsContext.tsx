import { createContext, useReducer, Dispatch, useEffect, useState } from 'react'
import {
    defaultSettingsData,
    getSettingsData,
    setSettingsData,
} from '../services/LocalStorage/LocalSettings'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Alert, Container } from '@mui/material'
import WebsiteLoader from '@/components/loaders/WebsiteLoader'

export type SettingStateType = {
    themeMode: 'light' | 'dark'
    screen: 'desktop' | 'tab' | 'mobile'
    language: string
    globalLoading: {
        loading: boolean
        message: string
    }
}
type SettingActionType = {
    type: 'themeMode' | 'screen' | 'language' | 'handleGlobalLoading'
    value:
        | string
        | boolean
        | {
              loading: boolean
              message: string
          }
}

function getScreenType() {
    if (window) {
        if (window.innerWidth > 1100) return 'desktop'
        if (window.innerWidth > 768) return 'tab'
        if (window.innerWidth > 300) return 'mobile'
    }
    return 'desktop'
}
const initialState: SettingStateType = {
    themeMode: 'light',
    screen: getScreenType(),
    language: 'english',
    globalLoading: {
        loading: false,
        message: 'Loading.....',
    },
}

function settingsReducer(
    state: SettingStateType,
    action: SettingActionType
): SettingStateType {
    const currentSettingsData = getSettingsData() || defaultSettingsData
    switch (action.type) {
        case 'themeMode':
            setSettingsData({
                ...currentSettingsData,
                themeMode: action.value as 'light' | 'dark',
            })
            return {
                ...state,
                themeMode: action.value as typeof state.themeMode,
            }
        case 'screen':
            return { ...state, screen: action.value as typeof state.screen }
        case 'handleGlobalLoading':
            return {
                ...state,
                globalLoading: {
                    loading: (action.value as typeof state.globalLoading)
                        .loading,
                    message: (action.value as typeof state.globalLoading)
                        .message,
                },
            }
        case 'language':
            if (currentSettingsData)
                setSettingsData({
                    ...currentSettingsData,
                    language: action.value as string,
                })
            return { ...state, language: action.value as string }
        default:
            return state
    }
}

export const SettingContext = createContext({
    settings: initialState,
    changeSettings: (() => {}) as Dispatch<SettingActionType>,
    toggleTheme: () => {},
    handleGlobalLoading: ((_, __) => {}) as (
        value: boolean,
        message?: string
    ) => void,
})

export default function SettingContextProvider(props: {
    children: React.ReactNode
}) {
    const [settings, changeSettings] = useReducer(settingsReducer, initialState)
    const [internetStatus, setInternetStatus] = useState<boolean>(true)
    function checkSettings() {
        const settingData = getSettingsData()
        if (settingData) {
            changeSettings({ type: 'language', value: settingData.language })
            changeSettings({ type: 'themeMode', value: settingData.themeMode })
        } else {
            setSettingsData(initialState)
        }
    }
    useEffect(() => {
        if (!window.navigator.onLine) setInternetStatus(false)
        else setInternetStatus(true)
        window.addEventListener('online', () => setInternetStatus(true))
        window.addEventListener('offline', () => setInternetStatus(false))
        window.addEventListener('resize', () => {
            changeSettings({
                type: 'screen',
                value: getScreenType(),
            })
        })
        checkSettings()
    }, [])
    function toggleTheme() {
        const currentSettingsData = getSettingsData() || defaultSettingsData
        changeSettings({
            type: 'themeMode',
            value: settings.themeMode === 'light' ? 'dark' : 'light',
        })
        setSettingsData({
            ...currentSettingsData,
            themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
        })
    }
    function handleGlobalLoading(value: boolean, message = 'Processing....') {
        changeSettings({
            type: 'handleGlobalLoading',
            value: { loading: value, message: message as string },
        })
    }

    return (
        <SettingContext.Provider
            value={{
                settings,
                changeSettings,
                toggleTheme,
                handleGlobalLoading,
            }}
        >
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={settings.themeMode === 'dark' ? 'dark' : 'colored'}
                style={{
                    fontSize: '10px',
                    zIndex: 99999999999,
                }}
            />
            {settings.globalLoading.loading && <GlobalLoader />}
            {
                <InternetStatus
                    key={internetStatus ? '1' : '0'}
                    status={internetStatus}
                />
            }
            {props.children}
        </SettingContext.Provider>
    )
}

function InternetStatus({ status }: { status: boolean }) {
    const [isAlwaysShow, setIsAlwaysShow] = useState<boolean>(true)
    useEffect(() => {
        if (status) {
            setTimeout(() => {
                setIsAlwaysShow(false)
            }, 3000)
        } else {
            setIsAlwaysShow(true)
        }
    }, [status])
    if (!isAlwaysShow) return null
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                zIndex: 99999999999999,
                width: 'max(20vw,200px)',
                height: '10vh',
            }}
        >
            <Container>
                {status ? (
                    <Alert severity="success">You are online</Alert>
                ) : (
                    <Alert variant="filled" severity="error">
                        You are offline
                    </Alert>
                )}
            </Container>
        </div>
    )
}

function GlobalLoader() {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
                zIndex: 999999999,
                width: '100vw',
                height: '100vh',
            }}
        >
            <WebsiteLoader />
        </div>
    )
}
