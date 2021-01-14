<template>
  <div class="xl:container lg:container md:container grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2
   gap-6 mx-auto justify-items-center align-middle
   lg:p-0 md:p-6 sm:p-6" style="margin: 16px auto">
    <div v-for="tl in todoLists" :key="tl.id">
      <TodoList :todo-list-title="tl.title"
                :todo-list-id="tl.id"
                v-on:update-title="updateTodoList"
                :delete-item="deleteItem"
                :create-item="createNewItem"
                :delete-todo-list="deleteTodoList"
                :rename-item-title="renameItemTitle"
                :change-item-status="changeItemStatus"
      />
    </div>
    <div v-if="inputActive" class="xl:container lg:container 2xl:w-96 xl:w-80 lg:w-80 md:w-72 min-h-150 sm:container">
      <AddForm :toggle-input-mode="toggleInputMode"
               :callback-fun="addTodoList"
               title-span="Add list"
      />
    </div>
    <div class="xl:container lg:container text-left font-bold p-4 h-16 2xl:w-96 xl:w-80 lg:w-80 md:w-72 sm:w-100
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
import AddForm from "@/components/AddForm.vue";
import {ItemStatuses} from "@/api/api";

export default defineComponent ({
  name: "TodoLists",
  components: {
    TodoList: TodoList,
    AddForm: AddForm
  },
  setup(){
    const store = useStore()
    const inputActive = ref<boolean>(false)

    //TodoLists
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

    //TodoItems
    function createNewItem(todoListId: string, title: string){
      store.dispatch({
        type: 'IMS/CREATE_I',
        todoListId,
        title
      })
    }

    function deleteItem(todoListId: string, itemId: string){
      store.dispatch({
        type: 'IMS/DELETE_I',
        todoListId,
        itemId
      })
    }

    function renameItemTitle(todoListId: string, itemId: string, title: string){
      store.dispatch({
        type: 'IMS/UPDATE_PROPERTY_I',
        todoListId,
        itemId,
        model: {title}
      })
    }

    function changeItemStatus(todoListId: string, itemId: string, status: ItemStatuses){
      store.dispatch({
        type: 'IMS/UPDATE_PROPERTY_I',
        todoListId,
        itemId,
        model: {status}
      })
    }

    return {
      inputActive,
      toggleInputMode,
      addTodoList,
      deleteTodoList,
      updateTodoList,
      createNewItem,
      deleteItem,
      renameItemTitle,
      changeItemStatus
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
})
</script>
