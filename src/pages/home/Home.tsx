// import { SettingContext } from '@/context/SettingsContext'
import {
    useGetUsersQuery,
    useSubscriptionSubscription,
} from '@/services/graphql/generated'
// import { Box, Button, Container, Typography } from '@mui/material'
import { useEffect } from 'react'
import EditorComponent from './Editor'

function Home() {
    // const { settings } = useContext(SettingContext)
    const { data } = useGetUsersQuery()
    const { data: subscriptionData } = useSubscriptionSubscription()
    useEffect(() => {
        console.log(data)
    }, [data])
    useEffect(() => {
        console.log(subscriptionData)
    }, [subscriptionData])
    return (
        <div
            style={{
                width: '100%',
                minHeight: '100dvh',
            }}
        >
            <EditorComponent />
        </div>
    )
}

export default Home
