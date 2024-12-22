import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    split,
} from '@apollo/client'
import MainConfigs from '@/react.config'
import { getLocalTokenData } from '@/services/LocalStorage/LocalAuthentication'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
    uri: MainConfigs.BackendConfigs.graphql,
    headers: {
        authorization: `${getLocalTokenData()}`,
    },
})
const wsLink = new GraphQLWsLink(
    createClient({
        url: MainConfigs.BackendConfigs.subscriptions,
    })
)
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        )
    },
    wsLink,
    httpLink
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            errorPolicy: 'all',
        },
        mutate: {
            errorPolicy: 'all',
        },
        watchQuery: {
            errorPolicy: 'all',
        },
    },
    link: splitLink,
})
type Props = {
    children: React.ReactNode
}

function ApolloContextProvider({ children }: Props) {
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloContextProvider
