import {
    PublicClientApplication,
    type AccountInfo,
    type RedirectRequest
  } from '@azure/msal-browser'
  import { reactive } from 'vue'
  
  export const msalConfig = {
    auth: {
      clientId: '09b9acae-d69f-4b74-b851-639d2ed117cb',
      authority: 'https://login.microsoftonline.com/6fd4ab17-aa9f-470d-a477-f241ef4dd858',
      redirectUri: 'http://localhost:5173/signin-oidc'
    },
    cache: {
      cacheLocation: 'sessionStorage', // This configures where your cache will be stored
      storeAuthStateInCookie: false
    }
  }
  export const graphScopes: RedirectRequest = {
    scopes: ['user.read', 'openid', 'profile']
  }
  export const state = reactive({
    isAuthenticated: false,
    user: null as AccountInfo | null
  })
  
  export const msalInstance = new PublicClientApplication(msalConfig)