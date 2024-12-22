import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import * as React from 'react'

interface TabPanelProps {
    children?: React.ReactNode
    dir?: string
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}
function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    }
}

export interface HorizontalTabsProps {
    components: {
        title: string
        content: React.ReactNode
        icon: React.ReactElement
        iconPosition: 'bottom' | 'top' | 'start' | 'end'
    }[]
}

export default function HorizontalTabs(props: HorizontalTabsProps) {
    const [value, setValue] = React.useState(0)
    const theme = useTheme()

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }
    return (
        <div>
            <Box sx={{ bgcolor: 'transparent', width: '100%' }}>
                <AppBar
                    position="static"
                    sx={{
                        background: '#EDF2FB',
                        color: '#000',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        {props.components.map((component, index) => (
                            <Tab
                                icon={component.icon}
                                iconPosition={component.iconPosition}
                                label={component.title}
                                {...a11yProps(index)}
                                style={{ textTransform: 'none' }}
                            />
                        ))}
                    </Tabs>
                </AppBar>
                {props.components.map((component, index) => (
                    <TabPanel value={value} index={index} dir={theme.direction}>
                        {component.content}
                    </TabPanel>
                ))}
            </Box>
        </div>
    )
}
