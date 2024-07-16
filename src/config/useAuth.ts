import { ref } from 'vue'
import { msalInstance, state } from './msalConfig'

export function msalService() {
    const isAuthenticated = ref(false)

    const initialize = async () => {
        try {
            await msalInstance.initialize() // Call the initialize function
        } catch (error) {
            console.log('Initialization error', error)
        }
    }

    const login = async () => {
        try {
            if (!msalInstance) {
                throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
            }
            const loginRespone = await msalInstance.loginRedirect()
            state.isAuthenticated = true
            console.log('Login successful: ', loginRespone);
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    const logout = () => {
        if (!msalInstance) {
            throw new Error('MSAL not initialized. Call initializeMsal() before using MSAL API.')
        }
        const logoutRespone = msalInstance.logoutRedirect()
        state.isAuthenticated = false
        state.user = null
        console.log('Logout successful: ', logoutRespone);
    }

    const handleRedirect = async () => {
        try {
            await msalInstance.handleRedirectPromise()
            state.isAuthenticated = msalInstance.getAllAccounts().length > 0
            state.user = msalInstance.getAllAccounts()[0]
        } catch (error) {
            console.error('Redirect error:', error)
        }
    }

    return {
        isAuthenticated,
        initialize,
        login,
        logout,
        handleRedirect
    }
}