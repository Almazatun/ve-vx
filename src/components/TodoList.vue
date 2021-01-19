<template>
  <div style="min-height: 250px" class="xl:container lg:container rounded-lg 2xl:w-96 xl:w-80 lg:w-80 md:w-72 sm:w-64
  bg-white p-4 shadow-2xl relative">
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
    <div v-for="item in items" :key="item.id">
      <Item :todo-list-id="todoListId"
            :item-status="item.status"
            :added-date-item="item.addedDate"
            :title-item="item.title"
            :delete-item="deleteItem"
            :item-id="item.id"
            :rename-item-title="renameItemTitle"
            :change-item-status="changeItemStatus"

      />
    </div>
    <div>
      <div v-if="toggleItem">
        <AddForm v-if="toggleItem"
                 :toggle-input-mode="toggleEditComponent"
                 :callback-fun="createNewItem"
                 title-span="Add new item"
        />
      </div>
      <div v-else @click="toggleEditComponent"
           class="container text-left font-sans p-4 h-12
          rounded-lg bg-green-200
          cursor-pointer
          "
      >
        <span>➕ Add another item</span>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import Item from "@/components/Item.vue";
import {useStore} from "vuex";
import AddForm from "@/components/shared/AddForm.vue";

export default defineComponent({
  name: "TodoList",
  components: {
    Item,
    AddForm
  },
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
    createItem:{
      type: Function,
      required: true
    },
    deleteItem: {
      type: Function,
      required: true
    },
    renameItemTitle: {
      type: Function,
      required: true
    },
    changeItemStatus: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const items = computed(() => store.getters['IMS/todoItems'](props.todoListId))
    const editTodoListIcon = "https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-glyph-1/32/-_Dot-More-Vertical-Menu-512.png"
    const closeMenuTodoListIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/480px-OOjs_UI_icon_close.svg.png"
    const show = ref<boolean>(false)
    const toggleItem = ref<boolean>(false)



    function toggleMenu() {
      show.value = !show.value
    }

    function toggleEditComponent() {
      toggleItem.value = !toggleItem.value
    }

    function removeTodoList() {
      if (props.todoListId !== '') {
        const should = window.confirm("Are you sure you want to permanently delete todo list ?")
        if (should) {
          props.deleteTodoList(props.todoListId)
        }
      }
      toggleMenu()
    }

    const createNewItem = (title: string) => {
     props.createItem(props.todoListId, title)
    }

    return {
      editTodoListIcon,
      closeMenuTodoListIcon,
      show,
      toggleMenu,
      removeTodoList,
      items,
      toggleItem,
      toggleEditComponent,
      createNewItem
    }
  },
  methods: {
    changeTodoListTitle(event: Event) {
      const title: string | null = prompt(`Please enter new title of the list`, '')
      if (title?.trim() !== '') {
        this.$emit('update-title', event, this.todoListId, title)
      }
      this.toggleMenu()
    },
    fetchTodoItemsData() {
      this.$store.dispatch({
        type: 'IMS/FETCH_I',
        todoListId: this.todoListId
      })
    },
  },
  created() {
    this.fetchTodoItemsData()
  }
})

</script>