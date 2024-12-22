import React, { useEffect, useState } from 'react'
import WebsiteLoader from '../components/loaders/WebsiteLoader'
import { Button } from '@mui/material'
export default function PreviewContextProvider(props: {
    children: React.ReactNode
}) {
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 5000)
    }, [])
    if (isLoading) return <WebsiteLoader />
    return (
        <div>
            {props.children}
            <AuthorDetails />
        </div>
    )
}

export function AuthorDetails() {
    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                zIndex: 999999999,
            }}
        >
            <Button
                size="small"
                variant="contained"
                href="https://www.linkedin.com/in/shiva995/"
                target="_blank"
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Developed by : Shivkumar Chauhan
            </Button>
        </div>
    )
}
