<template>
  <div style="min-height: 250px" class="container rounded-lg lg:w-96 md:w-60 bg-white p-4 shadow-2xl relative">
    <div class="flex flex-row justify-between ">
      <span class="font-bold ">{{ todoListTitle }}</span>
      <button v-if="!show" class="focus:outline-none p-1.5" @click="toggleMenu">
        <img :src="editTodoListIcon" width="25" height="25" alt="edit logo">
      </button>
      <button v-else @click="toggleMenu" class="focus:outline-none p-1.5">
        <img :src="closeMenuTodoListIcon" width="25" height="25" alt="edit logo">
      </button>
    </div>
    <div v-if="show" class="flex flex-col absolute right-2 bg-gray-100 rounded-lg">
      <span @click="changeTodoListTitle" class="hover:bg-blue-200 p-4 rounded-t-lg cursor-pointer">Rename list</span>
      <span @click="removeTodoList" class="hover:bg-red-100 p-4 rounded-b-lg cursor-pointer">Delete list</span>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "TodoList",
  props: {
    todoListTitle: {
      type: String,
      required: true
    },
    deleteTodoList: {
      type: Function,
      required: true
    },
    todoListId: {
      type: String,
      required: true
    },
    updateTodoList: {
      type: Function,
      required: true
    },
  },
  setup (props){
    const editTodoListIcon = "https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Dot-More-Vertical-Menu-512.png"
    const closeMenuTodoListIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/480px-OOjs_UI_icon_close.svg.png"
    const show = ref<boolean>(false)

    function toggleMenu(){
      show.value = !show.value
    }

    function removeTodoList(){
      if (props.todoListId !== ''){
        const should = window.confirm("Are you sure you want to permanently delete todo list ?")
        if (should) {
          props.deleteTodoList(props.todoListId)
          toggleMenu()
        }
      }
    }

    return {
      editTodoListIcon,
      closeMenuTodoListIcon,
      show,
      toggleMenu,
      removeTodoList,
    }
  },
  methods: {
    changeTodoListTitle(event: Event){
      const title: string | null = prompt(`Please enter new title of the list`, '')
      if (title?.trim() !== ''){
        this.$emit('update-title', event, this.todoListId, title)
        this.toggleMenu()
      }
    }
  }
})

</script>