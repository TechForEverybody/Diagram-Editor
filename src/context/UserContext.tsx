import { Dispatch, createContext, useEffect, useReducer } from 'react'
import {
    getLocalUserData,
    removeLocalTokenData,
    removeLocalUserData,
    setLocalTokenData,
    setLocalUserData,
} from '../services/LocalStorage/LocalAuthentication'
import MainConfigs from '@/react.config'
import { APIResponse } from '@/types/Response'

export type userStateType = {
    isLogin: boolean
    userData: {
        id?: string
        name?: string
        contact?: {
            email?: string
            phone?: string
        }
        avatar?: string
        role?: string
        authToken?: string
    } | null
}

type userActionType = {
    type: 'login' | 'logout' | 'update'
    value: {
        userData: userStateType['userData'] | null
    }
}

export const userInitialState: userStateType = {
    isLogin: false,
    userData: null,
}

function userReducer(
    state: userStateType,
    action: userActionType
): userStateType {
    const user = {
        id: action.value.userData?.id as string,
        name: action.value.userData?.name as string,
        contact: {
            email: action.value.userData?.contact?.email,
            phone: action.value.userData?.contact?.phone,
        },
        role: action.value.userData?.role as string,
        authToken: action.value.userData?.authToken as string,
        avatar: action.value.userData?.avatar as string,
    }
    // console.log(user)
    switch (action.type) {
        case 'login':
            setLocalUserData(user)
            setLocalTokenData(user.authToken)
            return {
                ...state,
                isLogin: true,
                userData: action.value.userData || null,
            }
        case 'logout':
            removeLocalUserData()
            removeLocalTokenData()
            return {
                ...state,
                isLogin: false,
                userData: action.value.userData || null,
            }
        case 'update':
            setLocalUserData(user)
            setLocalTokenData(user.authToken)
            return {
                ...state,
                isLogin: true,
                userData: action.value.userData || null,
            }
        default:
            return state
    }
}

export const UserContext = createContext({
    user: userInitialState,
    changeUser: (() => {}) as Dispatch<userActionType>,
})

export async function getUserDataAfterVerification(userID: string) {
    try {
        const response = await fetch(
            `${MainConfigs.BackendConfigs.url}/GetUserDataAPI`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userID }),
            }
        )
        if (response.status === 200) {
            const data = (await response.json()) as APIResponse
            // console.log(data)
            return data.data
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

export default function UserContextProvider(props: {
    children: React.ReactNode
}) {
    const [user, changeUser] = useReducer(userReducer, userInitialState)

    async function checkUser() {
        const local = getLocalUserData()
        if (local) {
            changeUser({ type: 'login', value: { userData: local } })
        } else {
            changeUser({ type: 'logout', value: { userData: null } })
            // window.location.href = '/'
        }
    }
    useEffect(() => {
        if (MainConfigs.NODE_ENVIRONMENT === 'development') {
            changeUser({
                type: 'login',
                value: {
                    userData: {
                        id: 'test',
                        name: 'Shivkumar Chauhan',
                        contact: {
                            email: 'test@gmail.com',
                            phone: '+919999999999',
                        },
                        role: 'Teacher',
                        avatar: '',
                        authToken: 'sjhdflsj',
                    },
                },
            })
        } else {
            checkUser()
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, changeUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
