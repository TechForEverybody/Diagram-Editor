import React, { useContext, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles'
import { SettingContext } from '@/context/SettingsContext'
import { CustomTheme } from './theme'

type ConfiguredThemeProviderProps = {
    children?: React.ReactNode
}

export default function ConfiguredThemeProvider(
    props: ConfiguredThemeProviderProps
) {
    const { settings } = useContext(SettingContext)

    const [mode, setMode] = React.useState<'light' | 'dark'>(settings.themeMode)

    useEffect(() => {
        setMode(settings.themeMode)
    }, [settings.themeMode])

    const _theme = React.useMemo(
        () => createTheme(CustomTheme[mode] as ThemeOptions),
        [mode]
    )

    return (
        <ThemeProvider theme={_theme}>
            <GlobalStyles styles={{}} />
            <CssBaseline enableColorScheme />
            {props.children}
        </ThemeProvider>
    )
}
