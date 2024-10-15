<script setup>
import { ref } from 'vue';
import { store } from "./store.js"




const input = ref("")

const submitForm = (event) => {
    event.preventDefault()
    // console.log(input.value)
    store.query = input.value
    store.tag = "multi"
    store.searchValue = "search"
    input.value = ""
}


</script>

<template>
    <div class=" p-4 h-48 flex md:flex-row flex-col justify-center items-center">

        <router-link to="/" class="lg:w-1/4 w-screen p-2 lg:m-4 lg:p-8 transition-all duration-500 hover:scale-110">
            <img  src="../assets/logo.svg" />
        </router-link>
        <form @submit="submitForm" class="lg:h-2/5 lg:w-2/3">
            <input class="border border-primary lg:h-full lg:w-full m-2 p-2 rounded-md text-center text-2xl" type="text"
                placeholder="Enter keywords" v-model="input" />
        </form>
        <svg @click="submitForm" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-12 m-2 cursor-pointer">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>


    </div>
</template>