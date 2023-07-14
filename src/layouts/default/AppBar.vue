<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <v-btn variant="plain" @click="changeTheme"><v-icon icon="mdi-circle-slice-4" /></v-btn>
      <v-btn variant="plain" to="/">HOME </v-btn>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify/lib/framework.mjs';
const theme=useTheme()
var mode=true
const changeTheme=()=>{
  mode=!mode
  theme.global.name.value=mode?"dark":"light"
}
</script>
