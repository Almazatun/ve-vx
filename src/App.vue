<template>
  <div class="container flex flex-col bg-green-100 h-screen w-screen items-center text-center">
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