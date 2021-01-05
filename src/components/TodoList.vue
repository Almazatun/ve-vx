<template>
  <div>
    <span>{{ todoListTitle }}</span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TodoList",
  props: {
    todoListTitle: {
      type: String,
      required: true
    }
  }
})

</script>