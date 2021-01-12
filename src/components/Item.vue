<template>
  <div class="flex flex-col justify-between bg-indigo-100 rounded-md border-l-8 text-left p-2 mt-2 mb-2"
       :style="ItemContainerStyle">
    <div class="text-right">
      <span>{{addedDateItem}}</span>
    </div>
    <div>
      <span class="font-bold">{{ titleItem }}</span>
    </div>
    <div>
      <button @click="renameTodoItem" class="font-sans mr-2 bg-yellow-300 rounded-md p-1 focus:outline-none">
        Rename
      </button>
      <button @click="changeStatusTodoItem" class="font-sans mr-2 bg-pink-300 rounded-md p-1 focus:outline-none">
        Change status
      </button>
      <button @click="deleteTodoItem" class="font-sans mr-2 bg-red-300 rounded-md p-1 focus:outline-none mt-2">
        Delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {ItemStatuses} from "@/api/api";

export default defineComponent({
  name: 'Item',
  props: {
    itemStatus: {
      type: Number,
      required: true
    },
    todoListId: {
      type: String,
      required: true
    },
    addedDateItem: {
      type: String,
      required: true
    },
    titleItem: {
      type: String,
      required: true,
      default: 'Title'
    }
  },
  setup() {
    function renameTodoItem() {
      alert("Rename")
    }

    function deleteTodoItem() {
      alert("Delete")
    }

    function changeStatusTodoItem() {
      alert("Change status")
    }

    return {
      renameTodoItem,
      deleteTodoItem,
      changeStatusTodoItem
    }
  },
  methods: {
    checkStatusOfItem(status: number){
      // eslint-disable-next-line
      let colorStyle: string = ''
        if (status === ItemStatuses.New) {
          colorStyle = 'green'
        } else if (status === ItemStatuses.InProgress){
          colorStyle = 'yellow'
        } else if (status === ItemStatuses.Completed) {
          colorStyle = 'orange'
        } else {
          console.log('Not received item status ❌')
        }
      return colorStyle
    }
  },
  computed: {
    ItemContainerStyle() {
      // eslint-disable-next-line
      let borderColor: string =  this.checkStatusOfItem(this.itemStatus)
      return {
        width: "100%",
        minHeight: "100px",
        borderColor: borderColor
      }
    },
  }
})
</script>
