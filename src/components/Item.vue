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
import {checkStatusOfItem} from "@/utils/checkStatusOfItem";

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
    },
    itemId: {
      type: String,
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

    function renameTodoItem() {
      const title: string | null = prompt(`Please enter new title of the list`, '')
      if (title?.trim() !== '') {
        props.renameItemTitle (props.todoListId, props.itemId, title)
      } else {
        alert("Hey, field should be required 👷‍♂️")
      }
    }

    function deleteTodoItem() {
      props.deleteItem(props.todoListId, props.itemId)
    }

    function changeStatusTodoItem() {
      const checkStatus: number = props.itemStatus !== ItemStatuses.New ? ItemStatuses.New : ItemStatuses.Completed
      props.changeItemStatus(props.todoListId, props.itemId, checkStatus)
    }

    return {
      renameTodoItem,
      deleteTodoItem,
      changeStatusTodoItem
    }
  },
  computed: {
    ItemContainerStyle() {
      // eslint-disable-next-line
      let borderColor: string =  checkStatusOfItem(this.itemStatus)
      return {
        width: "100%",
        minHeight: "100px",
        borderColor: borderColor
      }
    },
  }
})
</script>
