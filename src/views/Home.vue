<template>
  <TodoLists />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TodoLists from "@/features/todoLists/TodoLists.vue";


export default defineComponent({
      name: "Home",
      components: {
        TodoLists: TodoLists,
      },
    }
)

</script>
