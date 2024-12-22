import { AuthUserDataType } from '@/types/User'

export function getLocalUserData(): AuthUserDataType | null {
    const userData = localStorage.getItem('userData')
    if (userData) {
        return JSON.parse(userData) as AuthUserDataType
    } else {
        return null
    }
}

export function setLocalUserData(userData: AuthUserDataType): void {
    localStorage.setItem('userData', JSON.stringify(userData))
}

export function removeLocalUserData(): void {
    localStorage.removeItem('userData')
}

export function setLocalTokenData(authToken: string): void {
    localStorage.setItem('authToken', authToken)
}
export function getLocalTokenData(): string | null {
    return localStorage.getItem('authToken')
}

export function removeLocalTokenData(): void {
    localStorage.removeItem('authToken')
}
