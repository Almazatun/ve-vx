<template>
  <div class="w-full h-4 z-10 fixed overflow-hidden container"
      :class="[{'rounded-full': rounded}, { indeterminate: isActive ? indeterminate : ''}]">
    <div
        class="h-full progressbar"
        :class="[`bg-${color}-500`, {'absolute top-0': indeterminate}, {'rounded-full': rounded}]"
        role="progressbar"
        :style="{width: isActive ? `${percentage}%` : 0}"
        :aria-valuenow=" isActive ? percentage : 0 "
    >
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "BaseProgress",
  props: {
    color: {
      type: String,
      default: "blue"
    },
    percentage: {
      type: Number,
      default: 0
    },
    rounded: {
      type: Boolean,
      default: true
    },
    indeterminate: Boolean,
    isActive: {
      type: Boolean,
      default: false
    }
  },


})
</script>
<style scoped>
@keyframes progress-indeterminate {
  0% {
    width: 30%;
    left: -40%;
  }
  60% {
    left: 100%;
    width: 100%;
  }
  to {
    left: 100%;
    width: 0;
  }
}
.container {
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
}
.progressbar {
  transition: width 0.25s ease;
}

.indeterminate .progressbar {
  animation: progress-indeterminate 1.4s ease infinite;
}
</style>