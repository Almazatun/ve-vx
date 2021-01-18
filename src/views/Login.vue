<template>
  <div class="container sm:w-80" :style="parentContainer">
    <form class="container h-96 2xl:w-96 xl:w-96 xl:w-96 sm:w-96 sm:p-4  flex flex-col justify-center items-center
                bg-white rounded-md shadow-2xl"
          :style="containerStyle"
          @submit="checkForm"
          @keyup.enter="checkForm"
    >
      <div class="mb-2 w-4/5 text-center font-bold">
        <span>Log in to App</span>
      </div>
      <div class="mb-2 w-4/5">
        <label class="w-auto">
          <input placeholder="Enter email"
                 class="bg-gray-100 h-12 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                 type="text"
                 :style="inputStyle"
                 v-model="formData.email"
          >
        </label>
      </div>
      <div class="mb-2 w-4/5">
        <label class="w-auto">
          <input placeholder="Enter password"
                 class="bg-gray-100 h-12 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                 type="password"
                 :style="inputStyle"
                 v-model="formData.password"
          >
        </label>
      </div>
      <div class="flex text-left w-4/5 p-2">
        <span>👉 Remember me</span>
        <label>
          <input class="ml-2.5" type="checkbox" v-model="formData.rememberMe">
        </label>
      </div>
      <div class="w-4/5">
        <button class="bg-green-400 font-sans w-auto p-2 hover:bg-green-300 rounded-md focus:outline-black"
                style="width: 100%">
          Log in
        </button>
      </div>
      <div v-show="formData.errors.length >= 1" class="w-4/5 mt-3 bg-pink-200 border-red-50 rounded-md p-2">
        <div class="bg-pink-200 text-left"
             v-for="error in formData.errors"
             :key="error">
          <span class="break-words">{{ error }}</span>
        </div>
      </div>
    </form>
    <ErrorSnackbar :title="errorStore" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref, watch} from "vue";
import {validators} from "@/utils/validators";
import {useStore} from "vuex";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import {useRouter} from "vue-router";

export default defineComponent({
  name: "Login",
  components: {
    ErrorSnackbar
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const errorStore = computed<string | null>(() => store.getters['error'])
    const isAuth = computed<boolean>(() => store.getters['AUTH/isAuth'])
    const shadowIsAuth = ref<typeof isAuth>(isAuth)


    const formData = reactive<{
      email: string
      password: string
      rememberMe: boolean
      errors: Array<string>,
    }>({
      email: '',
      password: '',
      rememberMe: false,
      errors: [],
    })

    function logIn() {
      store.dispatch({
        type: 'AUTH/LOG_IN',
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      })
    }

    function checkForm(event: Event) {
      event.preventDefault()
      const {errors, valid} = validators(formData.email, formData.password)
      if (errors) {
        formData.errors = errors
      }
      if (formData.errors) {
        setTimeout(() => {
          formData.errors = []
        }, 5000)
      }
      if (valid) {
        logIn()
        formData.email = ''
        formData.password = ''
        formData.rememberMe = false
        formData.errors = []
      }
    }

    watch(isAuth, () => {
      if(shadowIsAuth.value){
        router.push({name: 'Home'})
      }
    })


    return {
      formData,
      checkForm,
      errorStore
    }
  },
  computed: {
    parentContainer() {
      return {
        margin: 'auto',
        height: '80%'
      }
    },
    containerStyle() {
      return {
        margin: '0 auto'
      }
    },
    inputStyle() {
      return {
        width: '100%'
      }
    }
  },
})
</script>
