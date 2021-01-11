<template>
  <div class="lg:container md:container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
   gap-6 mx-auto justify-items-center align-middle
   lg:p-0 md:p-1.5 sm:p-6" style="margin: 16px auto">
    <div v-for="tl in todoLists" :key="tl.id">
      <TodoList :todo-list-title="tl.title"
                :todo-list-id="tl.id"
                v-on:update-title="updateTodoList"
      />
    </div>
    <AddList v-if="inputActive"
             :toggle-input-mode="toggleInputMode"
             :add-todo-list="addTodoList"
    />
    <div class="xl:container lg:container text-left font-bold p-4 h-16 xl:w-96 lg:w-80 md:w-80 sm:w-100
          rounded-lg bg-blue-300 hover:bg-blue-400
          cursor-pointer shadow-2xl relative sm:mb-4
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

        function updateTodoList(event: Event , todoListId: string, title: string){
          store.dispatch({
            type: 'TLS/CHANGE_TL_TITLE',
            todoListId,
            title
          })
        }

        return {
          inputActive,
          toggleInputMode,
          addTodoList,
          deleteTodoList,
          updateTodoList
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
