<template>
  <div class="flex flex-col bg-gray-200 w-screen" style="min-height: 100vh">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: 'App'
})
</script>