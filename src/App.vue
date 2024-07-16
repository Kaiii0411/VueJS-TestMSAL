<template>
  <div>
    <div v-if="state.isAuthenticated">
      <div>Welcome, {{ state.user?.name }}!</div>
      <button @click="handleLogout">Log Out</button>
    </div>
    <div v-else>
      <button @click="handleLogin">Log In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { msalService } from './config/useAuth'
import { state } from './config/msalConfig'

const { login, logout, handleRedirect, initialize } = msalService()

const handleLogin = async () => {
  await login()
}

const handleLogout = () => {
  logout()
}

onMounted(async () => {
  await initialize()
  await handleRedirect()
})
</script>