<template>
  <div class="container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
   gap-6 mx-auto justify-items-center align-middle
   lg:p-0 md:p-1.5 sm:p-10 p-12" style="margin: 0 auto">
    <div v-for="tl in todoLists" :key="tl.id">
      <TodoList :todo-list-title="tl.title"
                :todo-list-id="tl.id"
                :delete-todo-list="deleteTodoList"
      />
    </div>
    <AddList v-if="inputActive"
             :toggle-input-mode="toggleInputMode"
             :add-todo-list="addTodoList"
    />
    <div class="container text-left font-bold p-4 h-16 lg:w-96 md:w-60 rounded-lg bg-blue-300 hover:bg-blue-400
          cursor-pointer shadow-2xl relative
          "
         v-else @click="toggleInputMode"
    >
      <span>➕ Add another list</span>
    </div>
  </div>
</template>

<script lang="ts">
import TodoList from "@/components/TodoList.vue";
import {mapGetters, useStore} from 'vuex'
import {defineComponent, ref} from "vue";
import AddList from "@/components/AddList.vue";


export default defineComponent({
      name: "Home",
      components: {
        TodoList: TodoList,
        AddList: AddList
      },
      setup() {
        const store = useStore()
        const inputActive = ref<boolean>(false)

        function addTodoList(title: string) {
            store.dispatch({
              type: 'TLS/CREATE_TL', title
            })
        }

        function toggleInputMode() {
          inputActive.value = !inputActive.value
        }

        function deleteTodoList(todoListId: string){
          store.dispatch({
            type: 'TLS/REMOVE_TL', todoListId
          })
        }

        return {
          inputActive,
          toggleInputMode,
          addTodoList,
          deleteTodoList
        }
      },
      computed: {
        ...mapGetters({
          // map `this.doneCount` to `this.$store.getters.doneTodosCount`
          todoLists: 'TLS/todoLists'
        })
      },
      methods: {
        fetchTodoListData() {
          this.$store.dispatch({
            type: 'TLS/FETCH_TLS'
          })
        },
      },
      created() {
        this.fetchTodoListData()
      }
    }
)

</script>
