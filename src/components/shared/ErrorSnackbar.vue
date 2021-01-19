<template>
  <div class="fixed z-10 bg-red-400 mb-4 p-4 rounded-md w-80 bottom-0.5 box-border transition-all"
              :style="containerStyle">
      <span>
        {{ title }}
      </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ErrorSnackbar",
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    containerStyle(): {transform: string, opacity: string} {
      return {
        transform: this.title ? "translateY(0)" : "translateY(100vh)",
        opacity: this.title ?  "1" : "0"
      }
    }
  }
})
</script>