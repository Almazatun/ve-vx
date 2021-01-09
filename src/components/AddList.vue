<template>
  <div class="min-h-150">
    <div class="flex flex-col justify-between m-0
      container text-left font-bold p-4 lg:w-96 md:w-60 rounded-lg bg-gray-600
      shadow-2xl
     "
    >
      <label>
      <textarea :style="styleTextArea" class="font-sans p-2 rounded-md mb-2
                focus:outline-none focus:ring focus:border-blue-300"
                name=""
                id=""
                role="textbox"
                v-model="titleNewList"></textarea>
      </label>
      <div>
        <button @click="addNewTodoList" class="bg-green-400 mr-2 p-2 rounded-md shadow-inner focus:outline-none">Add
          list
        </button>
        <button @click="toggleInputMode" class="bg-red-300 p-2 rounded-md shadow-inner focus:outline-none">❌</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "AddList",
  props: {
    toggleInputMode: {
      type: Function,
      required: true
    },
    addTodoList: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const titleNewList = ref<string>('')

    function addNewTodoList(){
      if (titleNewList.value.trim() !== ''){
        props.addTodoList(titleNewList.value)
        titleNewList.value = ''
        props.toggleInputMode()
      }
    }

    return {
      titleNewList,
      addNewTodoList
    }
  },
  computed: {
    styleTextArea() {
      return {
        display: 'block',
        width: '100%',
        overflow: 'hidden',
        resize: 'both',
        minHeight: '65px',
        lineHeight: '20px',
      }
    }
  }
})
</script>
