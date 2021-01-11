<template>
  <div class="flex flex-col bg-gray-200 w-screen" style="min-height: 100vh">
    <Routers/>
    <router-view/>
  </div>
</template>

<script>
import Routers from "@/components/Routers";

export default {
  components: {
    Routers: Routers
  }
}
</script>