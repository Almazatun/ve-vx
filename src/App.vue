<template>
  <div class="flex flex-col bg-gray-200 h-screen w-screen">
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