import { gql } from '@apollo/client'
import * as ApolloReactCommon from '@apollo/client'
import * as ApolloReactHooks from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
    T extends { [key: string]: unknown },
    K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
    | T
    | {
          [P in keyof T]?: P extends ' $fragmentName' | '__typename'
              ? T[P]
              : never
      }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
}

export type CreateUserInput = {
    email: Scalars['String']['input']
    firstName: Scalars['String']['input']
    lastName: Scalars['String']['input']
    password: Scalars['String']['input']
}

export type Mutation = {
    createUser: User
}

export type MutationCreateUserArgs = {
    data: CreateUserInput
}

export type Query = {
    getUsers: User
}

export type Subscription = {
    userCreated: User
}

export type User = {
    email?: Maybe<Scalars['String']['output']>
    firstName?: Maybe<Scalars['String']['output']>
    googleId?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    lastName?: Maybe<Scalars['String']['output']>
    name?: Maybe<Scalars['String']['output']>
    password?: Maybe<Scalars['String']['output']>
    phone?: Maybe<Scalars['String']['output']>
    profilePic?: Maybe<Scalars['String']['output']>
    role?: Maybe<Scalars['String']['output']>
}

export type CreateUserMutationVariables = Exact<{
    data: CreateUserInput
}>

export type CreateUserMutation = { createUser: { email?: string | null } }

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetUsersQuery = { getUsers: { id: string; name?: string | null } }

export type SubscriptionSubscriptionVariables = Exact<{ [key: string]: never }>

export type SubscriptionSubscription = { userCreated: { name?: string | null } }

export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
        createUser(data: $data) {
            email
        }
    }
`
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<
    CreateUserMutation,
    CreateUserMutationVariables
>
export function useCreateUserMutation(
    baseOptions?: ApolloReactHooks.MutationHookOptions<
        CreateUserMutation,
        CreateUserMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return ApolloReactHooks.useMutation<
        CreateUserMutation,
        CreateUserMutationVariables
    >(CreateUserDocument, options)
}
export type CreateUserMutationHookResult = ReturnType<
    typeof useCreateUserMutation
>
export type CreateUserMutationResult =
    ApolloReactCommon.MutationResult<CreateUserMutation>
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
    CreateUserMutation,
    CreateUserMutationVariables
>
export const GetUsersDocument = gql`
    query GetUsers {
        getUsers {
            id
            name
        }
    }
`
export function useGetUsersQuery(
    baseOptions?: ApolloReactHooks.QueryHookOptions<
        GetUsersQuery,
        GetUsersQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(
        GetUsersDocument,
        options
    )
}
export function useGetUsersLazyQuery(
    baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
        GetUsersQuery,
        GetUsersQueryVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
        GetUsersDocument,
        options
    )
}
export function useGetUsersSuspenseQuery(
    baseOptions?:
        | ApolloReactHooks.SkipToken
        | ApolloReactHooks.SuspenseQueryHookOptions<
              GetUsersQuery,
              GetUsersQueryVariables
          >
) {
    const options =
        baseOptions === ApolloReactHooks.skipToken
            ? baseOptions
            : { ...defaultOptions, ...baseOptions }
    return ApolloReactHooks.useSuspenseQuery<
        GetUsersQuery,
        GetUsersQueryVariables
    >(GetUsersDocument, options)
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>
export type GetUsersLazyQueryHookResult = ReturnType<
    typeof useGetUsersLazyQuery
>
export type GetUsersSuspenseQueryHookResult = ReturnType<
    typeof useGetUsersSuspenseQuery
>
export type GetUsersQueryResult = ApolloReactCommon.QueryResult<
    GetUsersQuery,
    GetUsersQueryVariables
>
export function refetchGetUsersQuery(variables?: GetUsersQueryVariables) {
    return { query: GetUsersDocument, variables: variables }
}
export const SubscriptionDocument = gql`
    subscription Subscription {
        userCreated {
            name
        }
    }
`
export function useSubscriptionSubscription(
    baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
        SubscriptionSubscription,
        SubscriptionSubscriptionVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions }
    return ApolloReactHooks.useSubscription<
        SubscriptionSubscription,
        SubscriptionSubscriptionVariables
    >(SubscriptionDocument, options)
}
export type SubscriptionSubscriptionHookResult = ReturnType<
    typeof useSubscriptionSubscription
>
export type SubscriptionSubscriptionResult =
    ApolloReactCommon.SubscriptionResult<SubscriptionSubscription>
