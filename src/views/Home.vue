<template>
  <div v-for="tl in todoLists" :key="tl.id">
    <TodoList :todo-list-title="tl.title"/>
  </div>
  <div>
    <span>{{state}}</span>
  </div>
</template>

<script lang="ts">
import TodoList from "@/components/TodoList.vue";
import {onMounted} from 'vue'
import {mapGetters, useStore} from 'vuex'
import {defineComponent} from "vue";


export default defineComponent({
      name: "Home",
      components: {
        TodoList
      },
      setup() {
        const store = useStore()
        const state = store.state.TLS

        function fetchData() {
          store.dispatch({
            type: 'TLS/FETCH_TLS'
          })
        }

        onMounted(() => {
          fetchData()
        })

        return {
          state
        }
      },
      computed: {
        ...mapGetters({
          // map `this.doneCount` to `this.$store.getters.doneTodosCount`
          todoLists: 'TLS/todoLists'
        })
      },
    }
)

</script>
