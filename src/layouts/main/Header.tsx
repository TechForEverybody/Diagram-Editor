import { SettingContext } from '@/context/SettingsContext'
import { AppBar, Box, Button, Container, Typography } from '@mui/material'
import { Moon, Sun } from 'lucide-react'
import { useContext } from 'react'

function Header() {
    const { settings, toggleTheme } = useContext(SettingContext)
    return (
        <AppBar color="default">
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1,
                }}
            >
                <Box>
                    <Typography variant="h4">
                        <img
                            src="/logo/logo.png"
                            style={{
                                maxWidth: '250px',
                            }}
                            alt=""
                        />
                    </Typography>
                </Box>
                <Box></Box>
                <Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            toggleTheme()
                        }}
                    >
                        {settings.themeMode == 'dark' ? (
                            <Sun color="#e0c200" />
                        ) : (
                            <Moon color="#FFFFFF" />
                        )}
                    </Button>
                </Box>
            </Container>
        </AppBar>
    )
}

export default Header
