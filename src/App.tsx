import './App.css'
import './styles/index.scss'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'
import ConfiguredThemeProvider from './theme/ThemeProvider'
import UserContextProvider from './context/UserContext'
import SettingsContextProvider from './context/SettingsContext'
import PreviewContextProvider from './context/PreviewContext'
import ApolloContextProvider from './context/ApolloContext'
import Router from './routes/Router'
import { registerLicense } from '@syncfusion/ej2-base'
import MainConfigs from './react.config'
registerLicense(MainConfigs.services.syncfusion.KEY)

function App() {
    return (
        <HelmetProvider>
            <ApolloContextProvider>
                <SettingsContextProvider>
                    <UserContextProvider>
                        <ConfiguredThemeProvider>
                            <StyledEngineProvider injectFirst>
                                <PreviewContextProvider>
                                    <BrowserRouter>
                                        <Router />
                                    </BrowserRouter>
                                </PreviewContextProvider>
                            </StyledEngineProvider>
                        </ConfiguredThemeProvider>
                    </UserContextProvider>
                </SettingsContextProvider>
            </ApolloContextProvider>
        </HelmetProvider>
    )
}

export default App
